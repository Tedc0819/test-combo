const { TestCombo } = require('../../../index.js');
const Calculator = require('../../models/Calculator.js');

class TestSuite extends TestCombo {
  get title() { return 'Calculator.add' }

  get args() {
    return ['currentValue', 'value']
  }

  get argTypes() {
    return {
      currentValue: ['zero', 'five', 'six'], // just example. it can be 'highestCapableValue', blah blah blah
      value: ['integer', 'integerStr', 'string']
    }
  }

  filter(combination) {
    return true
  }

  extraCombinations() { return [] }

  beforeAll(test, combination) {}

  beforeEach(test, combination) {
    return this.runTest(test, combination);
  }

  afterAll(test, combination) {}

  afterEach(test, combination) {}

  getArgValues(test, combination, arg, argType) {
    let argValues = {
      currentValue: {
        zero: 0,
        five: 5,
        six: 6
      },
      value: {
        'integer': 1,
        'integerStr': "1111",
        'string': "fdfafds",
        'two': 2
      }
    }

    return argValues[arg][argType];
  }

  extraCombinations(test) {
    return [
      ['zero', 'two']
    ]
  }

  testMethod(test, combination, argsValues) {
    let calculator = new Calculator
    test.calculator.currentValue = argsValues[0]

    return test.calculator.add(argsValues[1])
  }

  shouldSuccess(combination) {
    let [ currentValue, value ] = combination

    return value == 'integer' || value == 'two'
  }

  successAssert(test, combination) {
    it('should work', function() {
      console.log(test.res)
      let [currentValue, value] = test.args // you can get the args during Assertion

      expect(test.res).toEqual(currentValue + value)
    })
  }

  failureAssert(test, combination) {
    it('should not work', function() {
      expect(test.res).toBeInstanceOf(Error)
    })
  }
}

let testSuite = new TestSuite
testSuite.run()
