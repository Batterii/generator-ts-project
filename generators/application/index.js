const PackageGenerator = require('../../internal/package-generator');
const { assign, pick } = require('lodash');

class ApplicationGenerator extends PackageGenerator {
	constructor(args, opts) {
		super(args, opts);

		this.option('command', {
			description: 'Command to run the application',
			type: String,
			default: this.options.name,
		});
	}

	generateApplication() {
		// Generate the base package, with source-map-support dependency.
		this.composeWith(
			require.resolve('../../internal/base'),
			assign(pick(this.options, [ 'name', 'description' ]), {
				'source-map-support': true,
			}),
		);

		// Add the test suite.
		this.composeWith(require.resolve('../../internal/test'));

		// Add the internal lib directory.
		this.composeWith(require.resolve('../../internal/lib'));

		// Add the bin directory.
		this.composeWith(
			require.resolve('../../internal/bin'),
			pick(this.options, 'command'),
		);
	}
}

module.exports = ApplicationGenerator;
