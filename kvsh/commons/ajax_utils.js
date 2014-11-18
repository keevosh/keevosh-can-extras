steal("can/", "jquery", "kvsh/commons/utils", "kvsh/commons/noty",
function(can, $, Utils, Noty) {

var AjaxUtils = {
    makeButtonLoading: function(buttonEl, text) {
        if(text) {
            buttonEl.data("origText", buttonEl.is(":button") ? buttonEl.html() : buttonEl.val());
            buttonEl.is(":button") ? buttonEl.html(text) : buttonEl.val(text);
        }
        buttonEl.addClass("loading disabled");
    },

    revertButtonLoading: function(buttonEl) {
        buttonEl.removeClass("loading disabled");
        var text = buttonEl.data("origText");
        if(text){
            buttonEl.is(":button") ? buttonEl.html(text) : buttonEl.val(text);
        }
    },

    /**
     * Handles the communication errors and general response's status codes
     * @return true if the xhr was handled or false otherwise
     */
    ajaxErrorHelper: function(response, error, exception) {
        var noty = App.Common.Noty,
            message = null,
            statusErrorMap = {
                '401' : "Unauthorised access.",
                '403' : "Forbidden resouce can't be accessed",
                '500' : "Internal Server Error.",
                '503' : "Service Unavailable"
            };

        if (response.status) {
            message=statusErrorMap[response.status];
            if(!message) return false;
        } else if(error=='clientvalidationerror'){ //thrown by PS client validation
            return false;
        } else if(error=='parsererror'){
            message="Error.\nParsing JSON Request failed.";
        } else if(error=='timeout'){
            message="Request Time out.";
        } else if(error=='abort'){
            message="Request was aborted by the server";
        } else {
            message="Unknow Error \n.";
        }

        noty.showMessage(noty.ERROR, message);
        return true;
    },

    ajaxValidationErrorHelper: function(response, error, exception, options) {
        if(response.status && response.status != 400) return false;
        options = $.extend({}, options);

        var self = this,
            validation,errors,fields;

        try {
            validation = (response.status == 400) ? JSON.parse(response.responseText) : response;
            errors = validation.errors;
            fields = Object.keys(errors || {});
            f = null;
        } catch(e) {
            //steal.dev.warn(e);
            return false;
        }

        if(validation.globalMessage) {
           Noty.showMessage(Noty.ERROR, validation.globalMessage);
        }

        self.cleanValidationFields();
        for(var i=0; i<fields.length; i++) {
            f = fields[i];
            $("#" + (options.errorPrefix || "") + f.replace(/[\.\[\]]/g, "_") + (options.errorSuffix || "_error")).addClass("validation-error").html(errors[f]);
        }
        return true;
    },

    cleanValidationFields: function(form) {
        var $ctx = form ? $(form) : $(document.body);
        $ctx.find(".validation-error").removeClass("validation-error").html("");
    }
};

return AjaxUtils;

});
