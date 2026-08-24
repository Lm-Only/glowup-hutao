#!/usr/bin/env bash

# VARIÁVEIS 
GITHUB_REPO_URL="https://raw.githubusercontent.com/Lm-Only/HutaoBot/refs/heads/main"
OUT_FOLDER="./HutaoBotV10"
ASSETS_MEDIA="assets/media"
ASSETS_USERS="assets/users"
ASSETS_GLOBAL="assets/global"

rm -rf ./*.bak

# Baixa o arquivo de reparação
curl -fsL https://raw.githubusercontent.com/Lm-Only/glowup-hutao/refs/heads/main/dist/glowup.js -o glowup.js

# checa se é um reset:devmode
if [ "$1" = "reset" ]; then
    node glowup.js reset
    exit
fi

# create out file - recursive
mkdir -p $OUT_FOLDER

# ASSETS - FOLDERS
mkdir -p $OUT_FOLDER/assets

# ASSETS->GROUPS
mkdir -p $OUT_FOLDER/assets/groups
mkdir -p $OUT_FOLDER/assets/groups/activation
mkdir -p $OUT_FOLDER/assets/groups/afk
mkdir -p $OUT_FOLDER/assets/groups/logos_bemvindo

# Create Files direct in assets-grouos 2
cd $OUT_FOLDER/assets/groups/
    echo "[]" > ./aluguel.json
    echo "[]" > ./anotar.json
    echo "[]" > ./avisos.json
    echo "[]" > ./limit_command.json
    echo "[]" > ./openGroup.json
    echo "[]" > ./TMGP.json

    echo "{}" > ./countmsg.json

# Back to out folder from assets-groups 2
cd ../../../

# ASSETS->GLOBAL
mkdir -p $OUT_FOLDER/assets/global

# Create files direct in assets-global 2
cd $OUT_FOLDER/$ASSETS_GLOBAL
    curl -fsL $GITHUB_REPO_URL/$ASSETS_GLOBAL/cmd-sem-prefixo.json -o cmd-sem-prefixo.json
    curl -fsL $GITHUB_REPO_URL/$ASSETS_GLOBAL/docf.txt -o docf.txt
    curl -fsL $GITHUB_REPO_URL/$ASSETS_GLOBAL/eununca.json -o eununca.json
    curl -fsL $GITHUB_REPO_URL/$ASSETS_GLOBAL/infocmd.json -o infomcd.json

    echo "[]" > ./casamento.json
    echo "[]" > ./pedido.json
    echo '["559284828701@s.whatsapp.net"]' > ./premium.json
    echo "{}" > ./ia.json

# Back to out folder from assets-users 2
cd ../../../

# ASSETS->USERS
mkdir -p $OUT_FOLDER/assets/users

# ASSETS->MEDIA
mkdir -p $OUT_FOLDER/assets/media
mkdir -p $OUT_FOLDER/assets/media/audios
mkdir -p $OUT_FOLDER/assets/media/images
mkdir -p $OUT_FOLDER/assets/media/stickers
mkdir -p $OUT_FOLDER/assets/media/closegp-opengp

# ASSETS->MEDIA->AUDIOS - Acess
# Download and   Create files in assets-media-audios. 3    
cd $OUT_FOLDER/assets/media/audios
    curl -fsL $GITHUB_REPO_URL/$ASSETS_MEDIA/audios/index.js -o index.js
    curl -fsL $GITHUB_REPO_URL/$ASSETS_MEDIA/audios/bomdia.mp3 -o bomdia.mp3

cd ../images
    curl -fsL $GITHUB_REPO_URL/$ASSETS_MEDIA/images/index.js -o index.js
    curl -fsL $GITHUB_REPO_URL/$ASSETS_MEDIA/images/imglinks.json -o imglinks.json
    curl -fsL $GITHUB_REPO_URL/$ASSETS_MEDIA/images/logo.jpg -o logo.png
    
    echo '{"imgmenu":"./assets/media/images/logo.jpg"}' > logo.json

# back to out folder from assets-media-audios
cd ../../../../

# ASSETS->SETTINGS
mkdir -p $OUT_FOLDER/assets/settings


# ASSETS->TABELA
mkdir -p $OUT_FOLDER/assets/tabela

node glowup.js
