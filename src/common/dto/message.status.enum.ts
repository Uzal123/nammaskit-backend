import { registerEnumType } from '@nestjs/graphql';

export enum AllowedMessageStatus {
  se = 'se',
  de = 'de',
}

registerEnumType(AllowedMessageStatus, {
  name: 'AllowedMessageStatus',
  description: 'AllowedMessageStatus',
  valuesMap: {
    se: {
      description: 'seen',
    },
    de: {
      description: 'delivered',
    },
  },
});
