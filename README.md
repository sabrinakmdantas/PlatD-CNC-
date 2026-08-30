# PlatD-CNC

**Plataforma Didática para o Ensino de Programação CNC**

https://platdcnc.ifrn.edu.br

O PlatD-CNC é uma plataforma educacional gratuita, executada
inteiramente no navegador, voltada ao ensino e à aprendizagem de
programação CNC em código G na Educação Profissional e Tecnológica.
A ferramenta integra, em uma única interface, um editor de código G,
um simulador gráfico de operações de torneamento e um conjunto de
atividades didáticas com correção automática.

Não há processamento em servidor: todo o funcionamento ocorre no
cliente, o que dispensa instalação, cadastro e conexão permanente,
requisitos definidos a partir das condições reais dos laboratórios
de informática da rede federal.

## Funcionalidades

- Editor de código G com realce de sintaxe e salvamento automático
- Simulação gráfica em 2D de operações de torno
- Suporte a interpolação linear (G01) e circular (G02/G03)
- Programação em coordenadas absolutas (G90) e incrementais (G91)
- Dez atividades organizadas em quatro níveis de dificuldade:
  - Nível básico: interpolação linear (G01)
  - Nível intermediário: chanfros
  - Nível avançado: interpolação circular (G02/G03)
  - Nível expert: perfis compostos
- Autocorreção visual com comparação linha a linha entre o código
  do estudante e o gabarito, indicando a linha incorreta e a
  correspondente correta
- Visualização de enunciado e resposta de cada atividade

## Contexto acadêmico

O PlatD-CNC foi desenvolvido como produto educacional no âmbito do
Programa de Pós-Graduação em Ensino da Rede Nordeste de Ensino
(RENOEN), linha de pesquisa "Ensino Tecnológico: Práticas e
Construções Curriculares", no IFRN Campus Mossoró.

Sua concepção é fundamentada em pressupostos pedagógicos de John
Dewey, Lev Vygotsky, Yrjö Engeström, Vani Kenski, Edgar Morin e
Pedro Demo.

## Autoria

Concepção, coordenação e desenvolvimento:
- Isac Barbosa de Almeida
- Diogo Pereira Bezerra
- Carla Katarina de Monteiro Marques

Desenvolvimento:
- Rafaelly Dantas Jales Simonal
- Gisele Maria Pereira de Sousa
- Aline Evellin da Silva
- Sabrina Karine de Medeiros Dantas

Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande
do Norte (IFRN).

## Obra derivada e licenciamento

O PlatD-CNC é uma **obra derivada** do CNC Web Simulator, de autoria
de Filipe Caixeta, disponibilizado sob licença MIT em
https://github.com/filipecaixeta/cncwebsim

Do projeto original foram aproveitados os módulos de análise
sintática de código G, de modelagem de máquina e de renderização
base. Sobre essa base foram desenvolvidos, pela equipe do PlatD-CNC,
os módulos de atividades didáticas, de autocorreção, a interface em
português e as adaptações do controlador, do renderizador e do
interpretador.

Detalhamento completo das modificações em [NOTICE.md](NOTICE.md).

Este software é distribuído sob licença MIT, preservando o aviso de
copyright da obra original. Ver [LICENSE](LICENSE).

## Bibliotecas de terceiros

Três.js, jQuery, jQuery UI, Ace Editor, dat.GUI e lz-string,
utilizadas conforme suas respectivas licenças.
