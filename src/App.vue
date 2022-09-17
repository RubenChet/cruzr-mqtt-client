<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/"
          ><v-btn depressed x-large text>
            <v-img alt="Vuetify Name" class="shrink mt-1" contain min-width="100" src="./assets/logo.png" width="125" />
          </v-btn>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <h1>CRUZR UI</h1>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu offset-y :close-on-content-click="closeOnContentClick" open-on-hover min-width="300">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey darken-4" dark v-bind="attrs" v-on="on" v-on:mouseover="theData">
              MQTT Settings
            </v-btn>
          </template>
          <v-list>
            <v-list-item> Host :<v-text-field v-model="host" class="centered-input"> </v-text-field></v-list-item>
            <v-list-item> Port :<v-text-field v-model="port" class="centered-input"> </v-text-field></v-list-item>
            <v-list-item> Topic :<v-text-field v-model="topic" class="centered-input"> </v-text-field></v-list-item>
            <v-list-item>
              Status :
              <div v-if="this.status == 'Connected'" class="ml-4 green--text">{{ status }}</div>
              <div v-else class="ml-4 red--text">{{ status }}</div></v-list-item
            >
            <v-list-item class="edit-btn">
              <v-btn color="success" @click="mqtt_edit">
                Edit and Connect
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$root.createConnection()
  },
  data: () => ({
    host: '',
    port: '',
    topic: '',
    status: '',
    closeOnContentClick: false,
  }),
  methods: {
    theData() {
      ;(this.host = this.$root.connection.host),
        (this.port = this.$root.connection.port),
        (this.topic = this.$root.publish.topic),
        (this.status = this.$root.connection.status)
    },
    sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    },
    async mqtt_edit() {
      this.$root.destroyConnection(),
        (this.$root.connection.host = this.host),
        (this.$root.connection.port = this.port),
        (this.$root.publish.topic = this.topic),
        (this.status = this.$root.connection.status)
      this.$root.createConnection(), await this.sleep(1500)
      this.status = this.$root.connection.status
    },
  },
}
</script>
<style>
.centered-input input {
  text-align: center;
}
.edit-btn {
  display: flex;
  justify-content: center;
}
</style>
