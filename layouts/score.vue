<template>
  <Nuxt />
</template>

<style>
.a {
  color: #0645ad;
}

.a:hover {
  color: rgb(85, 26, 139);
  cursor: pointer;
}

#body {
  background-color: antiquewhite;
  font-family: "Times New Roman", Times, serif;
  padding-left: 5%;
  width: 120%;
  color: black;
  overflow: scroll;
}

#navbar {
  font-weight: bold;
  font-size: 20px;
  height: 20px;
  display: flex;
  justify-content: space-between;
}

#navbar #logo {
  height: 20px;
  font-weight: lighter;
  font-size: 1rem;
}

#navbar #logo img {
  height: 30px;
}

text {
  font-family: "Times New Roman", Times, serif;
}

div#body::-webkit-scrollbar {
  width: 20px;
  height: 20px;
}


div#body::-webkit-scrollbar-button {
  background-color: #c0c0c0 !important;
  border: 1px solid black !important;
  box-shadow: inset -1px -1px #84888c, inset 1px 1px #f0f0f0,
    inset -2px -2px #85898d, inset 2px 2px #dfdfdf !important;
  height: 20px;
  width: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;
}
div#body::-webkit-scrollbar-button:vertical:decrement {
  background-image: url("/score/arrowup.png");
}
div#body::-webkit-scrollbar-button:vertical:increment {
  background-image: url("/score/arrowdown.png");
}
div#body::-webkit-scrollbar-button:horizontal:decrement {
  background-image: url("/score/arrowleft.png");
}
div#body::-webkit-scrollbar-button:horizontal:increment {
  background-image: url("/score/arrowright.png");
}
div#body::-webkit-scrollbar-corner {
  background-color: #c0c0c0 !important;
  border: 1px solid black !important;
}
div#body::-webkit-scrollbar-thumb {
  border-radius: 0 !important;
  background-color: #c0c0c0 !important;
  border: 1px solid black !important;
  box-shadow: inset -1px -1px #84888c, inset 1px 1px #f0f0f0,
    inset -2px -2px #85898d, inset 2px 2px #dfdfdf !important;
}
div#body::-webkit-scrollbar-track {
  border-radius: 0 !important;
  background-color: #c0c0c0 !important;
  border: 1px solid black !important;
}
</style>
