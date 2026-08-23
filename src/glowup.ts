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

import { 
    createCacheFolder, 
    createLogFile, 
    downloadDefaultFiles, 
    loadLogFile, 
    replaceDefaultFiles, 
    resetProcess, 
    verification 
} from './handler';

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
        await createCacheFolder(); // 1
        await createLogFile(); // 2
        await loadLogFile(); // 3
        await downloadDefaultFiles(); // 4
        await replaceDefaultFiles(); // 5
    } catch (error) {
        console.error(error);
    }
})();
