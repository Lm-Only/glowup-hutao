type MapFiles = {
    path: string;
    to: string
}

export const MAP_FILES: Array<MapFiles> = [
    {
        path: '/test/example1',
        to: '/test/example2'
    },
    {
        path: 'a',
        to: 'b'
    }
];

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