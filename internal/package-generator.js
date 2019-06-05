const Generator = require('./generator');

class PackageGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('name', {
			description: 'npm package name',
			type: String,
			default: this.defaultName,
		});

		this.option('description', {
			description: 'npm package description',
			type: String,
			default: '',
		});
	}
}

module.exports = PackageGenerator;
