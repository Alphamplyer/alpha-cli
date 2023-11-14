import { SearchNumberWithEPrefixAlgorithms } from './search-number-with-prefix-algorithm.js';

test('should find a episode number with the given prefix', () => {
  const algo = new SearchNumberWithEPrefixAlgorithms({ prefix: 'E' });
  
  expect(algo.searchEpisodeNumber('EpisodeE01InS01')?.toString()).toBe('1');
  expect(algo.searchEpisodeNumber('EpisodeE01InS02')?.toString()).toBe('1');

  expect(algo.searchEpisodeNumber('Episodee01InS01')?.toString()).toBe('1');
  expect(algo.searchEpisodeNumber('Episodee01InS02')?.toString()).toBe('1');

  expect(algo.searchEpisodeNumber('T01Episodee01InS01')?.toString()).toBe('1');
  expect(algo.searchEpisodeNumber('T02Episodee01InS02')?.toString()).toBe('1');

  expect(algo.searchEpisodeNumber('Episode01InS01')?.toString()).toBe('1');
  expect(algo.searchEpisodeNumber('Ep01InS02')).toBe(null); // Don't call toString() function when null is expected or it would failed because the received value is unexpected.

  expect(algo.searchEpisodeNumber('EpisodeE32InS01')?.toString()).toBe('32');
  expect(algo.searchEpisodeNumber('EpisodeE320InS01')?.toString()).toBe('320');

  expect(algo.searchEpisodeNumber('EpisodeE01.5InS01')?.toString()).toBe('1.5');
  expect(algo.searchEpisodeNumber('EpisodeE00InS02')?.toString()).toBe('0');
});