import $ from "jquery";
import can from "can/"
import Map from "can/map/";

// Based on the regex in RFC2396 Appendix B.
var URL_PARSER = /^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/,
    Utils = {
        isSecure: (window.location.protocol == "https:"),

        pushState: function(title, path) {
            if(arguments.length === 1) {
                path = title;
                title = null;
            }

            history.pushState(title, null, path);
        },

        uuid: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    }).replace(/-/g, "");
        },

        getSelectedText: function () {
            var selection = false;

            if(window.getSelection) {
                selection = window.getSelection().toString();
            } else if(document.getSelection) {
                selection = document.getSelection().toString();
            } else {
                var selectionRange = document.selection && document.selection.createRange();
                if(selectionRange.text) {
                    selection = selectionRange.text;
                }
            }
            return selection;
        },

        resolveValueFromArgs: function(val) {
            // If it is a resolved value from an ajax request return the data.
            // We guess this because ajax calls resolved args are in the form
            // [data, parsestatus, jqXhr] where jqXhr is a Promise having an
            // always function the is very unlikely to find in other objects
            if(val && val[2] && (typeof(val[2].always)=='function')) {
                return val[0];
            }

            // otherwise return the val as is
            return val;
        },

        parseUrl: function(url) {
            if(typeof(url) !== "string") return "";
            var result = url.match(URL_PARSER);

            return {
                href: url,
                protocol: result[1] || null,
                host: result[2] || null,
                pathname: result[3] || null,
                search: result[4] || null,
                hash: result[5] || null
            };
        },

        jQueryCustomExprs: function(o) {
            // make a custom case insensitive attribute selector for jQuery
            jQuery.expr[':'].attrEquals = function(node, stackIndex, properties){
                var args = properties[3].split(',').map(function(arg) {
                            return arg.replace(/^\s*["']|["']\s*$/g, '');
                        }),
                    attrValue = $(node).attr(args[0]);
                return (attrValue) ? attrValue.toLowerCase() == args[1].toLowerCase() : false;
            };
        },

        browser: {
            name: function() {
                if ($.browser.webkit && !!window.chrome) {
                    return "chrome";
                } else if ($.browser.mozilla) {
                    return "mozilla";
                } else if ($.browser.webkit && !window.chrome) {
                    return "safari";
                } else if ($.browser.opera) {
                    return "opera";
                } else if ($.browser.msie) {
                    return "msie";
                } else {
                    return null;
                }
            },
            version: function() {
                return $.browser.version;
            }
        },

        // TODO check if its preferable to load something like Modernizr instead of implement 'supports'
        supports: {
            touch: function() {
                return !!('ontouchstart' in window);
            },
            history: function() {
                // WARNING: this is UGLY. It should check browser capabilities instead of vendor/version
                return (!$.browser.msie || $.browser.version.split('.')[0] > 9);
            },
            matchMedia: function() {
                return window.matchMedia;
            },
            cors: function() {
                return $.support.cors;
            }
        },

        arrayPropMatch: function(list, matchers){
            var mKeys = Object.keys(matchers);
            return list.filter(function(item) {
                var matches = true;
                mKeys.forEach(function(mKey) {
                    matches = (item[mKey] == matchers[mKey]);
                    if(!matches) return false;
                });
                return matches;
            });
        },

        arraySort: function(list, property, desc){
            if(!property || !list || !list.length) return list;

            var mod = (desc === true || desc === "desc") ? 1 : -1;
                propertyParts = property.split(".");

            list.sort(function(a, b) {
                for(var i = 0; i < propertyParts.length; i++) {
                    a = a[propertyParts[i]] || 0;
                    b = b[propertyParts[i]] || 0;
                }

                if(typeof(a) == "string"){
                    b = (typeof(b) != "string") ? "" : b;
                    return mod * (b.localeCompare(a));
                } else {
                    b = (typeof(b) != "number") ? 0 : b;
                    return mod * (b - a);
                }
            });

            return list;
        }
    };

var cache = (function() {
    var localData = can.Map();
    return {
        get: function(ns) {
            if(!localData.attr(ns)) {
                localData.attr(ns, {});
            }
            return localData.attr(ns);
        },
        clear: function(ns) {
            localData.attr(ns, {});
        },
        remove: function(ns) {
            delete localData.removeAttr(ns);
        }
    };
})();

// setup shortcuts to Utils for performance
export {cache};
export default Utils;
