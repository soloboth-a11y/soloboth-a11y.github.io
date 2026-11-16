// stickers/ と sprites/ フォルダの画像一覧を、それぞれのフォルダの JSON に書き出す。
//   stickers/stickers.json … シールの画像
//   sprites/sprites.json   … トップに出す アニメーション（スプライトシート）
// GitHub Actions が公開のたびに自動で実行するので、ふだんは手で動かす必要はありません。
// 手元で試すとき: node tools/build-lists.mjs
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMAGE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

for (const [folder, out] of [['stickers', 'stickers.json'], ['sprites', 'sprites.json']]) {
  const dir = join(root, folder);
  const files = existsSync(dir)
    ? readdirSync(dir).filter(f => IMAGE.test(f) && !f.startsWith('.')).sort((a, b) => a.localeCompare(b, 'ja'))
    : [];
  writeFileSync(join(dir, out), JSON.stringify(files, null, 2) + '\n');
  console.log(`${folder}/${out}: ${files.length} images`);
}
