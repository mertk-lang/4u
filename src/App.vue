<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view> </router-view>
  </div>
</template>

<script>
import Navbar from "./components/NavbarComponent";
export default {
  name: "app",
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
}
</style>
