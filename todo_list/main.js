
let taskInput = $('#task-input');
taskInput.prop('required', true);

let taskAddButton = $('#task-add-button');

let pendingTasks = $('#pending-tasks');

let pendingTasksLegend = $('#pending-tasks-legend');

let completedTasks = $('#completed-tasks');

let completedTasksLegend = $('#completed-tasks-legend');
let taskList = $('.task-list');
taskInput.keydown(function(e) {
    if (e.which === 13 && taskInput.val() !== "") {
        taskAddButton.click();
    }
});



// the button that creates a task
taskAddButton.click(function() {
    if (taskInput.val() === "") {
        taskInput.focus();
        return false;
    }


    // creates the task with a checkbox, title, and remove button
    
    let taskCheckbox = $('<input class="task-checkbox" type="checkbox" />');
    let taskCheckboxContainer = $('<div class="task-checkbox-container">');
    taskCheckboxContainer.append(taskCheckbox);
    
    let taskTitle = $('<h2 class="task-title">');
    let taskName = taskInput.val();
    taskTitle.html(taskName);
    taskInput.val("")

    let taskRemoveButtonContainer = $('<div class="task-remove-button">');
    let taskRemoveButton = $('<input id="task-remove-button" type="button" value="Remove" />');
    taskRemoveButtonContainer.append(taskRemoveButton);

    let taskContainer = $('<div class="task-container" ondrop="dropping()">');
    taskContainer.append(taskCheckboxContainer);
    taskContainer.append(taskName);
    taskContainer.append(taskRemoveButtonContainer);


    // automatically adds the new task to the pending tasks list
 

    pendingTasks.append(taskContainer);

    // taskContainer.change(function() {
    //     console.log('hey');
    //     console.log(taskCheckbox.prop('checked'))
    //     taskCheckbox.prop('checked', true);
    //     console.log(taskCheckbox.prop('checked'))
    //     if (taskCheckbox.prop('checked') ){
    //     taskCheckbox.prop('checked', false)
    //     }
    // })

    // moves the task from one list to the other

    let changeCheckbox = taskCheckbox.change(function() {
        if (taskCheckbox.prop('checked')) {
            taskContainer.appendTo(completedTasks);
        } else {
            taskContainer.appendTo(pendingTasks);
        }
    });
    

    //
    //
    //
    let changeCheckbox2 = taskContainer.change(function(event, ui) {
        if (completedTasksLegend.parent().is(taskContainer.parent())) {
            console.log(taskCheckbox.prop('checked'))
            console.log('yea')
        } else {
            console.log('nope')
        }
    })


    // removes the task from the current parrent list

    taskRemoveButton.click(function () {
        taskContainer.detach();
    });

    // allows for the tasks to be sorted by drag and drop

    let taskList = $('.task-list');
    taskList.sortable({
        appendTo: document.body,
        cancel: '.task-list-legend'
    });

    let appendTo = taskList.sortable('option', 'appendTo');
    taskList.sortable('option', 'appendTo', document.body);




    // allows for the pending tasks to be drag and dropped to the completed tasks

    pendingTasks.sortable({
        connectWith: completedTasks,
        cancel: '.task-list-legend'
    });

    let connectWithCompleted = pendingTasks.sortable('option', 'connectWith');
    taskList.sortable('option', 'connectWithCompleted', completedTasks);


    // allows for the completed tasks to be drag and dropped to the pending tasks

    completedTasks.sortable({
        connectWith: pendingTasks,
        cancel: '.task-list-legend'
    });

    let connectWithPending = completedTasks.sortable('option', 'connectWith');
    taskList.sortable('option', 'connectWithPending', pendingTasks);
    return taskContainer









    // taskContainer.sortable();

      
    //   taskContainer.on('stop', function() {
    //     if (completedTasksLegend.parent().is(taskContainer.parent())) {
    //         console.log(taskCheckbox.prop('checked'))
    //         taskCheckbox.prop('checked', true)
    //         console.log('yea')
    //         console.log(taskCheckbox.prop('checked'))
    //     } else {
    //         console.log('nope')
    //     }
    //   });


});



// A movestart event must be bound
// and explicitly enabled
