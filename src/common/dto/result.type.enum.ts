import { registerEnumType } from '@nestjs/graphql';

export enum ResultType {
  SEMESTER = 'SEMESTER',
  IA1 = 'IA1',
  IA2 = 'IA2',
  IA3 = 'IA3',
  AS1 = 'AS1',
  AS2 = 'AS2',
  AS3 = 'AS3',
}

registerEnumType(ResultType, {
  name: 'ResultType',
  description: 'ResultType',
  valuesMap: {
    SEMESTER: {
      description: 'SEMESTER',
    },
    IA1: {
      description: 'IA1',
    },
    IA2: {
      description: 'IA2',
    },
    IA3: {
      description: 'IA3',
    },
    AS1: {
      description: 'AS1',
    },
    AS2: {
      description: 'AS2',
    },
    AS3: {
      description: 'AS3',
    },
  },
});
