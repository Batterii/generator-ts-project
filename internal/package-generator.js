const {validatePackageDescription, validatePackageName} = require("./utils");
const {Generator} = require("@batterii/yeoman-helpers");

class PackageGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.optionPrompt({
			type: "input",
			name: "name",
			alias: "n",
			description: "Package name, without the scope",
			message: "Enter the package name, without the scope.",
			default: this.destinationName,
			validate: validatePackageName,
		});

		this.optionPrompt({
			type: "input",
			name: "description",
			alias: "d",
			description: "Package description",
			message: "Enter the package description.",
			validate: validatePackageDescription,
		});
	}
}

module.exports = PackageGenerator;
