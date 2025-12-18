import { ObjectId } from 'bson';
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
    _id: new ObjectId(),
    email: email.trim().toLowerCase(),
    name,
    role,
  };
}
