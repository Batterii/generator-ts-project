exports.validatePackageName = function(name) {
	return (/^[a-zA-Z0-9]+$/).test(name) ||
		'Package name must be dash-separated lower case';
};
