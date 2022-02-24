<template>
  <div>
    <div class="row">
      <h2 class="col-12 col-md-7 col-lg-12 col-xxl-7">Emojis:</h2>
      <div class="col-12 col-md-5 col-lg-12 col-xxl-5 pb-4 pb-xxl-0">
        <button
          type="button"
          class="btn btn-outline-secondary mt-2 active"
          data-bs-toggle="button"
          aria-pressed="true"
          autocomplete="off"
          v-on:click="toggleSpam"
          title="Toggle whether to include channels like #spam, #dev, #the-real-us, etc."
        >
          <span v-if="currentlySpam">Incl. Spam</span>
          <strike v-else>Incl. Spam</strike>
        </button>
      </div>
    </div>
    <transition-group name="lb" tag="p">
      <div v-for="emoji in active" class="row" v-bind:key="emoji[1]">
        <p class="col-6 col-md-5">
          {{ emoji[0] }}
          <img
            aria-label="emoji[1]"
            :src="map(emoji[1])"
            :title="emoji[1]"
            alt="emoji[1]"
            class="emoji"
          />
        </p>
        <p class="col-6 col-md-7">
          <span
            v-if="emoji[1] == ':YOOOOOO:'"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            data-bs-html="true"
            title="396 of these are from <span class='d-highlight'>@Mii-Sama#3255</span> in the span of less than 60 seconds."
          >
            <u>{{ emoji[2] }}</u></span
          >
          <span
            v-else-if="emoji[1] == ':trueshred:'"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title=":shred: and :trueshred: are the same emoji, but this only counts :trueshred:. So there are actually more than this!"
          >
            <u>{{ emoji[2] }}</u></span
          >
          <span
            v-else-if="[':youtube:', ':spotify:'].includes(emoji[1])"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            data-bs-html="true"
            title="<span class='d-highlight'>@Rythm#3722</span> sends an emoji for Youtube or Spotify each time you play a song on it."
          >
            <u>{{ emoji[2] }}</u></span
          >
          <span v-else>{{ emoji[2] }}</span>
          <span v-if="emoji[0] == '1.'" class="subtext"> uses</span>
        </p>
      </div>
    </transition-group>
    <hr />
    <br />
    <div class="row">
      <p class="col-6 col-md-5">Total:</p>
      <p
        class="col-6 col-md-7"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="This number is approximate. It's actually kinda hard to count :emojis: in messages."
      >
        <u>{{ totalActive }}</u>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentlySpam: true,
      active: [
        ["1.", ":youtube:", "6,547"],
        ["2.", ":spotify:", "908"],
        ["3.", ":YOOOOOO:", "404"],
        ["4.", "👍", "243"],
        ["5.", ":trueshred:", "223"],
      ],
      totalActive: "13,059",
      totalHidden: "5,047",
      hidden: [
        ["1.", ":YOOOOOO:", "404"],
        ["2.", ":trueshred:", "221"],
        ["3.", ":kill:", "218"],
        ["4.", ":gunright:", "172"],
        ["5.", ":lfg:", "167"],
      ],
    };
  },
  methods: {
    toggleSpam() {
      temp = this.active;
      this.active = this.hidden;
      this.hidden = temp;

      this.currentlySpam = !this.currentlySpam;

      [this.totalActive, this.totalHidden] = [
        this.totalHidden,
        this.totalActive,
      ];
      setTimeout(() => {
        enableTooltips();
      }, 100);
    },
    map(key) {
      return map[key];
    },
  },
};
// Vue.createApp(emojisLeaderboard).mount("#emojisApp");
</script>