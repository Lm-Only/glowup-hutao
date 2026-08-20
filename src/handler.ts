import { mkdir, writeFile } from "node:fs/promises";
import { CACHE_PATH, CACHE_LOG_FILE, LOG_FILE_TYPE } from "../config-global";
import { error_c } from "./logger";
import { MAP_FILES } from "./map-files";
import { existsSync } from "node:fs";

/**
 *  Essa func é responsavel por criar a pasta de backup
 * de forma recursiva
 * 
 * Ou seja, se a pasta já existir, ela apenas ignora
 */
export async function createCacheFolder(): Promise<void> {
    try {
        await mkdir(CACHE_PATH, {
            recursive: true
        });
    } catch (error) {
        error_c('Não consegui criar a pasta de cache, o processo não pode continuar');
    }
}

export async function replaceFiles() {
    try {
        const keys = Object.keys(MAP_FILES) as Array<keyof typeof MAP_FILES>
        for (const key of keys) {
            console.log(key);
        }
    } catch (error) {
        console.error(error);
        
    }
}

export async function createLogFile(): Promise<void> {
    if (existsSync(CACHE_LOG_FILE)) return; // <-- omg k

    try {
        await writeFile(CACHE_LOG_FILE, LOG_FILE_TYPE);
    } catch (error) {
        error_c('Não consegui criar o arquivo que monitora os logs, o processo não pode continuar');
    }
}