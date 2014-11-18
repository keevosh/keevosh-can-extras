steal("../base/", function(Control) {

/**
 * @class Modal
 */
var Modal = Control.extend(
/** @Static */
{
  defaults: {
    destroyOnClose: true,
    showOnRender: true
  }
},
/** @Prototype */
{
  render: function (options) {
    var self = this,
      _render = this._super(options);

    if (this.options.showOnRender === true) {
      _render.done(function () {
        self.showModal();
      });
    }
  },
  destroy: function (destroyOnClose) {
    this.hideModal();
    if (destroyOnClose !== false) {
      this.element.html("");
      this._super();
    }
  },
  update: function (options) {
    this.options.attr(options);
    this.showModal();
  },
  showModal: function (speed, callback) {
    speed = speed || 200;
    if (arguments.length === 1) {
      callback = speed;
      speed = 200;
    }
    this.element.show(speed, callback);
  },
  hideModal: function (speed, callback) {
    speed = speed || 0;
    if (arguments.length === 1) {
      callback = speed;
      speed = 0;
    }
    this.element.hide(speed, callback);
  },
  " click": function (el, ev) {
    ev.stopPropagation();
    var visible = this.element.is(":visible"),
      clickedInModalContent = $(ev.target).closest(".modal-content").length > 0;

    if (visible && !clickedInModalContent) {
      this.destroy(this.options.destroyOnClose);
      return;
    }
  },
  "{window} keyup": function (el, ev) {
    if (ev.keyCode === 27) { // esc
      this.destroy(this.options.destroyOnClose);
    }
  },
  "button.close click": function (el, ev) {
    ev.stopPropagation();
    this.destroy(this.options.destroyOnClose);
  }
});

return Modal;

});
