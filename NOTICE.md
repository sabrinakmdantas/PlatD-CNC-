# NOTICE

Este projeto contém software de terceiros.

## CNC Web Simulator

Copyright (c) 2024 CNCWebSim (Filipe Caixeta)
Licença: MIT
Origem: https://github.com/filipecaixeta/cncwebsim

O PlatD-CNC deriva do CNC Web Simulator. A tabela abaixo discrimina
o estado de cada arquivo em relação à obra original.

### Arquivos mantidos sem alteração

js/cws.js, js/editor.js, js/lathe.js, js/machine.js, js/mill.js,
js/motion.js, js/motionWorker.js, js/parser.js, js/printer.js,
js/project.js, js/shaders.js, js/storage.js,
css/jquery-ui.structure.css

Autoria: Filipe Caixeta.

### Arquivos substancialmente modificados pela equipe do PlatD-CNC

| Arquivo | Original | PlatD-CNC | Natureza da modificação |
|---|---|---|---|
| index.html | 143 linhas | 1.137 linhas | Reescrito: interface em português, painel de atividades, visualizador de enunciado e resposta, motor de autocorreção, seção institucional |
| js/controller.js | 445 linhas | 1.215 linhas | Controle das atividades didáticas, gestão de estado do exercício em curso, integração com a autocorreção |
| js/ui.js | 451 linhas | 1.055 linhas | Interface em português, caixas de diálogo do módulo pedagógico, pré-carregamento de imagens das atividades |
| js/renderer.js | 180 linhas | 380 linhas | Ajustes de renderização para simulação 2D de torneamento em contexto didático |
| js/interpreter.js | 771 linhas | 731 linhas | Correção da interpolação circular G02/G03 |
| css/ui.css | — | — | Estilos do painel de atividades e do retorno visual da correção |
| css/fontIcon.css | — | — | Ícones da interface didática |

### Conteúdo original e exclusivo do PlatD-CNC

- images/Ativ1.jpg a Ativ10.jpg: enunciados das dez atividades
- images/Resp1.jpg a Resp10.jpg: respostas das dez atividades
- Gabaritos em código G das dez atividades, nas variantes G90 e G91
- Dockerfile e captain-definition: configuração de implantação

Autoria: equipe do PlatD-CNC / IFRN.

## Demais bibliotecas

Three.js (MIT), jQuery (MIT), jQuery UI (MIT), Ace Editor (BSD),
dat.GUI (Apache 2.0), lz-string (MIT), Stats.js (MIT).
