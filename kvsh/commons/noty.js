import $ from "jquery";
import Utils from "kvsh/commons/utils";
import noty from "noty/jquery.noty";
import "noty/layouts/topRight";
import "noty/themes/relax";
import "animate/animate.css!$less";

$.noty.defaults = {
  layout: "topRight",
  theme: 'relax', // or 'relax'
  type: 'alert',
  text: '', // can be html or string
  dismissQueue: true, // If you want to use queue feature set this true
  template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
  animation: {
      open: 'animated bounceInRight', // Animate.css class names
      close: 'animated flipOutX' // Animate.css class names
      //, easing: 'swing',
      //, speed: 500 // opening & closing animation speed
  },
  timeout : 4500, // delay for closing event. Set false for sticky notifications
  force: false, // adds notification to the beginning of queue when set to true
  modal: false,
  maxVisible: 6, // you can set max visible notification for dismissQueue true option,
  killer: false, // for close all notifications before show
  closeWith: ['button'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
  callback: {
      onShow: $.noop,
      afterShow: $.noop,
      onClose: $.noop,
      afterClose: $.noop,
      onCloseClick: $.noop
  },
  buttons: false // an array of buttons
};

var Noty = {
  INFO: "information",
  SUCCESS: "success",
  WARN: "warning",
  ERROR: "error",
  ALERT: "alert",
  CONFIRM: "confirmation",

  showMessage: function(level, message, opts) {
      opts = can.extend({}, opts, {
          type: level,
          text: message
      });
      return noty(opts);
  }
};

export default Noty;
