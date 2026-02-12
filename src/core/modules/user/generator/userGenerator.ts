import { generatorType } from '../../../types';
import { userType } from '../userType';

export { userGenerator };

const userGenerator: generatorType<userType> = {
  generate: ({ email, _id, name, role } = {}) => ({
    email: email || 'EMAIL',
    _id: _id ? _id : 'monId123',
    name: name || 'NAME',
    role: role || 'annotator',
  }),
};
