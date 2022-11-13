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
      <h1>who said <span class="gm">gm</span> the most</h1>
      <ol>
        <li v-for="id in userIds" :key="id" class="entry">
          <img
            class="imgAvatar"
            :src="userData[id].avatar"
            :alt="userData[id].username"
          />
          <div>{{ userData[id].username }}</div>
          <div>{{ userData[id].gmCount }}</div>
          <div
            class="reaction-bubble"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-delay="500"
            :title="`${userData[id].mysonReactionCount} people reacted with myson`"
          >
            <img :src="`/whyd/2022/emojis/myson.png`" class="reaction-emoji" />
            <div class="reaction-count">
              {{ userData[id].mysonReactionCount }}
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
      default: () => ({})
    }
  },
  data() {
    return {
      userData: {},
      userIds: []
    }
  },
  mounted() {
    this.userData = this.stats.server['Top 5 Users by Image Count'] ?? {
      '174672596275691521': {
        gmCount: 123,
        mysonReactionCount: 123
      },
      '275002179763306517': {
        gmCount: 123,
        mysonReactionCount: 123
      },
      '175705032161886208': {
        gmCount: 123,
        mysonReactionCount: 123
      },
      '184078144003768321': {
        gmCount: 123,
        mysonReactionCount: 123
      },
      '439205512425504771': {
        gmCount: 123,
        mysonReactionCount: 123
      }
    }
    this.userIds = Object.keys(this.userData)

    this.userIds.forEach((id) => {
      this.userData[id].username = this.stats.server.idsToNames[id]
      this.userData[id].avatar = this.stats.server.avatars[id]
    })
  },
  methods: {
    handleClick(id) {
      window.open(
        this.userData[id].images[
          (Math.random() * this.userData[id].images.length) | 0
        ],
        '_blank'
      )
    }
  }
}
</script>

<style scoped>
.topimages {
  font-family: Brush Script MT;
  border-radius: 20px;
  padding: 20px;
  border: inset 5px;
  font-size: 2em;

  color: #111;
  text-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);

  position: relative;
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

  background: moccasin;
  mix-blend-mode: multiply;
}

div .notSvg {
  isolation: isolate;
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
}

.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  opacity: 0.9;
  border-radius: 10px;
}

.button:hover {
  background-color: #3e8e41;
}

.reaction-bubble {
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: hsla(223, 6.9%, 19.8%, 0.8);
  border-radius: 7px;
  border: 1px solid;
  border-color: transparent;
  /* width: 3.125em; */
  padding: 0.075rem 0.375rem;
  gap: 0.375rem;
  margin-left: 0.25rem;
  margin-bottom: 0.25rem;
  /* cursor: pointer; */

  color: hsl(216, 3.7%, 73.5%);
  font-weight: 600;
  text-align: center;
  transition: none 0.1s ease;
  transition-property: background-color, border-color;
}

.reaction-bubble:hover {
  color: #dcddde;
  border-color: rgba(255, 255, 255, 0.2);
  background-color: hsla(220, 7.7%, 22.9%, 0.8);
}

.reaction-emoji {
  max-width: 1rem;
  max-height: 1rem;
}

.reaction-count {
  font-size: 0.875rem;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 9px;
}

.reaction-count:hover {
  color: hsl(210, 2.9%, 86.7%);
}
</style>
