import { getDomainFromURL } from '../crawl.js';

describe('getDomainFromURL should', () => {
  const expectedVal = 'google.com';
  test('get domain from passed url string', () => {
    const url = 'http://www.google.com';
    const actualValue = getDomainFromURL(url);
    expect(actualValue).toBe(expectedVal);
  });
});
