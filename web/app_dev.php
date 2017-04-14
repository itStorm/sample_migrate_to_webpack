<?php
$uriRequest = trim($_SERVER['REQUEST_URI'], '/');
if(!($page = strstr($uriRequest, '?', true))) {
    list($page) = explode('/', $uriRequest, 2);
}

ob_start();
if(!$page) {
    include('view_index.php');
} else {
    http_response_code(404);
    echo 'Page not found 404';
}

$content = ob_get_clean();
echo $content;