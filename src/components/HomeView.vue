<template>
  <v-container>
    <v-row class="grid_row">
      <div class="container_btn">
        <v-btn elevation="2" x-large to="/leds">Leds</v-btn>
        <v-btn elevation="2" x-large to="/speech">Speech</v-btn>
        <v-btn elevation="2" x-large to="/head">Head</v-btn>
      </div>
      <div class="container_img"><v-img src="../assets/home_cruzr.png"></v-img></div>
      <div class="container_btn">
        <v-btn elevation="2" x-large to="/dance">Dance</v-btn>
        <v-btn elevation="2" x-large to="/move">Move</v-btn>
        <v-btn elevation="2" x-large to="/preset">Preset</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>
<style>
.grid_row {
  max-width: 75%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
}
.container_btn {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 100;
}
</style>
