import Vue from 'vue'
import App from './App.vue'
import FlashMessage from '@smartweb/vue-flash-message';
import 'bootstrap/dist/css/bootstrap.min.css'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

function isLoggedThenPosts(to, from, next) {
  if(localStorage.token) {
    next('/posts');
  } else {
    next();
  }
}

import VueAxios from 'vue-axios';
import axios from 'axios';


Vue.use(VueAxios, axios);
Vue.use(FlashMessage);


Vue.config.productionTip = false;



import HomeComponent from './components/HomeComponent.vue';
import CreateComponent from './components/CreateComponent.vue';
import IndexComponent from './components/IndexComponent.vue';
import EditComponent from './components/EditComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';
import LoginComponent from './components/LoginComponent.vue';

import './assets/global.css';

const routes = [
  {
      name: 'home',
      path: '/',
      component: HomeComponent
  },
  {
      name: 'create',
      path: '/create',
      component: CreateComponent
  },
  {
      name: 'posts',
      path: '/posts',
      component: IndexComponent,
      beforeEnter: function(to, from, next) {
        if(!localStorage.token) {
          next('/login');
        } else {
          next();
        }
      }
  },
  {
      name: 'edit',
      path: '/:id/edit',
      component: EditComponent
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterComponent,
    beforeEnter: isLoggedThenPosts,
  },
  {
    name: 'login',
    path: '/login',
    component: LoginComponent,
    beforeEnter: isLoggedThenPosts,
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});


new Vue(Vue.util.extend({ router }, App)).$mount('#app');