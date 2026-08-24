/**
 * Este script foi criado por Lm Only para 
 * - Solucionar o problema de mover dados da V9 pra V10
 * - Facilitar a transferência de forma mais rápida
 * 
 * O código é aberto, não tem o por que se preocupar.
 *
 * OBS: O código todo está focado em um só arquivo "dist".
 * 
 * @author Lm Only
 */

import { CACHE_LOG_FILE, CACHE_PATH } from './config-global';
import { 
    createCacheFolder, 
    createLogFile, 
    downloadDefaultFiles, 
    loadLogFile, 
    mergeSettings, 
    replaceDefaultFiles, 
    resetProcess, 
    verification 
} from './handler';
import { logger } from './logger';

// tag que reseta os logs
// para começar do zero
const isReset = process.argv.includes('reset');

// se pediu pra resetar
if (isReset) {
    // executa
    await resetProcess();

    // e sai aqui
    process.exit(0);

}

// verifica se é a famosa hutao né
// se não for, ele para
// se continuar, vai foder com seu bot
await verification();

// MAIN FUNCTION
(async function main(): Promise<void> {
    try {
        logger('Criando pasta de cache: ' + CACHE_PATH + '\n\n');
        await createCacheFolder(); // 1

        logger('Criando arquivo de logs: ' + CACHE_LOG_FILE + '\n\n');
        await createLogFile(); // 2

        logger('Carregando arquivo de logs em tempo de execução\n\n');
        await loadLogFile(); // 3

        logger('Baixando arquivos main do repo\n\n');
        await downloadDefaultFiles(); // 4

        logger('Setando settings.json\n\n')
        await mergeSettings(); // 5

        logger('Repassando arquivos padrões para a V10');
        await replaceDefaultFiles(); // 
    } catch (error) {
        console.error(error);
    }
})();
