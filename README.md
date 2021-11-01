# Desafio Front-end Módulo 2 - Curso de Desnvolvimento de Software Cubos Academy

Construção de um website com [o seguinte design](https://www.figma.com/file/AL6hZ3Lq16Uj8mw1o4BzAK/Desafio-front-academy-2?node-id=0%3A1) que permita: 

- Visualização de filmes
- Paginação de filmes
- Busca de filmes
- "Filme do dia"
- Modal de filme
- Mudança de tema

Os dados do website serão requisitados da [seguinte API](https://tmdb-proxy.cubos-academy.workers.dev/3/)

### Visualização de filmes

Assim que o website for aberto, a listagem de filmes deverá ser preenchida com as informações do [seguinte endpoint](https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false)

### "Filme do dia"

Assim que o website for aberto, o filme do dia deverá ser preenchido com as informações do [endpoint geral](https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR) e do [endpoint de videos](https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR);

### Modal de filme

Ao clicar na `<div class="movie">` deverá abrir o modal.

Assim que o modal for **aberto**, ele deverá ser preenchido com as informações do [seguinte endpoint](https://tmdb-proxy.cubos-academy.workers.dev/3/movie/?language=pt-BR).

O modal poderá ser "fechado" por meio de um clique nele próprio ou na `<img class="modal__close">`.

### Mudança de tema

Ao clicar na `<img class="btn-theme">`, caso o **tema atual** seja "light" ou "claro", o mesmo deverá ser trocado para o tema "dark" ou "escuro".

###### tags: `front-end` `HTML` `DOM` `CSS`