<template>
  <div>
    <div class="container">
      <div
        class="header mt-5 d-flex justify-content-center fw-bold align-items-center"
      >
        <h1 class="fw-bolder px-2">Hi!</h1>
        <img src="/miniwyatt.png" alt="hi!" class="px-2" />
      </div>

      <div class="welcome mt-5 mb-2 text-center">
        Welcome to the
        <NuxtLink id="whid" class="text-white" to="/whyd"
          >whyd archival project</NuxtLink
        >
      </div>
    </div>

    <br />
    <br />
    <br />
  </div>
</template>

<script></script>

<style scoped>
h1 {
  font-size: 5rem;
}

.welcome {
  font-size: 2rem;
  font-weight: bold;
}

#whid {
  position: relative;
  margin: 0.1em;
  text-decoration: none;
}

#whid:hover {
  text-decoration: underline;
}

#whid:before {
  content: '';
  z-index: -1;
  left: 0.1em;
  top: 0.9em;
  background-color: var(--bs-primary);
  position: absolute;
  width: 100%;
  height: 25%;
}
</style>
