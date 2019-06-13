const { assign, pick } = require('lodash');
const PackageGenerator = require('../../internal/package-generator');
const { validateCommandName } = require('@batterii/yeoman-validators');

class ApplicationGenerator extends PackageGenerator {
	constructor(args, opts) {
		super(args, opts);

		this.optionPrompt({
			type: 'input',
			name: 'command',
			alias: 'c',
			description: 'Name of a command to create',
			message: 'Enter the name of a command to create.',
			default: () => this.options.name,
			validate: validateCommandName,
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

		// Add the bin directory with the first command.
		this.composeWith(
			require.resolve('../../internal/bin'),
			pick(this.options, 'command'),
		);
	}
}

module.exports = ApplicationGenerator;
