import { registerEnumType } from '@nestjs/graphql';

export enum OtpType {
  VERIFICATION = 'VERIFICATION',
  RESET_PASSWORD = ' RESET_PASSWORD',
}

registerEnumType(OtpType, {
  name: 'OtpType',
  description: 'OtpType',
  valuesMap: {
    VERIFICATION: {
      description: 'VERIFICATION',
    },
    RESET_PASSWORD: {
      description: '   RESET_PASSWORD',
    },
  },
});
