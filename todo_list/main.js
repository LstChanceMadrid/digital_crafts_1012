
let taskInput = $('#task-input');

let taskAddButton = $('#task-add-button');

let pendingTasks = $('#pending-tasks');

let pendingTasksLegend = $('#pending-tasks-legend')

let completedTasks = $('#completed-tasks')

let completedTasksLegend = $('#completed-tasks-legend')

let taskList = $('.task-list')

// the button that creates a task
taskAddButton.click(function() {

    let taskCheckbox = $('<input class="task-checkbox" type="checkbox" />')

    let taskTitle = $('<h2 class="task-title">')
    let taskName = taskInput.val();
    taskTitle.html(taskName)

    let taskRemoveButton = $('<input id="task-remove-button" class="task-remove-button" type="button" value="Remove" />')

    // creates the task with a checkbox, title, and remove button
    let taskContainer = $('<div class="task-container">');
    taskContainer.append(taskCheckbox);
    taskContainer.append(taskName);
    taskContainer.append(taskRemoveButton);

    // automatically adds the new task to the pending tasks list
    pendingTasks.append(taskContainer)

    // moves the task from one list to the other
    taskCheckbox.click(function() {
        if (taskCheckbox.prop('checked')) {
            taskContainer.appendTo(completedTasks)
        } else {
            taskContainer.appendTo(pendingTasks)
        }
    })

    // removes the task from the current parrent list
    taskRemoveButton.click(function () {
        taskContainer.detach()
    })

    taskList.sortable({
        appendTo: document.body
    })

    let appendTo = taskList.sortable('option', 'appendTo')
    taskList.sortable('option', 'appendTo', document.body)

    pendingTasks.sortable({
        connectWith: completedTasks
    })

    let connectWithCompleted = pendingTasks.sortable('option', 'connectWith')
    taskList.sortable('option', 'connectWithCompleted', completedTasks)

    completedTasks.sortable({
        connectWith: pendingTasks
    })

    let connectWithPending = completedTasks.sortable('option', 'connectWith')
    taskList.sortable('option', 'connectWithPending', pendingTasks)
  
})

