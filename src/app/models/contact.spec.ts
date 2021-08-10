import { Contact } from './contact';

describe('Contact', () => {
  it('should create an instance', () => {
    expect(new Contact(null, null, null, null, null, null, null)).toBeTruthy();
  });
});
