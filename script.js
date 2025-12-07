// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // If input is empty, prompt the user and exit
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to remove the li from the task list
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item, then append the list item to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks by pressing Enter in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks array from Local Storage or start with an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Save the current tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a DOM element for a task and wire up its remove button
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // When clicked, remove the task from the DOM and update Local Storage
        removeButton.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove first matching occurrence from tasks array and save
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        li.appendChild(removeButton);
        return li;
    }

    // Add a task. If taskTextParam is provided, use it; otherwise read from input.
    // The save flag prevents saving again when loading from Local Storage.
    function addTask(taskTextParam, save = true) {
        const taskText = (typeof taskTextParam === 'string')
            ? taskTextParam.trim()
            : taskInput.value.trim();

        // Validate input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create and append the task element
        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        // Update tasks array and Local Storage if requested
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Load tasks from the tasks array (which was initialized from Local Storage)
    function loadTasks() {
        tasks.forEach(taskText => addTask(taskText, false)); // false prevents re-saving
    }

    // Initialize the UI with stored tasks
    loadTasks();

    // Event listener for Add Task button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Allow adding tasks by pressing Enter in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
