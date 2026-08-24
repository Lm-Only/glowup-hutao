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
        to: "/out/assets/groups/TMGP.json"
    },
    {
        path: "/assets/groups/aluguel.json",
        to: "/out/assets/groups/aluguel.json"
    },
    {
        path: "/assets/groups/anotar.json",
        to: "/out/assets/groups/anotar.json"
    },
    {
        path: "/assets/groups/avisos.json",
        to: "/out/assets/groups/avisos.json"
    },
    {
        path: "/assets/groups/countmsg.json",
        to: "/out/assets/groups/countmsg.json"
    },
    {
        path: "/assets/groups/muted.json",
        to: "/out/assets/groups/muted.json"
    },
    {
        path: "/assets/groups/openGroup.json",
        to: "/out/assets/groups/openGroup.json"
    },
    {
        path: "/assets/media/audios/bomdia.mp3",
        to: "/out/assets/media/audios/bomdia.mp3"
    },
    {
        path: "/assets/media/audios/index.js",
        to: "/out/assets/media/audios/index.js"
    },
    {
        path: "/assets/media/logos/logo.json",
        to: "/out/assets/media/images/logo.json"
    },
    {
        path: "/assets/users/banned.json",
        to: "/out/assets/users/banned.json"
    },
    {
        path: "/assets/users/family.json",
        to: "/out/assets/users/family.json"
    },
    {
        path: "/assets/users/jogodavelha.json",
        to: "/out/assets/users/jogodavelha.json"
    },
    {
        path: "/assets/users/premium.json",
        to: "/out/assets/users/premium.json"
    },
    {
        path: "/assets/users/rgfigus.json",
        to: "/out/assets/users/rgfigus.json"
    },
    {
        path: "/assets/users/take.json",
        to: "/out/assets/users/take.json"
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