import { registerEnumType } from '@nestjs/graphql';

export enum AllowedOfferType {
  re = 'rent',
  se = 'sell',
}

registerEnumType(AllowedOfferType, {
  name: 'AllowedOfferType',
  description: 'AllowedOfferType',
  valuesMap: {
    re: {
      description: 'rent',
    },
    se: {
      description: 'sell',
    },
  },
});
