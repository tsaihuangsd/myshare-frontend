import React, {useState, useEffect, createContext, useContext} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

// create customer auth context
const AuthCustomContext = createContext();

//for accessing of custome auth context
export const useAuth = ()=> {
  return useContext(AuthCustomContext);     
}

const Auth0ProviderWithContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const {isLoading, isAuthenticated, user, error} = useAuth0()

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const frontendURL = process.env.REACT_APP_FRONTEND_URL
  const redirectUri = process.env.REACT_APP_REDIRECT_URI
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE
  const backendURL = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    // console.log("Auth0ProviderWithContext currentUser: ", currentUser)
  },[currentUser]);

  const prepAPICallOptions = (token) =>{
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
  
  const checkEmail = (user)=>{
    const token = localStorage.getItem('jwt')
    // console.log("token: ", token)
    const options = prepAPICallOptions(token)
    console.log("options: ", options)
    const fetchUserId = axios.get(`${backendURL}/api/user/check/getid`, options);
    fetchUserId.then(res => {
      console.log("res.data: ", res.data)
      // dispatch({type: EMAIL_CHECKED, payload: res.data.profile});
      localStorage.setItem('userId', res.data.id);
    }).catch(err => {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('jwt');
      localStorage.removeItem('img_url');
      localStorage.removeItem('userId');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('lsid');
      // dispatch({type: ERROR, payload: "Internal error parsing user. Try refreshing the page."})
    })
  }
  
  const value = {
    currentUser,
    setCurrentUser,
    checkEmail,
  }

  return (
    <AuthCustomContext.Provider value={value}>
      <Auth0Provider
          domain={domain}   
          clientId={clientId}
          redirectUri={redirectUri}
          onRedirectCallback={onRedirectCallback}
          // responseType="id_token"
          audience={audience}
          scope={"openid email profile read:users"}
          >
        {children}
      </Auth0Provider>
    </AuthCustomContext.Provider>
  );
};

export default Auth0ProviderWithContext;