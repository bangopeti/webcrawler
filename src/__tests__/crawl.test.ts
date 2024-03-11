import { formatUrl, getUrlsFromHtml } from '../crawl.js';

describe('getDomainFromURL should', () => {
  const expectedValue = 'google.com';
  const expectedValueWithPath = 'google.com/search';

  test('get domain from passed url string', () => {
    const url = 'https://google.com';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedValue);
  });

  test('strip www. prefix from url', () => {
    const url = 'https://www.google.com';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedValue);
  });

  test('get domain from http url', () => {
    const url = 'http://google.com';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedValue);
  });

  test('get domain with path', () => {
    const url = 'https://google.com/search';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedValueWithPath);
  });

  test('delete trailing slash in url', () => {
    const url = 'https://google.com/search/';
    const actualValue = formatUrl(url);
    expect(actualValue).toBe(expectedValueWithPath);
  });

  test('throw error when given an invalid url', () => {
    const url = 'notvalidurl';
    expect(() => {
      formatUrl(url);
    }).toThrow();
  });
});

describe('getUrlsFromHtml should', () => {
  test('give back an array of absolute URL string(s) from passed in html body. Absolute URLs', () => {
    const url = 'https://test.com';
    const htmlBody = `
    <html>
      <body>
        <a href="https://test.com/test">
          Sample Text
        </a>
      </body>
    </html>
    `;
    const actualValue = getUrlsFromHtml(url, htmlBody);
    const expectedValue = ['https://test.com/test'];
    expect(actualValue).toEqual(expectedValue);
  });

  test('give back an array of absolute URL string(s) from passed in html body. Relative URLs', () => {
    const url = 'https://test.com';
    const htmlBody = `
    <html>
      <body>
        <a href="/test1">
          Sample Text
        </a>
        <a href="/test2">
          Sample Text
        </a>
      </body>
    </html>
    `;
    const actualValue = getUrlsFromHtml(url, htmlBody);
    const expectedValue = ['https://test.com/test1', 'https://test.com/test2'];
    expect(actualValue).toEqual(expectedValue);
  });

  test('give back an empty array when all URLs are invalid', () => {
    const url = 'https://test.com';
    const htmlBody = `
    <html>
      <body>
        <a href="invalid">
          Sample Text
        </a>
      </body>
    </html>
    `;
    const actualValue = getUrlsFromHtml(url, htmlBody);
    const expectedValue: string[] = [];
    expect(actualValue).toEqual(expectedValue);
  });

  test('give back an array of absolute URL string(s) from passed in html body. Mixed URLs', () => {
    const url = 'https://test.com';
    const htmlBody = `
    <html>
      <body>
        <a href="invalid">
          Sample Text
        </a>
        <a href="https://test.com/test1">
          Sample Text
        </a>
        <a href="/test2">
          Sample Text
        </a>
      </body>
    </html>
    `;
    const actualValue = getUrlsFromHtml(url, htmlBody);
    const expectedValue = ['https://test.com/test1', 'https://test.com/test2'];
    expect(actualValue).toEqual(expectedValue);
  });
});
