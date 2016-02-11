/// <reference path="../../../Scripts/typings/knockout.d.ts"/>
/// <reference path="../../../Scripts/typings/knockout.mapping.d.ts"/>
define(["require", "exports", 'Services/Info', 'Application', 'knockout.mapping'], function (require, exports, info, app, mapping) {
    requirejs(['css!content/Home/News']);
    return function (page) {
        var model = {
            news: null,
            back: function () {
                app.back().fail(function () {
                    app.redirect('Home_NewsList');
                });
            },
            category: ko.observable()
        };
        page.load.add(function (sender, args) {
            var id = args.id;
            return info.getArticleById(id).done(function (news) {
                if (model.news == null) {
                    model.news = mapping.fromJS(news);
                    ko.applyBindings(model, sender.node);
                }
                else {
                    mapping.fromJS(news, {}, model.news);
                }
            });
        });
        if (page.conatiner instanceof chitu.IScrollPageContainer) {
            page.scrollEnd.add(function () {
                page.refreshUI();
            });
        }
    };
});
