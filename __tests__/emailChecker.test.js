import { emailChecker } from '@helpers/emailChecker';

describe('emailChecker tests', () => {
  it('Email check is true', () => {
    expect(emailChecker('jean@phe.fr')).toBeTruthy();
  });
  it('Email check is false', () => {
    expect(emailChecker('jeanphe.fr')).toBeFalsy();
  });
});
