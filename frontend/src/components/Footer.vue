<template>
  <v-footer fixed bottom>
    <v-spacer></v-spacer>
    <div>&copy; {{ today }}</div>
  </v-footer>
</template>

<script>
export default {
    name: 'Footer',
    computed: {
      today: function () {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;
      return today
      }
    }
}
</script>

<style scoped>


</style>