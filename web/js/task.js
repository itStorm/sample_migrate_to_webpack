$(function () {
    // Create new task
    var createTaskForm = $('#createTaskForm');
    if (createTaskForm.length) {
        $('.create_task').click(function () {
            createTaskForm.modal('show');
            return false;
        });

        createTaskForm.find('button.submit').click(function () {
            var form = createTaskForm.find('form').first();
            var task = formToJson(createTaskForm.find('form').first());
            if (task && task != {} && task != []) {
                db.insert('tasks', task);
            }
            createTaskForm.modal('hide');
            createTaskForm.find('form')[0].reset()
        });
    }

    // Delete task
    var deleteDialog = $('#deleteDialog');
    if (deleteDialog.length) {
        $('.task_list').on('click', '.delete_task', function () {
            var id = $(this).closest('.task').attr('id').split('_')[1];
            var task = db.findById('tasks', id);
            if (task) {
                deleteDialog.find('.modal-title').html('Delete task #' + task.id);
                deleteDialog.find('.modal-body').html('Do you really want to delete task <b>"' + task.title + '"</b>');
                deleteDialog.modal('show');

                deleteDialog.find('button.submit').on('click', function () {
                    db.delete('tasks', id);
                    deleteDialog.modal('hide');
                });
            }
            return false;
        });
    }


});