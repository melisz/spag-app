import { TestBed } from '@angular/core/testing';

import { MenuDishServiceService } from './menu-dish-service.service';

describe('MenuDishServiceService', () => {
  let service: MenuDishServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDishServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
