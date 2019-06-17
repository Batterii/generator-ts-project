const { Generator } = require('@batterii/yeoman-helpers');

class SortScriptsGenerator extends Generator {
	writing() {
		this.sortScripts([
			'generate',
			'generate:class',
			'generate:module',
			'generate:test',
			'generate:command',
			'lint',
			'lintf',
			'prebuild',
			'build',
			'postbuild',
			'test',
			'test:unit',
			'test:integration',
			'test:build',
			'preversion',
			'prepublishOnly',
			'start',
		]);
	}
}

module.exports = SortScriptsGenerator;
