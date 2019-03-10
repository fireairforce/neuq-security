const routes = [
  {
     path:'/',
     name:'guide',
     component: ()=> import('./../components/guide') 
  },
  {
    path:'/collect',
    name:'infocollect',
    models: () => [import('./../models/apply')],
    component: () => import('./../components/InfoCollect'),
  },{
    path:'/checklogin',
    name:'checklogin',
    models: () =>[import('./../models/shdl')],
    component: () => import('./../components/checklogin'),
  },{
    path:'/infocheck',
    name:'infocheck',
    models: () =>[import('./../models/shyg')],
    component: () => import('./../components/InfoCheck'),
  },{
    path:'/infoall',
    name:'infoall',
    models: () =>[import('./../models/xxhz')],
    component: () => import('./../components/InfoAll'),
  },{
    path:'/mobile',
    name:'mobile',
    component: () => import('./../components/mobilecollect'),
  }
]
export default routes