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
  // should be called after each testcase
  // testcase is an object that represent the latest test run
  afterTestCase: (testCase, callback) => {
    if (testCase.result.status === Status.FAILED) {
      console.log("process.exit here!")
      this.setTestStatus(testCase.result.status, new Error()); // <-- Mark the test as failed in the report
      //process.exit(1);
    }
    // signals the end of the hook
    callback();
  },
};
module.exports = {
  test_runner: run_features,
  config,
};