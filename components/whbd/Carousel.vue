<template>
  <div>
    <transition name="slide-fade">
      <h1 style="position: absolute" v-if="name1">
        {{ words[counter1] }}
      </h1>
    </transition>
    <transition name="slide-fade">
      <h1 style="position: absolute" v-if="name2">
        {{ words[counter2] }}
      </h1>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name1: false,
      name2: true,
      counter1: 1,
      counter2: 0,
      words: [
        "quality discussion",
        "cheeto",
        "games",
        "gaming",
        "gamers",
        "art",
        "tierlists",
        "videos",
        "music",
        "laughs",
        "memes",
        "good times",
        "𝓗𝓮𝓪𝓿𝓮𝓷",
        "movies",
        "dubs",
        "Ls",
        "jerma",
        "james",
      ],
    };
  },
  mounted() {
    this.words = shuffleExceptFirst(this.words);
    setInterval(() => {
      if (this.name2 === true) {
        this.counter1 = (this.counter2 + 1) % this.words.length;
        this.name1 = true;
        this.name2 = false;
      } else {
        this.counter2 = (this.counter1 + 1) % this.words.length;
        this.name1 = false;
        this.name2 = true;
      }
    }, 3000);
  },
};

function shuffleExceptFirst(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
</script>