
let taskInput = $('#task-input');
taskInput.prop('required', true);

let taskAddButton = $('#task-add-button');

let pendingTasks = $('#pending-tasks');

let pendingTasksLegend = $('#pending-tasks-legend');

let completedTasks = $('#completed-tasks');

let completedTasksLegend = $('#completed-tasks-legend');

taskInput.keydown(function(e) {
    if (e.which === 13) {
        taskAddButton.click();
    }
});



// the button that creates a task
taskAddButton.click(function() {




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

    // creates the task with a checkbox, title, and remove button
    let taskContainer = $('<div class="task-container" ondrop="dropping()">');
    taskContainer.append(taskCheckboxContainer);
    taskContainer.append(taskName);
    taskContainer.append(taskRemoveButtonContainer);
    taskContainer.class = "task-container";



    // automatically adds the new task to the pending tasks list
    pendingTasks.append(taskContainer);


    // moves the task from one list to the other
    taskCheckbox.click(function() {
        if (taskCheckbox.prop('checked')) {
            taskContainer.appendTo(completedTasks);
        } else {
            taskContainer.appendTo(pendingTasks);
        }
    });

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
    console.log('hi')
// if ondrop = blah
taskList.on('dragover', function(e) {
    e.preventDefault();
});

    // taskContainer.on('drop', function() {
    //     if (completedTasksLegend.parent().is(taskContainer.parent())) {
    //         console.log('yes')
    //         taskCheckbox.prop('checked')
    //     }
    
    //     if (pendingTasksLegend.parent().is(taskContainer.parent())){
    //         console.log('no')
    //     }
        
    // });

})

// if (completedTasksLegend.parent().is(taskContainer.parent())) {
//     $(".task-checkbox input:checkbox").change(function() {
//         var ischecked= $(this).is(':checked');
//         if(!ischecked)
//         alert('unchecked ' + $(this).val());
//     }); 
//     }