import Index from './components/index/index.vue'

export default [

  {
    path: '/logs/',
    name: 'logs',
    component: Index
  },
  { path: '*', redirect: { name: 'logs' } }
]
