import Vue from 'vue'
import VueRouter from 'vue-router';
import { Form, HasError, AlertError } from 'vform';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar'
import Swal from 'sweetalert2'

require('./bootstrap');

window.Vue = require('vue');
window.Form = Form;
Vue.use(VueRouter);
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

// Register All Routes
const routes = [
  { path: '/dashboard', component: require('./components/Dashboard.vue').default },
  { path: '/profile', component: require('./components/Profile.vue').default },
  { path: '/users', component: require('./components/Users.vue').default }
]

const router = new VueRouter({
  mode: 'history', //this is very important to hide home route in url
  routes
})



// Using Filters
Vue.filter('upText',(text) =>{
  return text.charAt(0).toUpperCase() + text.slice(1);
});
Vue.filter('myDate',(test) => {
  return moment(test).format('MMMM Do YYYY');
});


// Using ProgressBar
const progressBar_options = {
  color: '#bffaf3',
  failedColor: '#FF0000',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, progressBar_options)



// Using SweetAlter2
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
window.Toast = Toast;



//Using Custom Events
window.Fire = new Vue();





const app = new Vue({
  el: '#app',
  router
});
