const movies = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const input = document.querySelector('.input');
const video = document.querySelector('.highlight__video');
const tituloVideo = document.querySelector('.highlight__title');
const notaVideo = document.querySelector('.highlight__rating');
const generoVideo = document.querySelector('.highlight__genres');
const dataVideo = document.querySelector('.highlight__launch');
const textoVideo = document.querySelector('.highlight__description');
const modal = document.querySelector('.modal');
const tituloModal = document.querySelector('.modal__title');
const imagemModal = document.querySelector('.modal__img');
const descricaoModal = document.querySelector('.modal__description');
const notaModal = document.querySelector('.modal__average');
const generosModal = document.querySelector('.modal__genres');
const link = document.querySelector('.highlight__video-link');
const trocaDeTema = document.querySelector('.btn-theme');
let pesquisaAtiva = false;
let paginaAtual = 1;
let temaEscuro = true;

function mudarTema() {
  const body = document.querySelector('body');
  const subtitle = document.querySelector('.subtitle');
  const highlight__info = document.querySelector('.highlight__info');

  body.style.backgroundColor = temaEscuro ? 'var(--background-color)' : 'var(--background-color-dark)';
  subtitle.style.color = temaEscuro ? 'var(--color)' : 'var(--color-dark)';
  highlight__info.style.backgroundColor = temaEscuro ? 'var(--highlight-background)' : 'var(--highlight-background-dark)';
  trocaDeTema.src = temaEscuro ? './assets/light-mode.svg' : './assets/dark-mode.svg';
  input.style.backgroundColor = temaEscuro ? 'var(--background-color)' : 'var(--background-color-dark)';
  input.style.borderColor = temaEscuro ? 'var(--input-border-color)' : 'var(--input-border-color-dark)';
  input.style.color = temaEscuro ? 'var(--color)' : 'var(--color-dark)';

  temaEscuro ? temaEscuro = false : temaEscuro = true;
}

trocaDeTema.addEventListener('click', function () {
  mudarTema();
});

function mostraPagina1() {
  const movie = document.querySelectorAll('.movie');
  movie.forEach(x => {
    if (x.dataset.valor > 4) {
      x.classList.add('hidden');
    } else {
      x.classList.remove('hidden');
    }
  })
}

function mostraPagina2() {
  const movie = document.querySelectorAll('.movie');
  movie.forEach(x => {
    if (x.dataset.valor < 5 || x.dataset.valor > 9) {
      x.classList.add('hidden');
    } else {
      x.classList.remove('hidden');
    }
  })
}

function mostraPagina3() {
  const movie = document.querySelectorAll('.movie');
  movie.forEach(x => {
    if (x.dataset.valor < 10 || x.dataset.valor > 14) {
      x.classList.add('hidden');
    } else {
      x.classList.remove('hidden');
    }
  })
}

function mostraPagina4() {
  const movie = document.querySelectorAll('.movie');
  movie.forEach(x => {
    if (Number(x.dataset.valor) > 14) {
      x.classList.remove('hidden');
    } else {
      x.classList.add('hidden');
    }
  })
}

function proximaPagina(tamanho) {
  if (paginaAtual === 1) {
    if (tamanho < 6) return;
    mostraPagina2();
    paginaAtual = 2;
    return;
  }

  if (paginaAtual === 2) {
    if (tamanho < 11) {
      mostraPagina1();
      paginaAtual = 1;
      return;
    }
    mostraPagina3();
    paginaAtual++;
    return;
  }

  if (paginaAtual === 3) {
    if (tamanho < 16) {
      mostraPagina1();
      paginaAtual = 1;
      return;
    }
    mostraPagina4();
    paginaAtual++;
    return;
  }

  if (paginaAtual === 4) {
    mostraPagina1();
    paginaAtual = 1;
    return;
  }
}

function paginaAnterior(tamanho) {
  if (paginaAtual === 1) {
    if (tamanho < 6) return;
    if (tamanho > 10 && tamanho < 16) {
      mostraPagina3();
      paginaAtual = 3;
      return;
    }
    if (tamanho > 5 && tamanho < 11) {
      mostraPagina2();
      paginaAtual = 2;
      return;
    }
    mostraPagina4();
    paginaAtual = 4;
    return;
  }

  if (paginaAtual === 2) {
    mostraPagina1();
    paginaAtual--;
    return;
  }

  if (paginaAtual === 3) {
    mostraPagina2();
    paginaAtual--;
    return;
  }

  if (paginaAtual === 4) {
    mostraPagina3();
    paginaAtual--;
    return;
  }
}

