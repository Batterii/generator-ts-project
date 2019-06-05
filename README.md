# @batterii/generator-ts-project
A [yeoman](https://yeoman.io/) generator creating Batterii TypeScript projects.


## Installation
```sh
# Install yo.
npm install -g yo

# Install the generator.
npm install -g @batterii/generator-ts-project
```


## Running the Generator
Once installed, you can run `yo` with no arguments in the project directory and
select `@batterii/ts-project` from the list of installed generators. You can
also run it directly like so:

```sh
yo @batterii/ts-project
```

### Selecting a Project Type
The first thing the generator will ask you is which project type you'd like to
generate, from among the following options:

- **library**: Exports a compiled TypeScript module by way of the
  [package.json main option](https://docs.npmjs.com/files/package.json#main).
  Most projects will be libraries.
- **application**: Provides one (or more) executable commands by means of the
  [package.json bin option](https://docs.npmjs.com/files/package.json#bin).
  These will include any services, internal scripts, and so on. Applications may
  define their own internal classes and utilties, but they should not expose any
  of this functionality as a module.

### Providing Additional Options
After selectiong the type, the generator will ask you for a few options:

- `name`: The npm package name, omitting the `@batterii/` scope prefix. This
  will default to the project directory's name.
- `description`: The npm package description. You can leave this empty, but you
  should fill it out at some point later in `package.json`. npm allows packages
  with no description, but it will complain about them with warnings.
- `command` (application only): The application generator creates one command
  to start with, which will be named according to this option. If not provided,
  it will default to value you provided for `name`.

### Skipping the UI
You can run either generator directly in the command line, providing options as
arguments like so:

```sh
# Create a library with a given name and description
yo @batterii/ts-project:library --name 'foo-bar' --description 'FooBar Library'
```

or

```sh
# Create an application that provides a given command.
yo @batterii/ts-project:application --command 'my-command'
```

Any omitted options will use their defaults.


## Updating the Generator
Occasionally this generator will need to be updated. You can identify globally-
installed npm modules that have newer versions by running the following:

```sh
npm outdated -g
```

If you see that a newer version of this generator is available, you can easily
install it over the old one like so:

```sh
npm i -g @batterii/generator-ts-project@latest
```
