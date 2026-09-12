import { readFile } from "node:fs/promises";
import Ajv2020 from "ajv/dist/2020.js";

const schema = JSON.parse(await readFile(new URL("../packages/report-schema/report.schema.json", import.meta.url)));
const sample = JSON.parse(await readFile(new URL("../docs/sample-report.json", import.meta.url)));
const ajv = new Ajv2020({ allErrors: true, strict: false, formats: { "date-time": true } });
const validate = ajv.compile(schema);
if (!validate(sample)) {
  console.error(validate.errors);
  process.exit(1);
}
console.log("Sample diagnostic report matches schema 1.0.0.");
