import {
  checkPasswordLength,
  checkPasswordSame
} from '@helpers/passwordManager';

describe('Password manager tests', () => {
  it('Pasword is too short', () => {
    expect(checkPasswordLength('mdp')).toBeFalsy();
  });
  it('Pasword is long enough', () => {
    expect(checkPasswordLength('motdepasse')).toBeTruthy();
  });
  it('Passwords are not the same', () => {
    expect(checkPasswordSame('mdp', 'mot de passe')).toBeFalsy();
  });
  it('Passwords are the same', () => {
    expect(checkPasswordSame('motdepasse', 'motdepasse')).toBeTruthy();
  });
});
