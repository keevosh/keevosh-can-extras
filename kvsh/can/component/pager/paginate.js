import can from "can/util/";
import Map from "can/map/define/";

/**
 * Paginate object is used to keep a state for pageable data. Usually an instance
 * of a Paginate object is shared between a grid (presentation component) that
 * loads and displays the corresponding page of data and a pager (change component)
 * that is only responsible to set the correct params in this instance.
 *
 * We let the grid read the params of the paginate instance to load the correct page
 * and the pager set the params in the same instance. Rendering and view updates all
 * happen automatically due to change events in paginate (it's an observable can.Map)
 * and can view's live binding.
 */
var Paginate = Map.extend({
    define: {
        count: {
            type: "number",
            value: Infinity,
            // Keeps count above 0.
            set: function(newCount, setValue) {
                can.batch.start();
                setValue(newCount < 0 ? 0 : newCount);
                this.calcPages();
                can.batch.stop();
            }
        },
        offset: {
            type: "number",
            value: 0,
            // Keeps offset between 0 and count
            set: function(newOffset) {
                var count = this.attr("count");
                return newOffset < 0 ? 0 : Math.min(newOffset, !isNaN(count - 1) ? count - 1 : Infinity);
            }
        },
        limit: {
            type: "number",
            value: 5
        },
        page: {
            // Setting page changes the offset
            set: function(newVal){
                can.batch.start();
                this.attr('offset', (parseInt(newVal) - 1) * this.attr('limit'));
                this.calcPages();
                can.batch.stop();
            },
            // The page value is derived from offset and limit.
            get: function () {
                return Math.floor(this.attr('offset') / this.attr('limit')) + 1;
            }
        },
        pageCount: {
            set: function(newVal, setValue) {
            },
            get: function () {
                return this.attr('count') ? Math.ceil(this.attr('count') / this.attr('limit')) : null;
            }
        },
        slots: {
            // number of pages to display for direct selection
            type: "number",
            value: 5
        },
        pages: {
            // an array containing the numbers of the pages to display (its length should be equals to slots)
            type: "*",
            value: []
        },
        hasMoreThanOnePages: {
            // a pure virtual field returning a boolean true if pages.length > 1
            get: function() {
                var pages = this.attr('pages'),
                    pagesLength = pages ? pages.length : 0;

                return (pagesLength > 1);
            },
            set: function(newVal, setValue) {}
        }
    },

    /**
     * Initialize this Paginate model
     */
    init: function() {
        this.calcPages();
    },
    next: function () {
        can.batch.start();
        this.attr('offset', this.offset + this.limit);
        this.calcPages();
        can.batch.stop();
    },
    prev: function () {
        can.batch.start();
        this.attr('offset', this.offset - this.limit);
        this.calcPages();
        can.batch.stop();
    },
    canNext: function() {
        return this.attr('offset') < this.attr('count') - this.attr('limit');
    },
    canPrev: function() {
        return this.attr('offset') > 0;
    },
    canNextPages: function() {
        var pages = this.attr('pages');
        if(!pages || !pages.length) {
            return false;
        }
        return pages[pages.length - 1].index < this.attr('pageCount');
    },
    canPrevPages: function() {
        var pages = this.attr('pages');
        if(!pages || !pages.length) {
            return false;
        }
        return pages[0].index > 1;
    },
    canStart: function() {
        return this.attr('offset') > this.attr('limit') - 1;
    },
    canEnd: function() {
        return this.attr('offset') < Math.floor(this.attr("count")/this.attr("limit")) * this.attr("limit");
    },
    first: function(){
        this.attr("page", 1);
    },
    last: function(){
        this.attr("page", Math.ceil(this.attr("count")/this.attr("limit")));
    },
    isCurrent: function(index) {
        index = (typeof index === 'object') ? index.index : index;
        return this.attr("offset") == (index - 1) * this.attr("limit");
    },
    calcPages: function() {
        var pages = [],

            // cache this.*
            page = this.attr("page"),
            //pageCount = this.attr("pageCount"), // WEIRD but when count is set, and its setter calls this function, pageCount reads the old count yet
            pageCount = this.attr('count') ? Math.ceil(this.attr('count') / this.attr('limit')) : null, // but when pageCount getter is inlined here it works

            // calc vars for available pages, slots and start/end positions
            slots = Math.min(pageCount, this.slots),
            start = page - Math.floor(slots/2),
            end = page + Math.ceil(slots/2);

        // normalize bounds if start/end are edge cases
        if(start < 1 && end >= pageCount){
            start = 1;
            end = pageCount + 1;
        } else if(start < 1) {
            start = 1;
            end = slots + 1;
        } else if(end == pageCount) {
            start = pageCount - slots;
            end = pageCount;
        } else if(end > pageCount) {
            start = pageCount - slots + 1;
            end = pageCount + 1;
        }

        // fill pages array with the page numbers to show
        for(var i = start; i < end; pages.push({index:i}), i++);

        // update this.pages
        this.attr("pages",pages);
        return pages;
    }
});

export default Paginate;