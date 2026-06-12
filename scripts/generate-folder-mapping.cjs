const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.resolve(__dirname, '../src/content/posts');
const MAP_DIR = path.resolve(__dirname, '../src/i18n/folders');
const LOCALES = ['zh', 'en'];

function collectSlugs(dir) {
    const slugs = new Set();
    function walk(current) {
        const items = fs.readdirSync(current, { withFileTypes: true });
        for (const it of items) {
        if (it.isDirectory()) {
                slugs.add(it.name);
                walk(path.join(current, it.name));
            }
        }
    }
    walk(dir);
    return Array.from(slugs).sort();
}

function loadMap(locale) {
    const file = path.join(MAP_DIR, `${locale}.json`);
    if (!fs.existsSync(file)) return {};
    try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
    console.error('Failed to parse', file, e);
    return {};
    }
}

function writeMap(locale, map) {
    const file = path.join(MAP_DIR, `${locale}.json`);
    fs.writeFileSync(file, JSON.stringify(map, null, 2) + '\n', 'utf8');
}

function main() {
    if (!fs.existsSync(MAP_DIR)) fs.mkdirSync(MAP_DIR, { recursive: true });
    const slugs = collectSlugs(CONTENT_DIR);
    console.log('Found slugs:', slugs.join(', '));

    const missing = {};
    for (const locale of LOCALES) {
    const map = loadMap(locale);
    let changed = false;
    for (const slug of slugs) {
        if (!(slug in map)) {
        map[slug] = slug; // placeholder
        changed = true;
        if (!missing[locale]) missing[locale] = [];
        missing[locale].push(slug);
        }
    }
    if (changed) writeMap(locale, map);
    }

    console.log('Missing entries added as placeholders:');
    console.log(JSON.stringify(missing, null, 2));
    console.log('Please edit files in src/i18n/folders to provide localized display names.');
}

main();
