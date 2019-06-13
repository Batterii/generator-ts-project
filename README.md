# @batterii/generator-ts-project
A [Yeoman](https://yeoman.io/) generator for creating Batterii TypeScript
projects.


## Installation
This generator is intended to be installed globally by npm, enabling you to use
it to create new projects anywhere on your machine. To install it, simply run
the following commands:

```sh
# Install yo globally.
npm install -g yo

# Install the generator globally.
npm install -g @batterii/generator-ts-project
```

Once this is finished, you can use the `yo` command anywhere, as shown in the
'Usage' sections below.


## Updating
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


## Default Generator

### Usage
```
  yo @batterii/ts-project [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers             Default: false
        --skip-install   # Do not automatically install dependencies  Default: false
        --force-install  # Fail on install dependencies error         Default: false
```

### Selecting a Project Type
The default generator does nothing on its own. Instead, it simply shows you a
prompt with which you can select a subgenerator based on the intended project
type, either `library` or `application`:

- **library**: Exports a compiled TypeScript module by way of the
  [package.json main option](https://docs.npmjs.com/files/package.json#main).
  Most projects will be libraries.

- **application**: Provides one (or more) executable commands by means of the
  [package.json bin option](https://docs.npmjs.com/files/package.json#bin).
  These will include any services, internal scripts, and so on. Applications may
  define their own internal classes and utilties, but they should not expose any
  of this functionality as a module.

### Running a Subgenerator Directly
Of course, you can skip the selection prompt and run whichever subgenerator you
want directly. To do so, simply specify the subgenerator's name after a colon:

```sh
# To generate a library
yo @batterii/ts-project:library

# To generate an application
yo @batterii/ts-project:application
```

Note that unless you select your subgenerator this way, any CLI arguments
described below (like `--name` or `--description`) are ignored, and the
generator will prompt for them instead.


## Library Subgenerator

### Usage

```
  yo @batterii/ts-project:library [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers             Default: false
        --skip-install   # Do not automatically install dependencies  Default: false
        --force-install  # Fail on install dependencies error         Default: false
  -n,   --name           # Package name, without the scope
  -d,   --description    # Package description
```

### Package Name and Description
The `library` subgenerator requires the following options:

- `--name`: The npm package name, omitting the `@batterii/` scope prefix.
- `--description`: The npm package description. This must not be empty.

If either of these options is omitted, the generator will  prompt the user for
it.


## Application Subgenerator Usage
```
  yo @batterii/ts-project:application [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers             Default: false
        --skip-install   # Do not automatically install dependencies  Default: false
        --force-install  # Fail on install dependencies error         Default: false
  -n,   --name           # Package name, without the scope
  -d,   --description    # Package description
  -c,   --command        # Name of a command to create
```

### Package Name and Description
The `application` subgenerator also requires the `name` and `description`
options, and they work exactly as they do in the `library` subgenerator.

### Command Name
The `application` subgenerator creates a single command in the `bin` directory
of `package.json`, and puts its implementation fiel in the `bin` directory.
The `--command` option specifies the name of this command and its implementation
file. If it is not provided, the generator will prompt the user for it.
