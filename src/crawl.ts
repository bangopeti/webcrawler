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
