const {Generator} = require("@batterii/yeoman-helpers");

class TestSuiteGenerator extends Generator {
	writing() {
		// Copy mocha config file.
		this.copyTemplate("mocharc.yaml", ".mocharc.yaml");

		// Copy test-specific eslint config to the test directory.
		this.copyTemplate("eslintrc.yaml", "test/.eslintrc.yaml");

		// Copy the setup file to the test directory.
		this.copyTemplate("setup.ts", "test/setup.ts");

		// Include the test directory for compilation.
		this.extendTsConfig({include: ["test/**/*"]});

		// Add test run scripts.
		this.addScripts({
			// Scripts for running tests. These will all build before the run.
			"test": "npm run build && mocha dist/test",
			"test:unit": "npm run build && mocha dist/test/unit",
			"test:integration": "npm run build && mocha dist/test/integration",

			// Append a clean build and test run to the preversion script.
			"preversion": "npm run clean && npm run test",
		});
	}

	install() {
		// Install dev dependencies for test runs.
		this.npmInstall([
			"@types/chai@4",
			"@types/mocha@7",
			"@types/sinon@7",
			"@types/sinon-chai@3",
			"chai@4",
			"mocha@7",
			// Keep sinon at 7 for now, as types haven't been released for 8.
			"sinon@7",
			"sinon-chai@3",
		], {"save-dev": true});
	}
}

module.exports = TestSuiteGenerator;
