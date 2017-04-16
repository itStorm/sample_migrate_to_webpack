<?php
$uriRequest = trim($_SERVER['REQUEST_URI'], '/');
$clearURL = strstr($uriRequest, '?', true);
$clearURL = $clearURL === false ? $uriRequest : $clearURL;
list($page) = explode('/', $clearURL, 2);

ob_start();
if (!$page) {
    include('view_index.php');
} elseif ($page == 'task') {
    include('view_task.php');
} else {
    http_response_code(404);
    echo 'Page not found 404';
}

$content = ob_get_clean();
echo $content;