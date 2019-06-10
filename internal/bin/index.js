const { Generator } = require('@batterii/yeoman-helpers');

class BinGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('command', {
			description: 'Command to create in package bin entry',
			type: String,
		});
	}

	addBin() {
		const { command } = this.options;

		// Copy the application source file to the bin directory.
		this.copyTemplate('app.ts', `bin/${command}.ts`);

		// Include the bin directory for compilation.
		this.extendTsConfig({ include: [ 'bin/**/*' ] });

		this.extendPackage({
			// Add bin entry to package.json.
			bin: { [command]: `dist/bin/${command}.js` },

			// Add built bin directory to publishing whitelist.
			files: [ 'dist/bin' ],
		});

		this.addScripts({
			// Make built bin files executable.
			postbuild: 'chmod +x dist/bin/*.js',

			// Add start scripts for development.
			start: `npm run start:${command}`,
			[`start:${command}`]: `npm run build && dist/bin/${command}.js`
		});
	}
}

module.exports = BinGenerator;
