import { SearchNumberWithEPrefixAlgorithms } from './search-number-with-prefix-algorithm.js';

test('should find a episode number with the given prefix', () => {
  const algo = new SearchNumberWithEPrefixAlgorithms({ prefix: 'E' });
  
  expect(algo.searchEpisodeNumber('EpisodeE01InS01')).toBe(1);
  expect(algo.searchEpisodeNumber('EpisodeE01InS02')).toBe(1);

  expect(algo.searchEpisodeNumber('Episodee01InS01')).toBe(1);
  expect(algo.searchEpisodeNumber('Episodee01InS02')).toBe(1);

  expect(algo.searchEpisodeNumber('T01Episodee01InS01')).toBe(1);
  expect(algo.searchEpisodeNumber('T02Episodee01InS02')).toBe(1);

  expect(algo.searchEpisodeNumber('Episode01InS01')).toBe(1);
  expect(algo.searchEpisodeNumber('Ep01InS02')).toBe(null);

  expect(algo.searchEpisodeNumber('EpisodeE32InS01')).toBe(32);
  expect(algo.searchEpisodeNumber('EpisodeE320InS01')).toBe(320);
});