<template>
  <div v-if="stats" class="topimages" @click.stop="">
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
            :src="stats.server.avatars[id]"
            :alt="stats.server.idsToNames[id]"
          />
          <div class="imgUsername">{{ stats.server.idsToNames[id] }}</div>
          <div :title="imageCountByUser[id] + ' images sent'">
            {{ imageCountByUser[id] }}
          </div>
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
  computed: {
    userIds() {
      return Array.from(Object.keys(this.imageCountByUser)).slice(0, 5) ?? []
    },
    imageCountByUser() {
      return this.stats.server['Top Five Users By Images Sent']
    },
    imageUrlsByUser() {
      return (
        this.stats.server['Top Five Users Images'] ?? {
          '173839815400357888': [
            'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
            'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
          ],
          '256553939800031233': [
            'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
            'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
          ],
          '175705032161886208': [
            'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
            'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
          ],
          '174672596275691521': [
            'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
            'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
          ],
          '161144318160011265': [
            'https://media.tenor.com/GIVLitDIxr8AAAAC/breaking-bad-walter-white.gif',
            'https://media.tenor.com/S_to1tY3ixUAAAAC/breaking-bad-walter-white.gif'
          ]
        }
      )
    }
  },
  methods: {
    handleClick(id) {
      window.open(
        this.imageUrlsByUser[id]?.[
          (Math.random() * this.imageUrlsByUser[id].length) | 0
        ] ?? 'about:blank',
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
  padding-left: 0;
}

.entry {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
}

.imgUsername {
  flex-grow: 1;
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
  padding: 15px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.7em;
  margin: 4px 2px;
  cursor: pointer;
  opacity: 0.9;
  border-radius: 10px;
}

.button:hover {
  background-color: #3e8e41;
}
</style>
