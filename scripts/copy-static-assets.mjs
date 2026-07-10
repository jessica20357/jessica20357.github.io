import { cp, copyFile, mkdir } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
await cp('resources', 'dist/resources', { recursive: true });
await copyFile('dist/index.html', 'dist/404.html');
