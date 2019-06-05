const { isArray, isString, mergeWith } = require('lodash');
const YeomanGenerator = require('yeoman-generator');
const path = require('path');

class Generator extends YeomanGenerator {
	get defaultName() {
		return path.basename(this.destinationPath());
	}

	copyTemplate(
		templatePath,
		destinationPath = templatePath,
		options = this.options
	) {
		this.fs.copyTpl(
			this.templatePath(templatePath),
			this.destinationPath(destinationPath),
			options
		);
	}

	extendJson(filePath, contents, customizer = concatArrays) {
		const obj = this.fs.readJSON(filePath, {});
		mergeWith(obj, contents, customizer);
		this.fs.writeJSON(filePath, obj, null, '\t');
	}

	extendTsConfig(contents, customizer = concatArrays) {
		this.extendJson(
			this.destinationPath('tsconfig.json'),
			contents,
			customizer
		);
	}

	extendPackage(contents, customizer = concatArrays) {
		this.extendJson(
			this.destinationPath('package.json'),
			contents,
			customizer
		);
	}

	addScripts(scripts) {
		this.extendPackage({ scripts }, appendScripts);
	}
}

function concatArrays(obj, src) {
	if (isArray(obj)) return obj.concat(src);
}

function appendScripts(obj, src) {
	if (isString(obj)) return `${obj} && ${src}`;
}

module.exports = Generator;
