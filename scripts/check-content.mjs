// Checks that every language dictionary has exactly the keys and array lengths of en.ts,
// and reports how many German texts are still untranslated placeholders.
// Run: npm run check:content
import { en } from '../src/content/en.ts';
import { de } from '../src/content/de.ts';

const problems = [];
function walk(a, b, path) {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b) || (a === null) !== (b === null)) {
    problems.push(`${path}: type differs (en: ${typeof a}, de: ${typeof b})`);
    return;
  }
  if (Array.isArray(a)) {
    if (a.length !== b.length) problems.push(`${path}: ${a.length} items in en, ${b.length} in de`);
    a.forEach((x, i) => i < b.length && walk(x, b[i], `${path}[${i}]`));
  } else if (a && typeof a === 'object') {
    for (const k of Object.keys(a)) k in b ? walk(a[k], b[k], `${path}.${k}`) : problems.push(`${path}.${k}: missing in de`);
    for (const k of Object.keys(b)) if (!(k in a)) problems.push(`${path}.${k}: extra in de`);
  }
}
walk(en, de, 'de');
const pending = JSON.stringify(de).match(/"\[DE\] /g)?.length ?? 0;
if (problems.length) {
  console.error(`Content check failed:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`Content check passed. German: ${pending} texts still marked [DE] (untranslated).`);
