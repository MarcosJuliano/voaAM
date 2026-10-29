// Quiz público: gabarito e correção são exclusivos do Flask.
const quizzes = {
  "conjuntos": {
    "title": "Conjuntos e Números Reais",
    "desc": "Os conjuntos numéricos formam uma hierarquia: Naturais (ℕ) ⊂ Inteiros (ℤ) ⊂ Racionais (ℚ) ⊂ Reais (ℝ). Os Irracionais (𝕀) não se sobrepõem aos Racionais, mas ambos estão contidos nos Reais. Operações entre conjuntos incluem união (∪), interseção (∩) e diferença (−).",
    "video": "Conjuntos e Números Reais — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=3XIz4sgu0Ho&list=PLlb9l2qepYgLjrZrn4p7lrGFPhPfWKOzw",
    "questions": [
      {
        "q": "O número √2 pertence a qual conjunto numérico?",
        "opts": [
          "Racionais (ℚ)",
          "Inteiros (ℤ)",
          "Irracionais (𝕀)",
          "Naturais (ℕ)"
        ]
      },
      {
        "q": "Dados A = {1, 2, 3, 4} e B = {3, 4, 5, 6}, qual é A ∩ B?",
        "opts": [
          "{1, 2, 3, 4, 5, 6}",
          "{3, 4}",
          "{1, 2}",
          "{5, 6}"
        ]
      },
      {
        "q": "Qual número NÃO pertence ao conjunto dos inteiros (ℤ)?",
        "opts": [
          "−5",
          "0",
          "3/2",
          "100"
        ]
      },
      {
        "q": "Se A = {x ∈ ℕ | x < 5}, quantos elementos tem o conjunto A?",
        "opts": [
          "4",
          "5",
          "6",
          "3"
        ]
      },
      {
        "q": "O número 0,333... (dízima periódica) pertence a:",
        "opts": [
          "Irracionais (𝕀)",
          "Naturais (ℕ)",
          "Racionais (ℚ)",
          "Apenas aos Reais (ℝ)"
        ]
      },
      {
        "q": "Dados A = {2, 4, 6} e B = {1, 2, 3, 4}, qual é A ∪ B?",
        "opts": [
          "{2, 4}",
          "{1, 2, 3, 4, 6}",
          "{6}",
          "{1, 3}"
        ]
      }
    ]
  },
  "funcao_afim": {
    "title": "Função Afim (1º grau)",
    "desc": "A função afim tem a forma f(x) = ax + b, onde a ≠ 0. O coeficiente \"a\" é angular (determina crescimento/decrescimento) e \"b\" é linear (ponto onde o gráfico corta o eixo y). A raiz da função é o valor de x que anula f(x).",
    "video": "Função Afim — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=4q2N2HzSivA&list=PLlb9l2qepYgJadiD_fJo3cVGGW_hQJRn5",
    "questions": [
      {
        "q": "Uma função f(x) = 3x − 6. Para qual valor de x temos f(x) = 0?",
        "opts": [
          "x = 0",
          "x = 2",
          "x = 3",
          "x = −2"
        ]
      },
      {
        "q": "A função f(x) = −2x + 8 é crescente ou decrescente?",
        "opts": [
          "Crescente (a > 0)",
          "Decrescente (a < 0)",
          "Constante",
          "Nem crescente, nem decrescente"
        ]
      },
      {
        "q": "Se f(x) = 4x + 2, quanto vale f(3)?",
        "opts": [
          "10",
          "14",
          "12",
          "6"
        ]
      },
      {
        "q": "Uma função afim tem a = 5 e passa pelo ponto (0, −3). Qual é sua expressão?",
        "opts": [
          "f(x) = 5x + 3",
          "f(x) = 5x − 3",
          "f(x) = −3x + 5",
          "f(x) = 3x − 5"
        ]
      },
      {
        "q": "Para f(x) = 2x − 4, qual o valor de x quando f(x) = 10?",
        "opts": [
          "x = 7",
          "x = 3",
          "x = 8",
          "x = 6"
        ]
      },
      {
        "q": "Qual afirmação sobre f(x) = −x + 5 é correta?",
        "opts": [
          "É crescente e sua raiz é 5",
          "É decrescente e sua raiz é 5",
          "É crescente e sua raiz é −5",
          "É constante"
        ]
      },
      {
        "q": "Uma taxa de táxi cobra R$4,00 de bandeirada + R$2,50 por km. Qual função descreve o preço?",
        "opts": [
          "f(x) = 4x + 2,5",
          "f(x) = 2,5x + 4",
          "f(x) = 4x − 2,5",
          "f(x) = 2,5x"
        ]
      },
      {
        "q": "Dois amigos têm f(x) = 3x + 1 e g(x) = x + 5. Para qual x os valores se igualam?",
        "opts": [
          "x = 1",
          "x = 2",
          "x = 3",
          "x = 4"
        ]
      }
    ]
  },
  "funcao_quad": {
    "title": "Função Quadrática (2º grau)",
    "desc": "A função quadrática tem a forma f(x) = ax² + bx + c, com a ≠ 0. Seu gráfico é uma parábola. O vértice representa o ponto de máximo (a < 0) ou mínimo (a > 0). As raízes são encontradas pela fórmula de Bhaskara: x = (−b ± √Δ) / 2a, com Δ = b² − 4ac.",
    "video": "Função Quadrática — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=ZpW9Xb5iyt4&list=PLlb9l2qepYgJ3rDOwEkEUnWb8igfIZo8t",
    "questions": [
      {
        "q": "A função f(x) = x² − 4x + 3. Quais são os zeros da função?",
        "opts": [
          "x = 1 e x = 3",
          "x = 2 e x = 4",
          "x = −1 e x = −3",
          "x = 0 e x = 4"
        ]
      },
      {
        "q": "Para f(x) = −x² + 4x, o valor máximo da função é:",
        "opts": [
          "2",
          "4",
          "8",
          "16"
        ]
      },
      {
        "q": "O discriminante Δ de f(x) = x² − 6x + 9 vale:",
        "opts": [
          "0",
          "9",
          "−9",
          "36"
        ]
      },
      {
        "q": "Qual parábola tem concavidade voltada para baixo?",
        "opts": [
          "f(x) = 2x² + 3",
          "f(x) = −3x² + x − 1",
          "f(x) = x² − 5x",
          "f(x) = 4x² + 2x + 7"
        ]
      },
      {
        "q": "Para f(x) = x² + 2x − 3, as raízes são:",
        "opts": [
          "x = 1 e x = 3",
          "x = −3 e x = 1",
          "x = 3 e x = −1",
          "x = −1 e x = −3"
        ]
      },
      {
        "q": "O vértice de f(x) = x² − 4x + 7 é:",
        "opts": [
          "(2, 3)",
          "(−2, 3)",
          "(2, −3)",
          "(4, 7)"
        ]
      },
      {
        "q": "Uma bola é lançada e sua altura é h(t) = −t² + 4t. Em qual instante ela atinge a altura máxima?",
        "opts": [
          "t = 1",
          "t = 2",
          "t = 4",
          "t = 3"
        ]
      },
      {
        "q": "Quais são os valores de x para os quais f(x) = x² − 5x + 6 é negativa?",
        "opts": [
          "x < 2 ou x > 3",
          "2 < x < 3",
          "x < 3",
          "x > 2"
        ]
      }
    ]
  },
  "pa": {
    "title": "Progressão Aritmética (PA)",
    "desc": "Uma PA é uma sequência em que a diferença entre termos consecutivos é constante (razão r). O termo geral é dado por aₙ = a₁ + (n−1)·r e a soma dos n termos por Sₙ = n·(a₁ + aₙ)/2.",
    "video": "Progressão Aritmética — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=BWwQa8c22Pw&list=PLlb9l2qepYgJQ0zoE0z0u6xoiLuFo-Nfj",
    "questions": [
      {
        "q": "Qual é a razão da PA (3, 7, 11, 15, ...)?",
        "opts": [
          "3",
          "4",
          "5",
          "7"
        ]
      },
      {
        "q": "Na PA (2, 5, 8, ...), qual é o 10º termo?",
        "opts": [
          "27",
          "29",
          "32",
          "25"
        ]
      },
      {
        "q": "A soma dos 20 primeiros termos da PA (1, 3, 5, ...) é:",
        "opts": [
          "200",
          "400",
          "380",
          "420"
        ]
      },
      {
        "q": "Em uma PA, a₁ = 5 e r = −3. Qual é o 6º termo?",
        "opts": [
          "−10",
          "−15",
          "−5",
          "−20"
        ]
      },
      {
        "q": "Três números em PA têm soma 21 e o menor é 5. Quais são os números?",
        "opts": [
          "5, 7, 9",
          "5, 8, 8",
          "4, 7, 10",
          "3, 7, 11"
        ]
      },
      {
        "q": "Um cinema vendeu 100 ingressos na 1ª semana e aumenta 15 por semana. Quantos na 5ª semana?",
        "opts": [
          "155",
          "160",
          "165",
          "170"
        ]
      }
    ]
  },
  "pg": {
    "title": "Progressão Geométrica (PG)",
    "desc": "Uma PG é uma sequência em que a razão entre termos consecutivos é constante (q ≠ 0). O termo geral é aₙ = a₁ · qⁿ⁻¹ e a soma dos n termos é Sₙ = a₁ · (qⁿ − 1)/(q − 1), para q ≠ 1.",
    "video": "Progressão Geométrica — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=haKrC4quHj8&list=PLlb9l2qepYgIwbNYC31qpCOClXiii7h36",
    "questions": [
      {
        "q": "Qual é a razão da PG (2, 6, 18, 54, ...)?",
        "opts": [
          "2",
          "3",
          "4",
          "6"
        ]
      },
      {
        "q": "Na PG (5, 10, 20, ...), qual é o 6º termo?",
        "opts": [
          "120",
          "160",
          "160",
          "140"
        ]
      },
      {
        "q": "A soma dos 4 primeiros termos da PG (1, 2, 4, 8) é:",
        "opts": [
          "14",
          "15",
          "16",
          "12"
        ]
      },
      {
        "q": "Uma cultura bacteriana dobra a cada hora. Começando com 100, quantas haverá após 5 horas?",
        "opts": [
          "3200",
          "6400",
          "1600",
          "800"
        ]
      },
      {
        "q": "Em uma PG, a₁ = 81 e q = 1/3. Qual é o 4º termo?",
        "opts": [
          "9",
          "3",
          "27",
          "1"
        ]
      },
      {
        "q": "Três números em PG têm produto 27 e o menor é 1. Qual é a razão?",
        "opts": [
          "2",
          "3",
          "4",
          "9"
        ]
      }
    ]
  },
  "trig": {
    "title": "Trigonometria Básica",
    "desc": "No triângulo retângulo, as razões trigonométricas são: sen(θ) = oposto/hipotenusa, cos(θ) = adjacente/hipotenusa e tg(θ) = oposto/adjacente. Ângulos notáveis: 30°, 45° e 60° têm valores exatos a memorizar.",
    "video": "Trigonometria Básica — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=C7NrVLmEYcs&list=PLlb9l2qepYgIg7GVCy2LnJHHPJ-NqS6rT",
    "questions": [
      {
        "q": "Em um triângulo retângulo, o cateto oposto mede 3 e a hipotenusa 5. Qual é o seno do ângulo?",
        "opts": [
          "3/4",
          "3/5",
          "4/5",
          "5/3"
        ]
      },
      {
        "q": "Quanto vale tg(45°)?",
        "opts": [
          "√2/2",
          "√3/2",
          "1",
          "√3"
        ]
      },
      {
        "q": "Qual é o valor de sen(30°)?",
        "opts": [
          "√3/2",
          "1/2",
          "√2/2",
          "1"
        ]
      },
      {
        "q": "Um mastro projeta uma sombra de 10 m. O ângulo de elevação do sol é 45°. Qual a altura do mastro?",
        "opts": [
          "5 m",
          "10 m",
          "10√2 m",
          "20 m"
        ]
      },
      {
        "q": "Em um triângulo retângulo, cos(60°) = adjacente/hipotenusa. Se a hipotenusa é 8, o adjacente é:",
        "opts": [
          "4",
          "4√3",
          "8√3",
          "2"
        ]
      },
      {
        "q": "Qual identidade trigonométrica é sempre verdadeira?",
        "opts": [
          "sen²(x) + cos²(x) = 2",
          "sen²(x) − cos²(x) = 1",
          "sen²(x) + cos²(x) = 1",
          "tg(x) = cos(x)/sen(x)"
        ]
      },
      {
        "q": "Qual o valor de cos(0°)?",
        "opts": [
          "0",
          "1/2",
          "1",
          "√3/2"
        ]
      },
      {
        "q": "Um avião voa a 1000 m de altitude. O ângulo de depressão até um ponto é 30°. Qual é a distância horizontal ao ponto?",
        "opts": [
          "500 m",
          "1000√3 m",
          "1000/√3 m",
          "2000 m"
        ]
      }
    ]
  },
  "geo_plana": {
    "title": "Geometria Plana",
    "desc": "A Geometria Plana estuda figuras bidimensionais. Fórmulas essenciais: área do triângulo = base·altura/2; do retângulo = base·altura; do círculo = πr²; do trapézio = (B + b)·h/2. O Teorema de Pitágoras: a² = b² + c² em triângulos retângulos.",
    "video": "Geometria Plana — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=EzGf1UEnnsY&list=PLlb9l2qepYgI6N1CcO7JAWHwFWn14Eh96",
    "questions": [
      {
        "q": "Um retângulo tem base 8 m e altura 5 m. Qual é sua área?",
        "opts": [
          "26 m²",
          "40 m²",
          "13 m²",
          "80 m²"
        ]
      },
      {
        "q": "A hipotenusa de um triângulo retângulo com catetos 6 e 8 é:",
        "opts": [
          "12",
          "14",
          "10",
          "15"
        ]
      },
      {
        "q": "Qual é a área de um círculo com raio 7 cm? (use π ≈ 3,14)",
        "opts": [
          "43,96 cm²",
          "153,86 cm²",
          "49 cm²",
          "21,98 cm²"
        ]
      },
      {
        "q": "Um trapézio tem bases 10 m e 6 m, e altura 4 m. Qual a sua área?",
        "opts": [
          "64 m²",
          "32 m²",
          "40 m²",
          "24 m²"
        ]
      },
      {
        "q": "Um triângulo equilátero tem lado 6. Qual é sua área?",
        "opts": [
          "18",
          "9√3",
          "12√3",
          "36"
        ]
      },
      {
        "q": "Qual o comprimento da circunferência com raio 5? (use π ≈ 3,14)",
        "opts": [
          "15,7",
          "31,4",
          "78,5",
          "25"
        ]
      }
    ]
  },
  "trig2": {
    "title": "Trigonometria Completa",
    "desc": "A trigonometria no ciclo trigonométrico estende os ângulos além de 90°. O ciclo possui 4 quadrantes com sinais definidos para sen, cos e tg. As funções trigonométricas são periódicas: sen e cos têm período 2π; tg tem período π. Fórmulas de adição: sen(a+b) = sen·a·cos·b + cos·a·sen·b.",
    "video": "Trigonometria Completa — Ciclo e Funções",
    "playlistUrl": "https://www.youtube.com/watch?v=Yc6IRaFdFoc&list=PLlb9l2qepYgI103rqALDdkud-_Q3AHuYS",
    "questions": [
      {
        "q": "No 2º quadrante, quais funções trigonométricas são positivas?",
        "opts": [
          "sen e cos",
          "Apenas sen",
          "Apenas cos",
          "tg e sen"
        ]
      },
      {
        "q": "Qual é o valor de sen(120°)?",
        "opts": [
          "−√3/2",
          "1/2",
          "√3/2",
          "−1/2"
        ]
      },
      {
        "q": "A função f(x) = sen(x) tem período:",
        "opts": [
          "π",
          "2π",
          "π/2",
          "4π"
        ]
      },
      {
        "q": "Qual é cos(210°)?",
        "opts": [
          "√3/2",
          "−√3/2",
          "1/2",
          "−1/2"
        ]
      },
      {
        "q": "Se sen(x) = 1/2 e x está no 2º quadrante, qual é cos(x)?",
        "opts": [
          "√3/2",
          "−√3/2",
          "1/2",
          "−1/2"
        ]
      },
      {
        "q": "Qual é o valor de tg(135°)?",
        "opts": [
          "1",
          "−1",
          "√3",
          "−√3"
        ]
      },
      {
        "q": "A equação sen(x) = 0 tem como soluções no intervalo [0°, 360°]:",
        "opts": [
          "x = 90° e x = 270°",
          "x = 0° e x = 180°",
          "x = 0°, x = 180° e x = 360°",
          "x = 45° e x = 225°"
        ]
      },
      {
        "q": "Qual o valor de cos(360°)?",
        "opts": [
          "0",
          "−1",
          "1",
          "−√2/2"
        ]
      }
    ]
  },
  "matrizes": {
    "title": "Matrizes e Determinantes",
    "desc": "Uma matriz é uma tabela de números dispostos em linhas e colunas. O determinante é um número associado a matrizes quadradas. Para matrizes 2×2: det = ad − bc. A regra de Sarrus é usada para matrizes 3×3.",
    "video": "Matrizes e Determinantes — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=ktr4wfXi9xg&list=PLlb9l2qepYgKkQsPFJwXC1DQys4AGCqwL",
    "questions": [
      {
        "q": "Qual é o determinante da matriz [[3, 2], [1, 4]]?",
        "opts": [
          "10",
          "12",
          "14",
          "8"
        ]
      },
      {
        "q": "A soma dos elementos da diagonal principal de [[5, 0], [0, 7]] é:",
        "opts": [
          "5",
          "7",
          "12",
          "35"
        ]
      },
      {
        "q": "Se A = [[1, 2], [3, 4]] e B = [[5, 6], [7, 8]], qual é A + B?",
        "opts": [
          "[[6, 8], [10, 12]]",
          "[[5, 12], [21, 32]]",
          "[[6, 8], [12, 10]]",
          "[[4, 4], [4, 4]]"
        ]
      },
      {
        "q": "Uma matriz 3×4 possui quantos elementos?",
        "opts": [
          "7",
          "12",
          "9",
          "16"
        ]
      },
      {
        "q": "O determinante de uma matriz com uma linha de zeros é:",
        "opts": [
          "1",
          "Indefinido",
          "0",
          "−1"
        ]
      },
      {
        "q": "Qual é o produto da matriz [[2, 0], [0, 3]] pelo escalar 4?",
        "opts": [
          "[[8, 0], [0, 12]]",
          "[[6, 4], [4, 7]]",
          "[[8, 4], [4, 12]]",
          "[[2, 0], [0, 12]]"
        ]
      }
    ]
  },
  "sistemas": {
    "title": "Sistemas Lineares",
    "desc": "Um sistema linear é um conjunto de equações do 1º grau com duas ou mais incógnitas. Pode ser resolvido por substituição, adição (eliminação) ou usando a Regra de Cramer (determinantes). Um sistema pode ser: possível e determinado, possível e indeterminado ou impossível.",
    "video": "Sistemas Lineares — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=9ATZyBcgq4g&list=PLlb9l2qepYgJJm808zenKiclaOYPRROen",
    "questions": [
      {
        "q": "Resolva o sistema: x + y = 5 e x − y = 1. Qual é o valor de x?",
        "opts": [
          "2",
          "3",
          "4",
          "1"
        ]
      },
      {
        "q": "Um sistema 2×2 é impossível quando:",
        "opts": [
          "Tem uma solução única",
          "As retas se cruzam",
          "As retas são paralelas",
          "As retas são coincidentes"
        ]
      },
      {
        "q": "Resolva: 2x + y = 7 e x − y = 2. Qual é y?",
        "opts": [
          "1",
          "2",
          "3",
          "5"
        ]
      },
      {
        "q": "Um sistema é possível e indeterminado quando:",
        "opts": [
          "Tem infinitas soluções",
          "Tem solução única",
          "Não tem solução",
          "Tem exatamente 2 soluções"
        ]
      },
      {
        "q": "Dois produtos custam juntos R$50. Um custa R$10 a mais que o outro. Qual é o preço do mais barato?",
        "opts": [
          "R$15",
          "R$20",
          "R$25",
          "R$30"
        ]
      },
      {
        "q": "Resolva: 3x − 2y = 4 e x + y = 3. Qual é o valor de x?",
        "opts": [
          "1",
          "2",
          "3",
          "4"
        ]
      }
    ]
  },
  "geo_esp": {
    "title": "Geometria Espacial",
    "desc": "A Geometria Espacial estuda sólidos geométricos. Principais fórmulas: cubo (V = a³); paralelepípedo (V = abc); cilindro (V = πr²h); cone (V = πr²h/3); esfera (V = 4πr³/3); pirâmide (V = A_base · h/3).",
    "video": "Geometria Espacial — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=Y_gD7S6OkC4&list=PLlb9l2qepYgKNehtcFgx_2NA-VKKErDg1",
    "questions": [
      {
        "q": "Qual é o volume de um cubo com aresta 4 cm?",
        "opts": [
          "16 cm³",
          "48 cm³",
          "64 cm³",
          "96 cm³"
        ]
      },
      {
        "q": "Um cilindro tem raio 3 e altura 5. Qual é seu volume? (use π ≈ 3,14)",
        "opts": [
          "141,3",
          "94,2",
          "47,1",
          "188,4"
        ]
      },
      {
        "q": "Uma esfera tem raio 3 cm. Seu volume é: (use π ≈ 3,14)",
        "opts": [
          "36π",
          "28,26 cm³",
          "113,04 cm³",
          "75,36 cm³"
        ]
      },
      {
        "q": "Um cone tem base circular com raio 4 cm e altura 9 cm. Seu volume é: (π ≈ 3,14)",
        "opts": [
          "452,16 cm³",
          "150,72 cm³",
          "50,24 cm³",
          "301,44 cm³"
        ]
      },
      {
        "q": "Um paralelepípedo mede 2 × 3 × 6. Qual é sua área total?",
        "opts": [
          "36",
          "72",
          "108",
          "66"
        ]
      },
      {
        "q": "Uma pirâmide quadrada de base 6 e altura 8 tem volume:",
        "opts": [
          "96",
          "144",
          "288",
          "48"
        ]
      },
      {
        "q": "A diagonal do cubo de aresta a vale:",
        "opts": [
          "a√2",
          "a√3",
          "2a",
          "a√6"
        ]
      },
      {
        "q": "Quantas faces tem um dodecaedro regular?",
        "opts": [
          "6",
          "12",
          "20",
          "8"
        ]
      }
    ]
  },
  "geo_anal": {
    "title": "Geometria Analítica",
    "desc": "A Geometria Analítica usa coordenadas para estudar figuras. Distância entre pontos: d = √[(x₂−x₁)² + (y₂−y₁)²]. Equação da reta: y = ax + b ou ax + by + c = 0. Equação da circunferência: (x−a)² + (y−b)² = r².",
    "video": "Geometria Analítica — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=lHqTFWNBtmQ&list=PLlb9l2qepYgLhPcLlg66IGJrri9nvSAfM",
    "questions": [
      {
        "q": "Qual é a distância entre os pontos A(1, 2) e B(4, 6)?",
        "opts": [
          "3",
          "4",
          "5",
          "7"
        ]
      },
      {
        "q": "A reta y = 3x − 2 tem coeficiente angular:",
        "opts": [
          "−2",
          "3",
          "2",
          "−3"
        ]
      },
      {
        "q": "Qual é o ponto médio entre A(2, 4) e B(6, 8)?",
        "opts": [
          "(3, 5)",
          "(4, 6)",
          "(4, 5)",
          "(3, 6)"
        ]
      },
      {
        "q": "A equação (x−2)² + (y+3)² = 25 representa uma circunferência de raio:",
        "opts": [
          "5",
          "25",
          "10",
          "√5"
        ]
      },
      {
        "q": "Qual é a equação da reta que passa por (0, 4) com coeficiente angular 2?",
        "opts": [
          "y = 2x − 4",
          "y = 4x + 2",
          "y = 2x + 4",
          "y = x + 4"
        ]
      },
      {
        "q": "Duas retas são paralelas quando:",
        "opts": [
          "Têm coeficientes angulares iguais",
          "São perpendiculares",
          "Se cruzam em um ponto",
          "Têm o mesmo coeficiente linear"
        ]
      },
      {
        "q": "A área do triângulo com vértices O(0,0), A(4,0) e B(0,3) é:",
        "opts": [
          "6",
          "12",
          "7",
          "24"
        ]
      },
      {
        "q": "Qual é o coeficiente angular da reta que passa por (1, 2) e (3, 6)?",
        "opts": [
          "1",
          "2",
          "3",
          "4"
        ]
      }
    ]
  },
  "log": {
    "title": "Logaritmos e Exponenciais",
    "desc": "Logaritmo: logₐ(b) = x significa que aˣ = b. Propriedades: log(A·B) = log A + log B; log(A/B) = log A − log B; log(Aⁿ) = n·log A. Funções exponenciais e logarítmicas são inversas entre si.",
    "video": "Logaritmos e Exponenciais — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=k2XkYEUH9nA&list=PLlb9l2qepYgIslA9drOxaLpZqbK816Wiu",
    "questions": [
      {
        "q": "Quanto vale log₂(8)?",
        "opts": [
          "2",
          "3",
          "4",
          "6"
        ]
      },
      {
        "q": "Qual é o valor de log₁₀(1000)?",
        "opts": [
          "2",
          "3",
          "4",
          "10"
        ]
      },
      {
        "q": "Se log(2) ≈ 0,301, quanto vale log(8)?",
        "opts": [
          "0,602",
          "0,903",
          "1,204",
          "0,301"
        ]
      },
      {
        "q": "A equação 2ˣ = 32 tem como solução:",
        "opts": [
          "x = 4",
          "x = 5",
          "x = 6",
          "x = 3"
        ]
      },
      {
        "q": "Qual é o domínio da função f(x) = log(x)?",
        "opts": [
          "Todos os reais",
          "x > 0",
          "x ≥ 0",
          "x < 0"
        ]
      },
      {
        "q": "Simplifique: log(100) + log(10)",
        "opts": [
          "2",
          "3",
          "10",
          "20"
        ]
      },
      {
        "q": "O crescimento de uma população segue P(t) = 1000 · 2ᵗ. Após quantos anos a população será 8000?",
        "opts": [
          "t = 2",
          "t = 3",
          "t = 4",
          "t = 8"
        ]
      },
      {
        "q": "Qual propriedade justifica que log(A/B) = log A − log B?",
        "opts": [
          "Propriedade do produto",
          "Propriedade do quociente",
          "Propriedade da potência",
          "Mudança de base"
        ]
      }
    ]
  },
  "comb": {
    "title": "Análise Combinatória",
    "desc": "Análise Combinatória conta possibilidades. Princípio Multiplicativo: se há m formas de fazer A e n formas de fazer B, há m·n formas de fazer A e B. Permutações: Pₙ = n!; Combinações: C(n,k) = n! / (k! · (n−k)!); Arranjos: A(n,k) = n! / (n−k)!",
    "video": "Análise Combinatória — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=rSgs9YD9ns0&list=PLlb9l2qepYgK4MsAkrOc91Hbnxb_Kbs5l",
    "questions": [
      {
        "q": "Quantos anagramas tem a palavra \"AMOR\"?",
        "opts": [
          "12",
          "16",
          "24",
          "8"
        ]
      },
      {
        "q": "De um grupo de 5 pessoas, de quantas formas pode-se escolher 2?",
        "opts": [
          "5",
          "10",
          "20",
          "15"
        ]
      },
      {
        "q": "Um cardápio tem 3 entradas e 4 pratos principais. Quantas refeições distintas são possíveis?",
        "opts": [
          "7",
          "10",
          "12",
          "24"
        ]
      },
      {
        "q": "Quantos números de 3 dígitos podem ser formados com {1, 2, 3, 4, 5} sem repetição?",
        "opts": [
          "60",
          "120",
          "125",
          "150"
        ]
      },
      {
        "q": "Quantas diagonais tem um hexágono?",
        "opts": [
          "6",
          "9",
          "12",
          "15"
        ]
      },
      {
        "q": "Um time de futebol tem 15 jogadores. De quantas formas o técnico pode escalar 11?",
        "opts": [
          "C(15,11)",
          "P(15)",
          "A(15,11)",
          "15!"
        ]
      }
    ]
  },
  "prob": {
    "title": "Probabilidade",
    "desc": "A probabilidade de um evento A é P(A) = (casos favoráveis) / (casos totais). Para eventos mutuamente exclusivos: P(A∪B) = P(A) + P(B). Para eventos independentes: P(A∩B) = P(A) · P(B). O complementar: P(Aᶜ) = 1 − P(A).",
    "video": "Probabilidade — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=dmU8BE3dqYg&list=PLlb9l2qepYgKG8DMepcBkIDMMMpTXA0Hw",
    "questions": [
      {
        "q": "Um dado justo é lançado. Qual é a probabilidade de sair um número par?",
        "opts": [
          "1/3",
          "1/2",
          "2/3",
          "1/6"
        ]
      },
      {
        "q": "Uma urna tem 4 bolas vermelhas e 6 azuis. Qual a probabilidade de tirar uma vermelha?",
        "opts": [
          "2/5",
          "3/5",
          "1/4",
          "4/10"
        ]
      },
      {
        "q": "Se P(A) = 0,3 e P(B) = 0,5 (eventos mutuamente exclusivos), qual é P(A∪B)?",
        "opts": [
          "0,15",
          "0,8",
          "0,2",
          "0,6"
        ]
      },
      {
        "q": "Dois dados são lançados. Qual a probabilidade de obter soma 7?",
        "opts": [
          "1/6",
          "5/36",
          "7/36",
          "1/12"
        ]
      },
      {
        "q": "A probabilidade de chover é 0,4. Qual a probabilidade de NÃO chover?",
        "opts": [
          "0,4",
          "0,6",
          "0,14",
          "0,96"
        ]
      },
      {
        "q": "Dois eventos independentes têm P(A) = 1/3 e P(B) = 1/4. Qual é P(A∩B)?",
        "opts": [
          "7/12",
          "1/12",
          "1/6",
          "1/3"
        ]
      }
    ]
  },
  "estat": {
    "title": "Estatística",
    "desc": "Estatística organiza e analisa dados. Medidas de tendência central: Média (soma/quantidade), Mediana (valor central) e Moda (valor mais frequente). Medidas de dispersão: Variância (média dos desvios ao quadrado) e Desvio Padrão (raiz da variância).",
    "video": "Estatística — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=mSk2vjGXA90&list=PLlb9l2qepYgIzLFBjoYcN57HkUH3d_qjC",
    "questions": [
      {
        "q": "A média dos valores {4, 6, 8, 10, 12} é:",
        "opts": [
          "7",
          "8",
          "9",
          "10"
        ]
      },
      {
        "q": "Qual é a mediana de {3, 1, 5, 7, 9}?",
        "opts": [
          "3",
          "5",
          "7",
          "9"
        ]
      },
      {
        "q": "Qual é a moda de {2, 4, 4, 6, 8, 8, 8, 10}?",
        "opts": [
          "4",
          "6",
          "8",
          "2"
        ]
      },
      {
        "q": "Em uma turma, as notas foram: 5, 6, 7, 8, 9. Qual nota deve ser incluída para que a média suba para 7?",
        "opts": [
          "7",
          "8",
          "9",
          "10"
        ]
      },
      {
        "q": "Qual gráfico é mais adequado para mostrar a distribuição percentual de categorias?",
        "opts": [
          "Histograma",
          "Gráfico de setores (pizza)",
          "Box plot",
          "Gráfico de linha"
        ]
      },
      {
        "q": "O desvio padrão de um conjunto de dados é 0. O que isso indica?",
        "opts": [
          "Todos os valores são iguais",
          "A média é zero",
          "Os dados estão muito dispersos",
          "O conjunto é vazio"
        ]
      }
    ]
  },
  "fin": {
    "title": "Matemática Financeira",
    "desc": "Juros Simples: J = C · i · t; Montante M = C(1 + it). Juros Compostos: M = C · (1 + i)ᵗ. Conceitos importantes: capital (C), taxa (i), tempo (t), juros (J) e montante (M = C + J). Desconto simples: D = N · i · t; Valor Atual: VA = N − D.",
    "video": "Matemática Financeira — PSC/ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=azedx0uou64&list=PLlb9l2qepYgLuKGSYD94wYYTu9BzdwFxm",
    "questions": [
      {
        "q": "Um capital de R$2.000 rende juros simples de 5% ao mês durante 3 meses. Qual o montante?",
        "opts": [
          "R$2.100",
          "R$2.300",
          "R$2.500",
          "R$2.050"
        ]
      },
      {
        "q": "R$1.000 aplicados a juros compostos de 10% ao ano por 2 anos rendem:",
        "opts": [
          "R$1.200",
          "R$1.210",
          "R$1.100",
          "R$1.220"
        ]
      },
      {
        "q": "Qual a diferença entre juros simples e compostos?",
        "opts": [
          "Juros simples capitaliza sobre juros anteriores",
          "Juros compostos capitaliza sobre juros anteriores",
          "Não há diferença",
          "Juros simples é maior para longos períodos"
        ]
      },
      {
        "q": "Uma dívida de R$5.000 tem desconto simples de 2% ao mês por 2 meses. Qual o valor atual?",
        "opts": [
          "R$4.600",
          "R$4.800",
          "R$4.500",
          "R$4.900"
        ]
      },
      {
        "q": "A taxa equivalente mensal a uma taxa anual de 12% (juros compostos) é aproximadamente:",
        "opts": [
          "1%",
          "2%",
          "0,5%",
          "1,5%"
        ]
      },
      {
        "q": "Quanto tempo leva para um capital dobrar a juros simples de 5% ao mês?",
        "opts": [
          "10 meses",
          "20 meses",
          "15 meses",
          "25 meses"
        ]
      }
    ]
  },
  "tipos": {
    "title": "Tipos Textuais",
    "desc": "Tipos textuais se diferem dos gêneros textuais. Os tipos principais são: Narração (conta eventos com personagens, tempo, espaço e enredo), Descrição (descreve características), Dissertação (argumenta e expõe ideias), Injunção (instrui/orienta) e Exposição (explica/informa).",
    "video": "Tipos Textuais — Fundamentos da Redação",
    "playlistUrl": "https://www.youtube.com/watch?v=keri15mSleA&list=PLlb9l2qepYgI28UCrcRBJG2c0RFk1q9Y5",
    "questions": [
      {
        "q": "Um texto que conta uma história com personagens, tempo e espaço é do tipo:",
        "opts": [
          "Dissertativo",
          "Descritivo",
          "Narrativo",
          "Injuntivo"
        ]
      },
      {
        "q": "Uma receita culinária é um exemplo de texto:",
        "opts": [
          "Narrativo",
          "Descritivo",
          "Dissertativo",
          "Injuntivo"
        ]
      },
      {
        "q": "O artigo de opinião é predominantemente:",
        "opts": [
          "Narrativo",
          "Descritivo",
          "Dissertativo-argumentativo",
          "Injuntivo"
        ]
      },
      {
        "q": "Qual tipo textual predomina em um manual de instruções?",
        "opts": [
          "Narrativo",
          "Injuntivo",
          "Expositivo",
          "Dissertativo"
        ]
      }
    ]
  },
  "coerencia": {
    "title": "Coerência e Coesão",
    "desc": "Coerência é a harmonia lógica das ideias: o texto faz sentido. Coesão é a ligação formal entre as partes por mecanismos linguísticos: referência, substituição, elipse, conjunção e coesão lexical. Um texto bem escrito precisa de ambas.",
    "video": "Coerência e Coesão — Redação ENEM/PSC",
    "playlistUrl": "https://www.youtube.com/watch?v=cHcFDNkxpmQ&list=PLlb9l2qepYgI28UCrcRBJG2c0RFk1q9Y5&index=2",
    "questions": [
      {
        "q": "O que é coesão textual?",
        "opts": [
          "A lógica das ideias no texto",
          "Os mecanismos linguísticos que ligam as partes do texto",
          "O tema central do texto",
          "A argumentação do texto"
        ]
      },
      {
        "q": "\"Embora estivesse cansado, ele continuou trabalhando.\" A conjunção destacada indica:",
        "opts": [
          "Causa",
          "Conclusão",
          "Concessão",
          "Adição"
        ]
      },
      {
        "q": "Qual dos textos abaixo tem problemas de coerência?",
        "opts": [
          "\"Chovia muito. Por isso, levei guarda-chuva.\"",
          "\"Estava com fome. Portanto, fui ao cinema.\"",
          "\"Estudei bastante. Logo, passei na prova.\"",
          "\"Era tarde. Então, fui dormir.\""
        ]
      },
      {
        "q": "A substituição de \"João\" por \"o rapaz\" em um texto é um mecanismo de:",
        "opts": [
          "Coerência",
          "Coesão por referência/substituição",
          "Argumentação",
          "Progressão temática"
        ]
      },
      {
        "q": "Qual conjunção indica conclusão?",
        "opts": [
          "Mas",
          "Portanto",
          "Embora",
          "Enquanto"
        ]
      },
      {
        "q": "A elipse é um recurso de coesão que consiste em:",
        "opts": [
          "Repetir uma palavra",
          "Omitir um elemento facilmente subentendido pelo contexto",
          "Usar sinônimos",
          "Ligar orações por conjunções"
        ]
      }
    ]
  },
  "narr": {
    "title": "Elementos da Narrativa",
    "desc": "Os elementos da narrativa são: Narrador (quem conta), Personagens (protagonista, antagonista, secundários), Enredo (sequência de eventos), Tempo (cronológico ou psicológico), Espaço (ambiente físico/social) e Foco narrativo (1ª ou 3ª pessoa).",
    "video": "Elementos da Narrativa — Redação e Literatura",
    "playlistUrl": "https://www.youtube.com/watch?v=xaj3eS3Em2Q&list=PLlb9l2qepYgI28UCrcRBJG2c0RFk1q9Y5&index=3",
    "questions": [
      {
        "q": "O protagonista de uma narrativa é:",
        "opts": [
          "O narrador da história",
          "O personagem principal",
          "O antagonista",
          "O narrador em 1ª pessoa"
        ]
      },
      {
        "q": "Em \"Eu acordei cedo e fui à escola\", o narrador é em:",
        "opts": [
          "3ª pessoa",
          "1ª pessoa",
          "2ª pessoa",
          "Narrador onisciente"
        ]
      },
      {
        "q": "O conflito em uma narrativa é:",
        "opts": [
          "O espaço onde ocorre a ação",
          "O problema ou tensão que move o enredo",
          "O tempo em que se passa a história",
          "A resolução final"
        ]
      },
      {
        "q": "O tempo psicológico em uma narrativa refere-se:",
        "opts": [
          "À ordem cronológica dos eventos",
          "Ao tempo interior/subjetivo do personagem",
          "À época histórica em que se passa",
          "À duração real dos eventos"
        ]
      }
    ]
  },
  "artigo": {
    "title": "Artigo de Opinião",
    "desc": "O artigo de opinião é um gênero dissertativo-argumentativo que defende um ponto de vista. Estrutura: Título, Introdução (tese), Desenvolvimento (argumentos com embasamento) e Conclusão (retomada da tese). Usa linguagem formal e recursos argumentativos.",
    "video": "Artigo de Opinião — Redação ENEM/PSC",
    "playlistUrl": "https://www.youtube.com/watch?v=IM64Plps5jQ&list=PLlb9l2qepYgJZhXnNAY85kt2tBDHOOoXF",
    "questions": [
      {
        "q": "A tese em um artigo de opinião é:",
        "opts": [
          "O tema geral do texto",
          "O ponto de vista que o autor defende",
          "O título do artigo",
          "A conclusão com solução"
        ]
      },
      {
        "q": "Qual recurso NÃO é adequado em um artigo de opinião formal?",
        "opts": [
          "Dados estatísticos",
          "Citações de especialistas",
          "Gírias e linguagem coloquial",
          "Exemplos concretos"
        ]
      },
      {
        "q": "O artigo de opinião difere da notícia porque:",
        "opts": [
          "Conta eventos",
          "Defende um ponto de vista",
          "Usa linguagem objetiva",
          "Relata fatos sem opinião"
        ]
      },
      {
        "q": "Na estrutura do artigo de opinião, o desenvolvimento serve para:",
        "opts": [
          "Apresentar o tema e a tese",
          "Embasar a tese com argumentos e evidências",
          "Propor soluções",
          "Retomar a posição inicial"
        ]
      },
      {
        "q": "Qual estratégia argumentativa consiste em apresentar e refutar o argumento contrário?",
        "opts": [
          "Exemplo",
          "Contra-argumento",
          "Citação de autoridade",
          "Dado estatístico"
        ]
      },
      {
        "q": "O uso de \"embora\", \"apesar de\", \"ainda que\" em artigos de opinião indica:",
        "opts": [
          "Conclusão",
          "Exemplificação",
          "Concessão",
          "Adição"
        ]
      }
    ]
  },
  "arg": {
    "title": "Argumentação",
    "desc": "Argumentar é apresentar razões para defender uma posição. Tipos de argumentos: de autoridade (citar especialistas), de exemplificação, estatístico, lógico-dedutivo, histórico e comparativo. Um bom argumento é relevante, suficiente e relacionado à tese.",
    "video": "Argumentação — Redação ENEM/PSC",
    "playlistUrl": "https://www.youtube.com/watch?v=IGmZHrihXN8&list=PLlb9l2qepYgJZhXnNAY85kt2tBDHOOoXF&index=2",
    "questions": [
      {
        "q": "\"Segundo a OMS, o sedentarismo causa X mortes por ano.\" Esse é um argumento de:",
        "opts": [
          "Comparação",
          "Autoridade",
          "Exemplificação",
          "Analogia"
        ]
      },
      {
        "q": "Um argumento fraco é aquele que:",
        "opts": [
          "Usa dados estatísticos",
          "Não tem relação com a tese",
          "Cita exemplos concretos",
          "Apresenta causa e efeito"
        ]
      },
      {
        "q": "A progressão argumentativa em um texto é:",
        "opts": [
          "Repetir a tese em todos os parágrafos",
          "Desenvolver os argumentos de forma organizada e encadeada",
          "Listar fatos sem conexão",
          "Apresentar apenas um argumento"
        ]
      },
      {
        "q": "\"Assim como o tabaco, o álcool em excesso destrói o organismo.\" Esse argumento usa:",
        "opts": [
          "Dado estatístico",
          "Comparação/analogia",
          "Argumento histórico",
          "Autoridade"
        ]
      },
      {
        "q": "Por que dados estatísticos são eficazes em argumentações?",
        "opts": [
          "Por serem subjetivos",
          "Por fornecerem evidências concretas e quantificáveis",
          "Por serem de fácil compreensão",
          "Por dispensarem fontes"
        ]
      },
      {
        "q": "Qual das alternativas representa uma falácia argumentativa?",
        "opts": [
          "Citar especialistas",
          "Atacar a pessoa em vez do argumento",
          "Usar exemplos reais",
          "Apresentar estatísticas"
        ]
      }
    ]
  },
  "contra": {
    "title": "Contra-argumento",
    "desc": "O contra-argumento é uma estratégia argumentativa que reconhece a posição oposta para depois refutá-la. Estrutura típica: \"Embora alguns afirmem que X, na realidade Y porque Z.\" Demonstra amadurecimento intelectual e fortalece a tese ao antecipar objeções.",
    "video": "Contra-argumento e Concessão — Redação",
    "playlistUrl": "https://www.youtube.com/watch?v=uUG4uU2n8XU&list=PLlb9l2qepYgJZhXnNAY85kt2tBDHOOoXF&index=3",
    "questions": [
      {
        "q": "O contra-argumento serve para:",
        "opts": [
          "Mudar a tese do texto",
          "Reconhecer e refutar a posição contrária",
          "Apresentar um novo tema",
          "Encerrar o texto"
        ]
      },
      {
        "q": "\"Embora a tecnologia facilite o acesso ao conhecimento, ela também gera dependência.\" Nessa frase, a concessão é:",
        "opts": [
          "A dependência gerada",
          "A facilidade de acesso ao conhecimento",
          "A tecnologia em si",
          "O conector \"embora\""
        ]
      },
      {
        "q": "Qual marcador textual introduz tipicamente uma concessão?",
        "opts": [
          "Portanto",
          "Assim sendo",
          "Ainda que",
          "Visto que"
        ]
      },
      {
        "q": "Um parágrafo com contra-argumento bem construído demonstra:",
        "opts": [
          "Incerteza sobre a tese",
          "Maturidade argumentativa e visão ampla",
          "Contradição no raciocínio",
          "Falta de posicionamento"
        ]
      }
    ]
  },
  "rep": {
    "title": "Repertório Sociocultural",
    "desc": "O repertório sociocultural é o conjunto de referências culturais, históricas, filosóficas, artísticas ou científicas usadas para embasar a argumentação. No ENEM, é avaliado na Competência 2. Deve ser pertinente à tese e corretamente contextualizado.",
    "video": "Repertório Sociocultural — ENEM Competência 2",
    "playlistUrl": "https://www.youtube.com/watch?v=29l3rTMunHQ&list=PLlb9l2qepYgJZhXnNAY85kt2tBDHOOoXF&index=4",
    "questions": [
      {
        "q": "O repertório sociocultural em uma redação serve para:",
        "opts": [
          "Mostrar erudição sem relação com o tema",
          "Embasar os argumentos com referências culturais pertinentes",
          "Substituir os argumentos",
          "Decorar o texto"
        ]
      },
      {
        "q": "Qual das opções é um repertório sociocultural adequado para um texto sobre desigualdade social?",
        "opts": [
          "Uma citação aleatória de Einstein sobre física",
          "Dados do IBGE sobre concentração de renda",
          "Uma descrição do Big Bang",
          "Uma receita de bolo"
        ]
      },
      {
        "q": "Referenciar uma obra literária sem contextualizar sua relação com o tema é:",
        "opts": [
          "Uso adequado do repertório",
          "Repertório sem produtividade argumentativa",
          "Competência 5",
          "Coesão textual"
        ]
      },
      {
        "q": "Citar um filósofo para embasar um argumento é um exemplo de:",
        "opts": [
          "Contra-argumento",
          "Argumento de autoridade via repertório",
          "Proposta de intervenção",
          "Elemento narrativo"
        ]
      },
      {
        "q": "Qual competência do ENEM avalia o uso do repertório sociocultural?",
        "opts": [
          "Competência 1",
          "Competência 2",
          "Competência 3",
          "Competência 5"
        ]
      },
      {
        "q": "Um repertório \"produtivo\" é aquele que:",
        "opts": [
          "É muito extenso",
          "Está diretamente articulado ao argumento e à tese",
          "Usa termos difíceis",
          "Cita muitas fontes diferentes"
        ]
      }
    ]
  },
  "diss": {
    "title": "Dissertação Argumentativa",
    "desc": "A dissertação argumentativa é o gênero central do ENEM. Estrutura: Introdução (apresentação do tema e tese), Desenvolvimento (2 parágrafos argumentativos com repertório e dados) e Conclusão (retomada da tese e proposta de intervenção). Linguagem formal, norma culta.",
    "video": "Dissertação Argumentativa — Estrutura Completa ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=nEImAvz96EI&list=PLlb9l2qepYgIE5qkgXoyUuHWQVBA9boyk",
    "questions": [
      {
        "q": "Quantos parágrafos deve ter, idealmente, uma dissertação argumentativa do ENEM?",
        "opts": [
          "2",
          "3",
          "4",
          "5"
        ]
      },
      {
        "q": "A introdução de uma dissertação deve conter:",
        "opts": [
          "Proposta de intervenção",
          "Apresentação do tema e da tese",
          "Apenas dados estatísticos",
          "A resolução do problema"
        ]
      },
      {
        "q": "O parágrafo de desenvolvimento precisa ter:",
        "opts": [
          "Apenas a tese repetida",
          "Argumento + embasamento (dados, exemplos, citações)",
          "Somente a proposta de intervenção",
          "Resumo do tema"
        ]
      },
      {
        "q": "A conclusão de uma dissertação deve:",
        "opts": [
          "Apresentar novos argumentos",
          "Retomar a tese e apresentar proposta de intervenção",
          "Contradizer a introdução",
          "Ser igual ao desenvolvimento"
        ]
      },
      {
        "q": "Qual é um erro comum em dissertações do ENEM?",
        "opts": [
          "Usar dados estatísticos",
          "Apresentar tese clara na introdução",
          "Fugir do tema",
          "Propor intervenção na conclusão"
        ]
      },
      {
        "q": "A linguagem adequada para a dissertação argumentativa do ENEM é:",
        "opts": [
          "Coloquial e informal",
          "Formal e dentro da norma culta",
          "Literária e poética",
          "Técnica e científica"
        ]
      },
      {
        "q": "O que faz um parágrafo dissertativo ser considerado \"pobre\"?",
        "opts": [
          "Ter argumento e exemplo",
          "Ter apenas afirmações sem embasamento",
          "Ter citação de especialistas",
          "Estar bem articulado à tese"
        ]
      },
      {
        "q": "Qual das estratégias de introdução é mais eficaz no ENEM?",
        "opts": [
          "Começar com \"Desde os primórdios da humanidade\"",
          "Contextualizar o tema com repertório pertinente e apresentar a tese",
          "Fazer uma pergunta retórica sem respondê-la",
          "Copiar a frase da proposta"
        ]
      }
    ]
  },
  "comp": {
    "title": "5 Competências ENEM",
    "desc": "O ENEM avalia a redação em 5 competências: C1 (domínio da norma culta), C2 (compreensão do tema e uso de repertório), C3 (organização e argumentação), C4 (mecanismos linguísticos de coesão), C5 (proposta de intervenção respeitando direitos humanos). Cada uma vale 200 pontos (total 1000).",
    "video": "5 Competências ENEM — Guia Completo",
    "playlistUrl": "https://www.youtube.com/watch?v=AMbFB_cFYek&list=PLlb9l2qepYgIE5qkgXoyUuHWQVBA9boyk&index=2",
    "questions": [
      {
        "q": "Quantas competências são avaliadas na redação do ENEM?",
        "opts": [
          "3",
          "4",
          "5",
          "6"
        ]
      },
      {
        "q": "A Competência 1 avalia:",
        "opts": [
          "A proposta de intervenção",
          "O domínio da norma culta da língua portuguesa",
          "A coesão textual",
          "O uso de repertório"
        ]
      },
      {
        "q": "Fugir completamente do tema implica nota:",
        "opts": [
          "200",
          "100",
          "0 em todas as competências",
          "Perda de 100 pontos"
        ]
      },
      {
        "q": "A Competência 5 exige que a proposta de intervenção seja:",
        "opts": [
          "Qualquer sugestão do autor",
          "Detalhada (com agente, ação, meio, efeito e finalidade) e que respeite os direitos humanos",
          "Apenas uma frase final",
          "Uma citação de lei"
        ]
      },
      {
        "q": "A Competência 4 avalia:",
        "opts": [
          "A argumentação",
          "O repertório sociocultural",
          "O uso de mecanismos de coesão textual",
          "A norma culta"
        ]
      },
      {
        "q": "Uma proposta de intervenção que viola direitos humanos pode resultar em:",
        "opts": [
          "Nota máxima em C5",
          "Nota 0 em C5 e possível anulação",
          "Redução de apenas 40 pontos",
          "Sem penalidade"
        ]
      },
      {
        "q": "O que é avaliado na Competência 3?",
        "opts": [
          "A gramática",
          "A organização das ideias e o projeto argumentativo",
          "O repertório",
          "A proposta de intervenção"
        ]
      },
      {
        "q": "Qual competência é diretamente afetada pelo uso inadequado de conectivos?",
        "opts": [
          "C1",
          "C2",
          "C3",
          "C4"
        ]
      },
      {
        "q": "Um texto que ignora totalmente o tema proposto recebe qual nota?",
        "opts": [
          "200 em gramática",
          "Nota zerada em todas as competências",
          "Apenas perde pontos em C3",
          "500 pontos"
        ]
      },
      {
        "q": "Qual é a pontuação máxima da redação do ENEM?",
        "opts": [
          "500",
          "800",
          "900",
          "1000"
        ]
      }
    ]
  },
  "interv": {
    "title": "Proposta de Intervenção",
    "desc": "A proposta de intervenção é exigida na conclusão da redação do ENEM (Competência 5). Deve conter 5 elementos: Agente (quem vai agir), Ação (o que será feito), Meio/Modo (como será feito), Efeito (qual o impacto esperado) e Finalidade (por que, qual o objetivo). Deve ser viável e respeitar os direitos humanos.",
    "video": "Proposta de Intervenção — Competência 5 ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=AMbFB_cFYek&list=PLlb9l2qepYgIE5qkgXoyUuHWQVBA9boyk&index=2",
    "questions": [
      {
        "q": "Quantos elementos deve ter uma proposta de intervenção completa no ENEM?",
        "opts": [
          "3",
          "4",
          "5",
          "6"
        ]
      },
      {
        "q": "Em \"O governo deve criar leis mais rígidas para...\", o \"governo\" representa:",
        "opts": [
          "A ação",
          "O meio",
          "O agente",
          "A finalidade"
        ]
      },
      {
        "q": "Por que a proposta deve respeitar os direitos humanos?",
        "opts": [
          "É apenas uma sugestão do ENEM",
          "Porque propostas que os violam zeram a C5 e podem anular a redação",
          "Para ganhar pontos na C1",
          "Não há essa exigência"
        ]
      },
      {
        "q": "\"...por meio de campanhas educativas nas escolas...\" indica qual elemento da proposta?",
        "opts": [
          "Agente",
          "Efeito",
          "Meio/Modo",
          "Finalidade"
        ]
      },
      {
        "q": "Uma proposta vaga como \"o problema deve ser resolvido\" perde pontos em qual competência?",
        "opts": [
          "C1",
          "C3",
          "C5",
          "C2"
        ]
      },
      {
        "q": "\"...a fim de promover a conscientização da população\" indica:",
        "opts": [
          "Agente",
          "Ação",
          "Meio",
          "Finalidade"
        ]
      }
    ]
  },
  "nota1000": {
    "title": "Redação Nota 1000",
    "desc": "Uma redação nota 1000 no ENEM exige: domínio pleno da norma culta (C1), repertório sociocultural pertinente e produtivo (C2), argumentação sólida e organizada (C3), coesão exemplar com conectivos variados (C4) e proposta de intervenção completa, detalhada e viável (C5). A análise de redações nota mil é fundamental para compreender os critérios.",
    "video": "Redação Nota 1000 — Análise e Estratégias ENEM",
    "playlistUrl": "https://www.youtube.com/watch?v=NYwITitdk0A&list=PLlb9l2qepYgIE5qkgXoyUuHWQVBA9boyk&index=8",
    "questions": [
      {
        "q": "O que diferencia uma redação nota 1000 das demais?",
        "opts": [
          "Apenas a ausência de erros gramaticais",
          "Domínio pleno de todas as 5 competências de forma integrada",
          "Uma proposta de intervenção longa",
          "O uso de palavras difíceis"
        ]
      },
      {
        "q": "Um repertório \"produtivo\" em uma redação nota 1000 é aquele que:",
        "opts": [
          "Cita muitos autores",
          "Está diretamente articulado ao argumento e à tese",
          "É longo e detalhado",
          "Usa termos filosóficos"
        ]
      },
      {
        "q": "Redações nota 1000 geralmente apresentam introduções que:",
        "opts": [
          "Começam com \"Desde os primórdios da humanidade\"",
          "Contextualizam o tema com repertório e apresentam tese clara",
          "Repetem a frase da proposta",
          "Fazem perguntas sem resposta"
        ]
      },
      {
        "q": "A Competência 4 em nível 5 (máximo) exige:",
        "opts": [
          "Uso de apenas um tipo de conectivo",
          "Uso diversificado e correto de mecanismos coesivos",
          "Apenas pontuação correta",
          "Repetição proposital de palavras"
        ]
      },
      {
        "q": "Por que é importante analisar redações nota 1000 do ENEM?",
        "opts": [
          "Para copiá-las",
          "Para compreender na prática os critérios de excelência avaliados",
          "Porque são obrigatórias de estudar",
          "Para identificar erros gramaticais"
        ]
      }
    ]
  }
};
window.VOAAM_QUIZZES = quizzes;
