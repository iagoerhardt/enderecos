import Vue from 'vue'
import VueRouter from 'vue-router'
import listaEnderecos from '../views/listaEnderecos'
import editarEndereco from '../views/editarEndereco'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'listaEnderecos',
    component: listaEnderecos
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
  ,
  {
    path: '/editar-endereco/:address',
    name: 'editarEndereco',
    component: editarEndereco
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
