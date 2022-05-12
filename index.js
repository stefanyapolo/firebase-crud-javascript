import { saveTask, getTasks, onSnapshot, collection, db, deleteTask } from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

window.addEventListener("DOMContentLoaded", async () => {
  /* onSnapshot está escuchando y cuando ocurra un cambio en la db tasks, 
  recibo los datos nuevos en querySnapshot */
  const querySnapshot=await getTasks();

    console.log(querySnapshot);
    let html = "";
    //recorro los datos y relleno el html
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      html += `
        <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <button class='btnDelete' data-id="${doc.id}">Delete</button>
        </div>
        `;
    });

    tasksContainer.innerHTML = html;
    const btnsDelete= tasksContainer.querySelectorAll('.btnDelete');
    btnsDelete.forEach((btn) =>{
      //extraigo del evento event el target y de este el dataset
      btn.addEventListener('click', ({target: {dataset}}) =>{
        deleteTask(dataset.id)
        
      })
    })
 
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //traigo de taskForm los input
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  saveTask(title.value, description.value);

  taskForm.reset();
});
