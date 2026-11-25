import { apiRouteOutType } from 'src/api/apiRouteType';
import { filterType } from 'src/components/FilterButton';
import { ressourceFilterType } from 'src/types/ressourceFilter';
import { userType } from 'src/types/user';
import { wordings } from 'src/wordings';

export type StatisticsFiltersParams = {
  availableStatisticFilters: apiRouteOutType<'get', 'availableStatisticFilters'>;
  users: Pick<userType, '_id' | 'name'>[];
  ressourceFilter: ressourceFilterType;
  refetch: (ressourceFilter: ressourceFilterType) => void;
};

type DropdownFilterKey = 'jurisdiction' | 'route' | 'importer' | 'source' | 'publicationCategory';

type BooleanFilterKey = 'mustHaveSubAnnotations' | 'mustHaveSurAnnotations';

export function buildStatisticsFilters({
  availableStatisticFilters,
  users,
  ressourceFilter,
  refetch,
}: StatisticsFiltersParams): filterType[] {
  const { fields, chips } = wordings.business.filters;

  return [
    buildDateIntervalFilter(),
    buildUserFilter(),
    buildDropdownFilter('jurisdiction', fields.jurisdiction, availableStatisticFilters.jurisdictions),
    buildDropdownFilter('route', fields.route, availableStatisticFilters.routes),
    buildDropdownFilter('importer', fields.importer, availableStatisticFilters.importers),
    buildDropdownFilter('source', fields.source, availableStatisticFilters.sources),
    buildDropdownFilter(
      'publicationCategory',
      fields.publicationCategoryLetter,
      availableStatisticFilters.publicationCategories,
    ),
    buildBooleanFilter('mustHaveSubAnnotations', fields.mustHaveSubAnnotations, chips.mustHaveSubAnnotations),
    buildBooleanFilter('mustHaveSurAnnotations', fields.mustHaveSurAnnotations, chips.mustHaveSurAnnotations),
  ];

  function buildDropdownFilter(key: DropdownFilterKey, label: string, possibleValues: string[]): filterType {
    return {
      kind: 'dropdown',
      name: key,
      label,
      possibleValues,
      value: ressourceFilter[key],
      onChange: (value) => refetch({ ...ressourceFilter, [key]: value } as ressourceFilterType),
    };
  }

  function buildBooleanFilter(key: BooleanFilterKey, label: string, chipLabel: string): filterType {
    return {
      kind: 'boolean',
      name: key,
      label,
      chipLabel,
      checked: ressourceFilter[key],
      onToggle: () => refetch({ ...ressourceFilter, [key]: !ressourceFilter[key] }),
    };
  }

  function buildDateIntervalFilter(): filterType {
    return {
      kind: 'dateInterval',
      name: 'treatmentDate',
      value: {
        startDate: ressourceFilter.startDate ? new Date(ressourceFilter.startDate) : undefined,
        endDate: ressourceFilter.endDate ? new Date(ressourceFilter.endDate) : undefined,
      },
      labelStart: fields.treatmentDate.start,
      labelEnd: fields.treatmentDate.end,
      chipLabelPrefix: chips.treatmentDate,
      extremumAvailableDates: { min: availableStatisticFilters.minDate, max: availableStatisticFilters.maxDate },
      onChange: ({ startDate, endDate }) =>
        refetch({ ...ressourceFilter, startDate: startDate?.getTime(), endDate: endDate?.getTime() }),
    };
  }

  function buildUserFilter(): filterType {
    return {
      kind: 'dropdown',
      name: 'user',
      label: fields.userName,
      possibleValues: users.map(({ name }) => name).sort(),
      value: users.find(({ _id }) => _id === ressourceFilter.userId)?.name,
      onChange: (userName) => {
        if (!userName) {
          return refetch({ ...ressourceFilter, userId: undefined });
        }
        const userId = users.find(({ name }) => name === userName)?._id;
        if (userId) {
          refetch({ ...ressourceFilter, userId });
        }
      },
    };
  }
}
