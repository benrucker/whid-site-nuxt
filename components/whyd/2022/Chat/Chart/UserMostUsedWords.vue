<template>
  <div>
    <div v-show="doneParsing" ref="root1" class="usbotGraph">
      <div class="usbotGraphHeader">your most used words</div>
      <div class="usbotGraphContent">
        <div :ref="'1line'" class="line--1 line">
          <span
            v-for="(word, index) in displayedWords[1]"
            :key="index"
            class="word"
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
                >{{ word }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!doneParsing" ref="root2" class="usbotGraph">
      <div class="usbotGraphHeader">loading...</div>
      <div class="usbotGraphContent">
        <div
          v-for="line in numLines"
          :key="line"
          :ref="line + 'hidden'"
          :class="`line--${line} usbotGraph--center`"
        >
          <span>
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
      timeoutDelay: 300
    }
  },
  computed: {
    words() {
      return (
        this.stats?.user?.mostUsedWords ??
        'play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jk play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jk play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jk play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jk play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jk play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jk play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jk play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jkplay us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven did you know that fourty seven in japanese is something like yonjuunana is not that the most diabolical thing you ever heard lolol jk play us get ethan hi gm gn wyatt tristan ben lorem ipsum gaming gamers games i need more words here but they make sense so its not very accurate oh well its called fake data its called one get bent pupper wow text is really small so its hard to get this to overflow many lines lines lines work work work work work thats what i call music fourty seven '.split(
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
      if (this.words.length > 0 && this.numLines <= 200) {
        this.calculatedWords[this.numLines].push(this.words.shift())
        requestAnimationFrame(() => {
          if (this.didBreakLine()) {
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
      const textNode = this.$refs.root2.lastChild.lastChild
      console.log(textNode)
      const range = document.createRange()
      range.selectNode(textNode)
      console.log(range.getBoundingClientRect())
      return range.getClientRects().length > 2
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
    box-shadow: 0 0 0 15px #d66f6f;
  }
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

<style scoped lang="scss">
@use 'sass:math';

.usbotGraph {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;
  overflow: hidden;
}

.rest-of-the-lines {
  width: 100%;
  gap: 0;
  display: flex;
  flex-wrap: wrap;
}

.usbotGraph.hidden {
  // opacity: 0;
  text-align: center;
}

.word {
  // animation: fadein 0.5s ease-in-out;
}

.line {
  transition: opacity 0.5s ease-in-out;
  // opacity: 0;
}

.word {
  // relative position is needed to keep the words above an
  // absolutely positions ::before pseudoelement
  position: relative;
}

.line-segment {
  width: 50%;
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

.line--1 {
  font-size: 1.9em;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 110%;
    height: 120%;
    top: 0;
    left: -5%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) -20%,
      rgba(87, 87, 87, 1) 100%
    );
    // background-color: #222;
    box-shadow: inset 0 0 0.6em 0.4em #111;
  }

  &::after {
    content: '';
    position: absolute;
    width: 110%;
    height: 120%;
    top: 0;
    left: -5%;
    background: radial-gradient(
        circle at 3% 90%,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 0.7%,
        rgba(255, 255, 255, 0) 1.2%
      ),
      radial-gradient(
        circle at 50% 90%,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 0.7%,
        rgba(255, 255, 255, 0) 1.2%
      ),
      radial-gradient(
        circle at 97% 90%,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 0.7%,
        rgba(255, 255, 255, 0) 1.2%
      );
  }
  &.line {
    padding-left: var(--line-1-padding);
    text-align: start !important;
  }
}

.usbotGraph--center {
  text-align: center;
}

@for $i from 2 through 200 {
  .line--#{$i} {
    --shrink-factor: #{math.div(
        1,
        math.div(math.floor(math.div($i + 2, 2)), 2)
      )};
    font-size: calc(1.2em * var(--shrink-factor));
    width: calc(160px * var(--shrink-factor));
    // background-color: rgba(255, 255, 255, var(--shrink-factor));
    color: rgba(255, 255, 255, var(--shrink-factor));
    padding-left: var(--line-#{$i}-padding);
    height: 1.5em;
    // overflow: show;
    text-align: start;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: radial-gradient(
          circle at 3% 90%,
          rgba(255, 255, 255, var(--shrink-factor)) 0%,
          rgba(255, 255, 255, var(--shrink-factor)) 1%,
          rgba(255, 255, 255, 0) 2%
        ),
        radial-gradient(
          circle at 97% 90%,
          rgba(255, 255, 255, var(--shrink-factor)) 0%,
          rgba(255, 255, 255, var(--shrink-factor)) 1%,
          rgba(255, 255, 255, 0) 2%
        );
    }

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) -20%,
        rgba(87, 87, 87, 1) 100%
      );
      // background-color: #222;
      box-shadow: inset 0 0 0.6em 0.4em #111;
    }
  }
}
</style>
