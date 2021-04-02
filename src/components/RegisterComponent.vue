<template>
<div class="text-center">
     <form @submit.prevent="registerUser" class="mt-3" enctype="application/json">
     <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
     </div>
        <h2 class="header">Sign up</h2>
        <div class="form-group form-group-username">
         <label for="username"></label>
         <input type="username" v-model="user.username" class="form-control" id="username" placeholder="username" required>
        </div>
        <div class="form-group col-md-6 form-group-password">
                <label for="password"></label>
                <input type="password" v-model="user.password" class="form-control" id="password" placeholder="Password" required>
        </div>
        <div class="form-group col-md-6 form-group-password">
            <label for="confirmPassword"></label>
            <input type="password" v-model="user.confirmPassword" class="form-control" id="confirmPassword" placeholder="Password" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
     </form>
</div>
</template>

<script>
    import Joi from 'joi';

    const api = `http://localhost:4000/auth/register`;

    const schema = Joi.object({
    username: Joi.string()
      .regex(/(^[a-zA-Z0-9_]+$)/)
      .min(2)
      .max(30)
      .required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required()
    });
    
    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    confirmPassword: ''
                },
                errorMessage: '',
            }
        },
        watch:  {
            user: {
                handler() {
                    this.errorMessage = '';
                },
                deep: true,
            }
        },
        methods: {
            validUser() {
                if(this.user.password != this.user.confirmPassword) {
                    this.errorMessage = 'Passwords must match';
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
                this.errorMessage = '';
                if(this.validUser()){
                    const body = {
                        username: this.user.username,
                        password: this.user.password
                    }

                    this.axios.post(api, body, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                      console.log(response);
                      this.$router.push({name: 'posts'});
                    }).catch(error => {
                        if(error.response) {
                            console.log(error.response.data.message);
                            this.errorMessage = error.response.data.message
                        }
                    })
                }

                /*let url = `http://localhost:4000/auth/register`;
                this.axios.post(url, this.user, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    this.flashMessage.success({
                    message: 'Welcome ' + this.user.username
                    });
                    this.$router.push({name: 'posts'});
                })
                .catch(error => {
                    console.log(error.response);
                    this.errorMesage = error.message
                    this.flashMessage.error({
                        message: this.errorMesage
                    });
                });
                */
            }
        }
    }

</script>

<style>
    .form-group-username {
        width: 300px;
    }

    .form-group-password {
        width: 300px;
    }

    .header {
        color: #fff;
    }
</style>