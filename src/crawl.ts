import { JSDOM } from 'jsdom';

export const formatUrl = (url: string): string => {
  const urlObj = new URL(url);
  let domainWithPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (domainWithPath.slice(0, 4) === 'www.') {
    domainWithPath = domainWithPath.slice(4);
  }
  if (domainWithPath.slice(-1) === '/') {
    return domainWithPath.slice(0, -1);
  }

  return domainWithPath;
};

export const getUrlsFromHtml = (
  webpageUrl: string,
  htmlBody: string
): string[] => {
  const domObj = new JSDOM(htmlBody);
  const anchorElementsFromHtml = domObj.window.document.querySelectorAll('a');
  const urls: string[] = [];

  for (const anchorElement of anchorElementsFromHtml) {
    try {
      let urlObj: URL;
      if (anchorElement.href.slice(0, 1) === '/') {
        urlObj = new URL(`${webpageUrl}${anchorElement.href}`);
      } else {
        urlObj = new URL(anchorElement.href);
      }
      urls.push(urlObj.href);
    } catch (error) {
      console.log(
        `Error with anchor tag href value: ${(error as Error).message}`
      );
    }
  }

  return urls;
};

interface CrawledPages {
  [key: string]: number;
}

export const crawlPage = async (
  baseUrl: string,
  currentUrl: string,
  crawledPages: CrawledPages
): Promise<CrawledPages> => {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return crawledPages;
  }

  const formattedCurrentUrl = formatUrl(currentUrl);
  if (crawledPages[formattedCurrentUrl] > 0) {
    crawledPages[formattedCurrentUrl]++;
    return crawledPages;
  }

  console.log(`crawling ${currentUrl}`);

  let htmlBody: string = '';
  try {
    const resp: Response = await fetch(currentUrl);

    if (resp.status > 399) {
      console.log(
        `error while fetching with status code: ${resp.status} on page: ${currentUrl}`
      );
      return crawledPages;
    }

    const contentType = resp.headers.get('Content-Type');
    if (!contentType?.includes('text/html')) {
      console.log(
        `not text/html response: ${contentType}, abort page crawl on: ${currentUrl}`
      );
      return crawledPages;
    } else {
      crawledPages[formattedCurrentUrl] = 1;
    }

    htmlBody = await resp.text();
  } catch (error) {
    console.log(
      `error while fetching: ${(error as Error).message} on page: ${currentUrl}`
    );
  }

  const nextUrls: string[] = getUrlsFromHtml(baseUrl, htmlBody);

  for (const nextUrl of nextUrls) {
    crawledPages = await crawlPage(baseUrl, nextUrl, crawledPages);
  }

  return crawledPages;
};
