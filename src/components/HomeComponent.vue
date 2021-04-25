<template>
  <div home-header>
    <div class="home-header-content">
      <h1 class="my-2">Welcome to Vibehouse</h1>
      <p>Join us and share the way you feel with others</p>
      <button class="home-header-content-button mt-3">Join</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap");

.home-header-content {
  background: url("../assets/img/landing-background.jpeg") no-repeat center center/cover;
  position: relative;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  width: 100%;
  position: relative;
}

.home-header-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.home-header-content * {
  z-index: 10;
}

.home-header-content-button {
  background: #0051f2;
  color: #fff;
  z-index: 2;
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
}

.home-header-content-button:hover {
  background: #6501d6;
  transition: 0.5s;
  border: none;
  opacity: 1;
}
</style>
