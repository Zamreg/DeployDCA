<template>
  <v-app>
    <NavBar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar,
  },
  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'Data Cleaning for All'
    }
  },
  created: function(){
    document.title = 'Data Cleaning for All'
  }
}
</script>

<style>

html, body {
  font-family: 'Roboto Narrrow', sans-serif;
}
.v-app{
  overflow-y: auto;
}
</style>