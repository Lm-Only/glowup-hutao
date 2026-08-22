// src/handler.ts
import { mkdir, readFile, writeFile } from "node:fs/promises";

// src/config-global.ts
var CACHE_PATH_NAME = ".cache-hutao";
var CACHE_PATH = "./" + CACHE_PATH_NAME;
var LOG_FILE = "logfile.json";
var CACHE_LOG_FILE = CACHE_PATH + "/" + LOG_FILE;
var LOG_FILE_TYPE = "{}";
var CHECK_HUTAO_INFO = false;

// src/logger.ts
import { exit } from "node:process";
function error_c(text) {
  console.error("[ ERROR_C ] - ", text || "Erro cr\xEDtico, processo finalizado");
  exit(1);
}

// src/map-files.ts
var MAP_FILES = [
  {
    path: "/test/example1",
    to: "/test/example2"
  }
];

// src/handler.ts
import { existsSync } from "node:fs";
import { join } from "node:path";
var cwd = process.cwd();
var logfile = null;
function checkPackageJson(obj) {
  return Boolean(obj.updates && obj.updates > 0 && obj.main === "main.js");
}
async function createCacheFolder() {
  try {
    await mkdir(CACHE_PATH, {
      recursive: true
    });
  } catch (error) {
    error_c("N\xE3o consegui criar a pasta de cache, o processo n\xE3o pode continuar");
  }
}
async function replaceDefaultFiles() {
  try {
    for (const inst of MAP_FILES) {
      const fileContent = await readFile(join(cwd, inst.path), "utf-8");
      await writeFile(join(cwd, inst.to), fileContent);
      logfile[inst.path] = logfile?.[inst.path] || {};
      logfile[inst.path].replaced = true;
      await writeFile(join(cwd, CACHE_PATH_NAME, LOG_FILE), JSON.stringify(logfile, null, 2));
    }
  } catch (error) {
    console.error(error);
  }
}
async function createLogFile() {
  if (existsSync(CACHE_LOG_FILE)) return;
  try {
    await writeFile(CACHE_LOG_FILE, LOG_FILE_TYPE);
  } catch (error) {
    error_c("N\xE3o consegui criar o arquivo que monitora os logs, o processo n\xE3o pode continuar");
  }
}
async function loadLogFile() {
  const logFileContent = await readFile(join(cwd, CACHE_PATH_NAME, LOG_FILE), "utf-8");
  console.log(logFileContent);
  logfile = JSON.parse(logFileContent);
}
async function verification() {
  const packageJson = "package.json";
  try {
    const content = await readFile(join(cwd, packageJson), "utf-8");
    const json = JSON.parse(content);
    const isHutao = checkPackageJson(json);
    if (!isHutao && CHECK_HUTAO_INFO) {
      error_c("O arquivo n\xE3o \xE9 o da Hutao, para sua seguran\xE7a, o codigo ser\xE1 finalizado");
    }
  } catch (error) {
    error_c("why?");
  }
}

// src/glowup.ts
async function main() {
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
