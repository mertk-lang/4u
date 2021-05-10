<template>
  <div>
    <div class="card" style="width: 18rem">
      <img class="card-img-top" v-bind:src="post.image.url" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">
          {{ post.body }}
        </p>
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
          @click="deletePost(post._id, post)"
          class="btn btn-outline-danger"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
