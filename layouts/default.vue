<template>
  <div>
    <link type="text/css" rel="stylesheet" href="/whid-orange.css" />
    <NavBar :active-page="$router.currentRoute.path.split('/')[1] ?? ''" />
    <Nuxt />
  </div>
</template>

<script lang="ts">
export default {};
</script>
