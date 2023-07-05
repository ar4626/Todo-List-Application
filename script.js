let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const taskCounter = document.getElementById('tasks-counter');

console.log('working');

// Example how to use fetch

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))

async function fetchTodos(){
    //GET requests  PROMISE LOGIC

    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(function(response){                     //returns a promise
    //     // console.log(response);
    //     return response.json();               //return a promise
    // }).then(function(data){
    //     tasks = data.slice(0,10);
    //     renderList();
    // })
    // .catch(function(error){
    //     console.log('Error has occured',error);
    // })


    // fetch using async and await notation
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0,10);
        renderList();
    }catch(error) {
        console.log('Error has occured',error);
    }
}

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML =`
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : '' } class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <img src="bin.svg" class="delete" id="${task.id}" />
    `;

    taskList.append(li)
}

function renderList() {
    taskList.innerHTML = '';

    for(let i=0;i< tasks.length;i++) {
        addTaskToDOM(tasks[i]);
    }

    taskCounter.innerHTML = tasks.length;
}

function  markTaskAsComplete(taskId) {
    const task = tasks.filter(function(task){
        return task.id === Number(taskId);
    })

    if (task.length > 0) {
        const currentTask=task[0];

        currentTask.completed=!currentTask.completed;
        renderList();
        showNortification("Task toggled successfully");
        return;

    }

    showNortification("Task not found"); 
    return;
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function(task) {
        return task.id !== Number(taskId)
    }) 
    tasks= newTasks;
    renderList();
    showNortification("Task deleted successfully")
}

function addTask(task) {
    if(task){

        // fetch('https://jsonplaceholder.typicode.com/todos',{
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(task),
        // })
        //     .then(function(response){                     //returns a promise
        //         // console.log(response);
        //         return response.json();               //return a promise
        //     }).then(function(data){
        //         console.log(data);
        //         tasks.push(task);
        //         renderList();
        //         showNortification("Task added successfully")
        //     })
        //     .catch(function(error){
        //         console.log('Error has occured',error);
        //     })

        tasks.push(task);
        renderList();
        showNortification("Task added successfully")
    } else
        showNortification("Task not added successfully")

    // console.log(tasks);
    
}

function showNortification(text) {
    alert(text);
}

function handleInoutKeypress (e) {
    if(e.key === 'Enter') {
        const text = e.target.value;
        // console.log("Text :" ,text); 

        if(!text) {
            showNortification("Task text cannnot be empty");
            return;
        }

        const task = {
            title: text,
            id: Date.now(),
            completed:false
        }

        e.target.value = '';
        addTask(task);
        // console.log("Task Object",task);

    }
}

function handleClickListner(e) {
    const target = e.target;
    // console.log(target );

    if(target.className === 'delete'){
        const taskId = target.id;
        deleteTask(taskId);
        return;
        
    }else if (target.className === 'custom-checkbox'){
        const taskId = target.id;
        markTaskAsComplete(taskId);
        return;

    }
}

function initializeApp(){
    // fetchTodos();                  // fetching from an API
    addTaskInput.addEventListener('keyup', handleInoutKeypress);
    document.addEventListener('click', handleClickListner);
}
 
initializeApp();

// - Functions (in code)
// 	- addTodo
// 	- deleteTodo
// 	- checkTodo
// 	- renderTodosList
// 	- showNotification

