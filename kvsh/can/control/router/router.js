steal("can/", "can/construct/", "can/control/", "kvsh/commons/utils.js",
"can/route/", "can/control/route/", "can/control/plugin/",
function(can, Construct, Control, Utils) {

/**
 *
 * @class RouteData
 */
var RouteData = Construct.extend(
/** @Prototype */
{
    /**
     * Serialize RouteData to a plain js object. We can instruct the serialization
     * process to keep the previous field in the result or not. Keeping previous
     * can leak memory and keep the object graph growing.
     *
     * @param {Boolean} ignorePrevious
     * @returns {Object}
     */
    serialize: function(ignorePrevious) {
        var result = can.extend({}, this, {});
        if(ignorePrevious) delete result.previous;
        return result;
    },

    /**
     * Update RouteData. We change routeData properties and we also keep previous
     * state in the previous field (actually by serializing it to a plain object)
     * and then we trigger a change event.
     *
     * @param {Object} newData
     */
    update: function(newData) {
        // keep current state as the previous state
        this.previous = this.serialize(true);

        // add new values to changed fields and trigger change
        can.extend(this, newData);
        this.dispatch("change", [this]);
    }
});
can.extend(RouteData.prototype, can.event);

// a default instance of route data to be used as default in common Router
// if no other routeData is set in its options.
var routeData = new RouteData();


/**
 * @class Router is the base router used in Keevosh projets.
 *
 * Contains the logic of adding / removing controllers in an elements
 * and handling url paths.
 */
var Router = Control.extend(
/** @Static */
{
    defaults : {
        routeData: routeData
    },

    getUrlPath: function() {
        // get location.pathname and remove leading and trailing slashes
        var path = window.location.pathname.substring(1);
        if(path.substring(path.length-1) === "/") {
            path = path.substring(0, path.length-1);
        }

        return path;
    },

    setSingleController: function(el, ControllerClass, controllerOptions, options) {
        options = can.extend({
            keepOthers: false,
            update: false
        }, options);

        var self = this,
            controllers = el.controls(),
            doRender = true;

        controllers.forEach(function(c, i) {
            c = controllers[i];
            if(c.constructor === ControllerClass) {
                doRender = false;
                options.update && c.update(controllerOptions);
            } else {
                !options.keepOthers && c.destroy();
            }
        });

        if(!doRender) return;

        options.loadingView && el.html("").append(options.loadingView());
        return new ControllerClass(el, controllerOptions);
    }
},
/** @Prototype */
{
    getUrlPath: function() {
        return this.constructor.getUrlPath();
    },

    setSingleController: function(el, ControllerClass, controllerOptions, options) {
        return this.constructor.setSingleController(el, ControllerClass, controllerOptions, options);
    },

    setupCommons: function(screen, page, data) {
        routeData = this.options.routeData;
        return routeData && routeData.update({
            location: window.location,
            screen: screen,
            page: page,
            data: data || null
        });
    }

});

return Router;

});
