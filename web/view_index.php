<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todo list</title>
    <link rel="icon" href="data:;base64,=">
    <link href="/todo-app/dist/bootstrap.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
    <link href="/css/jquery.flipcountdown.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="header clearfix">
        <nav>
            <ul class="nav nav-pills pull-right">
                <li role="presentation">
                    <a class="create_task" href="#">create task</a>
                </li>
            </ul>
        </nav>
        <h3 class="logo text-muted"><a href="/">Todo list</a></h3>
    </div>
    <div class="jumbotron">
        <div class="time_block"></div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <table class="table task_list">
                <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th></th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>

<!-- Create new task -->
<div class="modal fade" id="createTaskForm" tabindex="-1" role="dialog" aria-labelledby="createTaskLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="createTaskLabel">Create new task</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="title-text" class="control-label">Title:</label>
                        <input name="title" type="text" class="form-control" id="title-text">
                    </div>
                    <div class="form-group">
                        <label for="details-text" class="control-label">Details:</label>
                        <textarea name="details" class="form-control" id="details-text"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary submit">Create</button>
            </div>
        </div>
    </div>
</div>

<!--Confirm delete-->
<div class="modal fade" id="deleteDialog" tabindex="-1" role="dialog" aria-labelledby="deleteDialogLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="deleteDialogLabel"></h4>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary btn-danger submit">Delete</button>
            </div>
        </div>
    </div>
</div>
<script src="/todo-app/dist/vendors.js"></script>
<script src="/todo-app/dist/commons.js"></script>
<script src="/todo-app/dist/home.js"></script>

<script>
    $(function () {
        $('.time_block').flipcountdown({
            size: 'xs'
        });
    });
</script>
</body>
</html>