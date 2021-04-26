import React, {useState} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
// import auth0Client from './Auth';
// import Auth0Lock from 'auth0-lock';
import {connect} from 'react-redux';
import {checkEmail} from '../store/actions/rootActions';
import './Styles/Navigation.css';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu,MDBBtn } from "mdbreact";
import { useAuth0 } from "@auth0/auth0-react";   

const Navigation = (props) =>{
    //declare local states
    const [isOpen, setIsOpen] = useState(false)

    const { loginWithRedirect , logout, isAuthenticated } = useAuth0();
    const history = useHistory();
    const frontendURL = process.env.REACT_APP_FRONTEND_URL;
    const pathname = window.location.href;

     // Toggles dropdown menus for MDB
    const toggleCollapse = () => {
        setIsOpen(!isOpen)
    }

    const signOut = async () => { // logs out the current user and redirects to the homepage
        await logout({returnTo: frontendURL})
    };

    const signUp = async () => {
        await loginWithRedirect({screen_hint: 'signup',redirect_uri:`${frontendURL}/callback`})
    }

    return (
        <div className='navigation-container'>
            <MDBNavbar style={{ backgroundColor: "#2A922D" }} dark expand="md">
                <MDBNavbarBrand href="/">
                    <strong className="white-text">MyShare</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={()=>toggleCollapse()} />
                <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                    <MDBNavbarNav left>                        
                        {isAuthenticated && (<div>
                            <MDBNavItem active={pathname === "/groups" ? true : false} >
                                <MDBNavLink to="/groups">Groups</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={pathname === "/user-profile" ? true : false} className="nav-mobile" >
                                <MDBNavLink to="/user-profile">My Account</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className="nav-mobile">
                                <MDBNavLink to="#" onClick={()=>signOut()} >Log Out</MDBNavLink>
                            </MDBNavItem></div>)}
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            {isAuthenticated
                                ? (<MDBDropdown className="nav-hide">
                                    <MDBDropdownToggle className="dropdown-toggle" nav>
                                        {props.currentUser && (
                                            <img src={props.currentUser.profilePicture} className="rounded-circle z-depth-0"
                                                style={{ height: "35px", padding: 0 }} alt="" />)}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default"
                                        style={{ 'padding': '20px', 'marginRight': '20px' }}>
                                        <MDBNavLink to='/profile' style={{ color: "#000000" }}>My Account
                                        </MDBNavLink>
                                        <MDBNavLink to='/' onClick={()=>signOut()} style={{ color: "#000000" }}>Log Out
                                        </MDBNavLink>
                                    </MDBDropdownMenu>
                                </MDBDropdown>)
                                : (<div>
                                    <MDBNavItem className="nav-hide">
                                        <MDBBtn color="deep-orange" onClick={()=>signUp()}>
                                            Log In / Sign Up
                                        </MDBBtn>
                                    </MDBNavItem>
                                    <MDBNavItem className="nav-mobile">
                                        <MDBNavLink to='#' onClick={()=>signUp()}>Log In / Sign Up
                                        </MDBNavLink>
                                    </MDBNavItem>
                                </div>
                                )}
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </div>
    )
}

// export default Navigation


// var lockOptions = {
//     auth: {
//         redirectUrl: `${frontendURL}/callback`,
//         responseType: 'token id_token',
//         params: {
//             scope: 'profile openid email'
//         }
//     },
//     theme: {
//         primaryColor: '#FF7043'
//     },
//     languageDictionary: {
//         title: 'FairShare'
//     },
//     rememberLastLogin: false
// }

// var lock = new Auth0Lock(
//     process.env.REACT_APP_AUTH0_CLIENT_ID,
//     process.env.REACT_APP_AUTH0_DOMAIN,
//     lockOptions
// )

// class Navigation extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             collapseID: "",
//             activeTabClassname: "home",
//             isOpen: false,
//         }
//     }
    

