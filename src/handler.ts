import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { 
    CACHE_PATH, 
    CACHE_LOG_FILE, 
    LOG_FILE_TYPE, 
    CHECK_HUTAO_INFO, 
    CACHE_PATH_NAME, 
    LOG_FILE, 
    FOLDER_OUT,
    GITHUB_RAW_URL,
    DEV_MODE
} from "./config-global";
import { error, error_c, logger } from "./logger";
import { MAP_FILES, globalFiles } from "./map-files";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { SettingsHutao } from "./@types";

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

/**
 * Checa se o arquivo onde o script foi executado 
 * - se assemelha ao da HutaoBot V9
 */
function checkPackageJson(obj: ObjPkgJson): boolean {
    return Boolean(obj.updates && obj.updates > 0 && obj.main === 'main.js');
}

/**
 * Salva mudanças no arquivo de logs
 */
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
        
        // por padrão ele já cria no shell
        // await mkdir(join(cwd, FOLDER_OUT), {
        //     recursive: true
        // });
    } catch (error) {
        error_c('Não consegui criar a pasta de cache, o processo não pode continuar');
    }
}

/**
 * Objetivo de repassar apenas arquivos padrões
 * - que não tenha tanta serventia
 * - se o arquivo já foi configurado, ele pulapro proximo
 * - caso contrário ele lê o conteúdo do arquivo V9 e manda pra V10
 * - por fim o log é salvo como replaced
 */
export async function replaceDefaultFiles(): Promise<void> {
    try {
        for (const inst of MAP_FILES) {
            const path: string = join(cwd, inst.path);
            const to: string = join(cwd, inst.to);

            logger('Path: ' + path + ' to: ' + to);

            /** verifica se existe **/
            if (!existsSync(path)) {
                error('File ' + inst.path + ' not exist');
                continue;
            }

            /** Verifica se já repassou */
            if (logfile?.[inst.path]?.replaced) {
                logger('Arquivo ja foi registrado, pulando pro proximo');
                continue;
            }

            /** carrega o conteudo */
            const fileContent = await readFile(path, 'utf-8');
            /** Repassa conteudo */
            await writeFile(to, fileContent);

            /** Salva log */
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
    logfile = JSON.parse(logFileContent) as LogFile;
}

export async function verification(): Promise<void> {
    const packageJson: string = 'package.json';
    const path: string = join(cwd, packageJson);

    if (!existsSync(path)) {
        if (!CHECK_HUTAO_INFO) return;

        error('Cade o package.json fi, elouqueceu foi?');
        error_c('E tem que estar no arquivo da Hutao V9 😡😡😡')
    }

    try {
        const content = await readFile(path, "utf-8");
        const json = JSON.parse(content) as ObjPkgJson;
        const isHutao: boolean = checkPackageJson(json);

        if (!isHutao && CHECK_HUTAO_INFO) {
            error_c("O arquivo não é o da Hutao, para sua segurança, o codigo será finalizado");
        }
    } catch (error) {
        if (CHECK_HUTAO_INFO) {
            error_c("why?");
        }

        console.error(error);
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

export async function mergeSettings(): Promise<void> {
    const setg: string = Object.keys(globalFiles)[0]!; // <-- existe
    try {
        const firstPath: string = join(cwd, setg);
        const secondPath: string = join(cwd, globalFiles[setg]!); // <-- existe
        console.log(secondPath);
        
        if (!existsSync(firstPath)) {
            error('Arquivo settings.json da V9 não existe, vai ficar no padrão da V10\n\n');
            return;
        }

        const fileContent: string = await readFile(firstPath, 'utf-8');
        const settings: SettingsHutao = JSON.parse(fileContent);
        
        const textYamlContent: string = "prefixo: '" + (settings?.prefixo || '!') + "'\n" +
            'NumeroDoDono: "' + (settings?.NumeroDoDono || 'NÃO_DEFINIDO') + '"\n' +
            "NickDono: " + (settings?.NickDono || 'Lm Only') + "\n" +
            "NomeDoBot: " + (settings?.NomeDoBot || '𝑯𝒖𝒕𝒂𝒐𝑩𝒐𝒕-𝑴𝑫 ✿') + "\n" +
            "Channel: 120363405418518840@newsletter\n" +
            "token: " + (settings?.token || 'TOKEN_YUTA');

        await writeFile(secondPath, textYamlContent);
    } catch (e) {
        if (!DEV_MODE) {
            error('erro ao mergir settings\n\n');
            return;
        }

        console.error(e);
        console.log('\n\n');
    }
}

export async function mergeGlobalParams(): Promise<void> {
    const glob: string = Object.keys(globalFiles)[1]!;
    try {
        const firstPath: string = join(cwd, glob);
        const secondPath: string = join(cwd, globalFiles[glob]!);

        if (!existsSync(firstPath)) {
            error('Arquivo necessary.json da V9 não existe, vai ficar no padrão da V10\n\n');
            return;
        }

        const fileContent: string = await readFile(firstPath, 'utf-8');
        const json = JSON.parse(fileContent);

        const finalContent: string = await readFile(secondPath, 'utf-8');
        const finalJson = JSON.parse(finalContent);

        const keys = Object.keys(json);
        const keysLength = keys.length;

        for (let i = 0; i < keysLength; i++) {
            const key = keys[i]!;

            if (Object.prototype.hasOwnProperty.call(finalJson, key)) {
                const finalVal = finalJson[key];
                const jsonVal = json[key];

                if (typeof finalVal === 'object' && finalVal !== null && typeof jsonVal === 'object' && jsonVal !== null) {
                    if (Array.isArray(finalVal) && Array.isArray(jsonVal)) {
                        finalJson[key] = Array.from(new Set([...finalVal, ...jsonVal]));
                    } else if (!Array.isArray(finalVal) && !Array.isArray(jsonVal)) {
                        finalJson[key] = { ...finalVal, ...jsonVal };
                    } else {
                        finalJson[key] = jsonVal;
                    }
                } else {
                    finalJson[key] = jsonVal;
                }
            }
        }

        await writeFile(secondPath, JSON.stringify(finalJson, null, 4), 'utf-8');

    } catch (err) {
        console.log(err);
    }
}