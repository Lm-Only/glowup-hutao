import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createCacheFolder, createLogFile, replaceFiles } from './handler';

async function main(): Promise<void> {
    try {
        await createCacheFolder();
        await createLogFile();
        await replaceFiles();
    } catch (error) {
        console.error(error);
    }
}

main();