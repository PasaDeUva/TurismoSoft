const ExperienciaTuristica = require('../src/models/experiencia-turistica');

describe('ExperienciaTuristica Class', () => {
  test('should not allow instantiation without required parameters', () => {
    expect(() => new ExperienciaTuristica()).toThrow(Error);
  });
});
