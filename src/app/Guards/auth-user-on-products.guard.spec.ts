import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authUserOnProductsGuard } from './auth-user-on-products.guard';

describe('authUserOnProductsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authUserOnProductsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
