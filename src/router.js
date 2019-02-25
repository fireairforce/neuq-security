import React from 'react';
import { Route, Switch ,routerRedux, Redirect} from 'dva/router';
import dynamic from 'dva/dynamic';
import routes from './config/route';
import NotFound from './components/404';

const {ConnectedRouter} =routerRedux;
function RouterConfig({ history,app }){
  return (
    <ConnectedRouter history={history}>
       <Switch>
            {
              routes.map(({path,name,...dynamics})=>{
                return (
                  <Route path={path} key={name} exact component={dynamic({app,...dynamics})} />
                )
              })
            }
          <Route path="/404" component={NotFound} />
          <Redirect to='/404'></Redirect>
       </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
