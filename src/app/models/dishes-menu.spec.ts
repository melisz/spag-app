import { DishesMenu } from './dishes-menu';
import {networkInterfaces} from 'os';

describe('DishesMenu', () => {
  it('should create an instance', () => {
    expect(new DishesMenu(null, null, null)).toBeTruthy();
  });
});
