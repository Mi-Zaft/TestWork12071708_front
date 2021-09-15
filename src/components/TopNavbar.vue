<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name: 'Home'}">Abelohost</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" :to="{name: 'Services'}">Crud</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <button @click="logout()" class="btn btn-secondary">Exit</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.go()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
