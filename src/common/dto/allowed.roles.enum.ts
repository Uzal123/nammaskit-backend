import { registerEnumType } from '@nestjs/graphql';

export enum AllowedRole {
  ad = 'ad',
  pr = 'pr',
  hod = 'hod',
  st = 'st',
  pa = 'pa',
  fa = 'fa',
}

registerEnumType(AllowedRole, {
  name: 'AllowedRole',
  description: 'AllowedRole',
  valuesMap: {
    ad: {
      description: 'Admin',
    },
    pr: {
      description: 'Proctor',
    },
    hod: {
      description: 'Head of Department',
    },
    st: {
      description: 'Student',
    },
    pa: {
      description: 'Parent',
    },
    fa: {
      description: 'Faculty',
    },
  },
});
