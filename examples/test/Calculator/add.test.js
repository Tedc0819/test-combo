const { TestCombo } = require('../../../index.js');
const Calculator = require('../../models/Calculator.js');

class TestSuite extends TestCombo {
  get title() { return 'Calculator.add' }

  get args() {
    return [
      'value',
    ]
  }

  get argTypes() {
    return {
      value: [
        'integer',
        'integerStr',
        'string',
      ]
    }
  }

  filter(combination) {
    return true
  }

  extraCombinations() { return [] }

  beforeAll(test, combination) { }

  beforeEach(test, combination) {
    return this.runTest(test, combination)
  }

  afterAll(test, combination) {}

  afterEach(test, combination) {}

  getArgValues(test, combination, arg, argType) {
    let argValues = {
      value: {
        'integer': 1,
        'integerStr': "1111",
        'string': "fdfafds"
      }
    }

    return argValues[arg][argType]
  }

  testMethod(test, combination, argsValues) {
    let calculator = new Calculator
    test.calculator = calculator

    return calculator.add(...argsValues)
  }

  shouldSuccess(combination) {
    let [ value ] = combination

    return value == 'integer'
  }

  successAssert(test, combination) {
    it('should work', function() {
      expect(test.res).toEqual(1)
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
