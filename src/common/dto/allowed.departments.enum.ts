import { registerEnumType } from '@nestjs/graphql';

export enum AllowedDepartment {
  cse = 'cse',
  ece = 'ece',
  eee = 'eee',
  me = 'me',
  ce = 'ce',
  it = 'it',
  bme = 'bme',
  aeie = 'aeie',
  mme = 'mme',
}

registerEnumType(AllowedDepartment, {
  name: 'AllowedDepartment',
  description: 'AllowedDepartment',
  valuesMap: {
    cse: {
      description: 'Computer Science and Engineering',
    },
    ece: {
      description: 'Electronics and Communication Engineering',
    },
    eee: {
      description: 'Electrical and Electronics Engineering',
    },
    me: {
      description: 'Mechanical Engineering',
    },
    ce: {
      description: 'Civil Engineering',
    },
    it: {
      description: 'Information Technology',
    },
    bme: {
      description: 'Bio Medical Engineering',
    },
    aeie: {
      description: 'Aeronautical Engineering and Industrial Engineering',
    },
    mme: {
      description: 'Metallurgical and Materials Engineering',
    },
  },
});
