<template>
  <div>
    <div class="container pt-5">
      <WhydHeader />
      <div class="layout pt-5">
        <FeaturedContentCard
          navigation-url="https://whyd22.whid.live"
          thumbnail-link="/whyd/2022/gitcommit.png"
          title="whyd22"
          release-date="sometime in 2023"
          description="This is description text about whyd22"
          :thumbnail-grid-size="5"
        />
        <FeaturedContentCard
          class="mt-5"
          navigation-url="https://whyd21.whid.live"
          thumbnail-link="/whyd/2021/construction.png"
          title="whyd21"
          release-date="sometime in 2022"
          description="This is description text about whyd21"
          :thumbnail-grid-size="5"
        />
        <FeaturedContentCard
          class="mt-5 mb-5"
          navigation-url="/whbd"
          thumbnail-link="/dub/images/ethan.png"
          title="5-year Anniversary Lookback"
          release-date="sometime in 2021"
          description="This is description text about the anniversary lookback"
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
