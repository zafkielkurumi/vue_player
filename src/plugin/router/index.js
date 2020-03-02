import VueRouter from 'vue-router';

const AimerTop = () => import(/* webpackChunkName: "player-aimer" */  '@/views/aimer_top/aimer_top.vue')


const routes = [
  {path:'/aimerTop',  component: AimerTop},
  {path:'/',  redirect:'/aimerTop'},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'route_active',
  routes
})

export default router
