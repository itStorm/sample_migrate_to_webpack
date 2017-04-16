<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todo list</title>
    <link rel="icon" href="data:;base64,=">
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
    <link href="/css/task_view.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="header clearfix">
        <h3 class="logo text-muted"><a href="/">Todo list</a></h3>
    </div>
    <div class="alert alert-danger hidden error" role="alert"></div>
    <div class="jumbotron hidden">
        <div class="row">
            <div class="col-xs-12">
                <div class="task">
                    <h4 class="title"></h4>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/js/jquery-3.2.1.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/db.js"></script>
<script>
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
</script>
</body>
</html>