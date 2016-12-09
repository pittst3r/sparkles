/* globals Testem, gazpacho */

Testem.useCustomAdapter(customAdapter);

function customAdapter(socket) {
  let { queue, Suite, } = gazpacho;
  let suite = new Suite({});

  suite.processQueue(queue);

  socket.emit('tests-start');
  runSuite(suite, result => {
    socket.emit('test-result', result);
    printResult(result);
  }, (results) => {
    socket.emit('all-test-results', results);
  });
}

function runSuite(suite, callback, doneCallback) {
  let counters = {
    passed: 0,
    failed: 0,
    total: 0,
  };
  let testemResults = [];

  suite.run(result => {
    let testemResult;

    incrementCounters(result, counters);
    testemResult = buildResultObject(result, counters);
    testemResults.push(testemResult);
    callback(testemResult);
  });

  doneCallback(Object.assign({}, counters, { tests: testemResults, }));
}

function incrementCounters(result, counters) {
  if (result.didPass) {
    counters.passed += 1;
  } else {
    counters.failed += 1;
  }
  counters.total += 1;
}

function buildResultObject(result, counters) {
  let testemResult = {
    passed: counters.passed,
    failed: counters.failed,
    total: counters.total,
    id: result.testNumber,
    name: result.name,
    items: [],
  };

  if (!result.didPass) {
    testemResult.items.push({
      message: result.error.message,
      stack: result.error.stack,
      passed: false,
    });
  }

  return testemResult;
}

function printResult(result) {
  let resultsNode = document.getElementById('results');
  let resultNode = document.createElement('li');
  let resultTextNode = document.createTextNode(`${result.passed ? '👍' : '👎'} ${result.name}`);

  resultNode.appendChild(resultTextNode);
  resultsNode.appendChild(resultNode);
}
