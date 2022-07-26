/**
 * @param {RoutesStringUrlConfig[]} [urls=[{url:'/admin'}]] An array of route config objects with urls to be parsed
 * @param {string} [replacer=null] A string (first occurence) to be replaced inside each url
 * @param {string} [replaceWith=''] If replacer is set, it will be replaced by this string
 */
export default (urls = [], replacer = null, replaceWith = '') => {
  let parsedUrls = urls.map(({ url }) => url);

  if (replacer) {
    parsedUrls = parsedUrls
      .map((url) => url.replace(`/${replacer}`, replaceWith))
      .filter((url) => url !== '');
  }

  const routesString = parsedUrls
    .filter((url) => url !== '/')
    .map((url) => {
      const urlWithoutLeadingSlash = url.substr(1);
      const indexOfSecondSlash = urlWithoutLeadingSlash.indexOf('/');
      const finalUrl =
        indexOfSecondSlash !== -1
          ? urlWithoutLeadingSlash.substr(0, indexOfSecondSlash)
          : urlWithoutLeadingSlash;
      return `${finalUrl}{1}`;
    })
    .join('|');
  // Final string for user Module: create{1}|update{1}|detail{1}
  return `${replacer ? `/${replacer}/` : '/'}(${routesString})?/:subParams?`;
};
