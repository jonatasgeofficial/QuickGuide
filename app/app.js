var app = {
    build: function (where, how, what, callback) {
        $(where)[how](what);
        if (callback) callback();
        return app;
    },
    get: function (where, name, callback) {
        var what = app.main[where] ?
            app.main[where][name] ?
            app.main[where][name] :
            app.main[where] : undefined;
        if (callback) {
            callback(what);
            return app;
        } else return what;
    },
    ready: function () {
        var interval = setInterval(function () {
            if (app.waitingRequest === 0) {
                clearInterval(interval);
                app.run('build');
            }
        }, 50);
    },
    request: function (url, callback) {
        app.waitingRequest++;
        $.ajax({
            cache: false,
            method: 'get',
            url: url,
            success: function (result) {
                app.waitingRequest--;
                callback(result);
            },
            error: function (result) {
                app.waitingRequest--;
                callback(result);
            }
        });
        return app;
    },
    run: function (where, name) {
        if (name)
            app.main[where][name]();
        else
            for (var func in app.main[where])
                app.main[where][func]();
        return app;
    },
    set: function (where, name, what, callback) {
        if (!app.main[where]) app.main[where] = {};
        app.main[where][name] = what;
        if (callback) callback();
        return app;
    },
    waitingRequest: 0,
    main: {}
}

app.set('start', 'zzz_ready', app.ready);