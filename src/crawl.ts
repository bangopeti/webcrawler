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
  const linkElementsFromHtml = domObj.window.document.querySelectorAll('a');
  const urls: string[] = [];

  for (const linkElement of linkElementsFromHtml) {
    try {
      let urlObj: URL;
      if (linkElement.href.slice(0, 1) === '/') {
        urlObj = new URL(`${webpageUrl}${linkElement.href}`);
      } else {
        urlObj = new URL(linkElement.href);
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

export const crawlPage = async (startUrl: string) => {
  try {
    const resp: Response = await fetch(startUrl);

    if (resp.status > 399) {
      console.log(
        `error while fetching with status code: ${resp.status} on page: ${startUrl}`
      );
      return;
    }

    const contentType = resp.headers.get('Content-Type');
    if (!contentType?.includes('text/html')) {
      console.log(
        `not text/html response: ${contentType}, abort page crawl on: ${startUrl}`
      );
      return;
    }

    const htmlStr: string = await resp.text();
  } catch (error) {
    console.log(
      `error while fetching: ${(error as Error).message} on page: ${startUrl}`
    );
  }
};
