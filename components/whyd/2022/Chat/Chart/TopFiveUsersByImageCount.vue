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
      <h1>top 5 users by image count</h1>
      <ol>
        <li v-for="id in userIds" :key="id" class="entry">
          <img
            class="imgAvatar"
            :src="userData[id].avatar"
            :alt="userData[id].username"
          />
          <div>{{ userData[id].username }}</div>
          <div>{{ userData[id].imageCount }}</div>
          <div class="button" @click="handleClick(id)">wanna see one? 😏</div>
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
        imageCount: 123,
        images: [
          'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
          'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
        ]
      },
      '275002179763306517': {
        imageCount: 123,
        images: [
          'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
          'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
        ]
      },
      '175705032161886208': {
        imageCount: 123,
        images: [
          'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
          'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
        ]
      },
      '184078144003768321': {
        imageCount: 123,
        images: [
          'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
          'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
        ]
      },
      '439205512425504771': {
        imageCount: 123,
        images: [
          'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
          'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
        ]
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
</style>
