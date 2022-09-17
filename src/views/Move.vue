<template>
  <div>
    <div class="title">
      <h1>Robot Movements <img src="../assets/ViewsIcons/move.gif" class="logoPNG" />:</h1>
      <p>You cannot turn and move forward at the same time !</p>
    </div>
    <div class="div_container">
      <v-form ref="form" lazy-validation>
        <v-slider
          v-model="rotation.val"
          :label="rotation.label"
          :thumb-color="rotation.color"
          thumb-label="always"
          :max="rotation.max"
          :min="rotation.min"
        ></v-slider>
        <div class="the_slider">
          <v-slider
            v-model="moveX.val"
            :label="moveX.label"
            :thumb-color="moveX.color"
            thumb-label="always"
            :max="moveX.max"
            :min="moveX.min"
          ></v-slider>
          <template>
            <img src="../assets/info.png" @click.stop="dialog = true" class="info" />

            <v-dialog v-model="dialog" max-width="500">
              <v-card>
                <v-card-title class="text-h5">
                  Be Careful !!!
                </v-card-title>

                <v-card-text>
                  When clicking on validate, you're going to make the robot moove, please be sure and understand the
                  value before !
                  <br />
                  Rotation : 3 = 180°
                  <br />
                  Move x : a value of 1 is approximatly 10cm
                  <br />
                  Speed : a speed of 1 is recommanded, more the cruzr is going fast !
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </div>
        <v-slider
          v-model="speed.val"
          :label="speed.label"
          :thumb-color="speed.color"
          thumb-label="always"
          :max="speed.max"
          :min="speed.min"
        ></v-slider>

        <v-btn color="success" class="mr-4" @click="validate">
          Validate
        </v-btn>
        <v-btn color="error" class="mr-4" @click="stop">
          Stop !
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    rotation: { label: 'Rotation', val: 0, min: -30, max: 30 },
    moveX: { label: 'MoveX', val: 0, min: -50, max: 50 },
    speed: { label: 'Speed', val: 0, min: 0, max: 10 },
    value: 0,
    dialog: false,
  }),
  methods: {
    pub: function() {
      this.moveXVal = this.moveX.val / 10
      this.rotationVal = this.rotation.val / 10
      this.speedVal = this.speed.val / 10
      if (this.speedVal == 0) {
        this.speedVal = 0.1
      }
      this.$root.publish.payload = 'M.' + this.moveXVal + ',0,' + this.rotationVal + ',' + this.speedVal
      this.$root.doPublish()
    },
    validate() {
      this.$refs.form.validate()
      if (this.text != '') {
        this.pub()
      }
    },
    stop() {
      this.$root.publish.payload = 'M.stop'
      this.$root.doPublish()
      this.$refs.form.reset()
    },
  },
}
</script>
<style>
p {
  position: relative;
  top: 15px;
  color: red;
}
.div_container {
  text-align: center;
  max-width: 30%;
  margin: auto;
  margin-top: 20%;
}
.the_slider {
  display: flex;
  justify-content: space-between;
}
.info {
  margin-top: 0.8%;
  width: 20px;
  height: 20px;
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
