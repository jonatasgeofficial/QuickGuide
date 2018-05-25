/* GUIDE - COMPONENTS */
guide
    // COMPONENTS
    .set('start.components', function () {
        guide.browse('components', guide.tryLink, {
            trim: true,
            where: 'components'
        });
    }).run('start')
    // MENU
    .set('build.menu', function () {
        guide
            .build(guide.get('config.ref.menu'), 'html', guide.get('components.menu'))
            .browse('topics', guide.tryLink, {
                trim: true,
                where: 'topics'
            });

        var item = $(guide.get('components.menuitem'));

        var interval = setInterval(function () {
            var topics = guide.get('topics');
            if (topics) {
                clearInterval(interval);
                
                for (var key in topics) {
                    var link = item.clone();

                    link
                        .find('.print-here')
                        .attr('href', '#/topics/' + key)
                        .removeClass('.print-here')
                        .text(decodeURI(key));

                    guide
                        .build(guide.get('config.ref.menuitems'), 'append', link)
                }
            }
        }, 50);
    });

// guide.get('components/menu/menu.html', function (menu) {}


//     guide.get('components/menu/menu.html', function (menu) {
//         guide
//             .build('aside', 'html', menu)
//             .get('components/menu/menuitem.html', function (menuitem) {
//                 function renderMenuCategory(where, name, url) {
//                     if (!guide.getComponent('collapsible'))
//                         guide.get('components/collapsible/collapsible.html', function (collapsible) {
//                             guide.manager('componet', 'collapsible', collapsible);
//                             renderMenuCategory(name, url);
//                         })

//                     var item = $(menuitem);
//                     item
//                         .find('.print-here')
//                         .attr('href', '?page=' + url)
//                         .text(name);

//                     guide.build(where, 'html', item);
//                 }

//                 function renderMenuItem(where, name, url) {
//                     var item = $(menuitem);
//                     item
//                         .find('.print-here')
//                         .attr('href', '#/' + url)
//                         .text(name);

//                     guide.build(where, 'html', item);
//                 }

//                 function renderMenu(where, what) {
//                     var items = $('a', what);

//                     for (var i = 1; i < items.length; i++) {
//                         var link = $(items[i])
//                             .attr('href')
//                             .replace(location.pathname, ''),
//                             split = link.split('/');

//                         if (split[split.length - 1].indexOf('.html') !== -1) {
//                             renderMenuItem(
//                                 where,
//                                 split[split.length - 1]
//                                 .replace('.html', ''),
//                                 link
//                             );
//                         } else {
//                             var id = 'menuCategory' + guide.randomInt(1, 1000000);

//                         }
//                     }
//                 }

//                 guide.get('topics', function (r) {
//                     renderMenu('#menu', r);
//                 });
//             })
//     });
// })