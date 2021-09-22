#!/usr/bin/env node

'use strict';
const Parser = require('../.lib/parser.js');

/**
 * Recognizes the accesses to the platform ICE Virtual Library
 * @param  {Object} parsedUrl an object representing the URL to analyze
 *                            main attributes: pathname, query, hostname
 * @param  {Object} ec        an object representing the EC whose URL is being analyzed
 * @return {Object} the result
 */
module.exports = new Parser(function analyseEC(parsedUrl, ec) {
  let result = {};
  let path   = parsedUrl.pathname;
  // uncomment this line if you need parameters
  // let param = parsedUrl.query || {};

  // use console.error for debuging
  // console.error(parsedUrl);

  let match;

  if ((match = /^\/action\/doSearch$/i.exec(path)) !== null) {
    // https://www.icevirtuallibrary.com/action/doSearch?AllField=Bridge&ConceptID=
    result.rtype    = 'SEARCH';
    result.mime     = 'HTML';
  } else if ((match = /^\/doi\/abs\/(.+)$/i.exec(path)) !== null) {
    // https://www.icevirtuallibrary.com/doi/abs/10.1680/bmf.33542.0049
    result.rtype    = 'ABS';
    result.mime     = 'HTML';
    result.doi = match[1];
    result.unitid   = match[1];
  } else if ((match = /^\/doi\/pdf\/(.+)$/i.exec(path)) !== null) {
    // https://www.icevirtuallibrary.com/doi/pdf/10.1680/jadcr.19.00157
    result.rtype    = 'ARTICLE';
    result.mime     = 'PDF';
    result.doi = match[1];
    result.unitid   = match[1];
  } else if ((match = /^\/doi\/full\/(.+)$/i.exec(path)) !== null) {
    // https://www.icevirtuallibrary.com/doi/full/10.1680/jadcr.19.00157
    result.rtype    = 'ARTICLE';
    result.mime     = 'HTML';
    result.doi = match[1];
    result.unitid   = match[1];
  }

  return result;
});
