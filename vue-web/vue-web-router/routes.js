export let todo2 = Vue.component('todo-item-2', {
  template: '<li>This is a todo 2</li>'
});

export function Course() {
  this.id = 'Hello';
  this.name = 'Courses';
};

export default {
  '/': 'Home',
  '/about': 'About'
}
