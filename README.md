# Todo List using html, css, and javascript

## My processs
The todo app collects input from the user and adds it to a list. The user can add several inputs to the list. the user can mark any item on the list as completed and also delete the item from the list. The user can also choose to filter which items are displayed between the items marked as completed and those that arent. everything is displayed as default. Finally the items are saved in the local storage so that when the browser is refreshed the user can still see the items he has added to his list of todos.


### The HTML
The html consists of a form with a text input and a submit button. it also contains a select input with 3 options, all, completed, and uncompleted. Finally a div with a class todo-container which contains an unordered list container where each list is added using javascript.

### The Javascript 
The javascript is divided into 3 sections: selectors, event listeners, and functions.
Under selectors, the various elements are selected from the DOM using query selectors and stored in variables. The elements selected are the input, the submit button, the ul in the todo container where the items are to be added, and the select input for the filters.

Under event listeners, event listeners are added to the todo button, the filter option(change event for when the any of the 3 options are selected), the todoList for when the delete button in the list item is clicked, and to the document on load to get the todo items from the local storage.

Under the function sections there are a number of functions for different functionalities. 
The first function is one that adds the item to the unordered list that was created in the HTML on click of the submit button in the form. An event is passed into the function. First of all, a div is created and stored in a variable named todoDiv using the document.createElement. a class is added to the div using classList.add(). The class is used to style the div in the css. then a list element is created with the createElement, and assigned to the variable newTodo. the newTodo innerText is set to the value of the input and a class is added to it. Finally the newTodo is inserted into the todoDiv using the appendChild. The function that adds the user input is called after the list item and the todoInput value is passed into the function. next a button is created and assigned to the variable completeButton. the innerHTML of the button is set to a font awesome icon using the <i> element. a class is added to the completeButton and the button is then added to the todoDiv with the appendChild method. The same thing is done for the delete button with the variable name deleteButton. finally the todoDiv and all the new elements in it is added to the empty todoList. and the todoInput is set to an empty string to clear the input. Below is the code

```js
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

```

The next function created is the function to delete an item from the todo list. an event is passed as the function argument. a variable named item is assigned to the target of the event. then the variable item is used to check if the element clicked has the classname od deleteButton.(simply put to check if the delete button was clicked) using item.classList[0] === "classname". if that is the case, then a variable named todo is created and assigned to the parentElement of the button using item.parentElement. a class is added to the parentElement to give it a falling and fadding effect as its being removed. In order to make sure the transition is finished before the item is removed an event listener is added to the parent element that listens to the end of the transition effect that was added in the css. In the event listener the item list item is then removed using todo.remove(). The function to remove the todo item from the local storage is called here. 
another if statement to check if the event target or button clickd is the completd button is created using the same format. then a class is added to the parent element that crossed of the item and reduces the opacity. its made to toggle using classlist.toggle

```js
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
```

another function is the function to filter the through the items for the completed and the uncompleted items or tasks. An event is passed into the function. a variable named todos is created and assigned to the children of the todoList (that is every item in the unordered list that has been added by the user.) a loop is created to go through each of the list items using forEach. a switch statement that checks the value of the options in the select input. The first case for if the value is equal to "all" then the style of the list item is set to flex as the default. the second case for the option completed. if the classList of the of the item contains completed then the item is set to display flex, else if it doesnt contain the completed class (which is added on click of the check button) then the display is set to none. the third case is the uncompleted. if the classList doesnt contain the completed class then the item display is set to be flex and if it does the item is set to display none. This is a quite simple way to filter through the user inputs. 

```js
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
```

a function to save the items in the local storage is created next
```js
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

```
the function was called with the todoInput.value passed to it in the function that adds items to the todo container. 
where the function is created its passed a variable todo (todo would then be the input value). a variable name todos is declared. then an if statement that checks if theres anything in the localStorage is creaated. the name of the local storage is called todos. if its empty then the todos varible is set to an empty array. else then todos is assigned to the localStorage.getItem method using JSON.parse which saves it in the local storage in JSON format. then the input value (todo which is passed into the function) is pushed to the array. 

to get the items back from the the localstorage on the reload of the page, a new function is created which is called in the eventlistener that checks when the page loads. The function is the same as the function that adds items to the todo container from the user input only this time the input is gotten from the local storage. the function first checks if the localstorage is empty first just like it does when saving the items in the local storage then the items are added back to the todo container in the same manner as it was before.


finally the function that deletes the item from the local storage when the item is deleted in the page.
```js
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
```
the function is called in the delete function, the parentElement was passed into the function when it was called. the same if statement thaat checks if the localStorage contains anything(sets the variable to an empty array if it dosnt and parses it to the local storage if it does). 
a variable todoIndex is created and set to the innertext of the child of the parent element. 
then ehe splice method is used ro remove the particular todo item by checking the index if the child. then the localstorage is set again.

i would need to understand local storage better.