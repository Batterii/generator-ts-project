const { Generator } = require('@batterii/yeoman-helpers');

class LibDirectoryGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('isPublic', {
			description: 'Set to generate a public lib',
			type: Boolean,
			default: false,
		});
	}

	writing() {
		const { isPublic } = this.options;

		// Create the appropriate lib index file.
		this.copyTemplate(
			isPublic ? 'public.ts' : 'internal.ts',
			'lib/index.ts',
		);

		// Include the lib directory for compilation.
		this.extendTsConfig({ include: [ 'lib/**/*' ] });

		// Add built lib directory to publishing whitelist.
		this.extendPackage({ files: [ 'dist/lib' ] });

		if (isPublic) {
			// Copy tsconfig for creating declaration files.
			this.copyTemplate('tsconfig-types.json');

			// Append declaration compilation to build script.
			this.addScripts({
				build: 'tsc --project tsconfig-types.json',
			});

			// Add package properties for a public lib.
			this.extendPackage({
				// Add built declaration files to publishing whitelist.
				files: [ 'dist/types' ],

				// Make the built lib index the main entry point.
				main: 'dist/lib/index.js',

				// Reference built declaration index for TypeScript consumers.
				types: 'dist/types/index.d.ts',
			});
		}
	}
}

module.exports = LibDirectoryGenerator;
