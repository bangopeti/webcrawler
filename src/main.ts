import { crawlPage } from './crawl.js';

const main = () => {
  if (process.argv.length < 3) {
    console.log('Please provide a website to crawl');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('Please provide only one website to crawl');
    process.exit(1);
  }

  const urlFromArgs = process.argv[2];

  console.log(`Crawling started on "${urlFromArgs}"`);
  crawlPage(urlFromArgs);
};

main();
