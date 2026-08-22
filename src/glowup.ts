import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createCacheFolder, createLogFile, loadLogFile, replaceDefaultFiles, verification } from './handler';

async function main(): Promise<void> {
    try {
        await createCacheFolder();
        await createLogFile();
        await loadLogFile();
        await replaceDefaultFiles();
    } catch (error) {
        console.error(error);
    }
}

await verification();
await main();
