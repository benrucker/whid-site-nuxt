<template>
  <div class="text-center">
    <div class="layout">
      <div class="image-container">
        <img src="/whyd/you.png" class="header-image" />
      </div>
      <h1 class="pb-2">
        <b>
          <i class="title-text">what have you done</i>
        </b>
      </h1>
    </div>
    <h5 class="pt-2 text-muted">A collection of "Spotify Wrapped" clones!</h5>
  </div>
</template>

<script lang="ts"></script>

<style scoped lang="scss">
.title-text {
  position: relative;
  color: rgba(0, 0, 0, 0);
  background: linear-gradient(99deg, #a3eff7, #ffd294, #fcaecf, #bda6ff);
  overflow: clip;
  background-clip: text;
  background-size: 150% 100%;
  background-position: 100%;
  transition: background-position 0.5s ease;
  text-decoration: none;

  animation: background-move 10s ease-in-out infinite;
}

.layout {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-image {
  width: 5em;
}

@keyframes background-move {
  0% {
    background-position: 100%;
  }
  50% {
    background-position: 0%;
  }
}
</style>
