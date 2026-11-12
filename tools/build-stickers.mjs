// stickers/ フォルダの画像一覧を stickers/stickers.json に書き出す。
// GitHub Actions が公開のたびに自動で実行するので、ふだんは手で動かす必要はありません。
// 手元で試すとき: node tools/build-stickers.mjs
import { readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'stickers');
const IMAGE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

const files = readdirSync(dir)
  .filter(f => IMAGE.test(f) && !f.startsWith('.'))
  .sort((a, b) => a.localeCompare(b, 'ja'));

writeFileSync(join(dir, 'stickers.json'), JSON.stringify(files, null, 2) + '\n');
console.log(`stickers.json: ${files.length} images`);
