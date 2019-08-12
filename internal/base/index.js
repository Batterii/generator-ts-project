const { Generator } = require('@batterii/yeoman-helpers');

class BasePackageGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('name', {
			type: String,
			description: 'npm package name',
		});

		this.option('description', {
			type: String,
			description: 'npm package description',
		});
	}

	writing() {
		// Copy and rename package.json
		this.copyTemplate('package-template.json', 'package.json');

		// Copy README and tsconfig.json
		this.copyTemplate('README.md');
		this.copyTemplate('tsconfig.json');

		// Copy and rename dot files.
		this.copyTemplate('gitignore', '.gitignore');
		this.copyTemplate('eslintignore', '.eslintignore');
		this.copyTemplate('eslintrc.yaml', '.eslintrc.yaml');
	}

	install() {
		/*
		 * Install typescript. It must be saved exactly to prevent
		 * incompatibilities with typescript-eslint's parser.
		 */
		this.npmInstall('typescript@3.4.5', {
			'save-dev': true,
			'save-exact': true,
		});

		/*
		 * Install source-map-support as either a dependency or a dev
		 * dependency, depending on the source-map-support option.
		 */
		this.npmInstall('source-map-support@0.5.12', {
			[this.options['source-map-support'] ? 'save' : 'save-dev']: true,
		});

		// Install other dev dependencies.
		this.npmInstall([
			'@batterii/eslint-config-ts@1',
			'@batterii/generator-ts-class@0',
			'@batterii/generator-ts-module@0',
			'@batterii/generator-ts-test@0',
			'@types/node@10',
			'@typescript-eslint/eslint-plugin@1',
			'@typescript-eslint/parser@1',
			'eslint@5',
			'yo@3',
		], { 'save-dev': true });
	}
}

module.exports = BasePackageGenerator;
