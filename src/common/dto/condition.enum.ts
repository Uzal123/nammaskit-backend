import { registerEnumType } from '@nestjs/graphql';

export enum VehicleCondition {
  bn = 'bn',
  ln = 'ln',
  us = 'us',
  no = 'no',
}

registerEnumType(VehicleCondition, {
  name: 'condtion',
  description: 'condtion',
  valuesMap: {
    bn: {
      description: 'Brand New',
    },
    ln: {
      description: 'Like New',
    },
    us: {
      description: 'Used',
    },
    no: {
      description: 'Not Working',
    },
  },
});
