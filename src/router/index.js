import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../components/HomeView.vue'
import Leds from '../views/Leds.vue'
import Dance from '../views/Dance.vue'
import Speech from '../views/Speech.vue'
import Head from '../views/Head.vue'
import Preset from '../views/Preset.vue'
import Move from '../views/Move.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/leds',
    name: 'leds',
    component: Leds,
  },
  {
    path: '/dance',
    name: 'dance',
    component: Dance,
  },
  {
    path: '/speech',
    name: 'speech',
    component: Speech,
  },
  {
    path: '/head',
    name: 'head',
    component: Head,
  },
  {
    path: '/preset',
    name: 'preset',
    component: Preset,
  },
  {
    path: '/move',
    name: 'move',
    component: Move,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
