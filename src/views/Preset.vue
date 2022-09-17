<template>
  <div>
    <div class="title">
      <h1>Preset List <img src="../assets/ViewsIcons/preset.gif" class="logoPNG" />:</h1>
    </div>
    <div class="div_container">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="select"
        :items="items"
        item-text="preset"
        item-value="code"
        item-cat="categorie"
        label="Select a Preset"
      ></v-select>
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
      { preset: 'Salute', code: 'P.pose1' },
      { preset: 'Gesticulate', code: 'P.pose2' },
      { preset: 'Whatever', code: 'P.pose3' },
      { preset: 'Hug', code: 'P.hug' },
      { preset: 'Handshake', code: 'P.shankhand' },
      { preset: 'Goodbye', code: 'P.goodbye' },
      { preset: 'Talk 1', code: 'P.talk1' },
      { preset: 'Talk 2', code: 'P.talk2' },
      { preset: 'Talk 3', code: 'P.talk3' },
      { preset: 'Talk 4', code: 'P.talk4' },
      { preset: 'Talk 5', code: 'P.talk5' },
      { preset: 'Talk 6', code: 'P.talk6' },
      { preset: 'Talk 7', code: 'P.talk7' },
      { preset: 'Talk 8', code: 'P.talk8' },
      { preset: 'Nod', code: 'P.nod' },
      { preset: 'Clap', code: 'P.applause' },
      { preset: 'Scratch head', code: 'P.zhuatou' },
      { preset: 'Walk right', code: 'P.guideright' },
      { preset: 'Walk left', code: 'P.guideleft' },
      { preset: 'Cute', code: 'P.cute' },
      { preset: 'Fight', code: 'P.fendou' },
      { preset: 'Grow', code: 'P.zhanggao' },
      { preset: 'Swing arms', code: 'P.swingarm' },
      { preset: 'Search', code: 'P.searching' },
      { preset: 'Zone out', code: 'P.fadai' },
      { preset: 'Survey', code: 'P.tiaowang' },
      { preset: 'Grab', code: 'P.longzhuashou' },
      { preset: 'Protect', code: 'P.baohu' },
      { preset: 'Wonder', code: 'P.suprise' },
      { preset: 'Guide', code: 'P.zhilu' },
      { preset: 'Shy', code: 'P.shy' },
      { preset: 'Conduct', code: 'P.command' },
      { preset: 'End conducting', code: 'P.commandover' },
      { preset: 'Walk', code: 'P.walk' },
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
