import { registerEnumType } from '@nestjs/graphql';

export enum AllowedTransmissionType {
  au = 'au',
  ma = 'ma',
}

registerEnumType(AllowedTransmissionType, {
  name: 'AllowedTransmissionType',
  description: 'AllowedFuelType',
  valuesMap: {
    au: {
      description: 'automatic',
    },
    ma: {
      description: 'manual',
    },
  },
});
