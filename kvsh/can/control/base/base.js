import can from "can/";
import Control from "can/control";

/**
 * @class Base is the parent can controller for Keevosh projects.
 *
 * Contains the rendering logic using helpers and partials.
 */
var base = Control.extend(
/** @Static */
{
    defaults : {
        helpers: {},
        partials: {}
    }
},
/** @Prototype */
{
    /**
     * Render is called by each controller's init and usually it's called once and
     * then we just update controller's options and live-binding does the updates.
     *
     * There are two "special" properties in defaults, helpers that define any
     * helpers that are controller specific and partials for any partials that should
     * be available in the templates for rendering.
     *
     * A deferred object is returned that is resolved with controller's element when
     * rendering is complete.
     *
     * @param {object|can.Map} options
     * @returns {can.Deferred}
     */
    render : function(options) {
        var self = this,
            rendered = can.Deferred(),
            viewData = options || this.options, // set viewData to be controller's options
            viewOptions = { helpers: viewData.helpers, partials: viewData.partials };

        this.element.html("");
        can.view.renderAs("fragment", this.options.initView, viewData, viewOptions, function(frag) {
            self.element.append(frag);
            rendered.resolve(self.element);
        });
        return rendered;
    }
});

export default base;
