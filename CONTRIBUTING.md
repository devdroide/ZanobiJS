# Contributing to ZanobiJS

We would love for you to contribute and help us make ZanobiJS even better! As a contributor, these are the guidelines we encourage you to follow:

<!--* [Code of Conduct](#coc)-->

- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Pull Requests](#branches)
- [Commit Message Guidelines](#commits)
- [NPM Scripts](#scripts)


## <a name="issue"></a> Did you find a bug or issue?

If you find an error in the source code, you can help us by submitting an issue to our GitHub repository. Better yet, you can submit a pull request with a fix.

## <a name="feature"></a> Missing a feature?

You can request a new feature by submitting an issue to the GitHub repository. If you'd like to implement a new feature, please first submit an issue with a proposal for your work, so we can review it and make sure we can use it.

We're just opening the repository to accept contributions, so please be patient.

## Submission Guidelines

### <a name="branches"></a> Creating Branches

To create a branch you must know what its objective will be and it must be one of the following:

- **chore** : Updating tasks, etc.; no changes to production code
- **ci** : Changes to our configuration files and CI scripts (GitHub-Actions)
- **docs** : Documentation changes only
- **feat** : A new feature
- **fix** : Bug fix
- **refactor** : A code change that doesn't fix a bug or add a feature
- **style** : Changes that don't affect the meaning of the code (whitespace, formatting, missing semicolons, etc.)
- **test** : Adding missing tests or fixing existing tests
- **sample** : A change to the usage examples

Additionally, try to generate a clear idea of ​​what to expect from that branch.

```bash
# Ejemplo 1
$ git checkout -b feat/obfuscating-logs-for-users

# Ejemplo 2
$ git checkout -b fix/obfuscating-email-logs

# Ejemplo 3
$ git checkout -b ci/adjust-CI-publish
```

### <a name="commits"></a>Scope and Commits

We have the following scopes, which must be taken into account for commits:

- **commons**: for changes made in the `packages/common` directory
- **core**: for changes made in the `packages/core` directory
- **test**: for changes made in the `packages/**/__test__` directory
- **deps**: for changes made in the dependencies

```bash
# Example 1 - scope / package common
$ git commit -a -m "feat(core): ✨ Added log obfuscation for email and credit cards"

# Example 2 - scope / package core
$ git commit -a -m "fix(commons): 🐛 Fixed log obfuscation for 16-character credit card numbers"

# Example 3 - various scopes
$ git commit -a -m "feat(core,commons,test): Support for using Class in the service as a provider"

# Example 4 - general scope
$ git commit -a -m "docs: 📚 Added readme.md for the spanish language"

# Example 5 - scope / package core
$ git commit -a -m "refactor(core): :hammer: The inject was refactored by code smell"

# Example 6 - scope / package core
$ git commit -a -m "test(core): :white_check_mark: New test cases were added for injector coverage"

# Example 7 - scope / dependencies
$ git commit -a -m "fix(deps): update dependency typescript to v5.8.3"
```

### <a name="PRTitle"></a>PR Title

You must use the same commit convention with their respective scopes. example: 

Branch: **ci/adjust-CI-publish**

Title: **ci: PR title validation was added with conventional commits**


## <a name="CICD"></a>Automation

It's important to highlight that we have CI/CD in GitHub Action, so it's important to perform the necessary code tests and comply with the branch and commit standards, as package versioning changes depend on this.

## <a name="scripts"></a>Commonly used NPM scripts

```bash
# run the full unit tests
$ npm run test

# runs formatters
$ npm run lint:check
$ npm run lint:fix

$ npm run prettier:check
$ npm run prettier:fix

# Build the packages for production
$ npm run build:prod
```
