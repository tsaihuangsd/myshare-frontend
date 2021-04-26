import React, { Component, useEffect } from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Home, UserProfile, Callback, GroupsPage, GroupsProfile, Navigation, BillingPage, Loading, Invite, GroupDataBar, GroupDataDoughnut, GroupTasks, TaskDetail, Test} from './components';
import {getCurrentUser, checkEmail} from './store/actions/rootActions';
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";

const App =()=>{
  const {isLoading} = useAuth0()
  useEffect(() =>{
    if (isLoading){
      return  <Loading/>
    }
  }, [isLoading])
  return (<>
      <Navigation />
      { isLoading
      ? <Loading/>
      : <Switch>
          <Route exact path='/' component={Home} />
          <ProtectedRoute path="/user-profile" component={UserProfile} />
          <ProtectedRoute path = '/callback' component = {Callback} />
          <ProtectedRoute exact path='/groups' component={GroupsPage} />
          <ProtectedRoute exact path='/groups/:id' render={props => <GroupsProfile {...props}/>} />
          <ProtectedRoute exact path= '/groups/:id/tasktrak' render={props => <GroupTasks {...props}/>} />
          <ProtectedRoute exact path= '/groups/:groupId/task/:taskId' render={props => <TaskDetail {...props}/>} />
          <ProtectedRoute path = '/billing' component = {BillingPage} />
          <ProtectedRoute path = '/invite' component = {Invite} />
          <ProtectedRoute path = '/data/:id' component = {GroupDataBar} />
          <ProtectedRoute path = '/doughnut/:id' component = {GroupDataDoughnut} />
        </Switch>}
  </>)
}
// class App extends Component {
  // componentWillMount(){
  //   if(localStorage.getItem('email') && !this.props.currentUser){
  //     this.props.checkEmail();
  //   }
  // }
// }
const mapStateToProps = state => {
  state = state.rootReducer; // pull values from state root reducer
  return {
      //state items
      currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {
  // actions
  getCurrentUser,
  checkEmail,
})(App));