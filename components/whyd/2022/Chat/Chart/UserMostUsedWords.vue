<template>
  <div>
    <div v-show="doneParsing" ref="root1" class="usbotGraph">
      <div
        v-for="line in numLines"
        :key="line"
        :ref="line + 'line'"
        :class="`line--${line} line`"
      >
        <span
          v-for="(word, index) in displayedWords[line]"
          :key="index"
          class="word"
          >{{ word }}
        </span>
      </div>
    </div>
    <div v-show="!doneParsing" ref="root2" class="usbotGraph hidden">
      <div
        v-for="line in numLines"
        :key="line"
        :ref="line + 'hidden'"
        :class="`line--${line}`"
      >
        <template v-for="(word, index) in calculatedWords[line]"
          >{{ word }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      calculatedWords: { 1: [] },
      displayedWords: {},
      numLines: 1,
      numDisplayedLines: 1,
      raf: undefined,
      doneParsing: false,
      timeout: undefined
    }
  },
  computed: {
    words() {
      return (
        this.stats?.user?.mostUsedWords ??
        'play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jk'.split(
          ' '
        )
      )
    }
  },
  mounted() {
    Array.from(document.querySelectorAll('.box')).forEach(function iterator(
      node
    ) {
      node.remove()
    })
    this.raf = requestAnimationFrame(this.advance, 100)
  },
  destroyed() {
    cancelAnimationFrame(this.raf)
    clearTimeout(this.timeout)
  },
  methods: {
    advance() {
      if (this.words.length > 0) {
        this.calculatedWords[this.numLines].push(this.words.shift())
        requestAnimationFrame(() => {
          if (this.didBreakLine()) {
            const word = this.calculatedWords[this.numLines].pop()
            // Vue.set is needed because Vue can't detect
            // when a property is added to an object
            Vue.set(this.calculatedWords, this.numLines + 1, [word])

            // use a range to get the offsetleft of the first char of the last line
            // thank you copilot. this sucks
            const range = document.createRange()
            range.setStart(this.$refs[this.numLines + 'hidden'][0], 0)
            range.setEnd(this.$refs[this.numLines + 'hidden'][0], 1)
            const rect = range.getBoundingClientRect()
            const padding =
              rect.left - this.$refs[this.numLines + 'hidden'][0].offsetLeft

            this.$refs.root1.style.setProperty(
              `--line-${this.numLines}-padding`,
              `${padding}px`
            )

            this.numLines++
          }
          this.raf = requestAnimationFrame(this.advance)
        })
      } else {
        this.doneParsing = true
        this.timeout = setTimeout(this.display)
      }
    },
    display() {
      // move words from calculatedWords to displayedWords one at a time
      if (this.numDisplayedLines <= this.numLines) {
        if (this.displayedWords[this.numDisplayedLines] === undefined) {
          Vue.set(this.displayedWords, this.numDisplayedLines, [])
        }
        this.displayedWords[this.numDisplayedLines].push(
          this.calculatedWords[this.numDisplayedLines].shift()
        )
        if (this.calculatedWords[this.numDisplayedLines].length === 0) {
          this.numDisplayedLines++
        }
        this.timeout = setTimeout(this.display, 500)
      }
    },
    didBreakLine() {
      const textNode = this.$refs.root2.lastChild
      const range = document.createRange()
      range.selectNode(textNode)
      return range.getClientRects().length > 2
    }
  }
}
</script>

<style>
.usbotGraph {
  --bubble-color: #d66f6f;

  height: 300px;
  width: 400px;
  background: rgb(17, 17, 17);
  border-radius: 20px;
  border: 2px solid var(--bubble-color);
  border-top: 5px solid var(--bubble-color);
  border-bottom: 10px solid var(--bubble-color);
  box-shadow: 0px 0px 0px 4px rgba(17, 17, 17, 1),
    0px 0px 10px rgba(0, 0, 0, 0.5);
}

.box {
  /* background-color: rgba(255, 248, 0, 0.2);
  border-radius: 2px 2px 2px 2px;
  box-sizing: border-box;
  outline: 1px dashed #ff0000;
  outline-offset: 1px;
  pointer-events: none;
  position: fixed; */
}
</style>

<style scoped>
.usbotGraph {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;

  --line-1-padding: 0;
  --line-2-padding: 0;
  --line-3-padding: 0;
  --line-4-padding: 0;
  --line-5-padding: 0;
  --line-6-padding: 0;
  --line-7-padding: 0;
  --line-8-padding: 0;
  --line-9-padding: 0;
  --line-10-padding: 0;
}

.usbotGraph.hidden {
  opacity: 0;
  text-align: center;
}

.word {
  animation: fadein 0.5s ease-in-out;
}

.line {
  animation: fadein 0.5s ease-in-out;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.line--1 {
  font-size: 1.9em;
  width: 90%;
  background-color: aliceblue;
}
.line--1.line {
  padding-left: var(--line-1-padding);
}

.line--2 {
  font-size: 1.2em;
  width: 75%;
  background-color: antiquewhite;
}
.line--2.line {
  padding-left: var(--line-2-padding);
}

.line--3 {
  font-size: 1em;
  width: 65%;
  background-color: bisque;
}
.line--3.line {
  padding-left: var(--line-3-padding);
}

.line--4 {
  font-size: 0.95em;
  width: 60%;
  background-color: azure;
}
.line--4.line {
  padding-left: var(--line-4-padding);
}

.line--5 {
  font-size: 0.9em;
  width: 56%;
  background-color: beige;
}
.line--5.line {
  padding-left: var(--line-5-padding);
}

.line--6 {
  font-size: 0.85em;
  width: 53%;
  background-color: blanchedalmond;
}
.line--6.line {
  padding-left: var(--line-6-padding);
}

.line--7 {
  font-size: 0.8em;
  width: 51%;
  background-color: blueviolet;
}
.line--7.line {
  padding-left: var(--line-7-padding);
}

.line--8 {
  font-size: 0.75em;
  width: 49%;
  background-color: brown;
}
.line--8.line {
  padding-left: var(--line-8-padding);
}

.line--9 {
  font-size: 0.7em;
  width: 48%;
  background-color: burlywood;
}
.line--9.line {
  padding-left: var(--line-9-padding);
}

.line--10 {
  font-size: 0.65em;
  width: 47%;
  background-color: cadetblue;
}
.line--10.line {
  padding-left: var(--line-10-padding);
}
</style>
