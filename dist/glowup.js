// src/config-global.ts
var CACHE_PATH_NAME = ".cache-hutao";
var CACHE_PATH = "./" + CACHE_PATH_NAME;
var LOG_FILE = "logfile.json";
var FOLDER_OUT = "HutaoBotV10";
var CACHE_LOG_FILE = CACHE_PATH + "/" + LOG_FILE;
var LOG_FILE_TYPE = "{}";
var CHECK_HUTAO_INFO = false;
var GITHUB_RAW_URL = "https://raw.githubusercontent.com/Lm-Only/HutaoBot/refs/heads/main/";

// src/handler.ts
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";

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
    path: "/assets/groups/TMGP.json",
    to: FOLDER_OUT + "/assets/groups/TMGP.json"
  },
  {
    path: "/assets/groups/aluguel.json",
    to: FOLDER_OUT + "/assets/groups/aluguel.json"
  },
  {
    path: "/assets/groups/anotar.json",
    to: FOLDER_OUT + "/assets/groups/anotar.json"
  },
  {
    path: "/assets/groups/avisos.json",
    to: FOLDER_OUT + "/assets/groups/avisos.json"
  },
  {
    path: "/assets/groups/countmsg.json",
    to: FOLDER_OUT + "/assets/groups/countmsg.json"
  },
  {
    path: "/assets/groups/muted.json",
    to: FOLDER_OUT + "/assets/groups/muted.json"
  },
  {
    path: "/assets/groups/openGroup.json",
    to: FOLDER_OUT + "/assets/groups/openGroup.json"
  },
  {
    path: "/assets/media/audios/bomdia.mp3",
    to: FOLDER_OUT + "/assets/media/audios/bomdia.mp3"
  },
  {
    path: "/assets/media/audios/index.js",
    to: FOLDER_OUT + "/assets/media/audios/index.js"
  },
  {
    path: "/assets/media/logos/logo.json",
    to: FOLDER_OUT + "/assets/media/images/logo.json"
  },
  {
    path: "/assets/users/banned.json",
    to: FOLDER_OUT + "/assets/users/banned.json"
  },
  {
    path: "/assets/users/family.json",
    to: FOLDER_OUT + "/assets/users/family.json"
  },
  {
    path: "/assets/users/jogodavelha.json",
    to: FOLDER_OUT + "/assets/users/jogodavelha.json"
  },
  {
    path: "/assets/users/premium.json",
    to: FOLDER_OUT + "/assets/users/premium.json"
  },
  {
    path: "/assets/users/rgfigus.json",
    to: FOLDER_OUT + "/assets/users/rgfigus.json"
  },
  {
    path: "/assets/users/take.json",
    to: FOLDER_OUT + "/assets/users/take.json"
  }
];
var arrayMapFilesRepo = [
  "index.js",
  "package.json",
  "package-lock.json",
  "start.sh",
  "qrcode-reset.sh",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "CLAUDE.md",
  "CODE_OF_CONDUCT.md",
  "README.md",
  "SECURITY.md",
  "LICENSE"
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
      logger("Path: " + path + " to: " + to);
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
  const path = join(cwd, packageJson);
  if (!existsSync(path)) {
    if (!CHECK_HUTAO_INFO) return;
    error("Cade o package.json fi, elouqueceu foi?");
    error_c("E tem que estar no arquivo da Hutao V9 \u{1F621}\u{1F621}\u{1F621}");
  }
  try {
    const content = await readFile(path, "utf-8");
    const json = JSON.parse(content);
    const isHutao = checkPackageJson(json);
    if (!isHutao && CHECK_HUTAO_INFO) {
      error_c("O arquivo n\xE3o \xE9 o da Hutao, para sua seguran\xE7a, o codigo ser\xE1 finalizado");
    }
  } catch (error2) {
    if (CHECK_HUTAO_INFO) {
      error_c("why?");
    }
    console.error(error2);
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
      await delay(400);
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
    logger("Criando pasta de cache: " + CACHE_PATH);
    await createCacheFolder();
    logger("Criando arquivo de logs: " + CACHE_LOG_FILE);
    await createLogFile();
    logger("Carregando arquivo de logs em tempo de execu\xE7\xE3o");
    await loadLogFile();
    logger("Baixando arquivos main do repo");
    await downloadDefaultFiles();
    logger("Repassando arquivos padr\xF5es para a V10");
    await replaceDefaultFiles();
  } catch (error2) {
    console.error(error2);
  }
})();
