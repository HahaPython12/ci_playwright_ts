const { Status } = require('@cucumber/cucumber');

let options = [
  '--require-module ts-node/register',
  '--require ./acceptance/steps/*.steps.ts',
  '--format progress',
  '--format json:./Reports/cucumber_report.json',
  //'--exit',
].join(' ');

let run_features = [
  './acceptance/features/',
  options,
].join(' ');

const config = {
  afterTestCase: (testCase, callback) => {
    if (testCase.result.status === Status.FAILED) {
      process.exit(1);
    }
    callback();
  },
};
module.exports = {
  test_runner: run_features,
  config,
};