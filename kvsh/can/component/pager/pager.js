import can from "can/util/";
import Component from "can/component/";
import initView from "./views/init.stache!";

/**
 * Pager is responsible to display the pagination state (current page, next-previous
 * navigation, page count, items count etc.) and also update that state on user's
 * demand.
 *
 */
var Pager = Component.extend({
    tag: "kvsh-pager",
    helpers: {
        page: function() {
            return this.attr("paginate").page();
        },
        count: function() {
            return this.attr("paginate.pageCount");
        },
        print_2chars_index: function(index) {
            return index < 10 ? "&nbsp;"+index : index;
        }
    },
    template: initView,
    events: {
        '.pager-link click':function(el, ev){
            ev.preventDefault();
            if(el.hasClass("disabled") || el.hasClass("active")) {
                return;
            }

            var scope = this.scope,
                paginate = scope.attr("paginate");

            if(el.hasClass("first")) {
                paginate.first();
            } else if(el.hasClass("last")) {
                paginate.last();
            } else if(el.hasClass("prev")) {
                paginate.prev();
            } else if(el.hasClass("next")) {
                paginate.next();
            } else if(el.hasClass("page")) {
                var page = +el.attr("data-id");
                paginate.attr('page', page);
            }
        }
    }
});

export default Pager;
