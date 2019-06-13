const { Generator } = require('@batterii/yeoman-helpers');

class TestSuiteGenerator extends Generator {
	addTestSuite() {
		// Copy mocha config files.
		this.copyTemplate('mocharc.yaml', '.mocharc.yaml');
		this.copyTemplate('mocharc-dist.yaml', '.mocharc-dist.yaml');

		// Copy test-specific eslint config to the test directory.
		this.copyTemplate('eslintrc.yaml', 'test/.eslintrc.yaml');

		// Copy the setup file to the test directory.
		this.copyTemplate('setup.ts', 'test/setup.ts');

		// Include the test directory for compilation.
		this.extendTsConfig({ include: [ 'test/**/*' ] });

		// Add test run scripts.
		this.addScripts({
			// Scripts for running tests with ts-node.
			'test': 'mocha',
			'test:unit': 'mocha test/unit',
			'test:integration': 'mocha test/integration',

			// Script to build and run tests on the output.
			'test:build': 'npm run build && ' +
				'mocha --config .mocharc-dist.yaml dist/test',

			// Append a test:build run to the preversion script.
			'preversion': 'npm run test:build',
		});

		// Install dev dependencies for test runs.
		this.npmInstall([
			'@types/chai@4',
			'@types/mocha@5',
			'@types/sinon@7',
			'@types/sinon-chai@3',
			'chai@4',
			'mocha@6',
			'sinon@7',
			'sinon-chai@3',
			'ts-node@8',
		], { 'save-dev': true });
	}
}

module.exports = TestSuiteGenerator;
