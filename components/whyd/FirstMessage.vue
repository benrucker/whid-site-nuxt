<template>
  <div>
    <h3>
      to wrap things up, let's see the first thing that came out of your
      mouth this year:
    </h3>
    <div class="pt-3 d-flex justify-content-center">
      <WhydMessage :content="content" :attachments="attachments" class="w-50" />
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
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      content: "",
      attachments: [],
    };
  },
  computed: {},
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let firstMsg = await fetch(
        `${urlPrefix}/user/${id}/firstMessage.json`
      ).then((res) => {
        return res.json();
      });
      console.log(firstMsg);
      this.content = firstMsg.content;
      this.attachments = firstMsg.attachments;
      console.log(this.attachments)
    },
  },
};
</script>

<style scoped>
.firstEverShadow {
  box-shadow: 0px 0px 10px 3px #f3df4c;
}

div.firstEver::after {
  content: "first in whole server!";
}
</style>