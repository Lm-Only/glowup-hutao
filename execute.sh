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

# ASSETS->SETTINGS
mkdir -p ./out/assets/settings

# ASSETS->TABELA
mkdir -p ./out/assets/tabela


node dist/glowup.js $@
