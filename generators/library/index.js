const PackageGenerator = require('../../internal/package-generator');

class LibraryGenerator extends PackageGenerator {
	generateLibrary() {
		// Generate the base package.
		this.composeWith(require.resolve('../../internal/base'), this.options);

		// Add the test suite.
		this.composeWith(require.resolve('../../internal/test'));

		// Add the public lib directory.
		this.composeWith(
			require.resolve('../../internal/lib'),
			{ isPublic: true },
		);
	}
}

module.exports = LibraryGenerator;
