import { ICrawledPages } from './crawl.js';

export const sortCrawledPages = (
  pages: ICrawledPages
): Array<[string, number]> => {
  const pagesArr = Object.entries(pages);
  return pagesArr.sort((a, b) => b[1] - a[1]);
};

export const printReport = (crawledPages: ICrawledPages): void => {
  const sortedCrawledPages = sortCrawledPages(crawledPages);
  console.log('============ REPORT ============');
  for (const sortedCrawledPage of sortedCrawledPages) {
    const url = sortedCrawledPage[0];
    const numberOfHits = sortedCrawledPage[1];
    console.log(`Found ${numberOfHits} number of link(s) to page ${url}`);
  }
  console.log('============ END OF REPORT ============');
};
