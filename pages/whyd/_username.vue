<template>
  <div>
    <LazyWhydWordCloud ref="wordCloud" />
    <img src="/whyd/2021/wavy1.svg" class="bg yellow" />
    <div class="bg yellow">
      <div class="container py-5 text-dark">
        <div class="row py-5">
          <div class="ratio ratio-4x3 col">
            <LazyWhydYearBarChart ref="yearBarChart" />
          </div>
          <div class="col p-5 text-end">
            <h1 class="ps-5">our most active year yet!</h1>
            <br />
            <h5 class="text-muted">or, wait, no...</h5>
            <br /><br />
            <h3>our most active <i>semi-non-quarantined</i> year yet!</h3>
            <br />
            <p class="text-muted"></p>
          </div>
        </div>
      </div>
    </div>
    <img src="/whyd/2021/yellow-wave.svg" class="bg gray" />

    <div class="bg gray py-5">
      <div class="container">
        <h1>we definitely play favorites:</h1>
        <br />
        <div class="ratio ratio-16x9">
          <LazyWhydChannelBarChart ref="channelBarChart" />
        </div>
      </div>
    </div>

    <div class="bg gray">
      <div class="container">
        <h2>weren't those numbers cool?</h2>
        <br />
        <h3>here are some more!</h3>
        <br />
        <LazyWhydTopUsersByMessage
          :urlPrefix="urlPrefix"
          ref="topUsersByMessage"
          class="mb-5 pb-5"
        />
        <br />
        <div class="row pb-5 mb-5">
          <div class="col-6">
            <LazyWhydTopMentions :urlPrefix="urlPrefix" ref="topMentions" />
          </div>
          <div class="col-6">
            <LazyWhydTopRolePings :urlPrefix="urlPrefix" ref="topRolePings" />
          </div>
        </div>
        <div class="row pb-5 mb-5">
          <div class="col-6">
            <LazyWhydTopEmojis :urlPrefix="urlPrefix" ref="topEmojis" />
          </div>
          <div class="col-6">
            <LazyWhydTopReactions :urlPrefix="urlPrefix" ref="topReactions" />
          </div>
        </div>
      </div>
    </div>

    <img src="/whyd/2021/white-blocky.svg" class="bg gray" />

    <div class="bg white py-5">
      <div class="container text-dark">
        <div class="text-end pt-5">
          <h1>
            but enough about <i>us</i>!
            <br />
            i know what you're here for.
            <br />
            you want the answer.
          </h1>
          <br />
          <h1 class="pt-3">so let's find out!</h1>
          <br />
          <h1 class="text-center py-5 my-5">
            <b>what have <i>you</i> done?</b>
          </h1>
        </div>
        <div class="row py-5">
          <div class="col">
            <h1 class="pt-5">
              you
              <WhydEmoji :urlPrefix="urlPrefix" :emoji="':you:'" /> contributed
              this much of the pie
            </h1>
          </div>
          <div class="ratio ratio-4x3 col">
            <WhydPersonMessagePieChart ref="pieChart" />
          </div>
        </div>
        <div class="text-center pb-5">
          <h4>That puts you in the top {{ this.msgPercentile }}% of people!</h4>
        </div>
      </div>
    </div>

    <img src="/whyd/2021/white-blocky-end.svg" class="bg blue" />

    <div class="bg blue pt-5">
      <div class="pt-5">
        <WhydMonths
          :id="id"
          :urlPrefix="urlPrefix"
          nextBg="lightlightblue"
          ref="months"
        />
      </div>
    </div>

    <div class="bg lightlightblue py-5 text-dark">
      <div class="container">
        <h1>you exhibited some other strange patterns:</h1>

        <WhydDiagnoseTimeOfDay ref='timeOfDay' class='pt-5' />
        <WhydDiagnoseFavoriteChannel ref='favoriteChannel' class='pt-5' />
        <WhydDiagnoseTrailblazer ref='trailblazer' class='pt-5' />
        <WhydDiagnoseTeammate ref='teammate' class='pt-5' />
        <WhydDiagnoseAstrologicalSign ref='astrologicalSign' class='pt-5' />
        <WhydDiagnoseDecisiveness ref='decisiveness' class='pt-5' />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    return {
      username: params.username,
    };
  },
  data() {
    return {
      msgPercentile: -1,
      id: "",
      urlPrefix: "/whyd/2021/data",
    };
  },
  async fetch() {},
  async mounted() {
    this.id = await fetch(`${this.urlPrefix}/nameToId.json`)
      .then((res) => res.json())
      .then((json) => json[this.username]);
    await this.$refs.wordCloud.init(this.id, this.urlPrefix);
    await this.$refs.yearBarChart.init(this.urlPrefix);
    await this.$refs.pieChart.init(this.id, this.urlPrefix);
    this.msgPercentile = this.$refs.pieChart.userPercentile;
    await this.$refs.channelBarChart.init(this.urlPrefix);
    await this.$refs.months.init(this.id, this.urlPrefix);

    await this.$refs.timeOfDay.init(this.id, this.urlPrefix);
    await this.$refs.favoriteChannel.init(this.id, this.urlPrefix);
    await this.$refs.trailblazer.init(this.id, this.urlPrefix);
    await this.$refs.teammate.init(this.id, this.urlPrefix);
    await this.$refs.astrologicalSign.init(this.id, this.urlPrefix);
    await this.$refs.decisiveness.init(this.id, this.urlPrefix);
  },
  methods: {},
};
</script>

<style>
.bg.yellow {
  background-color: #f3df4c;
}

.bg.white {
  background-color: white;
}

.bg.black {
  background-color: black;
}

.bg.gray {
  background-color: #222;
}

.bg.blue {
  background-color: #4c60f3;
}

.bg.lightblue {
  background-color: #8D99F7;
}

.bg.lightlightblue {
  /* background-color: #A0AAF8; */
  background-color: #C6CCFB;
}
</style>