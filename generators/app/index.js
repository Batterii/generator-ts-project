const { Generator } = require('@batterii/yeoman-helpers');
const { omit } = require('lodash');

class ProjectGenerator extends Generator {
	async promptForAnswers() {
		// Prompt the user for options.
		this.answers = await this.prompt([
			{
				type: 'list',
				name: 'type',
				message: 'Select a project type.',
				choices: [ 'library', 'application' ],
			},
			{
				type: 'input',
				name: 'name',
				message: (answers) => `Enter the ${answers.type} name.`,
				default: this.destinationName,
			},
			{
				type: 'input',
				name: 'description',
				message: (answers) => `Enter the ${answers.type} description.`,
			},
			{
				when: (answers) => answers.type === 'application',
				type: 'input',
				name: 'command',
				message: 'Enter the command that will run the application.',
				default: (answers) => answers.name,
			},
		]);
	}

	generateScaffold() {
		// Run the selected subgenerator with the specified options.
		this.composeWith(
			require.resolve(`../${this.answers.type}`),
			omit(this.answers, 'type')
		);
	}
}

module.exports = ProjectGenerator;
