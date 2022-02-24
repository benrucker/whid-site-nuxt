<template>
  <div>
    <div class="row">
      <h2 class="col-7">Most mentioned:</h2>
      <div class="col-5">
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
      <div v-for="person in people" class="row" v-bind:key="person[1]">
        <p class="col-12 col-md-6">
          {{ person[0] }}
          <span class="d-highlight">
            {{ person[1] }}
          </span>
        </p>
        <p class="col-12 col-md-6">
          <span
            v-if="person[1] == '@Saturn'"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            data-bs-html="true"
            title="<span class='d-highlight'>@[DEAD] Rebel Ben#3223</span> spammed this mention 215 times in individual messages over the course of an hour."
          >
            <u>{{ person[2] }}</u>
          </span>
          <span v-else>{{ person[2] }}</span>

          <span v-if="person[0] == '1.'" class="subtext"> times </span>
        </p>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentlySpam: true,
      people: [
        ["1.", "@fops", "1,176"],
        ["2.", "@El Jefe", "799"],
        ["3.", "@noss", "644"],
        ["4.", "@bebenebenebeb", "637"],
        ["5.", "@Saturn", "364"],
      ],
      hidden: [
        ["1.", "@fops", "685"],
        ["2.", "@El Jefe", "622"],
        ["3.", "@noss", "518"],
        ["4.", "@bebenebenebeb", "440"],
        ["5.", "@Klankyer", "242"],
      ],
    };
  },
  methods: {
    toggleSpam() {
      [this.people, this.hidden] = [this.hidden, this.people];

      this.currentlySpam = !this.currentlySpam;

      setTimeout(() => {
        enableTooltips();
      }, 100);
    },
    map(key) {
      return map[key];
    },
  },
};
// Vue.createApp(mentionsLeaderboard).mount("#mentionsApp");
</script>