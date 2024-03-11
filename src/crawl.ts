import { JSDOM } from 'jsdom';

export const formatUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    let domainWithPath = `${urlObj.hostname}${urlObj.pathname}`;

    if (domainWithPath.slice(0, 4) === 'www.') {
      domainWithPath = domainWithPath.slice(4);
    }
    if (domainWithPath.slice(-1) === '/') {
      return domainWithPath.slice(0, -1);
    }

    return domainWithPath;
  } catch (error) {
    throw new Error('Invalid URL');
  }
};

export const getUrlsFromHtml = (
  webpageUrl: string,
  htmlBody: string
): string[] => {
  const domObj = new JSDOM(htmlBody);
  const linkElementsFromHtml = domObj.window.document.querySelectorAll('a');
  const urls = [];

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
