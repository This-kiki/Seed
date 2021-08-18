<template>
  <div class="particles-js-box">
    <div id="particles-js"></div>
  </div>
</template>

<script>
/* eslint-disable */
import particlesJs from "particles.js";
import particlesConfig from "./particlesjs-config.json";
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      particlesJS("particles-js", particlesConfig);
      document.body.style.overflow = "hidden";
    },
  },
};
</script>

<style scoped>
.particles-js-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1; 
}
#particles-js {
  background-image: url("https://img1.baidu.com/it/u=3608254357,2129426950&fm=26&fmt=auto&gp=0.jpg");
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
</style>