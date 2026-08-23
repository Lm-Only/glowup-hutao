// src/handler.ts
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";

// src/config-global.ts
var CACHE_PATH_NAME = ".cache-hutao";
var CACHE_PATH = "./" + CACHE_PATH_NAME;
var LOG_FILE = "logfile.json";
var FOLDER_OUT = "out";
var CACHE_LOG_FILE = CACHE_PATH + "/" + LOG_FILE;
var LOG_FILE_TYPE = "{}";
var CHECK_HUTAO_INFO = false;
var GITHUB_RAW_URL = "https://raw.githubusercontent.com/Lm-Only/HutaoBot/refs/heads/main/";

// src/logger.ts
import { exit } from "node:process";
function error(text) {
  console.error("[ ERROR ] - ", text);
}
function error_c(text) {
  console.error("[ ERROR_C ] - ", text || "Erro cr\xEDtico, processo finalizado");
  exit(1);
}
function logger(text) {
  console.log("[ LOG ] - ", text);
}

// src/map-files.ts
var MAP_FILES = [
  {
    path: "/test/example1",
    to: "/test/example2"
  },
  {
    path: "a",
    to: "b"
  }
];

// src/handler.ts
import { existsSync } from "node:fs";
import { join } from "node:path";

// src/utils/request.ts
async function request(url, opts = {}) {
  const response = await fetch(url, {
    method: opts.method ?? "GET"
  });
  return await response.text();
}

// src/utils/generics.ts
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// src/handler.ts
var cwd = process.cwd();
var logfile = null;
function checkPackageJson(obj) {
  return Boolean(obj.updates && obj.updates > 0 && obj.main === "main.js");
}
async function setLogFile(path) {
  logfile[path] = logfile?.[path] || {};
  logfile[path].replaced = true;
  await writeFile(join(cwd, CACHE_PATH_NAME, LOG_FILE), JSON.stringify(logfile, null, 2));
}
async function createCacheFolder() {
  try {
    await mkdir(CACHE_PATH, {
      recursive: true
    });
  } catch (error2) {
    error_c("N\xE3o consegui criar a pasta de cache, o processo n\xE3o pode continuar");
  }
}
async function replaceDefaultFiles() {
  try {
    for (const inst of MAP_FILES) {
      const path = join(cwd, inst.path);
      const to = join(cwd, inst.to);
      if (!existsSync(path)) {
        error("File " + inst.path + " not exist");
        continue;
      }
      if (logfile?.[inst.path]?.replaced) {
        logger("Arquivo ja foi registrado, pulando pro proximo");
        continue;
      }
      const fileContent = await readFile(path, "utf-8");
      await writeFile(to, fileContent);
      setLogFile(inst.path);
      logger("File " + inst.path + " replaced to: " + inst.to + " with success");
    }
  } catch (error2) {
    console.error(error2);
  }
}
async function createLogFile() {
  if (existsSync(CACHE_LOG_FILE)) return;
  try {
    await writeFile(CACHE_LOG_FILE, LOG_FILE_TYPE);
  } catch (error2) {
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
  } catch (error2) {
    error_c("why?");
  }
}
async function resetProcess() {
  await rm(join(cwd, CACHE_PATH_NAME), {
    recursive: true,
    force: true
  });
  await rm(join(cwd, FOLDER_OUT), {
    recursive: true,
    force: true
  });
  logger("Processo reiniciado, digite npm start agora");
}
var arrayMapFilesRepo = [
  "index.js",
  "package.json",
  "package-lock.json",
  "start.sh"
];
async function downloadDefaultFiles() {
  let withError = false;
  for (const file of arrayMapFilesRepo) {
    try {
      const path = FOLDER_OUT + "/" + file;
      if (logfile?.[path]?.replaced) {
        logger("Dl arquivo " + file + " j\xE1 foi baixado");
        continue;
      }
      const fileContent = await request(GITHUB_RAW_URL + file);
      await writeFile(join(cwd, FOLDER_OUT, file), fileContent);
      setLogFile(path);
      await delay(200);
    } catch (err) {
      error(String(err));
      withError = true;
    }
  }
  if (withError) {
    logger("Arquivos main baixados, porem alguns deram erros. isso significa que sua conex\xE3o estava fraca ou deu algum problema");
  }
}

// src/glowup.ts
var isReset = process.argv.includes("reset");
if (isReset) {
  await resetProcess();
  process.exit(0);
}
await verification();
(async function main() {
  try {
    await createCacheFolder();
    await createLogFile();
    await loadLogFile();
    await downloadDefaultFiles();
    await replaceDefaultFiles();
  } catch (error2) {
    console.error(error2);
  }
})();
