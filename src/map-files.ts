import { FOLDER_OUT } from "./config-global";

type MapFiles = {
    path: string;
    to: string
}

/**
 * Mapa de arquivos que serão substituídos 
 * pelos nomes. Util se algum tiver o mesmo conteúdo mas tem nomes diferentes
 */
export const MAP_FILES: Array<MapFiles> = [
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

/**
 *Arquivos padrões iniciais
 * Baixados através do GitHub
 */
export const arrayMapFilesRepo: string[] = [
    'index.js',
    'package.json',
    'package-lock.json',
    'start.sh',
    'qrcode-reset.sh',
    'AGENTS.md',
    'CONTRIBUTING.md',
    'CLAUDE.md',
    'CODE_OF_CONDUCT.md',
    'README.md',
    'SECURITY.md',
    'LICENSE'
];


export const globalFiles: Record<string, string> = {
    '/dono/settings/settings.json': FOLDER_OUT + '/assets/settings/settings.yaml',
    '/donos/settings/necessary.json': FOLDER_OUT + '/assets/settings.global'
}