<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark py-2">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="/logo-l.svg" height="40" class="me-2" />
        what have i done
      </a>
      <div
        class="collapse navbar-collapse d-flex justify-content-sm-end"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mb-2 mb-sm-0">
          <li class="nav-item">
            <a href="/" class="btn btn-text-primary me-2" type="button">Home</a>
          </li>
          <li class="nav-item">
            <NuxtLink
              to="/dub"
              class="btn btn-text-primary me-2"
              type="button"
              >whidubbed</NuxtLink
            >
          </li>
          <li class="nav-item">
            <NuxtLink
              to="/whbd"
              class="btn btn-text-primary me-2"
              type="button"
              >Anniversary</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>