//     // Toggles dropdown menus for MDB
//     toggleCollapse = () => {
//         this.setState({ isOpen: !this.state.isOpen });
//     }

//     signOut = (e) => { // logs out the current user and redirects to the homepage
//         e.preventDefault();
//         logout({returnTo: window.location.origin,})
//         // auth0Client.signOut();
//         // history.replace('/');
//     };

//     signUp = (e) => {
//         e.preventDefault();
//         loginWithRedirect({screen_hint: "signup",})
//         // lock.show();
//     }

//     render(){
//         // Gather user id to determine if user is logged in or not
//         // let isLoggedIn = localStorage.getItem("isLoggedIn");
        
//         // Gather the url pathname to set active class to proper link
//         const pathname = this.props.location.pathname;
//         return(        
//             <div className = 'navigation-container'>
//                 <MDBNavbar style={{backgroundColor: "#2A922D"}} dark expand="md">
//                     <MDBNavbarBrand href="/">
//                         <strong className="white-text">MyShare</strong>
//                     </MDBNavbarBrand>
//                     <MDBNavbarToggler onClick={this.toggleCollapse} />
//                     <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
//                         <MDBNavbarNav left>
//                             {/* <MDBNavItem active={pathname === "/" ? true : false} >
//                                 <MDBNavLink to="/">Home</MDBNavLink>
//                             </MDBNavItem> */}
//                             {isAuthenticated && (<div>
//                                 <MDBNavItem active={pathname === "/groups" ? true : false} >
//                                     <MDBNavLink to="/groups">Groups</MDBNavLink>
//                                 </MDBNavItem>
//                                 <MDBNavItem active={pathname === "/profile" ? true : false} className="nav-mobile" >
//                                     <MDBNavLink to="/profile">My Account</MDBNavLink>
//                                 </MDBNavItem>
//                                 <MDBNavItem className="nav-mobile">
//                                     <MDBNavLink to="#" onClick={this.signOut} >Log Out</MDBNavLink>
//                                 </MDBNavItem></div>)}
//                         </MDBNavbarNav>
//                         <MDBNavbarNav right>
//                             <MDBNavItem>
//                                 {isAuthenticated 
//                                 ? (<MDBDropdown className="nav-hide">
//                                         <MDBDropdownToggle className="dropdown-toggle" nav>
//                                             {this.props.currentUser && (
//                                                 <img src={this.props.currentUser.profilePicture} className="rounded-circle z-depth-0"
//                                                      style={{ height: "35px", padding: 0 }} alt="" />)}
//                                         </MDBDropdownToggle>
//                                         <MDBDropdownMenu className="dropdown-default"
//                                                          style = {{'padding': '20px', 'marginRight': '20px'}}>
//                                             <MDBNavLink to = '/profile' style={{color: "#000000"}}>My Account
//                                             </MDBNavLink>
//                                             <MDBNavLink to = '/' onClick={this.signOut} style={{color: "#000000"}}>Log Out
//                                             </MDBNavLink>
//                                         </MDBDropdownMenu>
//                                     </MDBDropdown>) 
//                                 : (<div>
//                                         <MDBNavItem className="nav-hide">
//                                             <MDBBtn color="deep-orange" onClick={this.signUp}>
//                                                 Log In / Sign Up
//                                             </MDBBtn>
//                                         </MDBNavItem>
//                                         <MDBNavItem className="nav-mobile">
//                                             <MDBNavLink to = '#' onClick={this.signUp}>Log In / Sign Up
//                                             </MDBNavLink>
//                                         </MDBNavItem>
//                                     </div>
//                                 ) }
//                             </MDBNavItem>
//                         </MDBNavbarNav>
//                     </MDBCollapse>
//                 </MDBNavbar>
//             </div>
//         )
//     }
// }

const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
        //state items
        userId: state.userId,
        name: state.name,
        email: state.email,
        profilePicture: state.profilePicture,
        currentUser: state.currentUser,
        userGroups: state.userGroups,
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    checkEmail,
})(Navigation));