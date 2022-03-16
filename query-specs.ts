import {QueryGroupSpec, QuerySpec, RecordCondition} from 'sqljson-query';


const drugsQuery1: QuerySpec = {
  queryName: 'drugs query 1',
  tableJson: {
    table: 'drug',
    recordCondition: { sql: 'category_code = :catCode', paramNames: ['catCode'] },
    fieldExpressions: [
      { field: 'name', jsonProperty: 'drugName' },
      'category_code', // short for: { field: 'category_code', jsonProperty: 'categoryCode' }
      { expression: '$$.cid + 1000',
        jsonProperty: 'cidPlus1000',
        fieldTypeInGeneratedSource: {TS: 'number | null', Java: '@Nullable Long'} },
    ],
  }
};

export const queryGroupSpec: QueryGroupSpec = {
  defaultSchema: 'drugs',
  generateUnqualifiedNamesForSchemas: [ 'drugs' ],
  propertyNameDefault: 'CAMELCASE',
  querySpecs: [
    drugsQuery1,
  ]
};
