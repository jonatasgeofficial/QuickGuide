/* GUIDE - TOOLS */
guide.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

guide.browse = function (url, callback, data) {
    guide.request(url, function (result) {
        var items = $('a', result);
        for (var i = 1; i < items.length; i++)
            callback($(items[i]), data);
    });
}

guide.tryLink = function (link, data) {
    var url = link.attr('href').replace(location.pathname, ''),
        split = url.split('/'),
        where = data.where;

    if (split[split.length - 1] === '') guide.browse(url, guide.tryLink, data);
    else {
        var name = '.' + split[split.length - 1].replace(guide.get('config.fileExtension'), '');
        guide.request(url, function (result) {
            if (data.trim) result = result.replace(/  /g, '');
            guide.set(where + name, result);
        });
    }
}