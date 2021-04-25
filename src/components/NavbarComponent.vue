<template>
  <div class="navbar-wrapper">
    <div class="container-fluid">
      <nav class="navbar-main navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-main-list navbar-nav container p-1">
          <div class="navbar-general">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/posts" class="nav-link">Posts</router-link>
            </li>
          </div>
          <div class="navbar-client">
            <li v-if="!getUser" class="nav-item">
              <router-link to="/register" class="nav-link">Sign Up</router-link>
            </li>
            <li v-if="!getUser" class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li v-if="getUser" class="nav-item">
              <button @click="logout()" class="nav-link">Logout</button>
            </li>
            <li v-if="getUser" class="nav-item">
              <router-link to="#" class="nav-link">{{ getUser.username }}</router-link>
            </li>
          </div>
        </ul>
      </nav>
      <br />
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
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

.navbar-general {
  display: flex;
}

.navbar-client {
  display: flex;
}

.navbar-main-list {
  display: flex;
  justify-content: space-between;
}

button {
  color: transparent;
}
br {
  display: none;
}
</style>
