import { userType } from '../userType';

export { buildUser };

async function buildUser({
  email,
  name,
  role,
}: {
  email: string;
  name: string;
  role: userType['role'];
}): Promise<userType> {
  return {
    _id: 'monId123',
    email: email.trim().toLowerCase(),
    name,
    role,
  };
}
