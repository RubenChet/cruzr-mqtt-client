<template>
  <div>
    <div class="title">
      <h1>Leds Options <img src="../assets/ViewsIcons/leds.gif" class="logoPNG" />:</h1>
    </div>
    <div class="div_container">
      <div class="ledsOnOff">
        <div class="btns">
          <v-btn color="green" plain elevation="4" v-on:click="send('L.on')">ON</v-btn>
          <v-btn color="red" plain elevation="4" v-on:click="send('L.off')">OFF</v-btn>
        </div>
      </div>
      <div class="ledsColor">
        <div class="btns">
          <v-btn color="red" plain elevation="4" v-on:click="send('C.255,0,0,15')">RED</v-btn>
          <v-btn color="green" plain elevation="4" v-on:click="send('C.0,255,0,15')">GREEN</v-btn>
          <v-btn color="blue" plain elevation="4" v-on:click="send('C.0,0,255,15')">BLUE</v-btn>
        </div>
      </div>
      <div class="ledsRGB">
        <v-col cols="auto" md="4">
          <v-text-field v-model="lred" :rules="ledsRules" label="R" required></v-text-field>
        </v-col>
        <v-col cols="auto" md="4">
          <v-text-field v-model="lgreen" :rules="ledsRules" label="G" required></v-text-field>
        </v-col>
        <v-col cols="auto" md="4">
          <v-text-field v-model="lblue" :rules="ledsRules" label="B" required></v-text-field>
        </v-col>
        <v-col cols="auto" md="4">
          <v-text-field v-model="ltime" :rules="ledsTime" label="Duration in Sec" required></v-text-field>
        </v-col>
      </div>
      <v-btn color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    lred: '',
    lgreen: '',
    lblue: '',
    ltime: '',
    ledsRules: [
      v => {
        if (!v.trim()) return true
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 255) return true
        return 'Number has to be between 0 and 255'
      },
    ],
    ledsTime: [
      v => {
        if (!v.trim()) return true
        if (!isNaN(parseFloat(v)) && v >= 5 && v <= 60) return true
        return 'Time has to be between 5 and 60 seconds'
      },
    ],
  }),
  methods: {
    pub: function() {
      this.$root.publish.payload = 'C.' + this.lred + ',' + this.lgreen + ',' + this.lblue + ',' + this.ltime
      this.$root.doPublish()
    },
    send(val) {
      this.$root.publish.payload = val
      this.$root.doPublish()
    },
    validate() {
      this.pub()
      this.$refs.form.validate()
    },
  },
}
</script>
<style>
.div_container {
  text-align: center;
  max-width: 100%;
  margin: auto;
  margin-top: 10%;
}
.ledsRGB {
  display: flex;
  justify-content: space-around;
}
.main_card {
  margin-top: 10%;
}
.ledsOnOff {
  display: flex;
  justify-content: space-around;
}
.ledsColor {
  display: flex;
  justify-content: space-around;
  margin: auto;
  margin-top: 3%;
}
.title {
  text-align: center;
  margin-top: 10%;
  margin-bottom: -15%;
}
.logoPNG {
  position: relative;
  top: 15px;
  width: 75px;
  height: 75px;
}
</style>
