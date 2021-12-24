<template>
  <div>
    <div
      class="row close align-items-center"
      v-for="(user, i) in this.users"
      :key="user.name"
    >
      <span :class="'col-2 rank text-center fade fadein-' + (i + 5)">{{ i + 1 }}</span>
      <span :class="'col-6 name fade fadein-' + (i + 10)">{{ user }}</span>
      <span :class="'col-4 count text-center fade fadein-' + i">{{
        counts[i]
      }}</span>
    </div>
    <br />
    <br />
    <br />
    <div class="row">
        <span class="col-8"></span>
        <span class="col-4 unit text-muted text-center fade fadein-15">messages sent</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    urlPrefix: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    let data = await fetch(`${this.urlPrefix}/mostMessages.json`).then((res) =>
      res.json()
    );
    this.users = Object.values(data.name).slice(0, 5);
    this.counts = Object.values(data.totalMessages)
      .slice(0, 5)
      .map((x) => x.toLocaleString());
  },
  methods: {
    async init(urlPrefix) {},
  },
};
</script>

<style scoped>
div {
  width: 100%;
}

.close {
  margin-bottom: -7rem;
}

.rank {
  font-weight: bold;
  font-style: italic;
  font-size: 10rem;
}
.name {
  font-size: 3rem;
}
.count {
  font-size: 5rem;
}

.unit {
    font-size: 2rem;
}

.fade {
  animation: 0.5s fadein 0.0s ease-in-out forwards;
}

.fadein-0  {animation-delay: 0.0s;}
.fadein-1  {animation-delay: 0.5s;}
.fadein-2  {animation-delay: 1.0s;}
.fadein-3  {animation-delay: 1.5s;}
.fadein-4  {animation-delay: 2.0s;}
.fadein-5  {animation-delay: 2.5s;}
.fadein-6  {animation-delay: 3.0s;}
.fadein-7  {animation-delay: 3.5s;}
.fadein-8  {animation-delay: 4.0s;}
.fadein-9  {animation-delay: 4.5s;}
.fadein-10 {animation-delay: 5.0s;}
.fadein-11 {animation-delay: 5.5s;}
.fadein-12 {animation-delay: 6.0s;}
.fadein-13 {animation-delay: 6.5s;}
.fadein-14 {animation-delay: 7.0s;}
.fadein-15 {animation-delay: 7.5s;}
.fadein-16 {animation-delay: 8.0s;}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>