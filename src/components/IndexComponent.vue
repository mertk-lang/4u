<template>
  <div class="main-div">
    <div>
      <div>
        <router-link :to="{ name: 'create' }" class="btn btn-primary"
          >Create Post</router-link
        >
      </div>
    </div>
    <div v-for="post in posts" :key="post.id">
      <template v-if="post.author">
        <div class="card my-4">
          <div class="card-body text-dark">
            <img class="card-img-top" v-bind:src="post.image.url" alt="Card image cap" />
            <h3>{{ post.author.username }}</h3>
            <h6 class="card-title">{{ post.author.createdAt }}</h6>
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.body }}</p>
            <router-link
              v-if="post.author.username === getUser.username"
              id="edit-post"
              :to="{ name: 'edit', params: { id: post._id } }"
              class="btn btn-outline-warning"
              >Edit</router-link
            >
            <button
              v-if="post.author.username === getUser.username"
              id="delete-post"
              @click="deletePost(post._id)"
              class="btn btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
const postApi = `http://localhost:4000/posts`;
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      posts: [],
      user: {},
    };
  },
  created() {
    this.axios.get(postApi).then((res) => {
      this.posts = res.data;
      console.log(res.data);
    });
  },
  methods: {
    deletePost(id, post) {
      let url = `http://localhost:4000/posts/delete/${id}`;
      this.axios.delete(url).then(() => {
        this.posts.splice(this.posts.indexOf(post), 1);
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

<style scoped>
.card-img-top {
  width: 100%;

  object-fit: cover;
}
</style>
