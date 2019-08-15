const { Generator } = require('@batterii/yeoman-helpers');

class BinDirectoryGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('command', {
			description: 'Command to create in package bin entry',
			type: String,
		});
	}

	writing() {
		// Get the command name from options.
		const { command } = this.options;

		// Include the bin directory for compilation.
		this.extendTsConfig({ include: [ 'bin/**/*' ] });

		// Add built bin directory to publishing whitelist.
		this.extendPackage({ files: [ 'dist/bin' ] });

		this.addScripts({
			// Make built bin files executable.
			'postbuild': 'chmod +x dist/bin/*.js',

			// Add a script to generate more commands.
			'generate:command': 'yo @batterii/ts-command --local-only',

			// Add the main start script.
			'start': `npm run start:${command}`,
		});

		// Run the command generator to create the first command.
		this.composeWith(
			require.resolve('@batterii/generator-ts-command'),
			{ name: command },
		);
	}

	install() {
		// Install the command generator locally.
		this.npmInstall(
			'@batterii/generator-ts-command@0.1',
			{ 'save-dev': true },
		);
	}
}

module.exports = BinDirectoryGenerator;
