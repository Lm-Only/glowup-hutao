#!/usr/bin/bash

# create out file - recursive
mkdir -p out

# ASSETS - FOLDERS
mkdir -p ./out/assets

# ASSETS->GROUPS
mkdir -p ./out/assets/groups
mkdir -p ./out/assets/groups/activation
mkdir -p ./out/assets/groups/afk
mkdir -p ./out/assets/groups/logos_bemvindo

cd ./out/assets/groups/

echo "[]" > ./aluguel.json
echo "[]" > ./anotar.json
echo "[]" > ./avisos.json
echo "[]" > ./limit_command.json
echo "[]" > ./openGroup.json
echo "[]" > ./TMGP.json

echo "{}" > ./countmsg.json

# ASSETS->GLOBAL
mkdir -p ./out/assets/global

# ASSETS->USERS
mkdir -p ./out/assets/users

# ASSETS->MEDIA
mkdir -p ./out/assets/media
mkdir -p ./out/assets/media/audios
mkdir -p ./out/assets/media/images
mkdir -p ./out/assets/media/stickers
mkdir -p ./out/assets/media/closegp-opengp

cd ./out/assets/media/audios

    curl -fsL https://raw.githubusercontent.com/Lm-Only/HutaoBot/refs/heads/main/assets/media/audios/index.js -o index.js
    curl -fsL https://raw.githubusercontent.com/Lm-Only/HutaoBot/refs/heads/main/assets/media/audios/bomdia.mp3 -o bomdia.mp3

cd ../images

    echo '{"imgmenu":"./assets/media/logos/logo.jpg"}' > logo.json

# back to assets folder
cd ../../ 

# ASSETS->SETTINGS
mkdir -p ./out/assets/settings


# ASSETS->TABELA
mkdir -p ./out/assets/tabela

cd ../../../
node dist/glowup.js $@
