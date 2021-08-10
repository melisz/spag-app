import { DishIngredient } from './dish-ingredient';

describe('DishIngredient', () => {
  it('should create an instance', () => {
    expect(new DishIngredient(null, null)).toBeTruthy();
  });
});
