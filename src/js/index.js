var msg = require('./message');
var app = document.getElementById('app');
app.innerHTML = '<p>' + msg.hi + ',' + msg.event + "</p>";


if (module.hot) {
    // 启用热重载
    module.hot.accept();
}