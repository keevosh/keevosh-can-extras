steal("jquery", "noty/jquery.noty.js", "kvsh/commons/utils.js",
"noty/layouts/topRight.js", "noty/themes/default.js",
function($, noty, Utils) {

var _default = {
        layout: "topRight",
        theme: "defaultTheme",
        speed: 0,
        timeout : 3500,
        animation: {
            open: {height: 'toggle'},
            close: {height: 'toggle'},
            easing: 'swing',
            speed: 150 // opening & closing animation speed
        },
        maxVisible: 6,
        closeWith: ['button']
    },
    Noty = {
        INFO: "success",
        SUCCESS: "success",
        ERROR: "error",
        WARN: "alert",

        showMessage: function(level, message, buttons) {
            var opts = can.extend({}, _defaults, {
                type: level,
                text: message
            });
            noty(opts);
        }
    };

return Noty;

});
