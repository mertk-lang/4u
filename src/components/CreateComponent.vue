<template>
  <div class="container h-100">
    <div v-if="isLoading">
      <h4 class="justify-content-center">VIBECHECK</h4>
    </div>
    <div v-if="!isLoading">
      <div class="row h-100 justify-content-center align-items-center">
        <h1 id="form-header">Create A Post</h1>
      </div>
      <form @submit.prevent="addPost" enctype="multipart/form-data">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6 col-xs-1">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Title"
                v-model="post.title"
              />
            </div>
          </div>
        </div>
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <div class="form-group">
              <textarea
                class="form-control"
                v-model="post.body"
                placeholder="What are you thinking"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <input type="file" ref="file" @change="getFile" name="image" />
          </div>
        </div>
        <div class="row h-100 justify-content-center align-items-center mt-5">
          <div class="form-group">
            <button class="btn btn-primary">Create</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const url = `http://localhost:4000/posts/add`;
//const uploadUrl = `http://localhost:4000/posts/upload`;

export default {
  data() {
    return {
      post: {},
      image: null,
      isLoading: null,
    };
  },
  methods: {
    addPost() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("title", this.post.title);
      formData.append("body", this.post.body);
      formData.append("image", this.image);
      this.axios.post(url, formData).then(() => {
        this.isLoading = false;
        this.$router.push({ name: "posts" });
      });
    },
    getFile() {
      this.image = this.$refs.file.files[0];
    },
  },
};
</script>

<style scoped>
.container,
.h-100 {
  margin-bottom: 10px;
}

#form-header {
  margin-top: 30px;
}
</style>
