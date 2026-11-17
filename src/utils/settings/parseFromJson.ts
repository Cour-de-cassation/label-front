import { settingsType } from 'src/types/settings';
import { buildSettings, partialSettingsType } from 'src/utils/settings/buildSettings';

export function parseFromJson(json: string): settingsType {
  const partialSettings = JSON.parse(json) as partialSettingsType;
  return buildSettings(partialSettings);
}
