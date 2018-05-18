var app = {
    build: function (where, how, what, callback) {
        $(where)[how](what);
        if (callback) who(callback);

        return app;
    },
    get: function (url, callback) {
        $.ajax({
            method: 'get',
            url: url,
            success: callback,
            error: callback,
        });

        return app;
    },
    manager: function (where, name, what) {
        if (!app.custom[where]) app.custom[where] = {};
        app.custom[where][name] = what;

        return app;
    },
    run: function (where, name) {
        if (name)
            app.custom[where][name]();
        else
            for (var func in app.custom[where])
                app.custom[where][func]();

        return app;
    },

    custom: {}
}