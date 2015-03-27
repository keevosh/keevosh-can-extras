import can from "can/";
import Model from "can/model/";

var getArgs = function (args) {
	if (args[0] && can.isArray(args[0])) {
		return args[0];
	} else if (args[0] instanceof can.Model.List) {
		return can.makeArray(args[0]);
	} else {
		return can.makeArray(args);
	}
},

getIds = function (item) {
	return item.__get(item.constructor.id);
}

Model.List.prototype.get = function () {
	if (!this.length) {
		return new this.constructor([]);
	}
	var list = [],
		constructor = this[0].constructor,
		underscored = constructor._fullName,
		test = new RegExp(underscored + '_([^ ]+)'),
		matches, val, args = getArgs(arguments);
	for (var i = 0; i < args.length; i++) {
		if (args[i].nodeName && (matches = args[i].className.match(test))) {
			// If this is a dom element
			val = this.filter(function (item) {
				return getIds(item) === matches[1];
			})[0];
		} else {
			// Else an id was provided as a number or string.
			val = this.filter(function (item) {
				return getIds(item) === args[i];
			})[0];
		}
		if (val) {
			list.push(val);
		}
	}
	return new this.constructor(list);
}
