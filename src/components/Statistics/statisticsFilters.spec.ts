import { buildStatisticsFilters, StatisticsFiltersParams } from 'src/components/Statistics/statisticsFilters';
import { ressourceFilterType } from 'src/types/ressourceFilter';

describe('buildStatisticsFilters', () => {
  const ressourceFilter: ressourceFilterType = {
    mustHaveSubAnnotations: false,
    mustHaveSurAnnotations: true,
    jurisdiction: 'Cour de cassation',
    route: 'exhaustive',
    importer: 'recent',
    source: 'jurinet',
    publicationCategory: 'P',
    userId: 'user1',
  };

  function buildParams(refetch = vi.fn()): StatisticsFiltersParams {
    return {
      availableStatisticFilters: {
        publicationCategories: ['P', 'B'],
        routes: ['exhaustive', 'automatic'],
        importers: ['recent', 'manual'],
        sources: ['jurinet', 'jurica'],
        jurisdictions: ['Cour de cassation'],
      },
      users: [
        { _id: 'user1', name: 'Alice' },
        { _id: 'user2', name: 'Bob' },
      ],
      ressourceFilter,
      refetch,
    };
  }

  it.each(['jurisdiction', 'route', 'importer', 'source', 'publicationCategory'] as const)(
    'should read and write the same key for the %s dropdown filter',
    (key) => {
      const refetch = vi.fn();
      const filter = buildStatisticsFilters(buildParams(refetch)).find(({ name }) => name === key);

      if (filter?.kind !== 'dropdown') {
        throw new Error(`${key} should be a dropdown filter`);
      }
      expect(filter.value).toBe(ressourceFilter[key]);

      filter.onChange(undefined);

      expect(refetch).toHaveBeenCalledWith({ ...ressourceFilter, [key]: undefined });
    },
  );

  it('should toggle the boolean filters', () => {
    const refetch = vi.fn();
    const filter = buildStatisticsFilters(buildParams(refetch)).find(({ name }) => name === 'mustHaveSurAnnotations');

    if (filter?.kind !== 'boolean') {
      throw new Error('mustHaveSurAnnotations should be a boolean filter');
    }
    expect(filter.checked).toBe(true);

    filter.onToggle();

    expect(refetch).toHaveBeenCalledWith({ ...ressourceFilter, mustHaveSurAnnotations: false });
  });

  it('should map the user filter between names and ids', () => {
    const refetch = vi.fn();
    const filter = buildStatisticsFilters(buildParams(refetch)).find(({ name }) => name === 'user');

    if (filter?.kind !== 'dropdown') {
      throw new Error('user should be a dropdown filter');
    }
    expect(filter.value).toBe('Alice');

    filter.onChange('Bob');

    expect(refetch).toHaveBeenCalledWith({ ...ressourceFilter, userId: 'user2' });
  });

  it('should convert the treatment date interval to timestamps', () => {
    const refetch = vi.fn();
    const filter = buildStatisticsFilters(buildParams(refetch)).find(({ name }) => name === 'treatmentDate');

    if (filter?.kind !== 'dateInterval') {
      throw new Error('treatmentDate should be a date interval filter');
    }
    const startDate = new Date(2026, 0, 1);

    filter.onChange({ startDate, endDate: undefined });

    expect(refetch).toHaveBeenCalledWith({ ...ressourceFilter, startDate: startDate.getTime(), endDate: undefined });
  });
});
