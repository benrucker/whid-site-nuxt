<template>
  <div class="gm">
    <div class="container d-flex justify-content-center py-3">
      <div class="gmbox d-flex align-items-center text-dark">
        <WhydEmoji
          class="pe-3"
          emoji=":myson:"
          :urlPrefix="urlPrefix"
          :big="true"
        />
        <h4>
          You said good morning {{ count }} {{ count == 1 ? "time" : "times" }}!
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    urlPrefix: "",
  },
  data() {
    return {
      count: 0,
    };
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      this.count = await fetch(`${urlPrefix}/user/${id}/goodMorning.json`).then(
        (res) => {
          if (res.status === 404) return 0;
          return res.json();
        }
      );
      if (this.count) this.count = this.count["0"];
    },
  },
};
</script>

<style scoped>
.gm {
  /* box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2); */
}

.gmbox {
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
  background: #c6ccfb;
  border-radius: 10px;
  padding: 1em;
  /* transform: translateY(-65px); */
}
</style>