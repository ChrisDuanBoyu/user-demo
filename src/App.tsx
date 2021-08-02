import './App.css';
import Layout from './components/layout';
import Login from './pages/Login';
import  Register  from './pages/Register';
import UserInfo from './pages/UserInfo';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import NeedLogin  from './components/NeedLogin';

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
        <Switch >
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <NeedLogin>
              <Route path='/userinfo' component={UserInfo}></Route>
            </NeedLogin>
            <Redirect to='/userinfo'/>
        </Switch>
      </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
