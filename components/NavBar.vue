<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark py-2">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">
        <img src="/logo-l.svg" height="40" class="me-2" />
        what have i done
      </NuxtLink>

      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse d-flex justify-content-md-end"
      >
        <ul class="navbar-nav my-1">
          <li class="nav-item">
            <div class="btn btn-text-primary me-2 disabled" type="button">
              Home
            </div>
          </li>
          <li class="nav-item">
            <div class="btn btn-text-primary me-2 disabled" type="button">
              whidubbed
            </div>
          </li>
          <li class="nav-item">
            <div class="btn btn-text-primary me-2 disabled" type="button">
              Anniversary
            </div>
          </li>
          <li class="nav-item">
            <NuxtLink
              to="/whyd"
              class="btn btn-text-primary me-2"
              type="button"
            >
              <span id="short-whyd">whyd</span>
              <span id="long-whyd">what have you done</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <div class="disabled" type="">
              <img src="/camera.png" height="40" class="me-2" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#short-whyd {
  display: none;
}

@media (max-width: 992px) {
  #short-whyd {
    display: inline-block;
  }
  #long-whyd {
    display: none;
  }
}

.navbar {
  user-select: none;
}
</style>
