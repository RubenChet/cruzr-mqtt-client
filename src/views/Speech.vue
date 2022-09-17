<template>
  <div>
    <div class="title">
      <h1>Text to Speech <img src="../assets/ViewsIcons/text.gif" class="logoPNG" />:</h1>
    </div>
    <div class="div_container">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="text" :counter="75" :rules="textRules" label="Text to speech !" required></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
          Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Reset Form
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    text: '',
    textRules: [
      v => !!v || 'Some text is required',
      v => (v && v.length <= 75) || 'Name must be less than 75 characters',
    ],
    select: null,
  }),

  methods: {
    pub: function() {
      this.$root.publish.payload = 'T.' + this.text
      this.$root.doPublish()
    },
    validate() {
      this.$refs.form.validate()
      if (this.text != '') {
        this.pub()
      }
    },
    reset() {
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
