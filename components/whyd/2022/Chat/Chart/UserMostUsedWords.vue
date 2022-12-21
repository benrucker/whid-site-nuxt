<template>
  <div>
    <div v-show="doneParsing" ref="root1" class="usbotGraph real">
      <div class="usbotGraphHeader">yours is the most common words</div>
      <div v-if="displayedWords?.length > 0" class="usbotGraphContent">
        <div :ref="'1line'" class="line--1 line">
          <span
            v-for="(word, index) in displayedWords[1]"
            :key="index"
            class="word"
            :title="`${wordsToCounts[word]} uses of '${word}'`"
            >{{ word }}
          </span>
        </div>
        <div class="rest-of-the-lines">
          <div
            v-for="line in numLines - 1"
            :key="line + 1"
            class="line-segment"
          >
            <div
              :ref="line + 1 + 'line'"
              :class="`line--${line + 1} line start`"
            >
              <span
                v-for="(word, index) in displayedWords[line + 1]"
                :key="index"
                class="word"
                :title="`${wordsToCounts[word]} uses of '${word}'`"
                >{{ word }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="usbotGraphContent">
        <div class="usbotZeroState text-muted">
          you said no words came out of your mouth this year :(
        </div>
      </div>
    </div>
    <div v-show="!doneParsing" ref="root2" class="usbotGraph">
      <div class="usbotGraphHeader">
        the graph is loading that takes forever...
      </div>
      <div class="usbotGraphContent">
        <div
          v-for="line in numLines"
          :key="line"
          :ref="line + 'hidden'"
          :class="`line--${line} usbotGraph--center`"
        >
          <span class="usbotGraphTransparent">
            <template v-for="word in calculatedWords[line]"
              >{{ word }}
            </template>
          </span>
        </div>
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
      required: false,
      default: null
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
      timeout: undefined,
      timeoutDelay: 300,
      defaultSelectRects: undefined
    }
  },
  computed: {
    wordsAndCounts() {
      if (this.stats == null) return null
      return JSON.parse(this.stats.user.mostUsedWords)
    },
    words() {
      return this.wordsAndCounts?.map(({ word, _ }) => word)
    },
    wordsToCounts() {
      return Object.fromEntries(
        this.wordsAndCounts.map(({ word, count }) => [word, count])
      )
    }
  },
  mounted() {
    // console.log(JSON.parse(this.stats.user.mostUsedWords))
    this.raf = requestAnimationFrame(this.advance)
  },
  destroyed() {
    cancelAnimationFrame(this.raf)
    clearTimeout(this.timeout)
  },
  methods: {
    advance() {
      if (this.words.length > 0 && this.numLines <= 15) {
        this.calculatedWords[this.numLines].push(this.words.shift())
        requestAnimationFrame(() => {
          if (this.didBreakLine()) {
            if (this.didFallOffBottom()) {
              this.calculatedWords[this.numLines].pop()
              return
            }

            const word = this.calculatedWords[this.numLines].pop()
            // Vue.set is needed because Vue can't detect
            // when a property is added to an object
            Vue.set(this.calculatedWords, this.numLines + 1, [word])

            // for this line, get the offset between the first letter and the edge of the line
            const line = this.$refs[this.numLines + 'hidden'][0]
            const absolutePosition = line.getBoundingClientRect().left
            const firstLetterPosition = line
              .querySelector('span')
              .getBoundingClientRect().left
            const offset = firstLetterPosition - absolutePosition

            this.$refs.root1.style.setProperty(
              `--line-${this.numLines}-padding`,
              `${offset}px`
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
      this.timeoutDelay -= 10
      // move words from calculatedWords to displayedWords one at a time
      if (this.numDisplayedLines <= this.numLines) {
        if (this.displayedWords[this.numDisplayedLines] === undefined) {
          Vue.set(this.displayedWords, this.numDisplayedLines, [])
          requestAnimationFrame(() => {
            const line = this.$refs[this.numDisplayedLines + 'line']
            if (line?.style != null) line.style.opacity = 1
            else if (line != null) line[0].style.opacity = 1
          })
        }
        this.displayedWords[this.numDisplayedLines].push(
          this.calculatedWords[this.numDisplayedLines].shift()
        )
        if (this.calculatedWords[this.numDisplayedLines].length === 0) {
          this.numDisplayedLines++
        }
        this.timeout = setTimeout(this.display, this.timeoutDelay)
      }
    },
    didBreakLine() {
      const textNode = this.$refs.root2.lastChild.lastChild.lastChild
      const range = document.createRange()
      range.selectNode(textNode)

      const numSelectRects = range.getClientRects().length

      if (this.defaultSelectRects == null) {
        // store a baseline to compare when our line breaks
        this.defaultSelectRects = numSelectRects
      }

      return numSelectRects > this.defaultSelectRects
    },
    didFallOffBottom() {
      const textNode = this.$refs.root2.lastChild.lastChild
      const range = document.createRange()
      range.selectNode(textNode)
      return (
        textNode.getBoundingClientRect().bottom >
        this.$refs.root2.lastChild.height
      )
    }
  }
}
</script>

<style lang="scss">
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

  animation: fade-in 1s ease-in-out;
}

.usbotGraphHeader {
  // border-bottom: 3px solid var(--bubble-color);
  border-radius: 2px;
  background-color: #111;
  width: 100%;
  box-shadow: 0 0 0 5px #d66f6f;
  position: relative;
  z-index: 2;
  text-align: center;
  font-size: larger;
  font-weight: bold;
  padding: 5px;
}

.usbotGraphContent {
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 5px;
    left: 0;
    // border-top: 10px solid var(--bubble-color);
    border-radius: 30px;
    box-shadow: 0 0 0 15px rgb(214, 111, 111);
    pointer-events: none;
  }
}
</style>

<style scoped lang="scss">
@use 'sass:math';

.usbotGraph {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;
  overflow: hidden;

  &.real {
    animation: none;
  }
}

.usbotZeroState {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.rest-of-the-lines {
  width: 100%;
  gap: 0;
  display: flex;
  flex-wrap: wrap;
}

.usbotGraph.hidden {
  opacity: 0;
  text-align: center;
}

.word {
  animation: fadein 0.5s ease-in-out;
}

.line {
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
}

.word {
  // relative position is needed to keep the words above an
  // absolutely positions ::before pseudoelement
  position: relative;
}

.line-segment {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  height: fit-content;
  justify-self: start;
  flex-shrink: 0;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.usbotGraph--center {
  text-align: center;
  color: transparent;
}

.usbotGraphTransparent {
  color: transparent;
}

@for $i from 1 through 30 {
  .line--#{$i} {
    --shrink-factor: #{math.div(1, math.div(math.div($i + 1, 2), 2))};
    font-size: calc(1.2em * var(--shrink-factor));
    width: 100%;
    // width: calc(160px * var(--shrink-factor));
    // background-color: rgba(255, 255, 255, var(--shrink-factor));
    color: rgba(255, 255, 255, var(--shrink-factor));
    padding-left: var(--line-#{$i}-padding);
    height: 1.5em;
    text-align: start;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 150%;
      height: 150%;
      top: -25%;
      left: -25%;
      background: radial-gradient(
          circle at 14.5% 50%,
          rgba(214, 111, 111, var(--shrink-factor)) 0%,
          rgba(214, 111, 111, var(--shrink-factor))
            calc(var(--shrink-factor) * 1%),
          rgba(214, 111, 111, 0) calc(var(--shrink-factor) * 1.1%)
        ),
        radial-gradient(
          circle at 85.5% 50%,
          rgba(214, 111, 111, var(--shrink-factor)) 0%,
          rgba(214, 111, 111, var(--shrink-factor))
            calc(var(--shrink-factor) * 1%),
          rgba(214, 111, 111, 0) calc(var(--shrink-factor) * 1.1%)
        );
      pointer-events: none;
    }

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
    }
  }
}
</style>
