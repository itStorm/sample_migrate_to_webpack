<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todo list</title>
    <link rel="icon" href="data:;base64,=">
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
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
<script src="/todo-app/dist/vendors.js"></script>
<script src="/todo-app/dist/commons.js"></script>
<script src="/todo-app/dist/view.js"></script>
</body>
</html>