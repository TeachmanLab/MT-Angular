# MT-Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Previous Names

Until 5/18/2020, this repository was called "training".

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
(NOTE: `ng serve` will work, but you may want the proxy running so you connect to the server side.)

## Running on the AWS Server

Run `ng build --prod --build-optimizer --base-href=/training/`
Copy the files in ./dist/training-prototype up to the web server and placement in the /var/www/training directory.

## Adding to MindTrails

Run `ng build --prod --build-optimizer --output-hashing none --base-href=/calm/angular/`
Copy ./dist/training-prototype to [MindTrails Checkout]/r01/src/main/resources/static/angular
Something like `cp -r dist/training-prototype ~/code/MindTrails/r01/src/main/resources/static/angular`

## Localization
This app can be built for both English and Spanish.  If you want to run locally and see the Spanish version of the site use:
```
ng serve --configuration=es
```
If you add or edit i18n translations in the html content, you will want to re-generate the translation files, you can do that with
```angular2html
npm run extract-i18n
```
We are using a angular plugin called [xliffmerge](https://github.com/martinroob/ngx-i18nsupport/wiki/Tutorial-for-using-xliffmerge-with-angular-cli) to handle the extraction of text that will keep our other documents up to date.
When you run the above command it will update the existing files, so you just need to open them with a translation 
editor like [PoEdit](https://poeditor.com/) make the updates, and save them.


### Custom Builds
We may be running multiple studies with difference settings at the same time, for this reason
we provide a mechanism for doing custom builds, for instance, in Kaiser you would do:

`ng build --configuration kaiser --build-optimizer --output-hashing none --base-href=/kaiser/angular/`
`cp -r dist/training-prototype/en-US ~/code/MindTrails/kaiser/src/main/resources/static/angular`

A complete build of spanish for deployment like:
(NOTE:  For spanish we will need to build both an engish version and an spanish version, follow the 'Adding to Mindtrails'
section above for building in english. then do the following to create the spanish language version.)
`ng build --configuration spanish --build-optimizer --output-hashing none --base-href=/spanish/angular/`
`cp -r dist/training-prototype/es-ES/* ~/code/MindTrails/spanish/src/main/resources/static/angular-es`
`ng build --configuration spanish-en --prod --build-optimizer --output-hashing none --base-href=/spanish/angular/`
`cp -r dist/training-prototype/en-ES/* ~/code/MindTrails/spanish/src/main/resources/static/angular`


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
