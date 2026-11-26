import React, { ReactElement } from 'react';
import { settingsType } from 'src/types/settings';
import { useApi } from '../api';
import { DataFetcher } from './DataFetcher';
import { fetchSettings } from 'src/utils/settings/fetchSettings';

export { SettingsDataFetcher };

function SettingsDataFetcher(props: { children: (fetched: { settings: settingsType }) => ReactElement }) {
  const settingsFetchInfo = useApi(fetchSettings, {});
  return (
    <DataFetcher
      buildComponentWithData={(settings: settingsType) => props.children({ settings })}
      fetchInfo={settingsFetchInfo}
      route={'settings'}
    />
  );
}
