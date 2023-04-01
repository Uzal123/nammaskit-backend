import { registerEnumType } from '@nestjs/graphql';

export enum VehicleType {
  ca = 'ca',
  bi = 'bi',
  sc = 'sc'
}

registerEnumType(VehicleType, {
  name: 'VehicleType',
  description: 'vehicleType',
  valuesMap: {
    ca: {
      description: 'car',
    },
    bi: {
      description: 'bike',
    },
    sc: {
      description: 'scooter',
    },
  },
});

