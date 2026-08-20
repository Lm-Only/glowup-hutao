
import { exit } from "node:process";

export function error(text: string): void {
    console.error('[ ERROR ] - ', text);
}

// em casos de b.o
export function error_c(text: string | null): void {
    console.error('[ ERROR_C ] - ', text || "Erro crítico, processo finalizado");
    exit(1);
}