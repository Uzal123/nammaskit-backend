import { registerEnumType } from '@nestjs/graphql';

export enum CarBrandType {
  ms = 'ms',
  hy = 'hy',
  ta = 'ta',
  ma = 'ma',
  fo = 'fo',
  to = 'to',
  kt = 'kt',
  ki = 'ki',
  ni = 'ni',
  vo = 'vo',
  re = 're',
  ho = 'ho',
  sk = 'sk',
  da = 'da',
  la = 'la',
  je = 'je',
  ot = 'ot',
}

registerEnumType(CarBrandType, {
  name: 'CarBrandType',
  description: 'Car Brands',
  valuesMap: {
    ms: {
      description: 'Maruti Suzuki',
    },
    hy: {
      description: 'Hyundai',
    },
    ta: {
      description: 'Tata',
    },
    ma: {
      description: 'Mahindra',
    },
    fo: {
      description: 'Ford',
    },
    to: {
      description: 'Toyota',
    },
    kt: {
      description: 'KTM',
    },
    ki: {
      description: 'Kia',
    },
    ni: {
      description: 'Nissan',
    },
    vo: {
      description: 'Volkswagen',
    },
    re: {
      description: 'Renault',
    },
    ho: {
      description: 'Honda',
    },
    sk: {
      description: 'Skoda',
    },
    da: {
      description: 'Datsun',
    },
    la: {
      description: 'Land Rover',
    },
    je: {
      description: 'Jeep',
    },
    ot: {
      description: 'Others',
    },
  },
});
