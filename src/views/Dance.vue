<template>
  <div>
    <div class="title">
      <h1>Dance List <img src="../assets/ViewsIcons/dance.gif" class="logoPNG" />:</h1>
    </div>
    <div class="div_container">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-select v-model="select" :items="items" item-text="dance" item-value="code" label="Select a Dance"></v-select>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
          Validate
        </v-btn>
        <v-btn :disabled="valid" color="error" class="mr-4" @click="stop">
          Stop
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    select: '',
    items: [
      { dance: 'Dura', code: 'D.0' },
      { dance: 'Faded', code: 'D.1' },
      { dance: 'Panama', code: 'D.2' },
      { dance: 'LevanPolkka', code: 'D.3' },
      { dance: 'Curry', code: 'D.4' },
      { dance: 'Seaweed', code: 'D.5' },
      { dance: 'Crayon', code: 'D.6' },
      { dance: 'TocaToca', code: 'D.7' },
      { dance: 'Spain', code: 'D.8' },
      { dance: 'BoomBoom', code: 'D.9' },
      { dance: 'Naxi', code: 'D.10' },
    ],
  }),

  methods: {
    pub: function() {
      this.$root.publish.payload = this.select
      this.$root.doPublish()
    },
    validate() {
      this.$refs.form.validate()
      if (this.select != '') {
        this.valid = false
        this.pub()
      }
    },
    stop() {
      this.$root.publish.payload = 'D.stop'
      this.$root.doPublish()
      this.$refs.form.reset()
    },
  },
}
</script>
<style>
.div_container {
  text-align: center;
  max-width: 30%;
  margin: auto;
  margin-top: 20%;
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
