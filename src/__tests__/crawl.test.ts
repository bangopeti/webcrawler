import { formatUrl } from '../crawl.js';

describe('getDomainFromURL should', () => {
  const expectedVal = 'google.com';
  const expectedValWithPath = 'google.com/search';

  test('get domain from passed url string', () => {
    const url = 'https://google.com';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedVal);
  });

  test('strip www. prefix from url', () => {
    const url = 'https://www.google.com';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedVal);
  });

  test('get domain from http url', () => {
    const url = 'http://google.com';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedVal);
  });

  test('get domain with path', () => {
    const url = 'https://google.com/search';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedValWithPath);
  });

  test('delete trailing slash in url', () => {
    const url = 'https://google.com/search/';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedValWithPath);
  });

  test('throw error when given an invalid url', () => {
    const url = 'notvalidurl';
    expect(() => {
      formatUrl(url);
    }).toThrow();
  });
});
