app.getComponent = function (name) {
    return app.custom.components[name];
}

app.randomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app
    .manager('build', 'menu', function () {
        app.get('components/menu/menu.html', function (menu) {
            app
                .build('aside', 'html', menu)
                .get('components/menu/menuitem.html', function (menuitem) {
                    function renderMenuCategory(where, name, url) {
                        if (!app.getComponent('collapsible'))
                            app.get('components/collapsible/collapsible.html', function (collapsible) {
                                app.manager('componet', 'collapsible', collapsible);
                                renderMenuCategory(name, url);
                            })

                        var item = $(menuitem);
                        item
                            .find('.print-here')
                            .attr('href', '?page=' + url)
                            .text(name);

                        app.build(where, 'html', item);
                    }

                    function renderMenuItem(where, name, url) {
                        var item = $(menuitem);
                        item
                            .find('.print-here')
                            .attr('href', '#/' + url)
                            .text(name);

                        app.build(where, 'html', item);
                    }

                    function renderMenu(where, what) {
                        var items = $('a', what);

                        for (var i = 1; i < items.length; i++) {
                            var link = $(items[i])
                                .attr('href')
                                .replace(location.pathname, ''),
                                split = link.split('/');

                            if (split[split.length - 1].indexOf('.html') !== -1) {
                                renderMenuItem(
                                    where,
                                    split[split.length - 1]
                                    .replace('.html', ''),
                                    link
                                );
                            } else {
                                var id = 'menuCategory' + app.randomInt(1, 1000000);

                            }
                        }
                    }

                    app.get('topics', function (r) {
                        renderMenu('#menu', r);
                    });
                })
        });
    })