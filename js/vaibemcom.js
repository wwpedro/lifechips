
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}

// FECHAR AUTOMATICAMENTE AO CLICAR EM UM LINK
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('#nav-links a');
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            const navLinks = document.getElementById('nav-links');
            navLinks.classList.remove('show');
        });
    });
});


const receitas = [
    {
        imagemTopo: 'assets/abacate.png',
        titulo: 'Molho de Abacate com Limão',
        ingredientes: '1 abacate maduro<br>suco de 1 limão<br>2 colheres de sopa de coentro picado<br>sal e pimenta a gosto.',
        preparo: 'Amassar o abacate em uma tigela e misturar com o suco de limão e o coentro picado. Temperar com sal e pimenta a gosto. Misturar bem até obter uma consistência cremosa. Servir com os chips de batata.',
        imagemPreparo: 'assets/molhoAbacate.png'
    },
    // Você pode adicionar mais receitas aqui
];

let receitaAtual = 0;

function mostrarReceita() {
    const receita = receitas[receitaAtual];
    document.querySelector('.imagem-topo').src = receita.imagemTopo;
    document.querySelector('.conteudo-receita h3').innerHTML = receita.titulo;
    document.querySelector('.ingredientes p').innerHTML = receita.ingredientes;
    document.querySelector('.modo-preparo p').innerHTML = receita.preparo;
    document.querySelector('.imagem-preparo').src = receita.imagemPreparo;
}

function trocarReceita(direcao) {
    receitaAtual += direcao;
    if (receitaAtual < 0) receitaAtual = receitas.length - 1;
    if (receitaAtual >= receitas.length) receitaAtual = 0;
    mostrarReceita();
}

// Esconde setas se só tiver uma receita
window.addEventListener('DOMContentLoaded', () => {
    if (receitas.length <= 1) {
        document.querySelector('.seta-esquerda').style.display = 'none';
        document.querySelector('.seta-direita').style.display = 'none';
    }
    mostrarReceita();
});


AOS.init({
    duration: 1000,
    once: true
});



const produtos = [
    // aqui viria cada produto
    {
        imagem: 'assets/produto_1.png',
        textos: [
            "Texto 1: energia",
            "Texto 2: saciedade",
            "Texto 3: vitamina C e potássio",
            "Texto 4: sódio e conservantes"
        ],

        imagem: 'assets/produto_2.png',
        textos: [
            "Texto 1: energia",
            "Texto 2: saciedade",
            "Texto 3: vitamina C e potássio",
            "Texto 4: sódio e conservantes"
        ],

        imagem: 'assets/produto_3.png',
        textos: [
            "Texto 1: energia",
            "Texto 2: saciedade",
            "Texto 3: vitamina C e potássio",
            "Texto 4: sódio e conservantes"
        ]
    }
];

function verificarSetas() {
    const esquerda = document.querySelector('.seta.esquerda');
    const direita = document.querySelector('.seta.direita');
    if (produtos.length <= 1) {
        esquerda.style.display = 'none';
        direita.style.display = 'none';
    } else {
        esquerda.style.display = 'flex';
        direita.style.display = 'flex';
    }
}

// Executa quando carregar
document.addEventListener('DOMContentLoaded', verificarSetas);



const slides = document.querySelectorAll('.grade-produto');
const indicadores = document.querySelectorAll('.indicador');
let slideAtual = 0;
let intervalo;

function mostrarSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'grid' : 'none';
    });

    indicadores.forEach((indicador, i) => {
        indicador.classList.toggle('ativo', i === index);
    });

    slideAtual = index;
}

function trocarSlide(direcao) {
    let novo = slideAtual + direcao;
    if (novo < 0) novo = slides.length - 1;
    if (novo >= slides.length) novo = 0;
    mostrarSlide(novo);
}

function iniciarAutoSlide() {
    intervalo = setInterval(() => trocarSlide(1), 5000);
}

function pararAutoSlide() {
    clearInterval(intervalo);
}

// Inicializa
document.addEventListener('DOMContentLoaded', () => {
    mostrarSlide(slideAtual);
    iniciarAutoSlide();

    // Clique nos indicadores
    indicadores.forEach((indicador, i) => {
        indicador.addEventListener('click', () => {
            mostrarSlide(i);
            pararAutoSlide();
            iniciarAutoSlide();
        });
    });

    // Swipe para mobile
    let startX = 0;
    let endX = 0;

    const container = document.querySelector('.carrossel-container');

    container.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        pararAutoSlide();
    });

    container.addEventListener('touchend', e => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (diff > 50) {
            trocarSlide(1); // arrastou para esquerda
        } else if (diff < -50) {
            trocarSlide(-1); // arrastou para direita
        }

        iniciarAutoSlide();
    });
});
