<template>
  <div class="navbar-wrapper">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/posts" class="nav-link">Posts</router-link>
          </li>
          <li class="nav-item justify-content-center">
            <router-link to="/register" class="nav-link">Sign Up</router-link>
          </li>
          <li class="nav-item justify-content-center">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item justify-content-center">
            <button @click="logout()" class="nav-link">Logout</button>
          </li>
          <li v-if="!getUser" class="nav-item justify-content-center">
            <router-link to="#" class="nav-link">Not logged in</router-link>
          </li>
          <li v-if="getUser" class="nav-item justify-content-center">
            <router-link to="#" class="nav-link">{{ getUser.username }}</router-link>
          </li>
        </ul>
      </nav>
      <br />
      <transition name="fade">
        <router-view class="container"></router-view>
      </transition>
    </div>
    <FlashMessage :position="'right bottom'"></FlashMessage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      backgroundColor: "#1b0042",
    };
  },
  methods: {
    ...mapActions({
      signOutAction: "signOut",
    }),
    logout() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "home",
        });
      });
    },
  },
  computed: {
    ...mapGetters({
      getUser: "getUser",
    }),
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.navbar-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 100% !important;
  left: 0;
  z-index: 20;
  background-color: #140030;
  height: 100%;
}
.navbar-wrapper > .container-fluid {
  padding-right: 0;
  padding-left: 0;
  width: inherit;
}
.navbar-wrapper .navbar {
  padding-right: 15px;
  padding-left: 15px;
  width: 100% !important;
}
button {
  color: transparent;
}
br {
  display: none;
}
</style>
