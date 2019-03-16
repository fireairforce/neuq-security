import dva from 'dva';
import './index.css';
import {createBrowserHistory as createHistory} from 'history';

const app = dva({history:createHistory()});

app.router(require('./router').default);

app.start('#root'); 
