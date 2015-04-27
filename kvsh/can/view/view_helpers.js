import can from "can/";
import stache from "can/view/stache/";
import moment from "moment/";

/**
 * If given value is function the it returns the result of val.call() otherwise
 * it return val itself.
 *
 * @param {*} val
 * @returns {*} the result value
 */
var _get_compute_value = function(val) {
    return can.isFunction(val) ?  val() : val; // check if it's a can.compute
};

/**
 * Prune original context and return only direct context with no parents.
 * Potential performance and less error-prone variable resolving.
 *
 * @param {object|can.view.State} options
 * @returns {object} the result context
 */
function _prune_context(options) {
    return options.context || this;
}

/**
 * Format a timestamp to a date string, The dateType parameter can accept a
 * format name of <code>pretty, long</code> or an explicit format like <code>YYYY-MM-dd HH:mm</code>
 * (see <a href="http://momentjs.com/docs/#/parsing/string-format/">moment's documentation</a>)
 *
 * @param {Number} time
 * @param {string} dateType
 * @returns {string} the time formatted according to the dateType value
 */
function _print_date(time, dateType) {
    time = moment(_get_compute_value(time));
    switch(dateType) {
        case 'pretty': {
            return time.from(new Date().getTime());
        } break;

        case 'long': {
            return "{0} {1}".format(moment.weekdays(time.weekday()), time.format("HH:mm, D MMM YYYY"));
        } break;

        default: {
            return time.format(dateType);
        }
    }
}

var viewHelpers = {
    /**
     * Log the given data and the helpers context. Useful for debugging
     * obviously :)
     *
     * @param {object} data the data we want to log
     * @param {object|can.view.State} options the helpers options as passed by the view engine
     * @returns {String}
     */
    'debug': function(data, options) {
        console.log("STACHE DEBUG: ", _get_compute_value(data), options.context);
        return "";
    },

    /**
     * Helper to pass if operants (op1, op2) are equal.
     *
     * @param {*} op1
     * @param {*} op2
     * @param {object|can.view.State} options the helpers options as passed by the view engine
     * @returns {*} the result of options.fn or options.inverse depending on the equality result
     */
    'ifeq': function (op1, op2, options) {
        op1 = _get_compute_value(op1);
        op2 = _get_compute_value(op2);

        var ctx = options.context || this; // Prune original context and let children
                                           // of this helper access only the given context
                                           // but not its parents. Potential performance
                                           // and less error-prone variable resolving.

        return ((op1 == op2) ? options.fn(ctx) : options.inverse(ctx));
    },

    /**
     * Helper to pass if operants (op1, op2) are strictly equal.
     *
     * @param {*} op1
     * @param {*} op2
     * @param {object|can.view.State} options the helpers options as passed by the view engine
     * @returns {*} the result of options.fn or options.inverse depending on the strict equality result
     */
    'ifeqq': function (op1, op2, options) {
        op1 = _get_compute_value(op1);
        op2 = _get_compute_value(op2);

        var ctx = _prune_context.call(this, options);
        return (op1 === op2) ? options.fn(ctx) : options.inverse(ctx);
    },

    /**
     * Helper to pass if operant (op1) is strictly equal (===) to true.
     *
     * @param {*} op1
     * @param {object|can.view.State} options the helpers options as passed by the view engine
     * @returns {*} the result of options.fn or options.inverse depending on the equality result
     */
    'iftrue': function (op1, options) {
        op1 = _get_compute_value(op1);
        return (op1 === true) ? options.fn(options.context || this) : options.inverse(options.context || this);
    },

    /**
     * Print a number in its ordinal form.
     * <table>
     *  <thead>
     *      <tr><th>Number</th><th>Ordinal</th></tr>
     *  </thead>
     *  <thead>
     *      <tr><td>1</td><td>1st</td></tr>
     *      <tr><td>2</td><td>2nd</td></tr>
     *      <tr><td>3</td><td>3rd</td></tr>
     *      <tr><td>4</td><td>4td</td></tr>
     *      <tr><td colspan='2'>...</td></tr>
     *  </thead>
     * </table>
     *
     * @param {type} number
     * @returns {String}
     */
    'print_ordinal': function(number) {
        number = _get_compute_value(number);
        var s=["th","st","nd","rd"],
            v = number % 100;

        return number + (s[(v-20) % 10] || s[v] || s[0]);
    },

    'print_date': _print_date,

    /**
     * Get a pretty string (twitter like, "a minute ago") describing the time
     * passed from time to target.
     *
     * @param long time
     * @param long target
     * @returns string
     */
    'print_diff_time': function(time, target) {
        target = _get_compute_value(target);
        time = _get_compute_value(time);
        return moment(target).from(time);
    },

    /**
     * Get a "camelCasedString" and return "Camel Cased String".
     *
     * @param string value
     * @returns string
     */
    'camel_to_space': function(value) {
        value = _get_compute_value(value);
        var result = can.trim(value);
        result = result.replace(/^[a-z]|[^\s][A-Z]/g, function(str, offset) {
            if (offset === 0) {
                return(str.toUpperCase());
            } else {
                return(str.substr(0,1) + " " + str.substr(1).toUpperCase());
            }
        });
        return result;
    },

    /**
     * Get a "camelCasedString" and return "CCS".
     *
     * @param string field
     * @returns string
     */
    'camel_to_short': function(value) {
        value = _get_compute_value(value);
        var result = "";
        can.trim(value).replace(/(^[a-zA-Z])|([^\s]([A-Z]))/g, function(str, g1, g2, g3, offset) {
            result += ( offset === 0 ? str.toUpperCase() : str.charAt(1) );
            return str;
        });
        return result;
    },

    /**
     * Get an "UPPER_CASED_AND_UNDERSCORE_SEPARATED" text and returns it into the form
     * of "Upper Cased And Underscore Separated" text.
     *
     * @param string field
     * @returns string
     */
    'uppderscore_to_capitalized': function(value) {
        value = _get_compute_value(value) || "";
        return can.trim(value).toLowerCase().replace(/_/g, " ").replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    },

    /**
     * Get an object with <code>name, surname</code> fields and return its fullname string.
     *
     * @param {object} person
     * @returns {string}
     */
    'print_person_name': function(person) {
        person = _get_compute_value(person);
        return person.name + " " + person.surname;
    },

    /**
     * Get the url of a gravatar avatar for a username/email.
     *
     * @param {type} avatar the username/email to get its avatar from gravatar
     * @param {type} size the size we want the avatar from gravatar
     * @returns {String}
     */
    'gravatar_image': function(avatar, size) {
        avatar = _get_compute_value(avatar);
        size = _get_compute_value(size);
        return "https://www.gravatar.com/avatar/{0}?s={1}&d=wavatar".format(avatar, size);
    },

    'route_link': function(link, text, options) {
      text = _get_compute_value(text);
      link = _get_compute_value(link);
      link = link.substr(1, link.length);
      var newLink = link.indexOf('/') > -1 ? link.substr(link.indexOf('/') + 1, link.length) : link;
      var data = {route: newLink};
      var attrs = {};

      if(options) {
        for(var key in options.hash) {
          if(key !== 'className') {
            data[key] = _get_compute_value(options.hash[key]);
          }
          else {
            attrs.className = options.hash[key];
          }
        }
      }
      return text === '_href' ? can.route.url(data, false) : can.route.link(text, data, attrs, false);
    }
};

can.each(viewHelpers, function (fn, name) {
    stache.registerHelper(name, fn);
});

export default viewHelpers;
