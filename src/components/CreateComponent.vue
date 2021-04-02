
<template>
<div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <h1 id="form-header">Create A Post</h1>
    </div>
    <form @submit.prevent="addPost">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-6 col-xs-1 ">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Title" v-model="post.title">
          </div>
        </div>
      </div>
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <div class="form-group">
              <textarea class="form-control" v-model="post.body" placeholder="What are you thinking" rows="5"></textarea>
            </div>
          </div>
        </div>
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-md-6">
            <div class="form-group">
              <textarea class="form-control" v-model="post.image" placeholder="image url"></textarea>
            </div>
          </div>
          </div>
          <div class="row h-100 justify-content-center align-items-center">
            <div class="form-group">
          <button class="btn btn-primary">Create</button>
            </div>
          </div>
      </form>
</div>
</template>

<script>
    export default {
        data(){
        return {
          post:{},
        }
    },
    methods: {
      addPost(){
        let url = `http://localhost:4000/posts/add`;
        this.axios.post(url, this.post)
        .then(() => {
          this.$router.push({name: 'posts'});
        });
      }
    }
  }
</script>

<style scoped>
  .container, .h-100 {
    margin-bottom: 10px;
  }

  #form-header {
    margin-top: 30px;
  }

</style>