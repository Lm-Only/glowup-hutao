import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { 
    CACHE_PATH, 
    CACHE_LOG_FILE, 
    LOG_FILE_TYPE, 
    CHECK_HUTAO_INFO, 
    CACHE_PATH_NAME, 
    LOG_FILE, 
    FOLDER_OUT,
    GITHUB_RAW_URL
} from "./config-global";
import { error, error_c, logger } from "./logger";
import { MAP_FILES, arrayMapFilesRepo } from "./map-files";
import { existsSync } from "node:fs";
import { join } from "node:path";
import request from "./utils/request";
import { delay } from "./utils/generics";

interface ObjPkgJson {
    updates?: number;
    main?: string;

}

type LogFileInfo = {
    replaced?: boolean;
}

type LogFile = Record<string, LogFileInfo>;

const cwd: string = process.cwd();
let logfile: LogFile | null = null;

function checkPackageJson(obj: ObjPkgJson): boolean {
    return Boolean(obj.updates && obj.updates > 0 && obj.main === 'main.js');
}

async function setLogFile(path: string): Promise<void> {
    //    aqui    cuidado
    //    confia que isso já existe
    logfile![path] = logfile?.[path] || {};
    logfile![path]!.replaced = true;

    await writeFile(join(cwd, CACHE_PATH_NAME, LOG_FILE), JSON.stringify(logfile, null, 2));
}

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
        // await mkdir(join(cwd, FOLDER_OUT), {
        //     recursive: true
        // });
    } catch (error) {
        error_c('Não consegui criar a pasta de cache, o processo não pode continuar');
    }
}

export async function replaceDefaultFiles(): Promise<void> {
    try {
        for (const inst of MAP_FILES) {
            const path: string = join(cwd, inst.path);
            const to: string = join(cwd, inst.to);

            if (!existsSync(path)) {
                error('File ' + inst.path + ' not exist');
                continue;
            }

            if (logfile?.[inst.path]?.replaced) {
                logger('Arquivo ja foi registrado, pulando pro proximo');
                continue;
            }

            const fileContent = await readFile(path, 'utf-8');
            await writeFile(to, fileContent);

            setLogFile(inst.path);
            logger('File ' + inst.path + ' replaced to: ' + inst.to + ' with success');
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

export async function loadLogFile(): Promise<void> {
    const logFileContent = await readFile(join(cwd, CACHE_PATH_NAME, LOG_FILE), 'utf-8');
    console.log(logFileContent);
    
    logfile = JSON.parse(logFileContent) as LogFile;
}

export async function verification(): Promise<void> {
    const packageJson: string = 'package.json';

    try {
        const content = await readFile(join(cwd, packageJson), "utf-8");
        const json = JSON.parse(content) as ObjPkgJson;
        const isHutao: boolean = checkPackageJson(json);

        if (!isHutao && CHECK_HUTAO_INFO) {
            error_c("O arquivo não é o da Hutao, para sua segurança, o codigo será finalizado");
        }
    } catch (error) {
        error_c("why?");
    }
}

export async function resetProcess(): Promise<void> {
    await rm(join(cwd, CACHE_PATH_NAME), {
        recursive: true,
        force: true
    });
    await rm(join(cwd, FOLDER_OUT), {
        recursive: true,
        force: true
    });

    logger('Processo reiniciado, digite npm start agora');
}

export async function downloadDefaultFiles(): Promise<void> {
    let withError: boolean = false;

    for (const file of arrayMapFilesRepo) {
        try {
            const path: string = FOLDER_OUT + '/' + file;
            if (logfile?.[path]?.replaced) {
                logger('Dl arquivo ' + file + ' já foi baixado');
                continue;
            }

            const fileContent = await request(GITHUB_RAW_URL + file);
            await writeFile(join(cwd, FOLDER_OUT, file), fileContent);

            setLogFile(path);
            await delay(400);
        } catch (err) {
            error(String(err));
            withError = true;
        }
    }

    if (withError) {
        logger('Arquivos main baixados, porem alguns deram erros. isso significa que sua conexão estava fraca ou deu algum problema');
    }
}