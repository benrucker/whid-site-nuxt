<template>
  <div id="body" class="fake-webpage w-75">
    <div id="navbar">
      <div id="links">
        <span
          class="a link"
          href="scoreboard.html"
          @click="changeWindow"
        >Scoreboard</span>
        <span class="a link" href="score.html">Your Score</span>
      </div>
      <div id="logo">
        your logo here:
        <img src="/score/whid.png" alt="google logo">
      </div>
    </div>

    <hr>
    <br>
    <br>

    <div v-if="usernameError" id="usernameNotFound">
      <i>username not found!</i>
    </div>

    <form id="usernameForm" @submit.prevent="processUsername">
      <input
        id="username"
        v-model="username"
        type="text"
        name="name"
        placeholder="Enter your name"
      >
      <input type="submit" value="Submit">
    </form>

    <h3>Your score History:</h3>

    <table id="history">
      <tbody v-if="!usernameError">
        <tr>
          <th>Date</th>
          <th>Score</th>
        </tr>
        <tr v-for="(score, index) in sortedScores" :key="index">
          <td>{{ score.date }}</td>
          <td>{{ score.score }}</td>
        </tr>
      </tbody>
    </table>

    <svg id="scoreline" />
    <script src="https://d3js.org/d3.v7.min.js" />
  </div>
</template>

<script>
export default {
  layout: 'score',
  data () {
    return {
      scores: [],
      usernameError: false,
      username: ''
    }
  },
  computed: {
    sortedScores () {
      return this.scores.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
    }
  },
  watch: {
    sortedScores (theScores) {
      showGraph(JSON.parse(JSON.stringify(theScores)))
    }
  },
  methods: {
    changeWindow () {
      this.$emit('changeWindow', 'scoreBoard')
    },
    async processUsername () {
      this.scores = await this.getData(this.username)
      if (this.scores.length === 0) {
        this.usernameError = true
      } else {
        this.usernameError = false
      }
      console.log(this.scores)
    },
    async getData (username) {
      const response = await fetch(
        'https://api.whid.live/member/name/' + username + '/scores'
      )
      if (!response.ok) {
        return []
      }
      const data = await response.json()
      return data.map((d) => {
        return {
          score: d.score,
          date: d.date
        }
      })
    }
  }
}

function showGraph (data) {
  // clear content of #scoreline
  document.getElementById('scoreline').innerHTML = ''

  console.log('showgraph called on', data)

  data.forEach((d) => {
    d.score = parseInt(d.score)
    d.date = new Date(d.date)
  })

  const MedianLine = new Line(
    {
      parentElement: '#scoreline',
      containerHeight: 300,
      containerWidth: 800,
      yParameter: d => d.score
    },
    data
  )

  MedianLine.svg
    .append('text')
    .attr('x', 500)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .text('Your social credit score history!')

  MedianLine.svg
    .append('text')
    .attr('class', 'axis-title')
    .attr('x', 0)
    .attr('y', 25)
    .attr('dy', '.71em')
    .text('score')

  MedianLine.updateVis()
}

class Line {
  constructor (_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 500,
      containerHeight: _config.containerHeight || 300,
      margin: _config.margin || { top: 50, bottom: 30, right: 50, left: 50 },
      tooltipPadding: _config.tooltipPadding || 15,
      yParameter: _config.yParameter
    }

    this.data = _data
    this.previous = this.data

    this.initVis()
  }

  initVis () {
    const vis = this
    // width and height of the visualization
    vis.width =
      vis.config.containerWidth -
      vis.config.margin.left -
      vis.config.margin.right
    vis.height =
      vis.config.containerHeight -
      vis.config.margin.top -
      vis.config.margin.bottom

    vis.xValue = d => d.date
    vis.yValue = vis.config.yParameter

    // scales setup
    vis.xScale = d3
      .scaleLinear()
      .domain([
        d3.max(vis.data, d => d.date.getTime() + 1.8e7),
        d3.min(vis.data, d => d.date.getTime() - 1.8e7)
      ])
      .range([vis.width, 0])

    vis.yScale = d3
      .scaleLinear()
      .domain([0, 1500])
      .range([vis.height, 0])
      .nice()

    // Size definition of SVG drawing area
    vis.svg = d3
      .select(vis.config.parentElement)
      .attr('width', vis.config.containerWidth)
      .attr('height', vis.config.containerHeight)

    vis.chart = vis.svg
      .append('g')
      .attr(
        'transform',
        `translate(${vis.config.margin.left},${vis.config.margin.top})`
      )

    // Initialize Axes
    vis.xAxis = d3
      .axisBottom(vis.xScale)
      .tickValues(vis.data.map(d => d.date))
      .tickFormat(d3.timeFormat('%Y %b %d'))
    vis.yAxis = d3.axisLeft(vis.yScale)

    vis.xAxisG = vis.chart
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0,${vis.height})`)
      .call(vis.xAxis)

    vis.yAxisG = vis.chart
      .append('g')
      .attr('class', 'axis y-axis')
      .call(vis.yAxis)

    // Text and Axis Labels
    vis.chart
      .append('text')
      .attr('class', 'axis-title')
      .attr('y', vis.height - 25)
      .attr('x', vis.width + 20)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('time')
  }

  updateVis () {
    const vis = this

    vis.xValue = d => d.date
    vis.yValue = vis.config.yParameter

    vis.line = d3
      .line()
      .x(d => vis.xScale(vis.xValue(d)))
      .y(d => vis.yScale(vis.yValue(d)))

    vis.renderVis()
  }

  renderVis () {
    const vis = this

    vis.chart
      .selectAll('.chart-line')
      .data([vis.data])
      .join('path')
      .attr('class', 'chart-line')
      .attr('stroke', '#ab0512')
      .attr('stroke-width', 4)
      .attr('fill', 'none')
      .attr('d', vis.line)

    // Update the axes
    vis.xAxisG.call(vis.xAxis)
    vis.yAxisG.call(vis.yAxis)
  }
}
</script>

<style scoped>
#scoreline {
  width: fit-content;
}

table#history,
table#history td,
table#history th {
  border: 1px solid #333;
}

table#history {
  border-collapse: collapse;
}
</style>
