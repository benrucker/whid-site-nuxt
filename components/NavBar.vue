<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark py-2">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">
        <img src="/logo-l.svg" height="40" class="me-2">
        what have i done
      </NuxtLink>
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse d-flex justify-content-sm-end"
      >
        <ul class="navbar-nav mb-2 mb-sm-0">
          <li class="nav-item">
            <NuxtLink
              to="/"
              class="btn btn-text-primary me-2"
              type="button"
            >
              Home
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              to="/dub"
              class="btn btn-text-primary me-2"
              type="button"
            >
              whidubbed
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              to="/whbd"
              class="btn btn-text-primary me-2"
              type="button"
            >
              Anniversary
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              to="/whyd"
              class="btn btn-text-primary me-2"
              type="button"
            >
              what have you done
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
