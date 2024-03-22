import { ICrawledPages } from './crawl.js';

export const sortCrawledPages = (pages: ICrawledPages) => {
  const pagesArr = Object.entries(pages);
  return pagesArr.sort((a, b) => b[1] - a[1]);
};
