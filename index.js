import { saveTask, getTasks, onSnapshot, collection, db, deleteTask, getOneTask, updateTask } from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
let editStatus=false;
let id;

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
        <button class='btnEdit' data-id="${doc.id}">Edit</button>
        </div>
        `;
    });

    tasksContainer.innerHTML = html;
    const btnsDelete= tasksContainer.querySelectorAll('.btnDelete');
    btnsDelete.forEach((btn) =>{
      //extraigo del evento event el target y de este el dataset
      btn.addEventListener('click', ({target: {dataset}}) =>{
        deleteTask(dataset.id)
        console.log(dataset.id);
        
      })
    })

    const btnsEdit =tasksContainer.querySelectorAll('.btnEdit');
    btnsEdit.forEach((btn) =>{
      // event.target.dataset
      btn.addEventListener('click', async({target: {dataset}}) =>{
        //e.target.dataset.id
        const doc=await getOneTask(dataset.id); 
        const task=doc.data();
        
        taskForm['task-title'].value=task.title;
        taskForm['task-description'].value=task.description;
        editStatus=true;
        id=doc.id;
        taskForm['btn-task-save'].innerText='Update';

      })
    })
 
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //traigo de taskForm los input
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  if(!editStatus){
    saveTask(id,{
      title:title,
      description:description
    });

  }else{
    updateTask(title.value, description.value);
    editStatus=false;

  }
 

  taskForm.reset();
});
