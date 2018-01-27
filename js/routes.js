// 0. If using a module system, call Vue.use(VueRouter)

// 1. Define route components.
// These can be imported from other files
import {WeekendMatches} from "./weekend-matches.js";
import {AllMatches} from "./all-matches.js";
import {Scores} from "./scores.js";

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Scores },
  { path: '/scores', component: Scores },
  { path: '/weekend-matches', component: WeekendMatches },
  { path: '/all-matches', component: AllMatches },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#app');

// Now the app has started!
