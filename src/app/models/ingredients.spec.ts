import { Ingredients } from './ingredients';

describe('Ingredients', () => {
  it('should create an instance', () => {
    expect(new Ingredients(null, null)).toBeTruthy();
  });
});
