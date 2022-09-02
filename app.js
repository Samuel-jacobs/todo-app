//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // add todo to local storage 
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Trash Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //append to list 
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
}


//delete 
function deleteCheck(e) {
    const item = e.target;

    //delete todo
    if(item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove(); 
        });      
    }

    //check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        
        switch(e.target.value) {
            case "all":
                //console.log(e.target.value);
                todo.style.display = 'flex';
                break;
            case "completed":
                //console.log(e.target.value);
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                } 
                break;
        }
    });
         
}


//save to local storage 
function saveLocalTodos(todo) {
    //check if theres item in the todos
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


//get todos from local storage
function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        //todoDiv
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create LI 
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        
        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //Trash Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        //append to list 
        todoList.appendChild(todoDiv);

    });
}

//remove the todo from the local storage on delete
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

