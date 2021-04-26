import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import {checkEmail, acceptInvite} from '../store/actions';
// import Loading from './Loading'
import './Styles/Callback.css';
import {useAuth} from '../auth/Auth0ProviderWithContext'
import { useAuth0 } from "@auth0/auth0-react";

const Callback =()=> { 
  const {currentUser, setCurrentUser, checkEmail} = useAuth()
  const {user, getAccessTokenSilently, getIdTokenClaims} = useAuth0()  
    
  useEffect(async ()=>{
    await setCurrentUser(user)
    console.log("currentUser: ", currentUser)
    localStorage.setItem('name', user.name);
    localStorage.setItem('nickname', user.nickname);
    localStorage.setItem('email', user.email);
    localStorage.setItem('img_url', user.picture);
    localStorage.setItem('isLoggedIn', true);
    try{
      const id_token = (await getIdTokenClaims()).__raw
      // const token = await getAccessTokenSilently(
      //   { audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
      //     scope: "read:users"
      //   });        
      localStorage.setItem('jwt', id_token);
      await checkEmail(user)
      window.location.href = '/groups'
    } catch (err){
      console.log("no token returned: ", err)
    }
  },[]);

  return (
    <div className = 'callback-container'>
      <div>In Callback</div>        
    </div>
  );  
}
// const mapStateToProps = state => {
//   state = state.rootReducer; // pull values from state root reducer
//   return {//state items
//       currentUser: currentUser
//   }
// }

export default Callback
// withRouter(connect(mapStateToProps, {
//   // actions
//   checkEmail,
//   acceptInvite,
// })(Callback));