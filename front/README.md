# Yoga

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.16.

## Start the project

Git clone:

> git clone https://github.com/OpenClassrooms-Student-Center/P5-Full-Stack-testing

Go inside folder:

> cd yoga

Install dependencies:

> npm install

Launch Front-end:

> npm run start;


### Test

#### E2E

Lauching cypress tool:

npx cypress open

Launching e2e test:

> npm run e2e

Generate coverage report (you should launch e2e test before):

> npm run e2e:coverage

Report is available here:

> front/coverage/lcov-report/index.html

#### Unitary test

Launching test:

> npm run test or npm test

for following change:

> npm run test:watch

For coverage:

> npm test -- --coverage

The report is visible in the terminal and/or in the browser.
To view the report in the browser, open the folder "coverage/jest/Icov-report/app/index.html" at the root of the Front project, double-click the index.html file, or right-click and select "Open with Live Server" if the Live Server extension is installed.
