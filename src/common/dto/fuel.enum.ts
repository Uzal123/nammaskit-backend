import { registerEnumType } from '@nestjs/graphql';

export enum AllowedFuelType {
  di = 'di',
  pe = 'pe',
  el = 'el',
  hy = 'hy',
}

registerEnumType(AllowedFuelType, {
  name: 'AllowedFuelType',
  description: 'AllowedFuelType',
  valuesMap: {
    di: {
      description: 'disel',
    },
    pe: {
      description: 'petrol',
    },
    el: {
      description: 'electric',
    },
    hy: {
      description: 'Hybrid',
    },
  },
});
