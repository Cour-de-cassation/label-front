export type userRoleType = 'admin' | 'annotator' | 'publicator' | 'scrutator';
export type userType = {
  _id: string;
  email: string;
  name: string;
  role: userRoleType;
};
