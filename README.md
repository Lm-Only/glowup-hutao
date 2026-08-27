# glowup-hutao
Projeto desenvolvido em Typescript para a transferência de arquivos da Hutao V9 pra V10

# Versão Base ✨️

> [!CAUTION]
> Você só deve executar isso se caso você usava a V9, nunca tenha usado a V10 e tenha pago uma key pra V10. Isso pode ser perigoso mover os dados de um bot pro outro sem estar preparado(a)

<details>
  <summary>
    <b>Como funciona?</b>
  </summary>

  1. O sistema foi desenvolvido para solucionar a transferência de 60% dos dados importantes armazenados no bot
  2. Primeiro é executado o comando no terminal (termux)
  3. Depois será feito o Download de um arquivo javascript que será responsável por fazer boa parte da tarefa
  4. Logo de primeira o repositório da V10 é clonado diretamente pelo terminal
  5. E em seguida ele baixa o arquivo JavaScript e logo é executado
  6. Ele cria um arquivo de log para evitar que o mesmo arquivo seja reescrito toda vez.
  7. Depois que todos o processo serem finalizado; será disponibilizado o arquivo da HutaoBot V10 no seu gerenciador de arquivos/host
  8. Você pode zipar, mover, extrair e fazer o que quiser.
  9. Lembre-se de mover os arquivos da V10 pra fora da pasta da V9 ou apagar os arquivos da V9; **(Não apague a pasta HutaoBot)**

</details>

-----

## Testes abaixo

Executar no termux

````bash
cd /sdcard/HutaoBot-MD
````

Segundo comando

````bash
curl https://raw.githubusercontent.com/Lm-Only/glowup-hutao/refs/heads/main/execute.sh | bash
````

ou baixe o arquivo se for em host. [Baixe Aqui](https://github.com/Lm-Only/glowup-hutao/blob/main/execute.sh)


## Você que usa hospedagem

> [!IMPORTANT]
> Se for em host, troque a inicialização **npm start** por **bash execute.sh** e em seguida reinicie seu servidor

<details>
  <summary>
    <b>Duvidas?</b>
  </summary>

* Geralmente você baixa o arquivo **execute.sh**
* Depois upa ele pra sua host
* Logo em seguida vocês deve mudar a inicialização do bot temporariamente

## Siga estes passos

1. Na sua host procure por startup/inicialização
2. Provavelmente vai estar **npm start**
3. Troque isso por **bash execute.sh**
4. Volte pro console
5. dê start

* Depois de tudo isso, volte para npm start

</details>
