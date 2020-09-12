import {normalizeURL} from './utils';

test('normalize URL works with http links', () => {
  expect(normalizeURL('http://example.site.com')).toEqual('http://example.site.com');
});

test('normalize URL works with https links', () => {
  expect(normalizeURL('https://example.site.com')).toEqual('https://example.site.com');
});

test('normalize URL works without scheme', () => {
  expect(normalizeURL('example.site.com')).toEqual('https://example.site.com');
});

test('normalize URL strips extra parts of the url', () => {
  expect(normalizeURL('https://example.site.com/extra/params/?in=the#url')).toEqual('https://example.site.com');
});