function preencherDados(body) {

  paginaAtual = 1;

  for (let i = 0; i < body.results.length; i++) {
    const movie = document.createElement('div');
    movie.classList.add('movie');
    movie.style.backgroundImage = `url(${body.results[i].poster_path})`;
    movie.dataset.valor = i;
    movie.dataset.id = body.results[i].id;
    movies.append(movie);
    if (movie.dataset.valor > 4) {
      movie.classList.add('hidden');
    }

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie__info');
    movie.append(movieInfo);

    const movieTitle = document.createElement('span');
    movieTitle.classList.add('movie__title');
    movieTitle.textContent = `${body.results[i].title}`;
    movieTitle.dataset.valor = i;

    const movieRating = document.createElement('span');
    movieRating.classList.add('movie__rating');
    movieRating.textContent = `${body.results[i].vote_average}`;
    movieRating.dataset.valor = i;

    movieInfo.append(movieTitle, movieRating);

    const imgEstrela = document.createElement('img');
    imgEstrela.src = './assets/estrela.svg';
    imgEstrela.alt = 'Estrela';

    movieRating.append(imgEstrela);

    movie.addEventListener('click', function () {
      const id = movie.dataset.id;
      modal.classList.remove('hidden');

      fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`).then(function (respostaModal) {
        const promisseModal = respostaModal.json();

        promisseModal.then(function (bodyModal) {

          tituloModal.textContent = bodyModal.title;
          imagemModal.src = `${bodyModal.backdrop_path ? bodyModal.backdrop_path : bodyModal.poster_path}`;
          descricaoModal.textContent = bodyModal.overview;
          notaModal.textContent = bodyModal.vote_average;

          for (let i = 0; i < bodyModal.genres.length; i++) {
            let spansModal = document.createElement('span');
            spansModal.classList.add('modal__genre');
            spansModal.textContent = bodyModal.genres[i].name;
            generosModal.append(spansModal);
          }
        })
      })
    })
  }
}

fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false`).then(function (resposta) {
  const promisseBody = resposta.json();

  promisseBody.then(function (body) {

    tamanhoBody = body.results.length;
    preencherDados(body);

    const movie = document.querySelectorAll('.movie');
    filmeDoDia = movie[0].dataset.id;

    input.addEventListener('keydown', function (event) {
      if (event.key !== "Enter") return;
      pesquisaAtiva = true;

      let valor = 0;
      if (input.value === '' && event.key === "Enter") {
        pesquisaAtiva = false;
        movies.textContent = '';
        preencherDados(body);
        return;
      }

      fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?query=${input.value}`).then(function (respostaPesquisa) {
        const promissePesquisa = respostaPesquisa.json();

        promissePesquisa.then(function (bodyPesquisa) {

          tamanhoPesquisa = bodyPesquisa.results.length;

          movies.textContent = '';
          preencherDados(bodyPesquisa);
        })
      })
      input.value = '';
    })

    btnNext.addEventListener('click', function () {
      pesquisaAtiva ? proximaPagina(tamanhoPesquisa) : proximaPagina(tamanhoBody);
    })

    btnPrev.addEventListener('click', function () {
      pesquisaAtiva ? paginaAnterior(tamanhoPesquisa) : paginaAnterior(tamanhoBody);
    })

    modal.addEventListener('click', function () {
      modal.classList.add('hidden');
      generosModal.textContent = '';
    })

    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${filmeDoDia}?language=pt-BR`).then(function (resposta) {
      const promisseBody = resposta.json();

      promisseBody.then(function (body) {

        video.style.backgroundImage = `url(${body.backdrop_path})`;
        tituloVideo.textContent = body.title;
        notaVideo.textContent = body.vote_average;
        let generos = [];
        body.genres.forEach(x => {
          generos.push(x.name);
        })
        generos = generos.join(', ');
        generoVideo.textContent = generos;
        const data = `${body.release_date.substr(8, 2)}-${body.release_date.substr(5, 2)}-${body.release_date.substr(0, 4)}`;
        dataVideo.textContent = data;
        textoVideo.textContent = body.overview;
      })
    })

    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${filmeDoDia}/videos?language=pt-BR`).then(function (resposta) {
      const promisse = resposta.json();

      promisse.then(function (body) {
        link.href = `https://www.youtube.com/watch?v=${body.results[0].key}`;
      })
    })
  })
})