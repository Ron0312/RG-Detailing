import { describe, it, expect } from 'vitest';
import { botRegex } from './analytics';

describe('botRegex', () => {
  it('should match common bots', () => {
    expect(botRegex.test('Googlebot/2.1')).toBe(true);
    expect(botRegex.test('Bingbot')).toBe(true);
    expect(botRegex.test('Slurp')).toBe(true);
    expect(botRegex.test('DuckDuckBot')).toBe(true);
    expect(botRegex.test('YandexBot')).toBe(true);
    expect(botRegex.test('Baiduspider')).toBe(true);
    expect(botRegex.test('facebookexternalhit')).toBe(true);
  });

  it('should match headless browsers', () => {
    expect(botRegex.test('HeadlessChrome')).toBe(true);
    expect(botRegex.test('Lighthouse')).toBe(true);
  });

  it('should match scraping tools', () => {
    expect(botRegex.test('curl/7.64.1')).toBe(true);
    expect(botRegex.test('Wget/1.20.3')).toBe(true);
    expect(botRegex.test('python-requests/2.25.1')).toBe(true);
    expect(botRegex.test('axios/0.21.1')).toBe(true);
    expect(botRegex.test('got/11.8.2')).toBe(true);
    expect(botRegex.test('node-fetch/1.0')).toBe(true);
  });

  it('should not match standard browsers', () => {
    expect(botRegex.test('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')).toBe(false);
    expect(botRegex.test('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15')).toBe(false);
    expect(botRegex.test('Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0')).toBe(false);
  });
});
