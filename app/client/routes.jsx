import {Route} from 'react-router';
import {NotFound} from './components/NotFound.jsx';
import {Home} from './components/Home.jsx';


// const UserStore = require("./stores/UserStore.js");
//
// var is_user_logged_in = false;
//
// function onUserLogin() {
//     is_user_logged_in = true;
// }
//
// function onUserLogout() {
//     is_user_logged_in = false;
// }
// UserStore.addUserLoginSuccessListener(onUserLogin);
// UserStore.addUserLogoutListener(onUserLogout);
// function requireAuth(nextState, replaceState) {
//     if (!is_user_logged_in) {
//         replaceState({nextPathname: nextState.location.pathname}, '');
//     }
// }


var routes = (
  <Route path="/" component={Home}>
    <Route path="*" component={NotFound}/>
  </Route>
);

module.exports = routes;
