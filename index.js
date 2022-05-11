import { saveTask, getTasks } from './firebase.js';

//evento que permite ejecutar cuando la pagina cargue
window.addEventListener('DOMContentLoaded', async () => {
  const querySnapshot = await getTasks();
  querySnapshot.forEach(doc=>{
      console.log(doc);
  })
});
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //traigo de taskForm los input
  const title = taskForm['task-title'];
  const description = taskForm['task-description'];

  saveTask(title.value, description.value);

  taskForm.reset();
});
