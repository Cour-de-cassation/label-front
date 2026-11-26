import React, { ReactElement } from 'react';
import { settingsType } from 'src/types/settings';
import { apiCaller, useApi } from '../api';
import { DataFetcher } from './DataFetcher';
import { parseFromJson } from 'src/utils/settings/parseFromJson';

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

export async function fetchSettings() {
  const { data, statusCode } = await apiCaller.get<'settings'>('settings');
  return { data: parseFromJson(data.json) as settingsType, statusCode };
}
