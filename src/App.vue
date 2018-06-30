<template>
  <div id="app">
      <div class="backtotop" v-show="show" @click="goTop">
        <i class="iconfont icon-huidaodingbu"></i>
      </div>
    <router-view/>
  </div>
</template>

<script>
import "@/assets/jquery-3.1.1.min.js"
export default {
  data() {
    return {
      show: false
    };
  },
  mounted() {
    $(window).on("scroll", () => {
      if ($(window).scrollTop() > 100) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
  },
  beforeDestory() {
    $(window).off("scroll");
  },
  methods: {
    goTop() {
      $(window).scrollTop(0);
      this.show = false;
    }
  }
};
</script>

<style>
body,ul,li,p,a,h4,h3,div,h2{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.backtotop {
  position: fixed;
  right: 20px;
  bottom: 80px;
  font-size: 50px;
  z-index: 9999;
  color: #42b983;
}
.backtotop>.iconfont{
  font-size: 50px;
}
</style>
