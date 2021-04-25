<template>
  <div>
    <form
      class="d-flex flex-column justify-content-center align-items-center mt-5"
      @submit.prevent="submit"
    >
      <div v-if="getError" class="alert alert-danger" role="alert">
        {{ getError }}
      </div>
      <h2 class="header mb-4">Login</h2>
      <div class="mt-2 form-group d-flex flex-column align-items-center">
        <label for="input-username">Username</label>
        <input
          type="username"
          v-model="form.username"
          class="form-control"
          id="input-username"
          placeholder="Username"
        />
      </div>
      <div class="mt-2 form-group d-flex flex-column align-items-center">
        <label for="input-password">Password</label>
        <input
          type="password"
          v-model="form.password"
          class="form-control"
          id="input-password"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="mt-3 btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      authenticateUser: "authenticateUser",
    }),

    submit() {
      this.authenticateUser(this.form).then(() => {
        this.$router.replace({
          name: "posts",
        });
      });
    },
  },
  computed: {
    ...mapGetters({
      getUser: "getUser",
      getError: "getError",
    }),
  },
};
</script>

<style>
#input-username {
  width: 300px;
}
#input-password {
  width: 300px;
}
</style>
