const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const shell = require('shelljs');
const path = require('path');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')       // Remove all non-word chars
    .replace(/--+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

class ApiGenerator extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red('generator api ecma6')} generator!`));

    let authorName;
    let authorEmail;

    if (shell.which('git')) {
      authorName = shell.exec('git config --get user.name', { silent: true }).stdout.trim();
      authorEmail = shell.exec('git config --get user.email', { silent: true }).stdout.trim();
    }

    const prompts = [
      {
        type: 'input',
        name: 'apiName',
        message: 'Your api name',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'apiDescription',
        message: 'Your api description',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name',
        default: authorName,
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email',
        default: authorEmail,
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Repository url',
      },
      {
        type: 'confirm',
        name: 'newDirectory',
        message: 'Would you like to create a new directory for your project?',
        default: true,
      },
    ];

    return this.prompt(prompts)
      .then((answers) => {
        this.props = answers;
        this.props.slug = slugify(this.props.apiName);
        if (this.props.newDirectory) {
          this.destinationRoot(this.props.slug);
        }
      });
  }

  writing() {
    this.sourceRoot(path.resolve(this.templatePath(), '../../'));

    this.fs.copyTpl([this.templatePath('./!(node_modules|generators|*package.json|*README.md)'), '!node_modules'], this.destinationPath('./'), this.props);
    this.fs.copyTpl([this.templatePath('./.*'), '!node_modules'], this.destinationPath('./'), this.props);

    this.fs.copyTpl([this.templatePath('./src/**/*'), '!node_modules'], this.destinationPath('./src'), this.props);
    this.fs.copyTpl([this.templatePath('./test/**/*'), '!node_modules'], this.destinationPath('./test'), this.props);
    this.fs.copyTpl([this.templatePath('./test/.eslintrc'), '!node_modules'], this.destinationPath('./test/'), this.props);

    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.props);
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), this.props);
  }

  install() {
    if (shell.which('git')) {
      shell.exec('git init');
      if (this.props.repository) {
        shell.exec(`git remote add origin ${this.props.repository}`);
      }
    }
    this.installDependencies({
      bower: false,
    });
  }
}
module.exports = ApiGenerator;
