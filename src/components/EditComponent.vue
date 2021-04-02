
<template>
  <div>
    <h1>Edit Post</h1>
    <form @submit.prevent="updatePost">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Title: </label>
            <input type="text" class="form-control" v-model="post.title">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Post Body:  </label>
              <textarea class="form-control" v-model="post.body" rows="5"></textarea>
            </div>
          </div>
        </div><br />
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Post Image:  </label>
              <textarea class="form-control" v-model="post.image" rows="5"></textarea>
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
    </form>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          post: {}
        }
      },
      props: [],
      created(){
        let url = `http://localhost:4000/posts/edit/${this.$route.params.id}`;
        this.axios.get(url)
        .then(res => {
          this.post = res.data;
        });
      },
      methods: {
        updatePost(){
          let url = `http://localhost:4000/posts/update/${this.$route.params.id}`;
          this.axios.post(url, this.post)
          .then(() => {
            this.$router.push({name: 'posts'});
          })

        }
      }
    }
</script>