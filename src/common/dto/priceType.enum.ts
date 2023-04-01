import { registerEnumType } from '@nestjs/graphql';

export enum PricedType {
  ne = 'ne',
  fi = 'fi',
}

registerEnumType(PricedType, {
  name: 'PricedType',
  description: 'PricedType',
  valuesMap: {
    ne: {
      description: 'negotiable',
    },
    fi: {
      description: 'fixed',
    },
  },
});
