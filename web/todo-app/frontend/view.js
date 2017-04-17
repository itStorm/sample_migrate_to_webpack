'use strict';

require('bootstrap');
let db = require('db');

$(function () {
    var taskID = window.location.pathname.replace(/[\/]{2,}/g, '/').replace(/^\/|\/*$/g, '').split('/')[1];
    var task = db.findById('tasks', taskID)
    if (task) {
        $('.task').find('.title').html('#' + task.id + ' ' + task.title);
        $('.task').append(task.details);
        $('.jumbotron').removeClass('hidden');
    } else {
        $('.error').html('Task #' + taskID + ' has not found!');
        $('.error').removeClass('hidden');
    }
});