import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './components/Auth/Auth';
import LogOut from './containers/LogOut/LogOut';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';

const asyncCheckOut = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./components/Auth/Auth');
});

class App extends Component {

  componentDidMount () {
    this.props.onCheckValidAuthantication();
  }

  render () {
    let route = (<Switch>
      <Route path="/Auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>);

    if(this.props.token){
      route = (<Switch>
            <Route path="/checkout" component={asyncCheckOut} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/LogOut" component={LogOut} />
            <Route path="/Auth" component={asyncAuth}  />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to='/' />
      </Switch>);
    }

    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token : state.auth.token
  }
}

const mapDispatcherToProps = dispatch => {
  return {
    onCheckValidAuthantication : () => dispatch(actions.checkValidAuthantication())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatcherToProps)(App));
