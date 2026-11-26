import { apiCaller } from 'src/api/apiCaller';
import { parseFromJson } from 'src/utils/settings/parseFromJson';

export async function fetchSettings() {
  const { data, statusCode } = await apiCaller.get('settings');
  return { data: parseFromJson(data.json), statusCode };
}
