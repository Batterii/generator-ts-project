const {Generator} = require("@batterii/yeoman-helpers");

class BasePackageGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option("name", {
			type: String,
			description: "npm package name",
		});

		this.option("description", {
			type: String,
			description: "npm package description",
		});
	}

	writing() {
		// Copy and rename package.json
		this.copyTemplate("package-template.json", "package.json");

		// Copy README and tsconfig.json
		this.copyTemplate("README.md");
		this.copyTemplate("tsconfig.json");

		// Copy and rename dot files.
		this.copyTemplate("gitignore", ".gitignore");
		this.copyTemplate("eslintignore", ".eslintignore");
		this.copyTemplate("eslintrc.yaml", ".eslintrc.yaml");
	}

	install() {
		/*
		 * Install typescript. It must be saved exactly to prevent
		 * incompatibilities with typescript-eslint's parser.
		 */
		this.npmInstall("typescript@3.8.3", {
			"save-dev": true,
			"save-exact": true,
		});

		/*
		 * Install source-map-support as either a dependency or a dev
		 * dependency, depending on the source-map-support option.
		 */
		this.npmInstall("source-map-support@0.5", {
			[this.options["source-map-support"] ? "save" : "save-dev"]: true,
		});

		// Install other dev dependencies.
		this.npmInstall([
			"@batterii/eslint-config-ts@2",
			"@batterii/generator-ts-class@0.2",
			"@batterii/generator-ts-module@0.2",
			"@batterii/generator-ts-test@0.1",
			"@types/node@12",
			"@typescript-eslint/eslint-plugin@2",
			"@typescript-eslint/parser@2",
			"eslint@6",
			"yo@3",
		], {"save-dev": true});
	}
}

module.exports = BasePackageGenerator;
