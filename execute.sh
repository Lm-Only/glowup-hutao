#!/usr/bin/bash

# VARIÁVEIS 
GITHUB_REPO_URL="https://raw.githubusercontent.com/Lm-Only/HutaoBot/refs/heads/main"
OUT_FOLDER="./out"
ASSETS_MEDIA="assets/media"

# Ok, logicamente ele cria os arquivos do zero...
# então se der reset, ele primeiro vai criar e depois apagar kkkk
# Mas essa tag é só para desenvolvimento, não é necessário se preocupar com o usuário final - fim

# create out file - recursive
mkdir -p $OUT_FOLDER

# ASSETS - FOLDERS
mkdir -p $OUT_FOLDER/assets

# ASSETS->GROUPS
mkdir -p $OUT_FOLDER/assets/groups
mkdir -p $OUT_FOLDER/assets/groups/activation
mkdir -p $OUT_FOLDER/assets/groups/afk
mkdir -p $OUT_FOLDER/assets/groups/logos_bemvindo

# Create Files direct in assets-grouos
cd $OUT_FOLDER/assets/groups/
    echo "[]" > ./aluguel.json
    echo "[]" > ./anotar.json
    echo "[]" > ./avisos.json
    echo "[]" > ./limit_command.json
    echo "[]" > ./openGroup.json
    echo "[]" > ./TMGP.json

    echo "{}" > ./countmsg.json

# Back to out folder from assets-groups
cd ../../../

# ASSETS->GLOBAL
mkdir -p $OUT_FOLDER/assets/global

# ASSETS->USERS
mkdir -p $OUT_FOLDER/assets/users

# ASSETS->MEDIA
mkdir -p $OUT_FOLDER/assets/media
mkdir -p $OUT_FOLDER/assets/media/audios
mkdir -p $OUT_FOLDER/assets/media/images
mkdir -p $OUT_FOLDER/assets/media/stickers
mkdir -p $OUT_FOLDER/assets/media/closegp-opengp

# ASSETS->MEDIA->AUDIOS - Acess
# Download and   Create files in assets-media-audios.    
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

rm -rf ./*.bak
node dist/glowup.js $@
