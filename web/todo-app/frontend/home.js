'use strict';

require('jquery');
let db = require('db');

$(function () {
    function addTaskRow(task) {
        var taskRows = '<tr id="taskID_' + task.id + '" class="task">' +
            '<td>' + task.id + '</td>' +
            '<td><a href="/task/' + task.id + '">' + task.title + '</a></td>' +
            '<td><a href="#" class="delete_task">x</td>' +
            '</tr>';
        $('.task_list tbody').append(taskRows);
    }


    // Fill task list
    db.findAll('tasks').forEach(function (task, index) {
        addTaskRow(task);
    });

    db.on('insert update', function (type, record) {
        if (type != 'tasks') {
            return;
        }
        addTaskRow(record);
    });

    db.on('delete', function (type, record) {
        if (type != 'tasks') {
            return;
        }
        $('.task_list tbody').find('#taskID_' + record.id).remove();
    });

});