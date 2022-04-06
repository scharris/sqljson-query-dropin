import { QueryGroupSpec, QuerySpec, RecordCondition, generateQueriesWithArgvOptions } from 'sqljson-query';

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

// Run the query generator with options specified in arguments to this script.

generateQueriesWithArgvOptions(queryGroupSpec, process.argv)
  .then(() => { console.log("Query generation completed."); })
  .catch((e) => {
    console.error(e);
    console.error("Query generation failed due to error - see error detail above.");
    process.exit(1);
  });
