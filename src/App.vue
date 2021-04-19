<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view> </router-view>
  </div>
</template>

<style></style>

<script>
import Navbar from "./components/NavbarComponent";
export default {
  name: "app",
  components: {
    Navbar,
  },
};
</script>
