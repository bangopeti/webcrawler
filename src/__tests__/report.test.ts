import { sortCrawledPages } from '../report.js';

describe('sortCrawledPages should', () => {
  test('sort 5 pages based on integer value', () => {
    const crawledPages = {
      'https://test.hu/4': 10,
      'https://test.hu/0': 50,
      'https://test.hu/2': 30,
      'https://test.hu/1': 40,
      'https://test.hu/3': 20,
    };
    const expected = [
      ['https://test.hu/0', 50],
      ['https://test.hu/1', 40],
      ['https://test.hu/2', 30],
      ['https://test.hu/3', 20],
      ['https://test.hu/4', 10],
    ];
    const result = sortCrawledPages(crawledPages);
    expect(result).toEqual(expected);
  });
});
