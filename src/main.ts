import { crawlPage } from './crawl.js';

const main = async () => {
  if (process.argv.length < 3) {
    console.log('Please provide a website to crawl');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('Please provide only one website to crawl');
    process.exit(1);
  }

  const baseUrl = process.argv[2];

  console.log(`Crawling started on "${baseUrl}"`);
  const crawledPages = await crawlPage(baseUrl, baseUrl, {});

  console.log(crawledPages);
};

main();
