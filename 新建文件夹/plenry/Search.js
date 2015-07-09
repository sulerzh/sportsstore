// JavaScript source code

!function () {
    Template.Search.rendered = function () {
        $("#navbar").css({ position: "fixed", "z-index": "10000", width: "100%", top: "0" }),
        $(".pusher").css({ "margin-top": "5.2rem" }),
        this.$(".ui.dropdown").dropdown(),
        this.$("#event-date").datepicker({ autoclose: true }),
        Router.current().params.query.keywords && Template.instance().keywords.set(),
        Router.current().params.query.date &&
        Template.instance().date.set(new Date(Router.current().params.query.date)),
        Router.current().params.query.city &&
        Template.instance().city.set(Router.current().params.query.city),
        Router.current().params.query.number &&
        Template.instance().number.set(parseInt(Router.current().params.query.number))
    },
    Template.Search.events({
        "click #redo-search-btn": function () {
            Template.instance().date.set($("#event-date").val().length > 0 ?
                new Date($("#event-date").val()) : null),
            $("#search-spots").val().length > 0 &&
            Template.instance().number.set(parseInt($("#search-spots").val())),
            Session.set("Search nel",
                GoogleMaps.get("searchMap").instance.getBounds().getNorthEast().lat()),
            Session.set("Search neg",
                GoogleMaps.get("searchMap").instance.getBounds().getNorthEast().lng()),
            Session.set("Search swl",
                GoogleMaps.get("searchMap").instance.getBounds().getSouthWest().lat()),
            Session.set("Search swg",
                GoogleMaps.get("searchMap").instance.getBounds().getSouthWest().lng())
        }
    }),
    Template.Search.helpers({
        mapOptions: function () {
            if (GoogleMaps.loaded()) {
                var e = new google.maps.LatLng(37.691, -122.3108);
                return GoogleMaps.ready("searchMap", function (e) {
                    var t = new google.maps.Geocoder;
                    Router.current().params.query.city ?
                    t.geocode({ address: Router.current().params.query.city },
                        function (t, a) {
                            a == google.maps.GeocoderStatus.OK &&
                            (e.instance.setCenter(t[0].geometry.location),
                            e.instance.setZoom(12), Session.set("Search nel",
                                e.instance.getBounds().getNorthEast().lat()),
                            Session.set("Search neg", e.instance.getBounds().getNorthEast().lng()),
                            Session.set("Search swl", e.instance.getBounds().getSouthWest().lat()),
                            Session.set("Search swg", e.instance.getBounds().getSouthWest().lng()),
                            Session.set("Search map ready", true))
                        }) : Session.set("Search map ready", true)
                }), { center: e, zoom: 8 }
            }
        },
        searchResults: function () {
            return Template.instance().results().map(function (e, t) {
                return e.index = t + 1, e
            })
        }, isReady: function () {
            return Template.instance().ready.get()
        }, queryDate: function () {
            return Router.current().params.query.date ?
                Router.current().params.query.date.replace(/-/g, "/") : void 0
        }, queryNumber: function () {
            return Router.current().params.query.number
        }, totalEventsFound: function () {
            return Template.instance().results &&
                Template.instance().results().count ?
                Template.instance().results().count() : 0
        }
    }),
    Template.Search.created = function () {
        var e = this;
        Session.set("Search map ready", false),
        e.keywords = new ReactiveVar(""),
        e.city = new ReactiveVar(""), e.date = new ReactiveVar,
        e.number = new ReactiveVar(1), e.loaded = new ReactiveVar(0),
        e.limit = new ReactiveVar(50), e.offset = new ReactiveVar(0),
        e.ready = new ReactiveVar(false), e.criteria = new ReactiveVar({}),
        e.autorun(function () {
            var t = e.limit.get(), a = e.date.get(), r = e.number.get(),
                s = e.keywords.get(), n = Session.get("Search nel"),
                o = Session.get("Search neg"), c = Session.get("Search swl"),
                i = Session.get("Search swg"), u = {};
            if (s && s.length > 1 && (u.$text = { $search: s }), a) {
                var l = new Date(a);
                l.setDate(l.getDate() + 1),
                u["time.startAt"] = { $gte: a, $lt: l }
            } r && (u.spotsLeft = { $gte: r }), n && o && c && i &&
            (u["location.lat"] = { $gt: parseFloat(c), $lt: parseFloat(n) },
            u["location.lng"] = { $gt: parseFloat(i), $lt: parseFloat(o) }),
            u.status = 1, e.criteria.set(u); var g = Meteor.subscribe("searchMeals",
                u, e.offset.get()); g.ready() ? (console.log("Received meals. \n\n"),
            e.loaded.set(t), e.ready.set(true)) :
            (e.ready.set(false), console.log("Search meal subscription is not ready yet. \n\n"))
        }), e.results = function () {
            return Session.get("Search map ready") ? Meals.find(e.criteria.get(),
                { limit: e.loaded.get() }) : []
        }
    }
}();
