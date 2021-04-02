<template>
    <div>
     <form @submit.prevent='login'>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
        </div>
      <div class="form-group">
        <label for="input-username">Username</label>
        <input type="username" v-model="user.username" class="form-control" id="input-username" placeholder="Username">
       </div>
      <div class="form-group">
        <label for="input-password">Password</label>
        <input type="password" v-model="user.password" class="form-control" id="input-password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
</form>
    </div>
</template>

<script>
    import Joi from 'joi';

    const api = `http://localhost:4000/auth/login`;

    const schema = Joi.object({
    username: Joi.string()
      .regex(/(^[a-zA-Z0-9_]+$)/)
      .min(2)
      .max(30)
      .required(),
    password: Joi.string().min(8).required()
    });

    export default {
        data() {
            return {
                errorMessage: '',
                user: {
                    username: '',
                    password: '',
                }
            }
        },
        watch: {
            user: {
                handler() {
                    this.errorMessage = '';
                },
                deep: true
            }
        },
        methods: {
            validUser() {
                const validation = schema.validate(this.user);
                if(validation.error === undefined) {
                    return true;
                } else {
                    this.errorMessage = validation.error.message;
                    return false;
                }
                 
            },
            login() {
                if(this.validUser()) {
                    const body = {
                        username: this.user.username,
                        password: this.user.password,
                    }

                    this.axios.post(api, body, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        console.log(response);
                        this.$router.push({name: 'posts'});
                    }).catch(error => {
                        this.errorMessage = error.response.data.message;
                    })
                } 
            }
        }
    }

</script>

<style>
    #input-username {
        width: 300px;
    }

    #input-password {
        width: 300px;
    }
</style>