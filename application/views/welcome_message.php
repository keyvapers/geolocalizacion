<!DOCTYPE html>
<html lang="en">
<head>
<script src="https://js.pusher.com/5.1/pusher.min.js"></script>
</head>
<body>
<script>
    Pusher.logToConsole = true;

    var pusher = new Pusher('4d141fc651ae0778d77c', {
    cluster: 'us2',
    forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
    alert(JSON.stringify(data));
    });
</script>
</body>
</html>
