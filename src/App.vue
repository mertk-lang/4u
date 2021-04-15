<template>
  <div user="user" id="app">
    <Navbar @update-user="updateUser" />
    <Login @login="updateUser" />
    <router-view> </router-view>
  </div>
</template>

<style></style>

<script>
import Navbar from "./components/NavbarComponent";
import Login from "./components/LoginComponent";

export default {
  name: "app",
  components: {
    Navbar,
    Login,
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    updateUser(user) {
      this.user = user;
    },
  },
};
</script>
