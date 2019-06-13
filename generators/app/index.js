const { Generator } = require('@batterii/yeoman-helpers');

class ProjectGenerator extends Generator {
	async promptForAnswers() {
		// Prompt the user for the project type.
		this.answers = await this.prompt([ {
			type: 'list',
			name: 'type',
			message: 'Select a project type.',
			choices: [ 'library', 'application' ],
		} ]);
	}

	generateScaffold() {
		// Run the selected subgenerator.
		this.composeWith(require.resolve(`../${this.answers.type}`));
	}
}

module.exports = ProjectGenerator;
