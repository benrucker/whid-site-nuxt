<template>
  <div>
    <div class="row">
      <h2 class="col-7">Top perpetrators:</h2>
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
      <div v-for="person in active" v-bind:key="person[1]" class="row">
        <p class="col-12 col-md-6">
          {{ person[0] }}
          <span class="d-highlight">@{{ person[1] }} </span>
        </p>
        <p class="col-12 col-md-6">
          {{ person[2] }}
          <span v-if="person[0] == '1.'" class="subtext">messages sent</span>
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
      active: [
        ["1.", "bebenebenebeb#8098", "25,345"],
        ["2.", "El Jefe#5223", "20,501"],
        ["3.", "Rythm#3722", "20,285"],
        ["4.", "fops#1969", "17,136"],
        ["5.", "Us#0704", "12,745"],
      ],
      hidden: [
        ["1.", "El Jefe#5223", "12,531"],
        ["2.", "bebenebenebeb#8098", "11,406"],
        ["3.", "fops#1969", "9,710"],
        ["4.", "noss#0773", "7,119"],
        ["5.", "Sharkwood#8876", "5,008"],
      ],
    };
  },
  methods: {
    toggleSpam() {
      temp = this.active;
      this.active = this.hidden;
      this.hidden = temp;

      this.currentlySpam = !this.currentlySpam;
    },
  },
};
// Vue.createApp(messageLeaderboard).mount("#messagesApp");
</script>