app.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
app.browse = function (url, callback, data) {
    app.request(url, function (result) {
        var items = $('a', result);
        for (var i = 1; i < items.length; i++)
            callback($(items[i]), data);
    });
}
app.tryLink = function (link, where) {
    var url = link.attr('href').replace(location.pathname, ''),
        split = url.split('/');

    if (split[split.length - 1] === '') app.browse(url, app.tryLink, where);
    else {
        var name = split[split.length - 1].replace('.html', '');
        app.request(url, function (result) {
            app.set(where, name, result);
        });
    }
}