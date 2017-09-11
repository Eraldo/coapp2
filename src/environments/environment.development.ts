// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// THE ABOVE ONLY IS TRUE FOR ANGULAR!
// In ionic it does not work that way.
// I am using: https://github.com/gshigeto/ionic-environment-variables
// Thus the default file is development

export const environment = {
  production: false,
  name: "development",
  api: "http://127.0.0.1:8004/api/",
};
