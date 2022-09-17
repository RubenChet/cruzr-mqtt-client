import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import vuetify from './plugins/vuetify'
import mqtt from 'mqtt'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  vuetify,
  render: h => h(App),
  data() {
    return {
      connection: {
        host: 'broker.mqttdashboard.com',
        port: 8000,
        endpoint: '/mqtt',
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 4000,
        clientId: 'mqttjs_3be2c321',
        username: '',
        password: '',
        status: 'Not Connected',
      },
      subscription: {
        topic: 'topic/mqttx',
        qos: 0,
      },
      publish: {
        topic: 'cruzr/obuda',
        qos: 0,
        payload: '',
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    }
  },
  methods: {
    createConnection() {
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
        this.connection.status = 'Connected'
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
      })
    },
    doSubscribe() {
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    },
    doUnSubscribe() {
      const { topic } = this.subscription
      this.client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
        }
      })
    },
    doPublish() {
      const { topic, qos, payload } = this.publish
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log('Publish error', error)
        }
      })
    },
    destroyConnection() {
      if (this.client.connected) {
        try {
          this.client.end()
          this.client = {
            connected: false,
          }
          console.log('Successfully disconnected!')
          this.connection.status = 'Disconnected'
        } catch (error) {
          console.log('Disconnect failed', error.toString())
        }
      }
    },
  },
}).$mount('#app')
