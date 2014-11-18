steal("can/util/", "can/component/", "./views/init.stache!",
function(can, Component, initView) {

/**
 * Grid component is like an 'advanced' table that we can attach functionality to.
 *
 */
var Grid = Component.extend({
    tag: "kvsh-grid",
    scope: {
        items: []
    },
    template: initView,
    events: {
        init: function() {
            this.update();
        },

        /**
         * Make sure that data are fetched in scope.deferreddata and then set
         * scope.items. Everytime items change the view is automatically updated
         * due to can view's live binding.
         */
        update: function() {
            var deferred = this.scope.attr('deferreddata'),
                scope = this.scope;
            if(!deferred) return;
            if (can.isDeferred(deferred)) {
                deferred.then(function(items) {
                    scope.attr('items', items.data || items);
                });
            } else {
                scope.attr('items', deferred.data || deferred);
            }
        },

        /**
         * Here we can do things when items change. For example we can show
         * a loading icon in component's update() method and hide it here
         * that we know data are loaded in scope.items.
         */
        "{items} change": function() {},

        /**
         * call update when deferreddata change
         */
        "{scope} deferreddata": "update"
    }
});

return Grid;

});
