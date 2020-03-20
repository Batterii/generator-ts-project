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
			'build',
			'postbuild',
			'clean',
			'test',
			'test:unit',
			'test:integration',
			'preversion',
			'prepublishOnly',
			'start',
		]);
	}
}

module.exports = SortScriptsGenerator;
