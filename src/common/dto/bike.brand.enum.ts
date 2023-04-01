import { registerEnumType } from '@nestjs/graphql';

export enum BikeBrandType {
  ba = 'ba',
  ho = 'ho',
  ya = 'ya',
  tv = 'tv',
  re = 're',
  he = 'he',
  kt = 'kt',
  si = 'si',
  ap = 'ap',
  cr = 'cr',
  be = 'be',
  ve = 've',
  ha = 'ha',
  mo = 'mo',
  cf = 'cf',
  cx = 'cx',
  ms = 'ms',
  hy = 'hy',
  ta = 'ta',
  ma = 'ma',
  fo = 'fo',
  to = 'to',
  ki = 'ki',
  ni = 'ni',
  vo = 'vo',
  rt = 'rt',
  sk = 'sk',
  da = 'da',
  la = 'la',
  je = 'je',
  ot = 'ot',
}

registerEnumType(BikeBrandType, {
  name: 'BikeBrandType',
  description: 'BikeBrandType',
  valuesMap: {
    ba: {
      description: 'bajaj',
    },
    ho: {
      description: 'Honda',
    },
    ya: {
      description: 'Yamaha',
    },
    tv: {
      description: 'TVS',
    },
    re: {
      description: 'Royal Enfield',
    },
    he: {
      description: 'Hero',
    },
    si: {
      description: 'Suzuki',
    },
    ap: {
      description: 'Aprilia',
    },
    cr: {
      description: 'Cross Fire',
    },
    be: {
      description: 'Benali',
    },
    ve: {
      description: 'Vespa',
    },
    ha: {
      description: 'Hartfort',
    },
    mo: {
      description: 'Motor Head',
    },
    cf: {
      description: 'Cfmoto',
    },
    cx: {
      description: 'CrossX',
    },
    ot: {
      description: 'Others',
    },
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
    rt: {
      description: 'Renault',
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
  },
});
