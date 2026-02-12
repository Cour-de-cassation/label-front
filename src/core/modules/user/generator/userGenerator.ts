import { ObjectId } from 'bson';
import { generatorType } from '../../../types';
import { userType } from '../userType';

export { userGenerator };

const userGenerator: generatorType<userType> = {
  generate: ({ email, _id, name, role } = {}) => ({
    email: email || 'EMAIL',
    _id: _id ? new ObjectId(_id).toHexString() : new ObjectId().toHexString(),
    name: name || 'NAME',
    role: role || 'annotator',
  }),
};
