const routes = [
    {
      path:'/',
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
      models: () =>[import('./../models/shyg')],
      component: () => import('./../components/InfoCheck'),
    }
  ]
export default routes