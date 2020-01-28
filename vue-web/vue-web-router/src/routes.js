// Define a new component called todo-item
export let todo = Vue.component('todo-item-1', {
  template: '<li>This is a todo</li>'
})

export function Course() {
  this.id = '';
  this.name = '';
};

export default {
  '/': 'Home',
  '/about': 'About'
}
