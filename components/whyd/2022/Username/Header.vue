<template>
  <div>
    <Whyd2022UsernameHeaderImage />
    <h1 class="pb-3">
      <b>
        <i class="title-text">what have you done 2022</i>
      </b>
    </h1>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.title-text {
  position: relative;
  color: rgba(0, 0, 0, 0);
  background: linear-gradient(99deg, #a3eff7, #ffd294, #fcaecf, #bda6ff);
  overflow: clip;
  background-clip: text;
  background-size: 200% 100%;
  background-position: 100%;
  transition: background-position 0.5s ease;
  text-decoration: none;

  animation: background-move 10s ease-in-out infinite;
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
