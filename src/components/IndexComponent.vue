<template>
  <div class="main-div">
    <div class="row">
      <section>
        <h1>{{ user.username }}</h1>
      </section>
      <div class="col-md-10"></div>
      <div class="col-md-2">
        <router-link :to="{ name: 'create' }" class="btn btn-primary"
          >Create Post</router-link
        >
      </div>
    </div>
    <div v-for="post in posts" :key="post.id">
      <div class="card">
        <img class="card-img-top" v-bind:src="post.image" alt="Card image cap" />
        <div class="card-body text-dark">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.body }}</p>
          <router-link
            v-if="post.author === getUser.id"
            id="edit-post"
            :to="{ name: 'edit', params: { id: post._id } }"
            class="btn btn-outline-warning"
            >Edit</router-link
          >
          <button
            v-if="post.author === getUser.id"
            id="delete-post"
            @click="deletePost(post._id)"
            class="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
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
    });
  },
  methods: {
    deletePost(id) {
      let url = `http://localhost:4000/posts/delete/${id}`;
      this.axios.delete(url).then((res) => {
        console.log(res);
        this.posts.splice(this.posts.indexOf(id), 1);
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
.card {
  width: 50rem;
  margin: auto;
  margin-bottom: 28px;
  border: none;
}

#edit-post {
  margin: 0px 10px;
}

#delete-post {
  margin-right: 5px;
}
</style>
