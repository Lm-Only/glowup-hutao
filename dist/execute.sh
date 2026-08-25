#!/usr/bin/env bash

rm -rf ./*.bak

# Baixa o arquivo de reparação
# curl -fsL https://raw.githubusercontent.com/Lm-Only/glowup-hutao/refs/heads/main/dist/glowup.js -o glowup.js

# checa se é um reset:devmode
if [ "$1" = "reset" ]; then
    rm -rf HutaoBot.zip
    node glowup.js reset
    exit
fi

if [ ! -d 'HutaoBot' ]; then
    git clone https://github.com/Lm-Only/HutaoBot.git
fi

cp assets/groups/activation/* HutaoBot/assets/groups/activation
node glowup.js

# rm -rf glowup.js
