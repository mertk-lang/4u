<template>
  <div id="app">
    <Navbar :user="user" />
    <router-view> </router-view>
  </div>
</template>

<style></style>

<script>
import Navbar from "./components/NavbarComponent";

const userApi = `http://localhost:4000/`;

export default {
  name: "app",
  components: {
    Navbar,
  },
  data() {
    return {
      user: " ",
    };
  },
  mounted() {
    this.axios
      .get(userApi, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res) {
          this.user = res.data.user;
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    updateUser(user) {
      this.user = user;
    },
  },
};
</script>
