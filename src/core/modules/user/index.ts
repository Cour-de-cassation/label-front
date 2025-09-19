import { userModel, userType, passwordTimeValidityStatusType, passwordTimeValidityStatusModel } from './userType';

export { userModule };

export type { userType, passwordTimeValidityStatusType };

const userModule = {
  models: { user: userModel, passwordTimeValidityStatus: passwordTimeValidityStatusModel },
};
