<template>
  <div>
    <div class="container pt-5">
      <WhydHeader />
      <div class="layout pt-5">
        <FeaturedContentCard
          navigation-url="https://whyd22.whid.live"
          thumbnail-link="/whyd/2022/gitcommit.png"
          title="whyd22"
          release-date="1/1/2023"
          description='The most recent installment of "what have you done." This rendition included a massive increase in scope, roping in 2 other devs and including a plotline, cameo appearances, and a second act.'
          :thumbnail-grid-size="5"
        />
        <FeaturedContentCard
          class="mt-5"
          navigation-url="https://whyd21.whid.live"
          thumbnail-link="/whyd/2021/construction.png"
          title="whyd21"
          release-date="12/30/2021"
          description="The first entry in the yearly series, this experience was built in a rush at the end of the year. It was shown off at the infamous 2021 LAN party."
          :thumbnail-grid-size="5"
        />
        <FeaturedContentCard
          class="mt-5 mb-5"
          navigation-url="/whbd"
          thumbnail-link="/dub/images/ethan.png"
          title="5-year Anniversary Lookback"
          release-date="4/26/2021"
          description="To celebrate 5 years of chatting on Discord, this website briefly documented the history of the server, some overall statics, and included a small personalized section for each user at the end."
          :thumbnail-grid-size="5"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.whyd-button {
  background: linear-gradient(
    63deg,
    hsl(186, 12%, 50%),
    hsl(35, 12%, 50%),
    hsl(335, 12%, 50%),
    hsl(256, 12%, 50%)
  );
}
</style>
