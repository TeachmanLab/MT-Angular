# TrainingPrototype

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
(NOTE: `ng serve` will work, but you may want the proxy running so you connect to the server side.)

## Running on the AWS Server
Run `ng build --prod --build-optimizer --base-href=/training/`
Copy the files in ./dist/training-prototype up to the web server and placement in the /var/www/training directory.

## Adding to Mindtrails
Run `ng build --prod --build-optimizer --output-hashing none --base-href=/calm/angular_training/`
Copy ./dist/training-prototype to [MindTrails Checkout]/r01/src/main/resources/static/training2
Something like `cp -r dist/training-prototype ~/code/MindTrails/r01/src/main/resources/static/angular_training`


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
