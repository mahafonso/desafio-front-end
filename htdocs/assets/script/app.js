'use strict';

var self = this,
    $openMenu = $('header .open-menu'),
    $menu = $('header .menu'),
    dataNews = [],
    $sectionMainPrimary = $('.news.main .primary'),
    $sectionMainSecondary = $('.news.main .secondary'),
    $sectionMainTertiary = $('.news.main .tertiary'),
    $sectionFurtherBrasil = $('.news.further .brasil'),
    $sectionFurtherWorld = $('.news.further .world'),
    sectionMain,
    sectionMainPrimary,
    sectionMainSecondary,
    sectionMainTertiary,
    sectionFurtherBrasil,
    sectionFurtherWorld,
    dustCompiled;

var openMenu = function() {
    $openMenu.toggleClass('opened');
    $menu.css('top', $('header').outerHeight() + 'px');
    $menu.slideToggle();
}

var clickItemNew = function($item) {
    location.href = $item.data('href');
}

var init = function() {
    self.getDataJson();
}

var getDataJson = function() {
    $.getJSON('../data.json', function(data){
        dataNews = data;

        sectionMain = data.section[0].data,
        sectionMainPrimary = { items: sectionMain.slice(0,2) },
        sectionMainSecondary = { items: sectionMain.slice(2,4) },
        sectionMainTertiary = { items: sectionMain.slice(4) },
        sectionFurtherBrasil = { items: data.section[1].data },
        sectionFurtherWorld = { items: data.section[2].data };

        sectionMainSecondary.isSecondary = true;

        self.getTemplate();
    });
}

var getTemplate = function() {
    $.get('assets/templates/item.html', function(template){
        dustCompiled = dust.compile(template, 'itemNew');
        dust.loadSource(dustCompiled);

        self.renderTemplate();
    });
}

var renderTemplate = function() {
    dust.render('itemNew', sectionMainPrimary, function(err, out){
        $sectionMainPrimary.html(out);
    });

    dust.render('itemNew', sectionMainSecondary, function (err, out) {
        $sectionMainSecondary.html(out);
    });

    dust.render('itemNew', sectionMainTertiary, function (err, out) {
        $sectionMainTertiary.html(out);
    });

    dust.render('itemNew', sectionFurtherBrasil, function (err, out) {
        $sectionFurtherBrasil.find('.container').html(out);
    });

    dust.render('itemNew', sectionFurtherWorld, function (err, out) {
        $sectionFurtherWorld.find('.container').html(out);
    });

    $('.news .item').on('click', function () {
        self.clickItemNew($(this));
    });

    if ($(window).width() <= 560) {
        $('.news .tertiary .item').each(function () {
            var textHeight = $(this).find('.text').height();

            $(this).css('padding-bottom', (textHeight + 30) + 'px');
        });
    }
}

$openMenu.on('click', function () {
    self.openMenu();
});

self.init();