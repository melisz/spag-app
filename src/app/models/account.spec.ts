import { Account } from './account';

describe('User', () => {
  it('should create an instance', () => {
    expect(new Account('test', '12345', '123456789', 'daniel', 'amsterdam')).toBeTruthy();
  });
});
