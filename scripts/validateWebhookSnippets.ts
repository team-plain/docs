import fs from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const SCHEMA_URL = 'https://core-api.uk.plain.com/webhooks/schema/latest.json';

const SNIPPET_DIR = path.join(__dirname, '../_snippets/webhooks');

async function main() {
  console.log('Fetching latest webhook schema…');

  const schema = await fetch(SCHEMA_URL).then((res) => res.json());

  // Same parser and options as our SDK.
  const ajv = new Ajv({
    unicodeRegExp: false,
  });
  addFormats(ajv);

  const validate = ajv.compile(schema);

  async function validateSnippet(raw: string) {
    const jsonString = raw.match(/^\s*```json\s*([\s\S]+)\s*```\s*$/)?.[1];
    if (!jsonString) {
      throw new Error('Invalid snippet format. Missing JSON code block.');
    }

    const payload = (() => {
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        throw new Error('Invalid JSON');
      }
    })();

    if (!validate(payload)) {
      throw new Error(ajv.errorsText(validate.errors, { separator: '\n' }));
    }
  }

  const errors: Error[] = [];
  const snippetFiles = fs.readdirSync(SNIPPET_DIR);
  console.log('Validating webhook snippets…\n');

  for (const snippetFile of snippetFiles) {
    const snippetPath = path.join(SNIPPET_DIR, snippetFile);
    const snippetContent = fs.readFileSync(snippetPath, 'utf-8');

    try {
      await validateSnippet(snippetContent);
      console.log(`\u001b[32m✓\u001b[39m ${snippetFile}\n`);
    } catch (e) {
      errors.push(e);
      console.error(`\u001b[31m✗\u001b[39m ${snippetFile}\n${e.message}\n`);
    }
  }

  if (errors.length > 0) {
    console.error(`\u001b[31m${errors.length} snippet(s) failed validation.\u001b[39m`);
    process.exit(1);
  }

  console.log(`\u001b[32mAll snippets passed validation.\u001b[39m`);
}

main();
