import { TestBed } from '@angular/core/testing';

import { DishIngredientService } from './dish-ingredient.service';

describe('DishIngredientService', () => {
  let service: DishIngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishIngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
