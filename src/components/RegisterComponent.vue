<template>
  <div class="text-center">
    <form
      @submit.prevent="registerUser"
      class="d-flex flex-column justify-content-center align-items-center mt-5"
      enctype="application/json"
    >
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <h2 class="header mb-4">Sign up</h2>
      <div class="mt-2 form-group d-flex flex-column align-items-center">
        <label for="username">Username</label>
        <input
          type="username"
          v-model="user.username"
          class="form-control"
          id="username"
          placeholder="username"
          required
        />
      </div>
      <div class="mt-2 form-group d-flex flex-column align-items-center">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="user.password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="mt-2 form-group d-flex flex-column align-items-center">
        <label for="confirmPassword">Verify Password</label>
        <input
          type="password"
          v-model="user.confirmPassword"
          class="form-control"
          id="confirmPassword"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" class="mt-3 btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import Joi from "joi";

const api = `http://localhost:4000/auth/register`;

const schema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required(),
});

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      errorMessage: "",
    };
  },
  watch: {
    user: {
      handler() {
        this.errorMessage = "";
      },
      deep: true,
    },
  },
  methods: {
    validUser() {
      if (this.user.password != this.user.confirmPassword) {
        this.errorMessage = "Passwords must match";
        return false;
      }

      const validation = schema.validate(this.user);
      if (validation.error === undefined) {
        return true;
      }
      this.errorMessage = validation.error.message;
      return false;
    },
    registerUser() {
      this.errorMessage = "";
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };

        this.axios
          .post(api, body, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            localStorage.token = response.data.token;
            this.$router.push({ name: "posts" });
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data.message);
              this.errorMessage = error.response.data.message;
            }
          });
      }
    },
  },
};
</script>

<style>
.form-group-username {
  width: 300px;
}

.form-group-password {
  width: 300px;
}

#username {
  width: 300px;
}

#password {
  width: 300px;
}

#confirmPassword {
  width: 300px;
}

.header {
  color: #fff;
}
</style>
