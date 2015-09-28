(function() {
  var taskInput = document.getElementById("new-task"); //new-task
  var addButton = document.getElementsByTagName("button")[0]; //first button
  var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
  var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
  var purgeButton = document.getElementById("purge");
  var completedTitle = document.getElementById("completed-title");

  var noIncompleteTasks = "<li class='tasks-complete'>Tasks Complete!</li>";

  taskInput.focus();
  taskInput.setAttribute('placeholder', 'Enter new task...');

  //New Task List Item
  var createNewTaskElement = function(taskString) {
    //Create List Item
    var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input"); // text
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    
    //Each element needs modifying
    
    checkBox.type = "checkbox";
    editInput.type = "text";
    
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    
    label.innerText = taskString;
    
    //Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    
    return listItem;
  }

  //Add a new task
  var addTask = function() {
    checkForEmptyTodo();
    //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.select();
  }

  //Edit an existing task
  var editTask = function() {

    var listItem = this.parentNode;
    
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    
    var containsClass = listItem.classList.contains("editMode");
    
    //if the class of the parent is .editMode
    if (containsClass) {
      //Switch from .editMode
      //label text become the input's value
      label.innerText = editInput.value;
    } else {
      //Switch to .editMode
      //input value becomes the label's text
      editInput.value = label.innerText;
    }
    
    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");
    
  }

  //Delete an existing task
  var deleteTask = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    
    //Remove the parent list item from the ul
    ul.removeChild(listItem);
    checkForEmptyCompleted();
  }

  //Mark a task as complete
  var taskCompleted = function() {
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    if (incompleteTasksHolder.innerText === ""){
      incompleteTasksHolder.innerHTML = noIncompleteTasks;
    }
    checkForEmptyCompleted();
  }

  var checkForEmptyTodo = function() {

    if (incompleteTasksHolder.firstChild.className === "tasks-complete") {
      incompleteTasksHolder.firstChild.style.display = "none";
    }
  }

  var checkForEmptyCompleted = function() {
    if (completedTasksHolder.childElementCount === 0) {
      purgeButton.style.visibility = "hidden";
      completedTitle.style.visibility = "hidden";
    } else {
      purgeButton.style.visibility = "visible";
      completedTitle.style.visibility = "visible";

    }
  }

  //Mark a task as incomplete
  var taskIncomplete = function() {
    checkForEmptyTodo();
    //Append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    checkForEmptyCompleted();
  }

  var purgeCompletedTasks = function() {
    if (completedTasksHolder.childElementCount === 0){
      return;
    } else if (confirm("Are you sure you want to purge your completed tasks list?")) {
      while (completedTasksHolder.firstChild) {
        completedTasksHolder.removeChild(completedTasksHolder.firstChild);
      }
      checkForEmptyCompleted();
    } 
  }

  var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    //select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    
    //bind editTask to edit button
    editButton.onclick = editTask;
    
    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    
    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;

  }

  //Set the click handler to the addTask function
  addButton.onclick = addTask;

  //cycle over incompleteTasksHolder ul list items
  for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

  //cycle over completedTasksHolder ul list items
  for(var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }

  purgeButton.onclick = purgeCompletedTasks;

  //bind keyup 'Enter' to task Input
  taskInput.addEventListener("keyup", function(e) {
    if (e.keyCode === 13){
      addTask();
      this.value = '';
      this.setAttribute('placeholder', 'Enter new task...');
      this.select();
    }
  });
})();
