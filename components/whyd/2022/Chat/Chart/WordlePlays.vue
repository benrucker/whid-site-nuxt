<template>
  <div class="topimages">
    <svg
      class="noise"
      viewBox="0 100 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>

      <rect filter="url(#noiseFilter)" />
    </svg>
    <div class="overlay"></div>
    <div class="notSvg">
      <h1>WORDLE <span class="gm">WORDLE CLONES</span> CLONEs</h1>
      <ol>
        <li v-for="id in userIds" :key="id" class="entry">
          <img
            class="imgAvatar"
            :src="stats.server.idsToAvatars[id]"
            :alt="stats.server.idsToNames[id]"
          />
          <div>{{ stats.server.idsToNames[id] }}</div>
          <div class="score-area">
            <div title="Number of plays of wordle-like games" class="numPlays">
              {{ userData[id].numPlays }}
            </div>
            <div class="bar">|</div>
            <div
              :title="`Based on an average score of ${userData[id].finalPercent}%`"
              class="grade"
            >
              {{ userData[id].letterGrade ?? 'A+' }}
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    userData() {
      return this.stats.server['Wordle Scores']
    },
    userIds() {
      return Object.keys(this.userData).slice(0, 5)
    },
  },
  methods: {
    handleClick(id) {
      window.open(
        this.userData[id].images[
          (Math.random() * this.userData[id].images.length) | 0
        ],
        '_blank',
      )
    },
  },
}
</script>

<style scoped>
.topimages {
  font-family: Brush Script MT;
  border-radius: 20px;
  padding: 20px;
  border: inset 5px;
  border-color: white;
  font-size: 2em;

  color: #151515;
  text-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);

  position: relative;
  animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

rect {
  width: 100%;
  height: 1000px;
  top: -10px;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 15px;

  filter: contrast(170%) brightness(1000%);
  background: linear-gradient(45deg, rgb(112, 23, 129), rgba(0, 0, 0, 0));
}

span.gm {
  font-family: sans-serif;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 15px;

  background: moccasin;
  mix-blend-mode: multiply;
}

div .notSvg {
  isolation: isolate;
}

.notSvg ol {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.entry {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 10px;
}

.imgAvatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  border: 3px dashed rgb(19, 13, 5);

  filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.3));
}

.score-area {
  display: flex;
  justify-content: space-between;
  width: 4em;
}

.numPlays {
  width: 2em;
}

.bar {
  width: 1em;
}

.grade {
  text-align: start;
  width: 1em;
  padding-left: 10px;
}

@media (max-width: 767px) {
  .score-area {
    display: flex;
    justify-content: space-between;
    width: 2em;
  }

  .numPlays {
    width: 1.5em;
  }

  .bar {
    width: 0.2em;
  }

  .grade {
    text-align: start;
    width: 0.5em;
    padding-left: 10px;
  }
}
</style>
