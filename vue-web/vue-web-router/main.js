// import { Course, todo2 } from './routes.js';
// import Hello from './Hello.vue';

// let c = new Course();
// alert(c.id);
// alert(c.name);

// enable `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112

function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

// Define a new component called todo-item
Vue.component('todo-item-1', {
  template: '<li>This is a todo</li>'
})

var ComponentB = Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var ComponentA = Vue.component('blog-post', {
  props: ['title'],
  // props:
  // { propB: [String, Number],
  //
  template: '<h3>{{ title }}</h3>'
})

Vue.component('blog-post1', {
  // props: ['value', 'title'],
  props: {
    author: Person,
    value: Number,
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise // or any other constructor
  },
  template: '<h3>{{ value }} - {{ title }}</h3>'
})

Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'

  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})

// Our data object
var data = {
    a: 1
}

var obj = {
  foo: 'bar'
}

// Object.freeze(obj); // Disable changes

// Vue App
var vm = new Vue({
  el: '#app',
  components: {
    'cop-a': ComponentA,
    'cop-b': ComponentB
  },
  data: {
    rawHtml: '<span style="color: #f23">Hello red</span>',
    d1: data,
    o1: obj,
    msg: 'Hello Vue.js!',
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    seen: true,
    firstName: 'Foo',
    lastName: 'Bar',
    isActive: true,
    hasError: false,
    classObject1: {
        active: true,
        'text-danger': false
    },
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ],
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ],
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ],
    selected: 'A',
    checked: false,
    lovingVue: false,
    checkedNames: [],
    activeClass: 'active',
    errorClass: 'text-danger'
  }
  ,
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },
    greet: function (event) {
      // `this` inside methods points to the Vue instance
      alert('Hello ' + this.firstName + '!')
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName)
      }
    },
    say: function (message) {
      alert(message)
    },
    warn: function (message, event) {
        // now we have access to the native event
        if (event) {
        event.preventDefault()
        }
        alert(message)
    }
  },
  computed: {
    now: function () {
        return Date.now()
    },
    fullName: function () {
        return this.firstName + ' ' + this.lastName
    },
    classObject: function () {
        return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
        }
    }
  },
  watch: {
    firstName: function (val) {
        this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
        this.fullName = this.firstName + ' ' + val
    }
  },
  // mounted, updated, and destroyed
  created: function () {
    // `this` points to the vm instance
    console.log('a is: ' + this.o1)
  }
})

// Add data
Vue.set(vm.o1, 'age', 27)

// you can invoke methods in JavaScript too
vm.greet() // => 'Hello Vue.js!'

// Change get
vm.a == data.a; // => true
data.a = 3;
data.a;

// Data
vm.$d1 === data // => true
vm.$el === document.getElementById('example') // => true

// $watch is an instance method
vm.$watch('a', function (newValue, oldValue) {
  // This callback will be called when `vm.a` changes
})


/*
import Vue from 'vue'
import routes from './routes'

// import VueCompositionApi from '@vue/composition-api';
// Vue.use(VueCompositionApi);

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
*/