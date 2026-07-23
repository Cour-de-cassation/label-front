import { documentType } from '../documentType';

export { getNextStatus };

function getNextStatus({
  status,
  route,
}: {
  status: documentType['status'];
  route: documentType['route'];
}): documentType['status'] {
  switch (status) {
    case 'free':
      return 'pending';
    case 'pending':
      return 'saved';
    case 'saved':
      if (route === 'confirmation') {
        return 'toBeConfirmed';
      }
      return 'done';
    case 'locked':
      if (route === 'confirmation') {
        return 'toBeConfirmed';
      }
      return 'done';
    case 'toBeConfirmed':
      return 'done';
    default:
      return status;
  }
}
