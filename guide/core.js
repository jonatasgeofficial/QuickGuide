/* GUIDE - CORE */
var guide = {
    build: function (where, how, what, callback) {
        $(where)[how](what);
        if (callback) callback();
        return guide;
    },
    get: function (way, callback) {
        var result = guide.roam(guide.main, way);

        if (callback) {
            callback(result);
            return guide;
        } else return result;
    },
    ready: function () {
        var interval = setInterval(function () {
            if (guide.waitingRequest === 0) {
                clearInterval(interval);
                guide.run('build');
            }
        }, 50);
    },
    request: function (url, callback) {
        guide.waitingRequest++;
        $.ajax({
            cache: false,
            method: 'get',
            url: url,
            success: function (result) {
                guide.waitingRequest--;
                callback(result);
            },
            error: function (result) {
                guide.waitingRequest--;
                callback(result);
            }
        });
        return guide;
    },
    roam: function (where, way, what, callback) {
        var result = where;

        var way = way.split('.');
        if (what) {
            for (var i in way) {
                if (result[way[i]] === undefined) result[way[i]] = {};
                if (i >= way.length - 1) result[way[i]] = what;
                result = result[way[i]];
            }
        } else
            for (var i in way) {
                if (result[way[i]] !== undefined) result = result[way[i]];
                else {
                    result = undefined;
                    break;
                };
            }

        if (callback) {
            callback(result);
            return guide;
        } else return result;
    },
    run: function (where, name) {
        if (name) guide.main[where][name]();
        else
            for (var key in guide.main[where])
                guide.main[where][key]();
        return guide;
    },
    set: function (why, what, callback) {
        guide.roam(guide.main, why, what);
        if (callback) callback();
        return guide;
    },
    waitingRequest: 0,
    main: {}
}

guide.set('start.zz_ready', guide.ready);