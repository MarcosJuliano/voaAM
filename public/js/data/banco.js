// Conteúdo público; gabaritos são exclusivos do Flask.
const bancoDB = [
  {
    "id": "enem15-001",
    "vest": "ENEM",
    "ano": 2015,
    "num": 1,
    "enunciado": "Uma empresa oferece dois planos de internet: Plano A cobra R$ 50,00 fixos mais R$ 0,10 por MB extra; Plano B cobra R$ 30,00 fixos mais R$ 0,20 por MB extra. A partir de quantos MB extras os planos têm o mesmo custo?",
    "opcoes": [
      "100 MB",
      "150 MB",
      "200 MB",
      "250 MB",
      "300 MB"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "enem15-002",
    "vest": "ENEM",
    "ano": 2015,
    "num": 2,
    "enunciado": "Uma pesquisa com 400 pessoas mostrou que 35% preferem transporte público. Quantas pessoas preferem outro meio de transporte?",
    "opcoes": [
      "120",
      "130",
      "140",
      "260",
      "280"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem15-003",
    "vest": "ENEM",
    "ano": 2015,
    "num": 3,
    "enunciado": "O gráfico de uma função quadrática f(x) = ax² + bx + c tem vértice em (2, –9) e passa pela origem. Qual é o valor de f(5)?",
    "opcoes": [
      "0",
      "6",
      "9",
      "12",
      "18"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "enem15-004",
    "vest": "ENEM",
    "ano": 2015,
    "num": 4,
    "enunciado": "Um piso retangular de 4 m × 6 m será revestido com ladrilhos quadrados de 20 cm de lado. Quantos ladrilhos serão necessários?",
    "opcoes": [
      "400",
      "500",
      "600",
      "700",
      "800"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria plana e medidas"
  },
  {
    "id": "enem15-005",
    "vest": "ENEM",
    "ano": 2015,
    "num": 5,
    "enunciado": "Em uma prova com 5 questões de múltipla escolha, cada uma com 4 alternativas, qual é a probabilidade de acertar todas marcando aleatoriamente?",
    "opcoes": [
      "1/1024",
      "1/512",
      "1/256",
      "1/128",
      "1/64"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem15-006",
    "vest": "ENEM",
    "ano": 2015,
    "num": 6,
    "enunciado": "Uma progressão aritmética tem primeiro termo 3 e razão 5. Qual é o 15º termo?",
    "opcoes": [
      "63",
      "68",
      "73",
      "78",
      "83"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "enem15-007",
    "vest": "ENEM",
    "ano": 2015,
    "num": 7,
    "enunciado": "Uma caixa d'água cilíndrica tem diâmetro de 1 m e altura de 1,4 m. Qual é a capacidade aproximada em litros? (Use π≈3,14; 1 m³=1000 L)",
    "opcoes": [
      "900 L",
      "1.000 L",
      "1.100 L",
      "1.200 L",
      "1.300 L"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Volume do cilindro"
  },
  {
    "id": "enem15-008",
    "vest": "ENEM",
    "ano": 2015,
    "num": 8,
    "enunciado": "A tabela a seguir mostra a distribuição de idades de 20 jovens: de 14 a 16 anos (8 jovens), de 17 a 19 anos (7 jovens) e de 20 a 22 anos (5 jovens). Qual é a média de idades usando o ponto médio de cada faixa?",
    "opcoes": [
      "16,5 anos",
      "17,0 anos",
      "17,2 anos",
      "17,5 anos",
      "18,0 anos"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "enem15-009",
    "vest": "ENEM",
    "ano": 2015,
    "num": 9,
    "enunciado": "Um terreno triangular tem lados de 30 m, 40 m e 50 m. Qual é a área do terreno?",
    "opcoes": [
      "400 m²",
      "500 m²",
      "600 m²",
      "700 m²",
      "800 m²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "enem15-010",
    "vest": "ENEM",
    "ano": 2015,
    "num": 10,
    "enunciado": "Uma loja aumentou seus preços em 20% e depois concedeu um desconto de 20%. O preço final em relação ao original é:",
    "opcoes": [
      "Igual",
      "4% maior",
      "4% menor",
      "5% maior",
      "5% menor"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem composta"
  },
  {
    "id": "enem15-011",
    "vest": "ENEM",
    "ano": 2015,
    "num": 11,
    "enunciado": "Qual é o valor de x na equação exponencial 2^(x+1) = 64?",
    "opcoes": [
      "x = 4",
      "x = 5",
      "x = 6",
      "x = 7",
      "x = 8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função exponencial"
  },
  {
    "id": "enem15-012",
    "vest": "ENEM",
    "ano": 2015,
    "num": 12,
    "enunciado": "Um avião voa a 900 km/h e precisa percorrer 3.150 km. Considerando 30 minutos de espera antes de decolar, qual é o tempo total da viagem?",
    "opcoes": [
      "3h30min",
      "4h",
      "4h30min",
      "5h",
      "5h30min"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Razão e proporção"
  },
  {
    "id": "enem15-013",
    "vest": "ENEM",
    "ano": 2015,
    "num": 13,
    "enunciado": "Um capital aplicado a juros compostos de 10% ao ano triplica em quantos anos? (Use log3/log1,1 ≈ 11,5)",
    "opcoes": [
      "10 anos",
      "11 anos",
      "11,5 anos",
      "12 anos",
      "13 anos"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função exponencial / juros compostos"
  },
  {
    "id": "enem15-014",
    "vest": "ENEM",
    "ano": 2015,
    "num": 14,
    "enunciado": "Numa eleição com 3 candidatos, a proporção de votos foi 5:3:2. Se o total de votos foi 12.000, quantos votos recebeu o mais votado?",
    "opcoes": [
      "4.800",
      "5.400",
      "6.000",
      "6.600",
      "7.200"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Proporção"
  },
  {
    "id": "enem15-015",
    "vest": "ENEM",
    "ano": 2015,
    "num": 15,
    "enunciado": "O valor de log₂(32) – log₂(4) é:",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "enem16-001",
    "vest": "ENEM",
    "ano": 2016,
    "num": 1,
    "enunciado": "Uma torneira enche um tanque de 900 litros em 3 horas. Outra torneira esvazia o mesmo tanque cheio em 5 horas. Se ambas ficarem abertas ao mesmo tempo com o tanque cheio, em quanto tempo ele será esvaziado?",
    "opcoes": [
      "5h30min",
      "6h",
      "6h15min",
      "7h",
      "7h30min"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Regra de três / trabalho conjunto"
  },
  {
    "id": "enem16-002",
    "vest": "ENEM",
    "ano": 2016,
    "num": 2,
    "enunciado": "Um produto com preço de R$ 480,00 pode ser parcelado em 6 vezes sem juros ou com desconto de 15% à vista. Qual é o valor do desconto à vista?",
    "opcoes": [
      "R$ 60,00",
      "R$ 66,00",
      "R$ 72,00",
      "R$ 78,00",
      "R$ 84,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem16-003",
    "vest": "ENEM",
    "ano": 2016,
    "num": 3,
    "enunciado": "A função f(x) = –x² + 4x + 5 atinge seu valor máximo em x igual a:",
    "opcoes": [
      "x = 1",
      "x = 2",
      "x = 3",
      "x = 4",
      "x = 5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "enem16-004",
    "vest": "ENEM",
    "ano": 2016,
    "num": 4,
    "enunciado": "Numa turma, as notas de 6 alunos foram: 4, 6, 7, 8, 9 e 10. Qual é a mediana?",
    "opcoes": [
      "6,5",
      "7",
      "7,5",
      "8",
      "8,5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Mediana"
  },
  {
    "id": "enem16-005",
    "vest": "ENEM",
    "ano": 2016,
    "num": 5,
    "enunciado": "Uma pirâmide tem base quadrada de lado 6 cm e altura 8 cm. Qual é o volume?",
    "opcoes": [
      "72 cm³",
      "84 cm³",
      "96 cm³",
      "108 cm³",
      "120 cm³"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Volume de pirâmide"
  },
  {
    "id": "enem16-006",
    "vest": "ENEM",
    "ano": 2016,
    "num": 6,
    "enunciado": "Dois dados são lançados simultaneamente. Qual é a probabilidade de a soma dos resultados ser igual a 7?",
    "opcoes": [
      "1/12",
      "1/9",
      "1/7",
      "1/6",
      "1/5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem16-007",
    "vest": "ENEM",
    "ano": 2016,
    "num": 7,
    "enunciado": "Uma escada de 5 m está apoiada numa parede vertical. A base da escada está a 3 m da parede. A que altura da parede a escada toca?",
    "opcoes": [
      "3 m",
      "3,5 m",
      "4 m",
      "4,5 m",
      "5 m"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Teorema de Pitágoras"
  },
  {
    "id": "enem16-008",
    "vest": "ENEM",
    "ano": 2016,
    "num": 8,
    "enunciado": "Uma PG tem primeiro termo 2 e razão 3. Qual é o 6º termo?",
    "opcoes": [
      "162",
      "243",
      "324",
      "486",
      "729"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "enem16-009",
    "vest": "ENEM",
    "ano": 2016,
    "num": 9,
    "enunciado": "O gráfico de uma função exponencial f(x) = 3^x passa pelo ponto (x, 81). Qual é o valor de x?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função exponencial"
  },
  {
    "id": "enem16-010",
    "vest": "ENEM",
    "ano": 2016,
    "num": 10,
    "enunciado": "Um mapa usa a escala 1:250.000. Duas cidades que distam 8 cm no mapa estão separadas na realidade por:",
    "opcoes": [
      "10 km",
      "15 km",
      "20 km",
      "25 km",
      "30 km"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Escala"
  },
  {
    "id": "enem16-011",
    "vest": "ENEM",
    "ano": 2016,
    "num": 11,
    "enunciado": "Qual é o valor de x em: log₃(x) + log₃(x–2) = log₃(8)?",
    "opcoes": [
      "x = 2",
      "x = 3",
      "x = 4",
      "x = 5",
      "x = 6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "enem16-012",
    "vest": "ENEM",
    "ano": 2016,
    "num": 12,
    "enunciado": "Uma pesquisa mostrou que 40% dos entrevistados preferem produto A, 35% preferem produto B e o restante prefere produto C. De 500 entrevistados, quantos preferem o produto C?",
    "opcoes": [
      "100",
      "115",
      "120",
      "125",
      "130"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem16-013",
    "vest": "ENEM",
    "ano": 2016,
    "num": 13,
    "enunciado": "Quantos anagramas podem ser formados com as letras da palavra AMOR?",
    "opcoes": [
      "12",
      "16",
      "20",
      "24",
      "30"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Permutação"
  },
  {
    "id": "enem16-014",
    "vest": "ENEM",
    "ano": 2016,
    "num": 14,
    "enunciado": "Num triângulo retângulo, um ângulo agudo mede 30°. Se o cateto oposto a esse ângulo mede 5 cm, qual é a hipotenusa? (sen30°=0,5)",
    "opcoes": [
      "8 cm",
      "9 cm",
      "10 cm",
      "11 cm",
      "12 cm"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "enem16-015",
    "vest": "ENEM",
    "ano": 2016,
    "num": 15,
    "enunciado": "Um capital de R$ 2.000,00 é aplicado a juros compostos de 5% ao ano. Qual é o montante após 2 anos?",
    "opcoes": [
      "R$ 2.100,00",
      "R$ 2.150,00",
      "R$ 2.200,00",
      "R$ 2.205,00",
      "R$ 2.250,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Juros compostos"
  },
  {
    "id": "enem17-001",
    "vest": "ENEM",
    "ano": 2017,
    "num": 1,
    "enunciado": "Uma academia cobra R$ 80,00 de mensalidade fixa mais R$ 5,00 por aula avulsa. Um aluno pagou R$ 130,00 no mês. Quantas aulas avulsas ele fez?",
    "opcoes": [
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "enem17-002",
    "vest": "ENEM",
    "ano": 2017,
    "num": 2,
    "enunciado": "Qual é o conjunto solução da inequação x² – 5x + 6 < 0?",
    "opcoes": [
      "x<2 ou x>3",
      "2<x<3",
      "x≤2 ou x≥3",
      "x<0",
      "x>3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Inequação quadrática"
  },
  {
    "id": "enem17-003",
    "vest": "ENEM",
    "ano": 2017,
    "num": 3,
    "enunciado": "Uma caixa contém 5 bolas vermelhas, 3 azuis e 2 brancas. Retirando 2 bolas em sequência sem reposição, qual é a probabilidade de ambas serem vermelhas?",
    "opcoes": [
      "1/5",
      "2/9",
      "2/5",
      "1/4",
      "3/10"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem17-004",
    "vest": "ENEM",
    "ano": 2017,
    "num": 4,
    "enunciado": "Um cone tem raio da base 6 cm e geratriz 10 cm. Qual é a área total do cone? (Use π≈3,14)",
    "opcoes": [
      "283,3 cm²",
      "290,5 cm²",
      "301,4 cm²",
      "310,8 cm²",
      "320,1 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem17-005",
    "vest": "ENEM",
    "ano": 2017,
    "num": 5,
    "enunciado": "Numa turma de 30 alunos, a média de notas foi 7,2. Após a inclusão de um novo aluno, a média passou a 7,1. Qual foi a nota do novo aluno?",
    "opcoes": [
      "3,9",
      "4,0",
      "4,1",
      "4,2",
      "4,3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Média aritmética"
  },
  {
    "id": "enem17-006",
    "vest": "ENEM",
    "ano": 2017,
    "num": 6,
    "enunciado": "Qual é o número de diagonais de um decágono (10 lados)?",
    "opcoes": [
      "25",
      "30",
      "35",
      "40",
      "45"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Contagem"
  },
  {
    "id": "enem17-007",
    "vest": "ENEM",
    "ano": 2017,
    "num": 7,
    "enunciado": "A soma dos termos de uma PG infinita com a₁=12 e q=1/3 é:",
    "opcoes": [
      "15",
      "16",
      "17",
      "18",
      "19"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "enem17-008",
    "vest": "ENEM",
    "ano": 2017,
    "num": 8,
    "enunciado": "O ponto médio do segmento AB, com A=(–2, 4) e B=(6, –2), é:",
    "opcoes": [
      "(1, 2)",
      "(2, 1)",
      "(2, 2)",
      "(1, 1)",
      "(3, 1)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "enem17-009",
    "vest": "ENEM",
    "ano": 2017,
    "num": 9,
    "enunciado": "Uma empresa produziu 1.200 peças em janeiro. A produção cresce 10% ao mês. Qual será a produção em abril?",
    "opcoes": [
      "1.453",
      "1.537",
      "1.597",
      "1.648",
      "1.720"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: PG / juros compostos"
  },
  {
    "id": "enem17-010",
    "vest": "ENEM",
    "ano": 2017,
    "num": 10,
    "enunciado": "Uma calçada retangular com 12 m de comprimento e 3 m de largura será pavimentada com blocos de 0,3 m × 0,3 m. Quantos blocos são necessários?",
    "opcoes": [
      "360",
      "380",
      "400",
      "420",
      "440"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "enem17-011",
    "vest": "ENEM",
    "ano": 2017,
    "num": 11,
    "enunciado": "A distância entre os pontos P(1, 3) e Q(4, 7) no plano cartesiano é:",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "enem17-012",
    "vest": "ENEM",
    "ano": 2017,
    "num": 12,
    "enunciado": "Qual é o valor de x em: 3×4^x = 192?",
    "opcoes": [
      "x = 2",
      "x = 3",
      "x = 4",
      "x = 5",
      "x = 6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "enem17-013",
    "vest": "ENEM",
    "ano": 2017,
    "num": 13,
    "enunciado": "Um tanque esférico tem raio de 3 m. Qual é o volume de água que ele pode armazenar? (Use π≈3,14)",
    "opcoes": [
      "100,48 m³",
      "108,32 m³",
      "113,04 m³",
      "125,60 m³",
      "130,20 m³"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem17-014",
    "vest": "ENEM",
    "ano": 2017,
    "num": 14,
    "enunciado": "Em um campeonato, cada time joga contra todos os outros duas vezes (ida e volta). Com 5 times, quantas partidas serão realizadas no total?",
    "opcoes": [
      "10",
      "15",
      "20",
      "25",
      "30"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "enem17-015",
    "vest": "ENEM",
    "ano": 2017,
    "num": 15,
    "enunciado": "A função f(x) = 2^x e a função g(x) = log₂(x) são inversas. Se f(3) = 8, qual é o valor de g(8)?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Funções inversas"
  },
  {
    "id": "enem18-001",
    "vest": "ENEM",
    "ano": 2018,
    "num": 1,
    "enunciado": "Um vendedor recebe R$ 1.500,00 de salário fixo mais 4% de comissão sobre as vendas. Em um mês com R$ 20.000,00 em vendas, qual é o salário total?",
    "opcoes": [
      "R$ 2.000,00",
      "R$ 2.100,00",
      "R$ 2.200,00",
      "R$ 2.300,00",
      "R$ 2.400,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "enem18-002",
    "vest": "ENEM",
    "ano": 2018,
    "num": 2,
    "enunciado": "Qual é a soma dos 20 primeiros termos da PA: 2, 5, 8, 11, ...?",
    "opcoes": [
      "590",
      "600",
      "610",
      "620",
      "630"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "enem18-003",
    "vest": "ENEM",
    "ano": 2018,
    "num": 3,
    "enunciado": "Um bairro tem 2.400 moradores. Uma pesquisa amostral com 120 moradores mostrou que 45 usam bicicleta. Estimando proporcionalmente, quantos moradores do bairro usam bicicleta?",
    "opcoes": [
      "800",
      "850",
      "900",
      "950",
      "1.000"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Proporção"
  },
  {
    "id": "enem18-004",
    "vest": "ENEM",
    "ano": 2018,
    "num": 4,
    "enunciado": "Numa classe, as notas de 5 alunos foram: 6, 7, 8, 9 e 10. Qual é o desvio padrão dessas notas? (Média=8)",
    "opcoes": [
      "√2",
      "√3",
      "√4",
      "√5",
      "√6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "enem18-005",
    "vest": "ENEM",
    "ano": 2018,
    "num": 5,
    "enunciado": "Qual é a equação da reta que passa pelos pontos (0, 3) e (2, 7)?",
    "opcoes": [
      "y=x+3",
      "y=2x+3",
      "y=3x+2",
      "y=2x–3",
      "y=x+7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica / função afim"
  },
  {
    "id": "enem18-006",
    "vest": "ENEM",
    "ano": 2018,
    "num": 6,
    "enunciado": "Num sorteio, uma carta é retirada aleatoriamente de um baralho de 52 cartas. Qual é a probabilidade de ser uma figura (valete, dama ou rei)?",
    "opcoes": [
      "1/13",
      "3/13",
      "4/13",
      "5/13",
      "6/13"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem18-007",
    "vest": "ENEM",
    "ano": 2018,
    "num": 7,
    "enunciado": "Uma piscina olímpica tem 50 m de comprimento, 25 m de largura e 2 m de profundidade. Qual é o volume em m³?",
    "opcoes": [
      "1.500 m³",
      "2.000 m³",
      "2.500 m³",
      "3.000 m³",
      "3.500 m³"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Volume de prisma"
  },
  {
    "id": "enem18-008",
    "vest": "ENEM",
    "ano": 2018,
    "num": 8,
    "enunciado": "Se f(x) = x² – 3x + 2, quais são os zeros da função?",
    "opcoes": [
      "x=–1 e x=–2",
      "x=1 e x=2",
      "x=–1 e x=2",
      "x=1 e x=–2",
      "x=0 e x=3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "enem18-009",
    "vest": "ENEM",
    "ano": 2018,
    "num": 9,
    "enunciado": "Um triângulo tem ângulos nas razões 1:2:3. Qual é o valor do maior ângulo?",
    "opcoes": [
      "60°",
      "70°",
      "80°",
      "90°",
      "100°"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Ângulos"
  },
  {
    "id": "enem18-010",
    "vest": "ENEM",
    "ano": 2018,
    "num": 10,
    "enunciado": "Uma indústria usou 12.000 kWh de energia em um mês, representando um aumento de 20% em relação ao mês anterior. Qual foi o consumo no mês anterior?",
    "opcoes": [
      "8.000 kWh",
      "9.000 kWh",
      "9.600 kWh",
      "10.000 kWh",
      "10.500 kWh"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem18-011",
    "vest": "ENEM",
    "ano": 2018,
    "num": 11,
    "enunciado": "A área de um setor circular com raio 6 cm e ângulo central de 120° é: (Use π≈3,14)",
    "opcoes": [
      "34,54 cm²",
      "37,68 cm²",
      "40,82 cm²",
      "43,96 cm²",
      "47,10 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Setor circular"
  },
  {
    "id": "enem18-012",
    "vest": "ENEM",
    "ano": 2018,
    "num": 12,
    "enunciado": "Qual é o valor de x em: 5^(2x–1) = 125?",
    "opcoes": [
      "x = 1",
      "x = 2",
      "x = 3",
      "x = 4",
      "x = 5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "enem18-013",
    "vest": "ENEM",
    "ano": 2018,
    "num": 13,
    "enunciado": "Numa cidade, 70% da população tem entre 20 e 60 anos. Se a cidade tem 150.000 habitantes, quantos têm menos de 20 ou mais de 60 anos?",
    "opcoes": [
      "40.000",
      "42.000",
      "44.000",
      "45.000",
      "50.000"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem18-014",
    "vest": "ENEM",
    "ano": 2018,
    "num": 14,
    "enunciado": "Um tanque cilíndrico tem raio 4 m e altura 5 m. Qual é a área total externa? (Use π≈3,14)",
    "opcoes": [
      "200,96 m²",
      "226,08 m²",
      "251,20 m²",
      "276,32 m²",
      "301,44 m²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem18-015",
    "vest": "ENEM",
    "ano": 2018,
    "num": 15,
    "enunciado": "Quantas comissões de 4 pessoas podem ser formadas a partir de um grupo de 9 pessoas?",
    "opcoes": [
      "84",
      "96",
      "112",
      "126",
      "144"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "enem19-001",
    "vest": "ENEM",
    "ano": 2019,
    "num": 1,
    "enunciado": "Um ciclista percorre 18 km em 45 minutos. Mantendo a mesma velocidade, em quanto tempo percorrerá 30 km?",
    "opcoes": [
      "1h",
      "1h10min",
      "1h15min",
      "1h20min",
      "1h30min"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Regra de três"
  },
  {
    "id": "enem19-002",
    "vest": "ENEM",
    "ano": 2019,
    "num": 2,
    "enunciado": "Uma função afim f(x) = ax + b tem f(0) = 5 e f(3) = –1. Qual é o valor de a + b?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "enem19-003",
    "vest": "ENEM",
    "ano": 2019,
    "num": 3,
    "enunciado": "Numa caixa há 8 parafusos, sendo 3 defeituosos. Retirando 2 ao acaso, qual é a probabilidade de ambos serem defeituosos?",
    "opcoes": [
      "3/28",
      "3/56",
      "3/14",
      "1/7",
      "5/28"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem19-004",
    "vest": "ENEM",
    "ano": 2019,
    "num": 4,
    "enunciado": "A altura de um prédio foi medida com teodolito. A 40 m do prédio, o ângulo de elevação do topo é 45°. Qual é a altura do prédio? (tg45°=1)",
    "opcoes": [
      "30 m",
      "35 m",
      "40 m",
      "45 m",
      "50 m"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "enem19-005",
    "vest": "ENEM",
    "ano": 2019,
    "num": 5,
    "enunciado": "Uma empresa produziu 800 peças no 1º mês. A produção cai 25% ao mês. Qual será a produção no 3º mês?",
    "opcoes": [
      "350",
      "400",
      "450",
      "500",
      "550"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "enem19-006",
    "vest": "ENEM",
    "ano": 2019,
    "num": 6,
    "enunciado": "A equação da circunferência com centro (2, –3) e raio 5 é:",
    "opcoes": [
      "(x–2)²+(y+3)²=5",
      "(x+2)²+(y–3)²=25",
      "(x–2)²+(y+3)²=25",
      "(x+2)²+(y+3)²=25",
      "(x–2)²+(y–3)²=25"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "enem19-007",
    "vest": "ENEM",
    "ano": 2019,
    "num": 7,
    "enunciado": "Numa turma de 40 alunos, 25 estudam inglês, 18 estudam espanhol e 8 estudam os dois idiomas. Quantos alunos não estudam nenhum idioma?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Conjuntos"
  },
  {
    "id": "enem19-008",
    "vest": "ENEM",
    "ano": 2019,
    "num": 8,
    "enunciado": "Qual é o coeficiente angular da reta que passa pelos pontos A(1,2) e B(4,8)?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "enem19-009",
    "vest": "ENEM",
    "ano": 2019,
    "num": 9,
    "enunciado": "Um cilindro e um cone têm mesma base (raio 3 cm) e mesma altura (8 cm). A razão entre o volume do cilindro e o do cone é:",
    "opcoes": [
      "1:3",
      "2:1",
      "3:1",
      "4:1",
      "1:2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem19-010",
    "vest": "ENEM",
    "ano": 2019,
    "num": 10,
    "enunciado": "Qual é o valor de log₅(625) + log₅(1/5)?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "enem19-011",
    "vest": "ENEM",
    "ano": 2019,
    "num": 11,
    "enunciado": "Um retângulo tem área de 120 cm² e um lado mede 8 cm. Qual é o perímetro?",
    "opcoes": [
      "38 cm",
      "40 cm",
      "42 cm",
      "44 cm",
      "46 cm"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "enem19-012",
    "vest": "ENEM",
    "ano": 2019,
    "num": 12,
    "enunciado": "Num sorteio, as probabilidades de ganhar os prêmios de 1º, 2º e 3º lugar são, respectivamente, 1/100, 1/50 e 1/25. Qual é a probabilidade de ganhar algum prêmio?",
    "opcoes": [
      "7/100",
      "8/100",
      "9/100",
      "10/100",
      "11/100"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem19-013",
    "vest": "ENEM",
    "ano": 2019,
    "num": 13,
    "enunciado": "Uma moeda e um dado são lançados simultaneamente. Qual é a probabilidade de sair cara e número par?",
    "opcoes": [
      "1/6",
      "1/4",
      "1/3",
      "1/2",
      "2/3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem19-014",
    "vest": "ENEM",
    "ano": 2019,
    "num": 14,
    "enunciado": "A soma dos ângulos externos de qualquer polígono convexo é sempre:",
    "opcoes": [
      "180°",
      "270°",
      "360°",
      "450°",
      "540°"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "enem19-015",
    "vest": "ENEM",
    "ano": 2019,
    "num": 15,
    "enunciado": "Um capital dobra em 10 anos a juros compostos. Qual é a taxa anual aproximada? (Use 2^(1/10)≈1,072)",
    "opcoes": [
      "6,2%",
      "6,8%",
      "7,0%",
      "7,2%",
      "7,8%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Juros compostos"
  },
  {
    "id": "enem20-001",
    "vest": "ENEM",
    "ano": 2020,
    "num": 1,
    "enunciado": "Uma loja oferece dois descontos sobre um produto de R$ 500,00: 10% seguido de 5%, ou 15% de uma vez. Qual opção é mais vantajosa e por quanto?",
    "opcoes": [
      "Ambas iguais",
      "1ª opção, R$ 0,50 a menos",
      "2ª opção, R$ 0,50 a menos",
      "1ª opção, R$ 2,50 a menos",
      "2ª opção, R$ 2,50 a menos"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem composta"
  },
  {
    "id": "enem20-002",
    "vest": "ENEM",
    "ano": 2020,
    "num": 2,
    "enunciado": "A função f(x) = x² – 2x – 3 tem vértice em:",
    "opcoes": [
      "(–1, –4)",
      "(0, –3)",
      "(1, –4)",
      "(2, –3)",
      "(3, 0)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "enem20-003",
    "vest": "ENEM",
    "ano": 2020,
    "num": 3,
    "enunciado": "Em uma urna há 6 bolas numeradas de 1 a 6. Sorteiam-se 2 bolas sem reposição. Qual é a probabilidade de a soma ser maior que 9?",
    "opcoes": [
      "1/5",
      "1/6",
      "1/10",
      "2/15",
      "1/3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem20-004",
    "vest": "ENEM",
    "ano": 2020,
    "num": 4,
    "enunciado": "Qual é a distância do ponto P(3, 4) à reta 4x – 3y + 5 = 0?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "enem20-005",
    "vest": "ENEM",
    "ano": 2020,
    "num": 5,
    "enunciado": "Um gráfico de barras mostra a venda mensal de uma loja. Os valores foram: jan=40, fev=55, mar=50, abr=35, mai=60. Qual foi a média mensal?",
    "opcoes": [
      "44",
      "46",
      "48",
      "50",
      "52"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "enem20-006",
    "vest": "ENEM",
    "ano": 2020,
    "num": 6,
    "enunciado": "Qual é o valor da expressão 3^(log₃7)?",
    "opcoes": [
      "3",
      "7",
      "9",
      "21",
      "27"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "enem20-007",
    "vest": "ENEM",
    "ano": 2020,
    "num": 7,
    "enunciado": "Num triângulo retângulo, o cateto adjacente mede 8 cm e a hipotenusa mede 17 cm. Qual é o cateto oposto?",
    "opcoes": [
      "13 cm",
      "14 cm",
      "15 cm",
      "16 cm",
      "17 cm"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Pitágoras"
  },
  {
    "id": "enem20-008",
    "vest": "ENEM",
    "ano": 2020,
    "num": 8,
    "enunciado": "Uma progressão geométrica tem a₁=5 e a₄=40. Qual é a razão q?",
    "opcoes": [
      "q=2",
      "q=3",
      "q=4",
      "q=5",
      "q=8"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "enem20-009",
    "vest": "ENEM",
    "ano": 2020,
    "num": 9,
    "enunciado": "Qual é a área total de um cubo com aresta de 4 cm?",
    "opcoes": [
      "64 cm²",
      "80 cm²",
      "96 cm²",
      "112 cm²",
      "128 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem20-010",
    "vest": "ENEM",
    "ano": 2020,
    "num": 10,
    "enunciado": "Num colégio, 55% dos alunos são do turno manhã e 45% do turno tarde. Se há 660 alunos no turno manhã, qual é o total de alunos?",
    "opcoes": [
      "1.100",
      "1.150",
      "1.200",
      "1.250",
      "1.300"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem20-011",
    "vest": "ENEM",
    "ano": 2020,
    "num": 11,
    "enunciado": "Quais são os valores de x que satisfazem |2x – 4| ≤ 6?",
    "opcoes": [
      "–1 ≤ x ≤ 5",
      "–2 ≤ x ≤ 5",
      "–1 ≤ x ≤ 6",
      "0 ≤ x ≤ 5",
      "x ≤ –1 ou x ≥ 5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Inequação modular"
  },
  {
    "id": "enem20-012",
    "vest": "ENEM",
    "ano": 2020,
    "num": 12,
    "enunciado": "A reta r tem equação y = 3x – 2. Qual é a equação da reta s, paralela a r, que passa pelo ponto (0, 5)?",
    "opcoes": [
      "y=3x+5",
      "y=–3x+5",
      "y=3x–5",
      "y=x+5",
      "y=5x+3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "enem20-013",
    "vest": "ENEM",
    "ano": 2020,
    "num": 13,
    "enunciado": "Um recipiente cônico tem raio 9 cm e altura 12 cm. Qual é o volume? (Use π≈3,14)",
    "opcoes": [
      "950,76 cm³",
      "1.017,36 cm³",
      "1.052,48 cm³",
      "1.130,40 cm³",
      "1.205,76 cm³"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem20-014",
    "vest": "ENEM",
    "ano": 2020,
    "num": 14,
    "enunciado": "Num sistema linear { 2x+3y=12 e x–y=1 }, qual é o valor de x+y?",
    "opcoes": [
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Sistemas lineares"
  },
  {
    "id": "enem20-015",
    "vest": "ENEM",
    "ano": 2020,
    "num": 15,
    "enunciado": "De quantas maneiras diferentes podem-se organizar 3 livros de Matemática e 2 de Português numa prateleira, mantendo os livros de mesma disciplina juntos?",
    "opcoes": [
      "12",
      "18",
      "24",
      "30",
      "36"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Contagem"
  },
  {
    "id": "enem21-001",
    "vest": "ENEM",
    "ano": 2021,
    "num": 1,
    "enunciado": "Um trabalhador recebe R$ 2.400,00 por mês. Após um reajuste de 8,5%, qual será o novo salário?",
    "opcoes": [
      "R$ 2.580,00",
      "R$ 2.600,00",
      "R$ 2.604,00",
      "R$ 2.620,00",
      "R$ 2.640,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem21-002",
    "vest": "ENEM",
    "ano": 2021,
    "num": 2,
    "enunciado": "Qual é o domínio da função f(x) = √(x – 3)?",
    "opcoes": [
      "x > 3",
      "x ≥ 0",
      "x ≥ 3",
      "x < 3",
      "x ≤ 3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Funções"
  },
  {
    "id": "enem21-003",
    "vest": "ENEM",
    "ano": 2021,
    "num": 3,
    "enunciado": "Uma cidade tem 120.000 habitantes. Um estudo indicou que 1 em cada 8 habitantes tem alguma doença crônica. Quantos habitantes têm doença crônica?",
    "opcoes": [
      "12.000",
      "14.000",
      "15.000",
      "16.000",
      "18.000"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Proporção"
  },
  {
    "id": "enem21-004",
    "vest": "ENEM",
    "ano": 2021,
    "num": 4,
    "enunciado": "Um cubo tem volume de 343 cm³. Qual é a área total das suas faces?",
    "opcoes": [
      "196 cm²",
      "216 cm²",
      "234 cm²",
      "252 cm²",
      "294 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem21-005",
    "vest": "ENEM",
    "ano": 2021,
    "num": 5,
    "enunciado": "Qual é o valor de x em: log₂(x+1) = 4?",
    "opcoes": [
      "x = 13",
      "x = 14",
      "x = 15",
      "x = 16",
      "x = 17"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "enem21-006",
    "vest": "ENEM",
    "ano": 2021,
    "num": 6,
    "enunciado": "A semelhança entre dois triângulos estabelece que lados homólogos são proporcionais. Se um triângulo tem lados 3, 4 e 5 e o maior lado do triângulo semelhante é 15, qual é o perímetro do segundo triângulo?",
    "opcoes": [
      "30",
      "36",
      "42",
      "48",
      "54"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Semelhança"
  },
  {
    "id": "enem21-007",
    "vest": "ENEM",
    "ano": 2021,
    "num": 7,
    "enunciado": "Uma pesquisa coletou as idades de 7 pessoas: 18, 22, 25, 22, 30, 22 e 35. Qual é a moda e a mediana?",
    "opcoes": [
      "Moda=22, Mediana=22",
      "Moda=22, Mediana=25",
      "Moda=25, Mediana=22",
      "Moda=22, Mediana=24",
      "Moda=30, Mediana=22"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "enem21-008",
    "vest": "ENEM",
    "ano": 2021,
    "num": 8,
    "enunciado": "Qual é o valor da soma 1/2 + 1/4 + 1/8 + 1/16 + ... (infinitos termos)?",
    "opcoes": [
      "0,5",
      "0,75",
      "1,0",
      "1,5",
      "2,0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "enem21-009",
    "vest": "ENEM",
    "ano": 2021,
    "num": 9,
    "enunciado": "Qual é a área de um trapézio com bases 10 m e 6 m e altura 5 m?",
    "opcoes": [
      "35 m²",
      "40 m²",
      "45 m²",
      "50 m²",
      "55 m²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "enem21-010",
    "vest": "ENEM",
    "ano": 2021,
    "num": 10,
    "enunciado": "Numa prova com 5 questões, cada questão vale 2 pontos. Para passar, o aluno precisa de pelo menos 6 pontos. Qual é o número mínimo de acertos?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Resolução de problemas"
  },
  {
    "id": "enem21-011",
    "vest": "ENEM",
    "ano": 2021,
    "num": 11,
    "enunciado": "Um polígono regular tem ângulo interno de 135°. Qual é o número de lados?",
    "opcoes": [
      "5",
      "6",
      "7",
      "8",
      "9"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Polígonos"
  },
  {
    "id": "enem21-012",
    "vest": "ENEM",
    "ano": 2021,
    "num": 12,
    "enunciado": "Qual é o valor de x em: 9^x = 27^(x–1)?",
    "opcoes": [
      "x = 1",
      "x = 2",
      "x = 3",
      "x = 4",
      "x = 5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "enem21-013",
    "vest": "ENEM",
    "ano": 2021,
    "num": 13,
    "enunciado": "O número de formas de escolher 2 livros de um conjunto de 7 é:",
    "opcoes": [
      "14",
      "21",
      "28",
      "35",
      "42"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "enem21-014",
    "vest": "ENEM",
    "ano": 2021,
    "num": 14,
    "enunciado": "Um terreno tem formato de paralelogramo com base 15 m e altura 8 m. Qual é a área?",
    "opcoes": [
      "100 m²",
      "110 m²",
      "120 m²",
      "130 m²",
      "140 m²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "enem21-015",
    "vest": "ENEM",
    "ano": 2021,
    "num": 15,
    "enunciado": "Num gráfico de setor, o percentual de cada categoria é: A=40%, B=30%, C=20% e D=10%. Se o total é 500 unidades, quantas pertencem à categoria B?",
    "opcoes": [
      "100",
      "120",
      "140",
      "150",
      "160"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística/leitura de gráficos"
  },
  {
    "id": "enem22-001",
    "vest": "ENEM",
    "ano": 2022,
    "num": 1,
    "enunciado": "Um restaurante vende marmitas por R$ 18,00 cada. Para atrair clientes, faz uma promoção: comprando 3, leva 4. Qual é o desconto percentual efetivo por marmita?",
    "opcoes": [
      "20%",
      "22%",
      "25%",
      "28%",
      "30%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem22-002",
    "vest": "ENEM",
    "ano": 2022,
    "num": 2,
    "enunciado": "A sequência 2, 6, 18, 54, ... é uma PG. Qual é o 7º termo?",
    "opcoes": [
      "1.256",
      "1.345",
      "1.458",
      "1.512",
      "1.458"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "enem22-003",
    "vest": "ENEM",
    "ano": 2022,
    "num": 3,
    "enunciado": "Um motorista percorre 2/3 de uma viagem no primeiro dia e 1/4 no segundo. Que fração ainda resta?",
    "opcoes": [
      "1/12",
      "3/12",
      "5/12",
      "7/12",
      "9/12"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Frações"
  },
  {
    "id": "enem22-004",
    "vest": "ENEM",
    "ano": 2022,
    "num": 4,
    "enunciado": "A reta que passa pelos pontos (–1, 3) e (2, 9) tem coeficiente angular:",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "enem22-005",
    "vest": "ENEM",
    "ano": 2022,
    "num": 5,
    "enunciado": "Uma turma fez uma prova e as notas foram: 5, 6, 6, 7, 7, 7, 8, 9, 9, 10. Qual é a mediana?",
    "opcoes": [
      "6,5",
      "7",
      "7,5",
      "8",
      "8,5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Mediana"
  },
  {
    "id": "enem22-006",
    "vest": "ENEM",
    "ano": 2022,
    "num": 6,
    "enunciado": "Um terreno tem formato de triângulo com base 24 m e altura 15 m. Qual é o custo de cercá-lo se cada metro de cerca custa R$ 35,00 e os lados medem 24 m, 17 m e 20 m?",
    "opcoes": [
      "R$ 1.960,00",
      "R$ 2.065,00",
      "R$ 2.135,00",
      "R$ 2.170,00",
      "R$ 2.240,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Perímetro"
  },
  {
    "id": "enem22-007",
    "vest": "ENEM",
    "ano": 2022,
    "num": 7,
    "enunciado": "Se f(x) = 3^x, qual é o valor de f(2) – f(–1)?",
    "opcoes": [
      "8",
      "8,5",
      "8,67",
      "9",
      "9,5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função exponencial"
  },
  {
    "id": "enem22-008",
    "vest": "ENEM",
    "ano": 2022,
    "num": 8,
    "enunciado": "Num concurso, 4 candidatos disputam 2 vagas em ordem de classificação. Quantas são as possibilidades de preenchimento das vagas?",
    "opcoes": [
      "6",
      "8",
      "10",
      "12",
      "14"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Arranjo"
  },
  {
    "id": "enem22-009",
    "vest": "ENEM",
    "ano": 2022,
    "num": 9,
    "enunciado": "Um tanque tem formato de prisma retangular com base 4 m × 3 m e profundidade 2 m. Está 75% cheio. Quantos litros de água há no tanque? (1 m³=1.000 L)",
    "opcoes": [
      "14.000 L",
      "15.000 L",
      "16.000 L",
      "17.000 L",
      "18.000 L"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Volume"
  },
  {
    "id": "enem22-010",
    "vest": "ENEM",
    "ano": 2022,
    "num": 10,
    "enunciado": "Qual é o valor de x em: (1/3)^x = 81?",
    "opcoes": [
      "x = –4",
      "x = –3",
      "x = 3",
      "x = 4",
      "x = –2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "enem22-011",
    "vest": "ENEM",
    "ano": 2022,
    "num": 11,
    "enunciado": "Uma escola tem 500 alunos. Um gráfico mostra que 32% praticam esporte, 28% estudam música e os demais não têm atividade extracurricular. Quantos alunos não têm atividade?",
    "opcoes": [
      "180",
      "190",
      "200",
      "210",
      "220"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem22-012",
    "vest": "ENEM",
    "ano": 2022,
    "num": 12,
    "enunciado": "A função f(x) = 2x + 5 e g(x) = x – 3. Qual é o valor de x onde f(x) = g(x) + 10?",
    "opcoes": [
      "x = –2",
      "x = –1",
      "x = 0",
      "x = 1",
      "x = 2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "enem22-013",
    "vest": "ENEM",
    "ano": 2022,
    "num": 13,
    "enunciado": "Um hexágono regular tem lado 4 cm. Qual é o perímetro e a soma dos ângulos internos?",
    "opcoes": [
      "P=24 cm; S=540°",
      "P=24 cm; S=720°",
      "P=28 cm; S=720°",
      "P=20 cm; S=540°",
      "P=24 cm; S=900°"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Polígonos"
  },
  {
    "id": "enem22-014",
    "vest": "ENEM",
    "ano": 2022,
    "num": 14,
    "enunciado": "Numa caixa com 4 bolas vermelhas e 6 azuis, sorteiam-se 2 bolas simultaneamente. Qual é a probabilidade de as duas serem de cores diferentes?",
    "opcoes": [
      "4/15",
      "7/15",
      "8/15",
      "2/5",
      "3/5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem22-015",
    "vest": "ENEM",
    "ano": 2022,
    "num": 15,
    "enunciado": "Qual é a área lateral de um cilindro com raio 5 cm e altura 12 cm? (Use π≈3,14)",
    "opcoes": [
      "314,0 cm²",
      "345,4 cm²",
      "376,8 cm²",
      "408,2 cm²",
      "439,6 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem23-001",
    "vest": "ENEM",
    "ano": 2023,
    "num": 1,
    "enunciado": "Um produto teve seu preço reduzido de R$ 240,00 para R$ 180,00. Qual foi o percentual de redução?",
    "opcoes": [
      "20%",
      "25%",
      "30%",
      "33%",
      "40%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem23-002",
    "vest": "ENEM",
    "ano": 2023,
    "num": 2,
    "enunciado": "A função f(x) = x² – 6x + 8 tem raízes em:",
    "opcoes": [
      "x=–2 e x=–4",
      "x=2 e x=4",
      "x=–2 e x=4",
      "x=2 e x=–4",
      "x=1 e x=8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "enem23-003",
    "vest": "ENEM",
    "ano": 2023,
    "num": 3,
    "enunciado": "Uma escada rolante percorre 40 degraus por minuto. Se uma pessoa sobe 24 degraus andando, enquanto a escada sobe os outros, em quanto tempo ela chega ao topo de uma escada com 60 degraus?",
    "opcoes": [
      "45 s",
      "54 s",
      "60 s",
      "72 s",
      "90 s"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Regra de três"
  },
  {
    "id": "enem23-004",
    "vest": "ENEM",
    "ano": 2023,
    "num": 4,
    "enunciado": "Qual é o valor de x em: log(x+1) – log(x–1) = log(3)?",
    "opcoes": [
      "x = 1",
      "x = 1,5",
      "x = 2",
      "x = 2,5",
      "x = 3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "enem23-005",
    "vest": "ENEM",
    "ano": 2023,
    "num": 5,
    "enunciado": "Numa pesquisa, 450 pessoas foram consultadas sobre preferência de lazer. O resultado foi: cinema 40%, praia 35% e parque 25%. Quantas pessoas preferem praia ou parque?",
    "opcoes": [
      "225",
      "240",
      "255",
      "270",
      "285"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem23-006",
    "vest": "ENEM",
    "ano": 2023,
    "num": 6,
    "enunciado": "Uma caixa cúbica tem volume de 512 cm³. Qual é a área total da superfície?",
    "opcoes": [
      "256 cm²",
      "288 cm²",
      "320 cm²",
      "352 cm²",
      "384 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem23-007",
    "vest": "ENEM",
    "ano": 2023,
    "num": 7,
    "enunciado": "Dois carros partem ao mesmo tempo em sentidos opostos. Um viaja a 80 km/h e o outro a 100 km/h. Após quanto tempo estarão a 360 km de distância?",
    "opcoes": [
      "1h30min",
      "1h45min",
      "2h",
      "2h15min",
      "2h30min"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Velocidade"
  },
  {
    "id": "enem23-008",
    "vest": "ENEM",
    "ano": 2023,
    "num": 8,
    "enunciado": "Qual é o número de permutações das letras da palavra BANANA?",
    "opcoes": [
      "60",
      "90",
      "120",
      "180",
      "360"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Permutação com repetição"
  },
  {
    "id": "enem23-009",
    "vest": "ENEM",
    "ano": 2023,
    "num": 9,
    "enunciado": "Num triângulo retângulo, o ângulo B mede 60° e a hipotenusa mede 10 cm. Qual é o cateto oposto a B? (sen60°=√3/2≈0,87)",
    "opcoes": [
      "5 cm",
      "6 cm",
      "7 cm",
      "8 cm",
      "8,7 cm"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "enem23-010",
    "vest": "ENEM",
    "ano": 2023,
    "num": 10,
    "enunciado": "Um cilindro tem raio 3 cm e volume 84,78 cm³. Qual é a altura? (Use π≈3,14)",
    "opcoes": [
      "2 cm",
      "3 cm",
      "4 cm",
      "5 cm",
      "6 cm"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem23-011",
    "vest": "ENEM",
    "ano": 2023,
    "num": 11,
    "enunciado": "Uma progressão aritmética tem a₁=–8 e a₁₀=10. Qual é a razão?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "enem23-012",
    "vest": "ENEM",
    "ano": 2023,
    "num": 12,
    "enunciado": "Se f(x) = 2x – 1 e g(f(x)) = x, qual é g(x)?",
    "opcoes": [
      "g(x)=(x+1)/2",
      "g(x)=(x–1)/2",
      "g(x)=2x+1",
      "g(x)=x+1",
      "g(x)=x/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função inversa"
  },
  {
    "id": "enem23-013",
    "vest": "ENEM",
    "ano": 2023,
    "num": 13,
    "enunciado": "Um gráfico mostra que o consumo de energia de uma cidade cresceu de 800 GWh para 1.040 GWh em 5 anos. Qual foi o crescimento percentual total?",
    "opcoes": [
      "20%",
      "25%",
      "28%",
      "30%",
      "35%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem23-014",
    "vest": "ENEM",
    "ano": 2023,
    "num": 14,
    "enunciado": "Qual é a distância entre as retas paralelas y = 2x + 3 e y = 2x – 7?",
    "opcoes": [
      "2√5",
      "√5",
      "10/√5",
      "2√5",
      "5√2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "enem23-015",
    "vest": "ENEM",
    "ano": 2023,
    "num": 15,
    "enunciado": "Numa caixa com 5 peças, sendo 2 defeituosas, retira-se 1 ao acaso. Qual é a probabilidade de ser perfeita?",
    "opcoes": [
      "1/5",
      "2/5",
      "3/5",
      "4/5",
      "1/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "enem24-001",
    "vest": "ENEM",
    "ano": 2024,
    "num": 1,
    "enunciado": "Um plano de saúde reajusta sua mensalidade anualmente com base no IPCA. Se a mensalidade era R$ 350,00 e o IPCA foi de 4,6%, qual é o novo valor?",
    "opcoes": [
      "R$ 364,10",
      "R$ 365,00",
      "R$ 366,10",
      "R$ 367,00",
      "R$ 368,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "enem24-002",
    "vest": "ENEM",
    "ano": 2024,
    "num": 2,
    "enunciado": "A função f(x) = –2x² + 8x – 3 tem valor máximo de:",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "enem24-003",
    "vest": "ENEM",
    "ano": 2024,
    "num": 3,
    "enunciado": "Um reservatório cilíndrico tem raio 5 m e altura 4 m. Está com 60% da capacidade. Quantos m³ de água contém? (Use π≈3,14)",
    "opcoes": [
      "178,5 m³",
      "188,4 m³",
      "196,3 m³",
      "200,0 m³",
      "210,5 m³"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Volume do cilindro"
  },
  {
    "id": "enem24-004",
    "vest": "ENEM",
    "ano": 2024,
    "num": 4,
    "enunciado": "Qual é o conjunto solução de x² – x – 12 ≤ 0?",
    "opcoes": [
      "–3 ≤ x ≤ 4",
      "–4 ≤ x ≤ 3",
      "x ≤ –3 ou x ≥ 4",
      "x ≤ –4 ou x ≥ 3",
      "–2 ≤ x ≤ 6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Inequação quadrática"
  },
  {
    "id": "enem24-005",
    "vest": "ENEM",
    "ano": 2024,
    "num": 5,
    "enunciado": "Numa PA com 10 termos, o primeiro é 4 e o último é 31. Qual é a soma de todos os termos?",
    "opcoes": [
      "155",
      "165",
      "170",
      "175",
      "180"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "enem24-006",
    "vest": "ENEM",
    "ano": 2024,
    "num": 6,
    "enunciado": "Um gráfico de barras mostra o consumo de água (m³) de uma família: jan=12, fev=10, mar=11, abr=9, mai=13, jun=11. Qual é a média mensal?",
    "opcoes": [
      "10,5",
      "11",
      "11,5",
      "12",
      "12,5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Média aritmética"
  },
  {
    "id": "enem24-007",
    "vest": "ENEM",
    "ano": 2024,
    "num": 7,
    "enunciado": "Qual é a equação da reta perpendicular a y = 2x + 1 que passa pelo ponto (4, 3)?",
    "opcoes": [
      "y=–x/2+5",
      "y=–x/2+3",
      "y=2x–5",
      "y=x/2+1",
      "y=–2x+5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "enem24-008",
    "vest": "ENEM",
    "ano": 2024,
    "num": 8,
    "enunciado": "Num grupo de 50 pessoas, 30 falam inglês, 25 falam espanhol e 10 falam os dois idiomas. Quantas não falam nenhum dos dois?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Conjuntos"
  },
  {
    "id": "enem24-009",
    "vest": "ENEM",
    "ano": 2024,
    "num": 9,
    "enunciado": "Uma empresa registrou lucros mensais (em mil R$): 20, 24, 28, 32, 36. Identificando que é uma PA, qual será o lucro no 8º mês?",
    "opcoes": [
      "48",
      "52",
      "56",
      "60",
      "64"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "enem24-010",
    "vest": "ENEM",
    "ano": 2024,
    "num": 10,
    "enunciado": "Qual é o valor de x em: 4^(x+1) = 8^x?",
    "opcoes": [
      "x = 1",
      "x = 2",
      "x = 3",
      "x = 4",
      "x = 5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "enem24-011",
    "vest": "ENEM",
    "ano": 2024,
    "num": 11,
    "enunciado": "Uma pesquisa coletou as alturas (cm) de 5 estudantes: 160, 165, 170, 175, 180. Qual é a variância?",
    "opcoes": [
      "25",
      "50",
      "75",
      "100",
      "125"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "enem24-012",
    "vest": "ENEM",
    "ano": 2024,
    "num": 12,
    "enunciado": "Quantos números de 3 algarismos distintos podem ser formados com os dígitos {1, 2, 3, 4, 5}?",
    "opcoes": [
      "30",
      "40",
      "50",
      "60",
      "70"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Arranjo"
  },
  {
    "id": "enem24-013",
    "vest": "ENEM",
    "ano": 2024,
    "num": 13,
    "enunciado": "A sombra de uma árvore tem 6 m de comprimento quando a sombra de uma estaca de 1,5 m tem 1 m. Qual é a altura da árvore? (Teorema de Tales)",
    "opcoes": [
      "6 m",
      "7 m",
      "8 m",
      "9 m",
      "10 m"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Semelhança / Tales"
  },
  {
    "id": "enem24-014",
    "vest": "ENEM",
    "ano": 2024,
    "num": 14,
    "enunciado": "Um cone tem volume igual a um cilindro de mesma base e mesma altura. Qual é a relação entre seus volumes?",
    "opcoes": [
      "O cone tem 1/4 do volume do cilindro",
      "O cone tem 1/3 do volume do cilindro",
      "São iguais",
      "O cilindro tem 1/3 do volume do cone",
      "O cone tem 2/3 do volume do cilindro"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "enem24-015",
    "vest": "ENEM",
    "ano": 2024,
    "num": 15,
    "enunciado": "Numa urna com 4 bolas brancas e 6 vermelhas, sorteiam-se 3 bolas simultaneamente. Qual é a probabilidade de todas serem vermelhas?",
    "opcoes": [
      "1/6",
      "1/5",
      "1/4",
      "1/3",
      "1/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "macro15-001",
    "vest": "MACRO",
    "ano": 2015,
    "num": 1,
    "enunciado": "Um comerciante comprou um produto por R$ 320,00 e o vendeu com 35% de lucro. Por quanto ele vendeu o produto?",
    "opcoes": [
      "R$ 400,00",
      "R$ 412,00",
      "R$ 420,00",
      "R$ 432,00",
      "R$ 440,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "macro15-002",
    "vest": "MACRO",
    "ano": 2015,
    "num": 2,
    "enunciado": "A matriz A = [[2, 3], [1, 4]] tem determinante igual a:",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Determinante"
  },
  {
    "id": "macro15-003",
    "vest": "MACRO",
    "ano": 2015,
    "num": 3,
    "enunciado": "Um sistema linear tem como solução x=2 e y=–1. Qual sistema corresponde a essa solução?",
    "opcoes": [
      "x+y=1 e x–y=3",
      "x+y=3 e x–y=1",
      "2x+y=3 e x+2y=0",
      "x–y=1 e x+y=3",
      "2x–y=5 e x+y=0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Sistemas lineares"
  },
  {
    "id": "macro15-004",
    "vest": "MACRO",
    "ano": 2015,
    "num": 4,
    "enunciado": "Uma PG tem a₁=5, a₂=15 e a₃=45. Qual é o 5º termo?",
    "opcoes": [
      "225",
      "365",
      "405",
      "425",
      "445"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro15-005",
    "vest": "MACRO",
    "ano": 2015,
    "num": 5,
    "enunciado": "Num polígono regular de 12 lados, qual é a medida de cada ângulo interno?",
    "opcoes": [
      "140°",
      "145°",
      "150°",
      "155°",
      "160°"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Polígonos"
  },
  {
    "id": "macro15-006",
    "vest": "MACRO",
    "ano": 2015,
    "num": 6,
    "enunciado": "Qual é o valor de x em: log₄(x) = 3/2?",
    "opcoes": [
      "4",
      "6",
      "8",
      "10",
      "12"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "macro15-007",
    "vest": "MACRO",
    "ano": 2015,
    "num": 7,
    "enunciado": "Uma isometria que preserva a forma e o tamanho, mas inverte a orientação, é chamada de:",
    "opcoes": [
      "Translação",
      "Rotação",
      "Reflexão",
      "Homotetia",
      "Projeção"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Isometrias"
  },
  {
    "id": "macro15-008",
    "vest": "MACRO",
    "ano": 2015,
    "num": 8,
    "enunciado": "O número de subconjuntos de um conjunto com 5 elementos é:",
    "opcoes": [
      "16",
      "25",
      "32",
      "64",
      "128"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Conjuntos"
  },
  {
    "id": "macro15-009",
    "vest": "MACRO",
    "ano": 2015,
    "num": 9,
    "enunciado": "Uma função f(x) = x³ – 3x passa pelo ponto (2, y). Qual é o valor de y?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função polinomial"
  },
  {
    "id": "macro15-010",
    "vest": "MACRO",
    "ano": 2015,
    "num": 10,
    "enunciado": "A área de um losango com diagonais de 10 cm e 8 cm é:",
    "opcoes": [
      "30 cm²",
      "35 cm²",
      "40 cm²",
      "45 cm²",
      "50 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "macro15-011",
    "vest": "MACRO",
    "ano": 2015,
    "num": 11,
    "enunciado": "Qual é o valor de sen²(30°) + cos²(60°)?",
    "opcoes": [
      "1/4",
      "1/2",
      "3/4",
      "1",
      "5/4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "macro15-012",
    "vest": "MACRO",
    "ano": 2015,
    "num": 12,
    "enunciado": "Uma moeda é lançada 3 vezes. Qual é a probabilidade de sair exatamente 2 caras?",
    "opcoes": [
      "1/8",
      "2/8",
      "3/8",
      "4/8",
      "5/8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "macro15-013",
    "vest": "MACRO",
    "ano": 2015,
    "num": 13,
    "enunciado": "Qual é a solução do sistema: { 3x+2y=12 e x–y=1 }?",
    "opcoes": [
      "x=2, y=1",
      "x=14/5, y=9/5",
      "x=3, y=2",
      "x=10/3, y=1",
      "x=4, y=0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Sistemas"
  },
  {
    "id": "macro15-014",
    "vest": "MACRO",
    "ano": 2015,
    "num": 14,
    "enunciado": "Um capital de R$ 5.000,00 é investido a juros simples de 1,5% ao mês. Qual é o montante após 8 meses?",
    "opcoes": [
      "R$ 5.400,00",
      "R$ 5.500,00",
      "R$ 5.600,00",
      "R$ 5.700,00",
      "R$ 5.800,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Juros simples"
  },
  {
    "id": "macro15-015",
    "vest": "MACRO",
    "ano": 2015,
    "num": 15,
    "enunciado": "Qual é o número de diagonais de um octógono (8 lados)?",
    "opcoes": [
      "16",
      "18",
      "20",
      "22",
      "24"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Contagem"
  },
  {
    "id": "macro16-001",
    "vest": "MACRO",
    "ano": 2016,
    "num": 1,
    "enunciado": "A soma dos ângulos internos de um polígono é 1.440°. Quantos lados tem esse polígono?",
    "opcoes": [
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Polígonos"
  },
  {
    "id": "macro16-002",
    "vest": "MACRO",
    "ano": 2016,
    "num": 2,
    "enunciado": "A matriz identidade de ordem 2 multiplicada por qualquer matriz A 2×2 resulta em:",
    "opcoes": [
      "Matriz nula",
      "2A",
      "A",
      "A²",
      "A transposta"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Matrizes"
  },
  {
    "id": "macro16-003",
    "vest": "MACRO",
    "ano": 2016,
    "num": 3,
    "enunciado": "Um capital de R$ 8.000,00 é investido a juros compostos de 2% ao mês. Qual é o montante após 3 meses?",
    "opcoes": [
      "R$ 8.368,64",
      "R$ 8.400,00",
      "R$ 8.480,00",
      "R$ 8.500,00",
      "R$ 8.560,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Juros compostos"
  },
  {
    "id": "macro16-004",
    "vest": "MACRO",
    "ano": 2016,
    "num": 4,
    "enunciado": "Qual é o valor de x em: 2^(3x) = 512?",
    "opcoes": [
      "x=2",
      "x=3",
      "x=4",
      "x=5",
      "x=6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "macro16-005",
    "vest": "MACRO",
    "ano": 2016,
    "num": 5,
    "enunciado": "Um vendedor recebe comissão de 6% sobre suas vendas. Se ele vendeu R$ 15.000,00 em um mês, quanto recebeu de comissão?",
    "opcoes": [
      "R$ 700,00",
      "R$ 800,00",
      "R$ 900,00",
      "R$ 1.000,00",
      "R$ 1.100,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "macro16-006",
    "vest": "MACRO",
    "ano": 2016,
    "num": 6,
    "enunciado": "A solução da equação log₂(x²–4x+4)=2 é:",
    "opcoes": [
      "x=0 ou x=4",
      "x=2",
      "x=–2 ou x=6",
      "x=0 ou x=6",
      "x=2 ou x=–2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "macro16-007",
    "vest": "MACRO",
    "ano": 2016,
    "num": 7,
    "enunciado": "O coeficiente de variação de um conjunto de dados com média 50 e desvio padrão 10 é:",
    "opcoes": [
      "5%",
      "10%",
      "15%",
      "20%",
      "25%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "macro16-008",
    "vest": "MACRO",
    "ano": 2016,
    "num": 8,
    "enunciado": "Qual é a área da região delimitada pelas retas x=0, y=0 e y=–2x+6?",
    "opcoes": [
      "6 u²",
      "7 u²",
      "8 u²",
      "9 u²",
      "10 u²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "macro16-009",
    "vest": "MACRO",
    "ano": 2016,
    "num": 9,
    "enunciado": "Quantas comissões de 3 membros podem ser formadas a partir de 8 pessoas?",
    "opcoes": [
      "40",
      "48",
      "56",
      "64",
      "72"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "macro16-010",
    "vest": "MACRO",
    "ano": 2016,
    "num": 10,
    "enunciado": "Num triângulo com lados 7, 8 e 9 cm, qual é a área pela Fórmula de Heron? (s=12)",
    "opcoes": [
      "√180 cm²",
      "√210 cm²",
      "√240 cm²",
      "√270 cm²",
      "√300 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria"
  },
  {
    "id": "macro16-011",
    "vest": "MACRO",
    "ano": 2016,
    "num": 11,
    "enunciado": "Uma translação leva o ponto A(2, 3) para A'(5, 7). Qual é o vetor de translação?",
    "opcoes": [
      "(2,3)",
      "(3,4)",
      "(4,3)",
      "(5,7)",
      "(3,3)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Isometrias / translação"
  },
  {
    "id": "macro16-012",
    "vest": "MACRO",
    "ano": 2016,
    "num": 12,
    "enunciado": "Qual é o valor de tg(45°) + sen(90°) – cos(0°)?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "macro16-013",
    "vest": "MACRO",
    "ano": 2016,
    "num": 13,
    "enunciado": "Numa classe de 35 alunos, a média foi 6,8 e a moda 7,0. Se o professor adicionar 0,5 ponto para todos, qual será a nova média?",
    "opcoes": [
      "7,0",
      "7,2",
      "7,3",
      "7,4",
      "7,5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "macro16-014",
    "vest": "MACRO",
    "ano": 2016,
    "num": 14,
    "enunciado": "Qual é a equação da circunferência com centro na origem e raio 7?",
    "opcoes": [
      "x²+y²=7",
      "x²+y²=14",
      "x²+y²=49",
      "x²+y²=√7",
      "x+y=7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "macro16-015",
    "vest": "MACRO",
    "ano": 2016,
    "num": 15,
    "enunciado": "Qual é o resto da divisão de 5¹⁰⁰ por 4?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Aritmética"
  },
  {
    "id": "macro17-001",
    "vest": "MACRO",
    "ano": 2017,
    "num": 1,
    "enunciado": "O determinante da matriz [[a, 2], [3, a]] é igual a 10. Qual é o valor positivo de a?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Determinante"
  },
  {
    "id": "macro17-002",
    "vest": "MACRO",
    "ano": 2017,
    "num": 2,
    "enunciado": "Um retângulo tem perímetro 44 cm e um lado mede 14 cm. Qual é a área?",
    "opcoes": [
      "80 cm²",
      "90 cm²",
      "100 cm²",
      "110 cm²",
      "120 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "macro17-003",
    "vest": "MACRO",
    "ano": 2017,
    "num": 3,
    "enunciado": "Qual é o 10º termo de uma PA cujo 3º termo é 11 e o 6º termo é 20?",
    "opcoes": [
      "30",
      "32",
      "33",
      "34",
      "36"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro17-004",
    "vest": "MACRO",
    "ano": 2017,
    "num": 4,
    "enunciado": "A probabilidade de um evento A é 0,4 e de B é 0,5, sendo A e B independentes. Qual é P(A e B)?",
    "opcoes": [
      "0,10",
      "0,15",
      "0,20",
      "0,25",
      "0,30"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "macro17-005",
    "vest": "MACRO",
    "ano": 2017,
    "num": 5,
    "enunciado": "Qual é o valor de log₆(216)?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "macro17-006",
    "vest": "MACRO",
    "ano": 2017,
    "num": 6,
    "enunciado": "Num torneio de 6 times, cada time joga 1 vez contra cada adversário. Quantas partidas no total?",
    "opcoes": [
      "12",
      "13",
      "14",
      "15",
      "16"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "macro17-007",
    "vest": "MACRO",
    "ano": 2017,
    "num": 7,
    "enunciado": "Qual é o conjunto solução de |3x – 6| > 9?",
    "opcoes": [
      "x<–1 ou x>5",
      "x<1 ou x>5",
      "–1<x<5",
      "1<x<5",
      "x<–1 ou x>3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Inequação modular"
  },
  {
    "id": "macro17-008",
    "vest": "MACRO",
    "ano": 2017,
    "num": 8,
    "enunciado": "Uma esfera tem superfície de 100π cm². Qual é o raio?",
    "opcoes": [
      "3 cm",
      "4 cm",
      "5 cm",
      "6 cm",
      "7 cm"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "macro17-009",
    "vest": "MACRO",
    "ano": 2017,
    "num": 9,
    "enunciado": "O conjunto A tem 4 elementos e o B tem 3 elementos, com A∩B=∅. Quantos elementos tem A∪B?",
    "opcoes": [
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Conjuntos"
  },
  {
    "id": "macro17-010",
    "vest": "MACRO",
    "ano": 2017,
    "num": 10,
    "enunciado": "Uma homotetia de razão 3 leva o segmento AB de 4 cm para A'B'. Qual é o comprimento de A'B'?",
    "opcoes": [
      "8 cm",
      "9 cm",
      "10 cm",
      "11 cm",
      "12 cm"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Homotetia"
  },
  {
    "id": "macro17-011",
    "vest": "MACRO",
    "ano": 2017,
    "num": 11,
    "enunciado": "Qual é o valor de x em: 3^(x²–4) = 1?",
    "opcoes": [
      "x=±1",
      "x=±2",
      "x=±3",
      "x=±4",
      "x=0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "macro17-012",
    "vest": "MACRO",
    "ano": 2017,
    "num": 12,
    "enunciado": "Uma PA tem soma dos 12 primeiros termos igual a 114 e o 1º termo é 3. Qual é a razão?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro17-013",
    "vest": "MACRO",
    "ano": 2017,
    "num": 13,
    "enunciado": "O gráfico de f(x) = |x – 2| tem vértice em:",
    "opcoes": [
      "(0,2)",
      "(2,0)",
      "(–2,0)",
      "(0,–2)",
      "(2,2)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função modular"
  },
  {
    "id": "macro17-014",
    "vest": "MACRO",
    "ano": 2017,
    "num": 14,
    "enunciado": "Quantos anagramas distintos podem ser formados com as letras da palavra MATEMÁTICA? (10 letras: M×2, A×3, T×2, E, I, C)",
    "opcoes": [
      "75.600",
      "80.200",
      "90.000",
      "100.800",
      "110.000"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Permutação com repetição"
  },
  {
    "id": "macro17-015",
    "vest": "MACRO",
    "ano": 2017,
    "num": 15,
    "enunciado": "Qual é a soma dos termos de uma PA com a₁=4, aₙ=40 e n=10 termos?",
    "opcoes": [
      "180",
      "200",
      "220",
      "240",
      "260"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro18-001",
    "vest": "MACRO",
    "ano": 2018,
    "num": 1,
    "enunciado": "Uma empresa tem 240 funcionários. Após uma reestruturação, 15% foram demitidos e 20 foram contratados. Quantos funcionários a empresa tem agora?",
    "opcoes": [
      "216",
      "220",
      "224",
      "226",
      "230"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "macro18-002",
    "vest": "MACRO",
    "ano": 2018,
    "num": 2,
    "enunciado": "A matriz transposta de A = [[1,2,3],[4,5,6]] tem dimensão:",
    "opcoes": [
      "2×3",
      "3×2",
      "2×2",
      "3×3",
      "1×6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Matrizes"
  },
  {
    "id": "macro18-003",
    "vest": "MACRO",
    "ano": 2018,
    "num": 3,
    "enunciado": "Qual é o valor de x na equação: log₃(2x+1) = log₃(x+4)?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=3",
      "x=4",
      "x=5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "macro18-004",
    "vest": "MACRO",
    "ano": 2018,
    "num": 4,
    "enunciado": "A soma dos 8 primeiros termos de uma PG com a₁=2 e q=2 é:",
    "opcoes": [
      "254",
      "510",
      "508",
      "512",
      "504"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro18-005",
    "vest": "MACRO",
    "ano": 2018,
    "num": 5,
    "enunciado": "Numa pesquisa com 200 pessoas, 45% preferem produto X e 30% produto Y. Os demais não têm preferência. Quantas pessoas não têm preferência?",
    "opcoes": [
      "40",
      "45",
      "50",
      "55",
      "60"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "macro18-006",
    "vest": "MACRO",
    "ano": 2018,
    "num": 6,
    "enunciado": "Qual é o valor de sen(120°)?",
    "opcoes": [
      "–√3/2",
      "–1/2",
      "1/2",
      "√3/2",
      "1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "macro18-007",
    "vest": "MACRO",
    "ano": 2018,
    "num": 7,
    "enunciado": "O produto de duas matrizes A(2×3) e B(3×4) resulta numa matriz de dimensão:",
    "opcoes": [
      "2×4",
      "3×3",
      "4×2",
      "2×3",
      "3×4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Matrizes"
  },
  {
    "id": "macro18-008",
    "vest": "MACRO",
    "ano": 2018,
    "num": 8,
    "enunciado": "Qual é a distância entre os pontos A(–3, 1) e B(1, 4)?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "macro18-009",
    "vest": "MACRO",
    "ano": 2018,
    "num": 9,
    "enunciado": "Quantos números naturais de 4 algarismos distintos podem ser formados com {1,2,3,4,5,6}?",
    "opcoes": [
      "240",
      "300",
      "360",
      "420",
      "480"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Arranjo"
  },
  {
    "id": "macro18-010",
    "vest": "MACRO",
    "ano": 2018,
    "num": 10,
    "enunciado": "Um prisma triangular regular tem base com lado 6 cm e altura 10 cm. Qual é o volume? (Área do triângulo equilátero=9√3 cm²)",
    "opcoes": [
      "80√3 cm³",
      "85√3 cm³",
      "90√3 cm³",
      "95√3 cm³",
      "100√3 cm³"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Volume de prisma"
  },
  {
    "id": "macro18-011",
    "vest": "MACRO",
    "ano": 2018,
    "num": 11,
    "enunciado": "A inequação 2x² – 8 > 0 tem solução:",
    "opcoes": [
      "–2<x<2",
      "x<–2 ou x>2",
      "x>2",
      "x<–2",
      "–4<x<4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Inequação quadrática"
  },
  {
    "id": "macro18-012",
    "vest": "MACRO",
    "ano": 2018,
    "num": 12,
    "enunciado": "Uma rotação de 270° no sentido anti-horário equivale a uma rotação de quantos graus no sentido horário?",
    "opcoes": [
      "60°",
      "70°",
      "80°",
      "90°",
      "100°"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Isometrias / rotação"
  },
  {
    "id": "macro18-013",
    "vest": "MACRO",
    "ano": 2018,
    "num": 13,
    "enunciado": "Qual é o valor de x em: 4x – 3y = 18 e 2x + y = 10?",
    "opcoes": [
      "x=4",
      "x=4,5",
      "x=5",
      "x=5,5",
      "x=6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Sistemas"
  },
  {
    "id": "macro18-014",
    "vest": "MACRO",
    "ano": 2018,
    "num": 14,
    "enunciado": "Qual é o valor da expressão C(10,2) + C(10,3)?",
    "opcoes": [
      "165",
      "170",
      "175",
      "180",
      "185"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinatória"
  },
  {
    "id": "macro18-015",
    "vest": "MACRO",
    "ano": 2018,
    "num": 15,
    "enunciado": "Se f(x) = log₂(x) e g(x) = 2^x, qual é o valor de f(g(5))?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Funções inversas"
  },
  {
    "id": "macro19-001",
    "vest": "MACRO",
    "ano": 2019,
    "num": 1,
    "enunciado": "Um produto foi vendido por R$ 780,00 com lucro de 30% sobre o custo. Qual foi o custo?",
    "opcoes": [
      "R$ 550,00",
      "R$ 580,00",
      "R$ 600,00",
      "R$ 620,00",
      "R$ 640,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "macro19-002",
    "vest": "MACRO",
    "ano": 2019,
    "num": 2,
    "enunciado": "Qual é o determinante da matriz [[3,1],[2,5]]?",
    "opcoes": [
      "11",
      "12",
      "13",
      "14",
      "15"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Determinante"
  },
  {
    "id": "macro19-003",
    "vest": "MACRO",
    "ano": 2019,
    "num": 3,
    "enunciado": "O 1º quartil de uma distribuição é o valor que separa os primeiros 25% dos dados. Numa série ordenada: 4, 6, 8, 10, 12, 14, 16, 18, qual é o 1º quartil?",
    "opcoes": [
      "5",
      "6",
      "7",
      "8",
      "9"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "macro19-004",
    "vest": "MACRO",
    "ano": 2019,
    "num": 4,
    "enunciado": "Qual é a equação reduzida da reta que passa por (2,5) e tem coeficiente angular 3?",
    "opcoes": [
      "y=3x–1",
      "y=3x+1",
      "y=3x–2",
      "y=3x+2",
      "y=3x–3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "macro19-005",
    "vest": "MACRO",
    "ano": 2019,
    "num": 5,
    "enunciado": "Qual é o valor de x em: 5^(x–1) = 1/25?",
    "opcoes": [
      "x=–1",
      "x=0",
      "x=1",
      "x=–2",
      "x=2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "macro19-006",
    "vest": "MACRO",
    "ano": 2019,
    "num": 6,
    "enunciado": "Uma circunferência tem equação x²+y²–4x+6y–12=0. Qual é o raio?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "macro19-007",
    "vest": "MACRO",
    "ano": 2019,
    "num": 7,
    "enunciado": "Qual é o número de subconjuntos próprios de um conjunto com 4 elementos?",
    "opcoes": [
      "12",
      "14",
      "15",
      "16",
      "18"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Conjuntos"
  },
  {
    "id": "macro19-008",
    "vest": "MACRO",
    "ano": 2019,
    "num": 8,
    "enunciado": "A função f(x) = 2x² – 12x + 10 tem valor mínimo igual a:",
    "opcoes": [
      "–10",
      "–8",
      "–6",
      "–4",
      "–2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "macro19-009",
    "vest": "MACRO",
    "ano": 2019,
    "num": 9,
    "enunciado": "Um capital de R$ 10.000,00 é aplicado a 3% de juros compostos ao mês. Qual é o montante após 2 meses?",
    "opcoes": [
      "R$ 10.600,00",
      "R$ 10.609,00",
      "R$ 10.620,00",
      "R$ 10.630,00",
      "R$ 10.640,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Juros compostos"
  },
  {
    "id": "macro19-010",
    "vest": "MACRO",
    "ano": 2019,
    "num": 10,
    "enunciado": "Qual é o cos(210°)?",
    "opcoes": [
      "√3/2",
      "1/2",
      "–1/2",
      "–√3/2",
      "–1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "macro19-011",
    "vest": "MACRO",
    "ano": 2019,
    "num": 11,
    "enunciado": "Numa classe de 30 alunos, o desvio padrão das notas é 2 e a média é 7. Qual é o coeficiente de variação?",
    "opcoes": [
      "14,3%",
      "20,5%",
      "25,8%",
      "28,6%",
      "30,0%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "macro19-012",
    "vest": "MACRO",
    "ano": 2019,
    "num": 12,
    "enunciado": "Qual é a soma dos termos de uma PG infinita com a₁=10 e q=0,4?",
    "opcoes": [
      "14,5",
      "15,5",
      "16,5",
      "17,5",
      "18,5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "macro19-013",
    "vest": "MACRO",
    "ano": 2019,
    "num": 13,
    "enunciado": "Uma reflexão em relação ao eixo y leva o ponto P(3,–2) para:",
    "opcoes": [
      "(3,2)",
      "(–3,2)",
      "(–3,–2)",
      "(2,–3)",
      "(2,3)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Isometrias"
  },
  {
    "id": "macro19-014",
    "vest": "MACRO",
    "ano": 2019,
    "num": 14,
    "enunciado": "Quantos zeros tem o produto 25! (fatorial de 25) ao final?",
    "opcoes": [
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Teoria dos números"
  },
  {
    "id": "macro19-015",
    "vest": "MACRO",
    "ano": 2019,
    "num": 15,
    "enunciado": "Qual é o valor de x que satisfaz: 2^x × 4^(x+1) = 128?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=3",
      "x=4",
      "x=5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "macro20-001",
    "vest": "MACRO",
    "ano": 2020,
    "num": 1,
    "enunciado": "Numa empresa, o salário médio dos 10 funcionários é R$ 3.200,00. Se um funcionário com salário de R$ 2.000,00 é substituído por outro com R$ 4.400,00, qual é o novo salário médio?",
    "opcoes": [
      "R$ 3.300,00",
      "R$ 3.360,00",
      "R$ 3.400,00",
      "R$ 3.420,00",
      "R$ 3.500,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Média"
  },
  {
    "id": "macro20-002",
    "vest": "MACRO",
    "ano": 2020,
    "num": 2,
    "enunciado": "Qual é o valor de x em: ||x – 3| – 2| = 1?",
    "opcoes": [
      "x=0 ou x=6",
      "x=2 ou x=4",
      "x=0, x=4 ou x=6",
      "x=1 ou x=5",
      "x=0, x=2, x=4 ou x=6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Módulo duplo"
  },
  {
    "id": "macro20-003",
    "vest": "MACRO",
    "ano": 2020,
    "num": 3,
    "enunciado": "A matriz A = [[2,–1],[3,4]] e B = [[1,2],[–1,3]]. Qual é o elemento c₁₂ de C=A×B?",
    "opcoes": [
      "1",
      "4",
      "7",
      "5",
      "3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Multiplicação de matrizes"
  },
  {
    "id": "macro20-004",
    "vest": "MACRO",
    "ano": 2020,
    "num": 4,
    "enunciado": "Qual é o número de permutações da palavra LIVRE?",
    "opcoes": [
      "60",
      "90",
      "100",
      "120",
      "150"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Permutação"
  },
  {
    "id": "macro20-005",
    "vest": "MACRO",
    "ano": 2020,
    "num": 5,
    "enunciado": "Uma função exponencial f(x)=a^x passa pelos pontos (0,1) e (2,9). Qual é a base a?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função exponencial"
  },
  {
    "id": "macro20-006",
    "vest": "MACRO",
    "ano": 2020,
    "num": 6,
    "enunciado": "Qual é a área de um setor circular com raio 10 cm e arco de 6π cm?",
    "opcoes": [
      "25π cm²",
      "30π cm²",
      "35π cm²",
      "40π cm²",
      "45π cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Setor circular"
  },
  {
    "id": "macro20-007",
    "vest": "MACRO",
    "ano": 2020,
    "num": 7,
    "enunciado": "Qual é o ângulo entre as retas y=x+2 e y=–x+5?",
    "opcoes": [
      "30°",
      "45°",
      "60°",
      "75°",
      "90°"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "macro20-008",
    "vest": "MACRO",
    "ano": 2020,
    "num": 8,
    "enunciado": "Num grupo de 12 pessoas, quantos comitês de 4 podem ser formados onde 2 pessoas específicas DEVEM estar?",
    "opcoes": [
      "40",
      "45",
      "55",
      "60",
      "70"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "macro20-009",
    "vest": "MACRO",
    "ano": 2020,
    "num": 9,
    "enunciado": "Uma PA tem a₂=7 e a₅=16. Qual é a soma dos 8 primeiros termos?",
    "opcoes": [
      "116",
      "124",
      "132",
      "140",
      "148"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro20-010",
    "vest": "MACRO",
    "ano": 2020,
    "num": 10,
    "enunciado": "Qual é o valor de sen(30°)×cos(60°)+cos(30°)×sen(60°)?",
    "opcoes": [
      "1/2",
      "√3/2",
      "1",
      "√3",
      "2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "macro20-011",
    "vest": "MACRO",
    "ano": 2020,
    "num": 11,
    "enunciado": "O volume de uma esfera é 288π cm³. Qual é o raio?",
    "opcoes": [
      "4 cm",
      "5 cm",
      "6 cm",
      "7 cm",
      "8 cm"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "macro20-012",
    "vest": "MACRO",
    "ano": 2020,
    "num": 12,
    "enunciado": "Qual é a solução do sistema: { x+y+z=6; x–y+z=2; x+y–z=4 }?",
    "opcoes": [
      "(2,1,3)",
      "(3,1,2)",
      "(2,3,1)",
      "(1,2,3)",
      "(3,2,1)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Sistemas 3×3"
  },
  {
    "id": "macro20-013",
    "vest": "MACRO",
    "ano": 2020,
    "num": 13,
    "enunciado": "Qual é o domínio da função f(x) = √(4–x²)?",
    "opcoes": [
      "–2≤x≤2",
      "x≥2",
      "x≤–2",
      "x>0",
      "–4≤x≤4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Domínio"
  },
  {
    "id": "macro20-014",
    "vest": "MACRO",
    "ano": 2020,
    "num": 14,
    "enunciado": "Um dado honesto é lançado duas vezes. Qual é a probabilidade de o produto dos resultados ser múltiplo de 6?",
    "opcoes": [
      "1/6",
      "1/4",
      "5/12",
      "1/3",
      "7/36"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "macro20-015",
    "vest": "MACRO",
    "ano": 2020,
    "num": 15,
    "enunciado": "Uma homotetia de centro O e razão –2 leva o ponto P(1,3) para P'. Quais são as coordenadas de P'?",
    "opcoes": [
      "(2,6)",
      "(–2,–6)",
      "(–2,6)",
      "(2,–6)",
      "(–1,–3)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Homotetia"
  },
  {
    "id": "macro21-001",
    "vest": "MACRO",
    "ano": 2021,
    "num": 1,
    "enunciado": "Uma loja vendeu um produto por R$ 650,00 com desconto de 10% sobre o preço original. Qual era o preço original?",
    "opcoes": [
      "R$ 700,00",
      "R$ 710,00",
      "R$ 720,00",
      "R$ 722,22",
      "R$ 730,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "macro21-002",
    "vest": "MACRO",
    "ano": 2021,
    "num": 2,
    "enunciado": "Se A = [[1,2],[3,4]] e B = [[5,6],[7,8]], qual é o elemento c₂₁ de C = A+B?",
    "opcoes": [
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Adição de matrizes"
  },
  {
    "id": "macro21-003",
    "vest": "MACRO",
    "ano": 2021,
    "num": 3,
    "enunciado": "Qual é o valor de x em: log(x²) = log(x) + log(9)?",
    "opcoes": [
      "x=3",
      "x=6",
      "x=9",
      "x=12",
      "x=18"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "macro21-004",
    "vest": "MACRO",
    "ano": 2021,
    "num": 4,
    "enunciado": "Uma urna tem 3 bolas vermelhas, 4 azuis e 5 verdes. Retirando uma bola, qual é a probabilidade de não ser azul?",
    "opcoes": [
      "1/3",
      "2/3",
      "3/4",
      "1/4",
      "5/12"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "macro21-005",
    "vest": "MACRO",
    "ano": 2021,
    "num": 5,
    "enunciado": "Qual é a razão de uma PA onde a₃=11 e a₇=27?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro21-006",
    "vest": "MACRO",
    "ano": 2021,
    "num": 6,
    "enunciado": "A área de um triângulo com vértices em A(0,0), B(4,0) e C(2,5) é:",
    "opcoes": [
      "8 u²",
      "9 u²",
      "10 u²",
      "11 u²",
      "12 u²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "macro21-007",
    "vest": "MACRO",
    "ano": 2021,
    "num": 7,
    "enunciado": "Qual é o valor de cos²(45°) – sen²(30°)?",
    "opcoes": [
      "0",
      "1/4",
      "1/2",
      "3/4",
      "1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "macro21-008",
    "vest": "MACRO",
    "ano": 2021,
    "num": 8,
    "enunciado": "Num grupo de 8 pessoas, quantos pares distintos podem ser formados?",
    "opcoes": [
      "20",
      "24",
      "28",
      "32",
      "36"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "macro21-009",
    "vest": "MACRO",
    "ano": 2021,
    "num": 9,
    "enunciado": "Uma função afim f(x)=ax+b tem f(1)=5 e f(–2)=–1. Qual é o valor de a+b?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "macro21-010",
    "vest": "MACRO",
    "ano": 2021,
    "num": 10,
    "enunciado": "A diagonal principal de uma matriz A(3×3) tem elementos 2, 5 e 8. Qual é o traço (soma da diagonal) de A?",
    "opcoes": [
      "12",
      "13",
      "14",
      "15",
      "16"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Matrizes"
  },
  {
    "id": "macro21-011",
    "vest": "MACRO",
    "ano": 2021,
    "num": 11,
    "enunciado": "Qual é o conjunto imagem da função f(x)=–x²+4, para x∈ℝ?",
    "opcoes": [
      "Im=(–∞,4]",
      "Im=[4,+∞)",
      "Im=(–∞,4)",
      "Im=(4,+∞)",
      "Im=[–4,4]"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "macro21-012",
    "vest": "MACRO",
    "ano": 2021,
    "num": 12,
    "enunciado": "Uma reflexão em relação à reta y=x leva o ponto (3,7) para:",
    "opcoes": [
      "(–3,–7)",
      "(7,3)",
      "(–7,–3)",
      "(3,–7)",
      "(–3,7)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Isometrias"
  },
  {
    "id": "macro21-013",
    "vest": "MACRO",
    "ano": 2021,
    "num": 13,
    "enunciado": "Qual é a solução de: 3^(2x+1)=243?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=3",
      "x=4",
      "x=5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "macro21-014",
    "vest": "MACRO",
    "ano": 2021,
    "num": 14,
    "enunciado": "Dados os vetores u=(3,–1) e v=(2,4), qual é o produto escalar u·v?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Vetores"
  },
  {
    "id": "macro21-015",
    "vest": "MACRO",
    "ano": 2021,
    "num": 15,
    "enunciado": "Numa PA com 20 termos, a soma é 630 e o último termo é 52. Qual é o primeiro termo?",
    "opcoes": [
      "9",
      "10",
      "11",
      "12",
      "13"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro22-001",
    "vest": "MACRO",
    "ano": 2022,
    "num": 1,
    "enunciado": "Um produto teve três aumentos sucessivos de 10%, 5% e 4%. Qual foi o aumento percentual total aproximado?",
    "opcoes": [
      "19%",
      "19,5%",
      "20%",
      "20,3%",
      "21%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Porcentagem composta"
  },
  {
    "id": "macro22-002",
    "vest": "MACRO",
    "ano": 2022,
    "num": 2,
    "enunciado": "Qual é o valor de x em: 2^(x+3)=4^(x–1)?",
    "opcoes": [
      "x=3",
      "x=4",
      "x=5",
      "x=6",
      "x=7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "macro22-003",
    "vest": "MACRO",
    "ano": 2022,
    "num": 3,
    "enunciado": "A mediana de: 3,7,9,12,15,18,22 é:",
    "opcoes": [
      "9",
      "10",
      "12",
      "13",
      "15"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Mediana"
  },
  {
    "id": "macro22-004",
    "vest": "MACRO",
    "ano": 2022,
    "num": 4,
    "enunciado": "Qual é o módulo do vetor v=(–5, 12)?",
    "opcoes": [
      "11",
      "12",
      "13",
      "14",
      "15"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Vetores"
  },
  {
    "id": "macro22-005",
    "vest": "MACRO",
    "ano": 2022,
    "num": 5,
    "enunciado": "A função f(x)=x²–4 e g(x)=x+2. Qual é f(g(3))?",
    "opcoes": [
      "20",
      "21",
      "22",
      "23",
      "24"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Composição de funções"
  },
  {
    "id": "macro22-006",
    "vest": "MACRO",
    "ano": 2022,
    "num": 6,
    "enunciado": "Qual é a área total de um cone com raio 6 cm e altura 8 cm? (Use π≈3,14)",
    "opcoes": [
      "250,5 cm²",
      "263,8 cm²",
      "275,0 cm²",
      "282,6 cm²",
      "301,4 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "macro22-007",
    "vest": "MACRO",
    "ano": 2022,
    "num": 7,
    "enunciado": "Qual é o valor de log₁₀(0,001)?",
    "opcoes": [
      "–4",
      "–3",
      "–2",
      "–1",
      "0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "macro22-008",
    "vest": "MACRO",
    "ano": 2022,
    "num": 8,
    "enunciado": "Dois pontos A(1,2) e B(5,5) definem um segmento. Qual é o ponto que divide AB em razão 1:3?",
    "opcoes": [
      "(2,2,75)",
      "(2,2,5)",
      "(2,2,25)",
      "(2,3,25)",
      "(3,3,5)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "macro22-009",
    "vest": "MACRO",
    "ano": 2022,
    "num": 9,
    "enunciado": "Numa progressão aritmética, a soma dos termos de ordem par é 90 e a soma dos de ordem ímpar é 75, com 6 termos no total. Qual é a razão?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro22-010",
    "vest": "MACRO",
    "ano": 2022,
    "num": 10,
    "enunciado": "Qual é o número de triângulos que podem ser formados com 7 pontos não colineares?",
    "opcoes": [
      "25",
      "30",
      "35",
      "40",
      "45"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "macro22-011",
    "vest": "MACRO",
    "ano": 2022,
    "num": 11,
    "enunciado": "Qual é a solução de: {2x–y=4 e x+3y=13}?",
    "opcoes": [
      "(3,2)",
      "(4,3)",
      "(5,6)",
      "(2,3)",
      "(3,4)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Sistemas"
  },
  {
    "id": "macro22-012",
    "vest": "MACRO",
    "ano": 2022,
    "num": 12,
    "enunciado": "Uma translação de vetor (–3, 4) leva P(5,–2) para P'. Quais são as coordenadas de P'?",
    "opcoes": [
      "(2,2)",
      "(3,2)",
      "(2,3)",
      "(8,–6)",
      "(–2,2)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Isometrias"
  },
  {
    "id": "macro22-013",
    "vest": "MACRO",
    "ano": 2022,
    "num": 13,
    "enunciado": "Qual é o valor de x em: ln(x) + ln(3) = ln(12)?",
    "opcoes": [
      "x=2",
      "x=3",
      "x=4",
      "x=5",
      "x=6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "macro22-014",
    "vest": "MACRO",
    "ano": 2022,
    "num": 14,
    "enunciado": "Qual é o ângulo formado pelos vetores u=(1,0) e v=(1,1)?",
    "opcoes": [
      "30°",
      "40°",
      "45°",
      "50°",
      "60°"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Vetores"
  },
  {
    "id": "macro22-015",
    "vest": "MACRO",
    "ano": 2022,
    "num": 15,
    "enunciado": "Um capital de R$ 6.000,00 rende R$ 1.860,00 em juros simples em 3 anos. Qual é a taxa anual?",
    "opcoes": [
      "8,5%",
      "9,0%",
      "9,5%",
      "10,0%",
      "10,5%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Juros simples"
  },
  {
    "id": "macro23-001",
    "vest": "MACRO",
    "ano": 2023,
    "num": 1,
    "enunciado": "A raiz quadrada de 576 somada com o cubo de 4 é igual a:",
    "opcoes": [
      "82",
      "86",
      "88",
      "90",
      "92"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Potenciação"
  },
  {
    "id": "macro23-002",
    "vest": "MACRO",
    "ano": 2023,
    "num": 2,
    "enunciado": "Qual é a soma dos coeficientes da expansão de (x+2)⁴ pelo Binômio de Newton?",
    "opcoes": [
      "64",
      "72",
      "81",
      "96",
      "108"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Binômio de Newton"
  },
  {
    "id": "macro23-003",
    "vest": "MACRO",
    "ano": 2023,
    "num": 3,
    "enunciado": "O determinante da matriz [[2,0,1],[1,3,–1],[0,2,4]] é:",
    "opcoes": [
      "24",
      "26",
      "28",
      "30",
      "32"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Determinante"
  },
  {
    "id": "macro23-004",
    "vest": "MACRO",
    "ano": 2023,
    "num": 4,
    "enunciado": "Qual é o valor de x em: 2log₃(x) – log₃(4) = log₃(9)?",
    "opcoes": [
      "x=3",
      "x=4",
      "x=5",
      "x=6",
      "x=7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "macro23-005",
    "vest": "MACRO",
    "ano": 2023,
    "num": 5,
    "enunciado": "Qual é a área da elipse com semi-eixos a=5 e b=3? (Use π≈3,14)",
    "opcoes": [
      "40,82 cm²",
      "45,20 cm²",
      "47,10 cm²",
      "49,50 cm²",
      "51,30 cm²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "macro23-006",
    "vest": "MACRO",
    "ano": 2023,
    "num": 6,
    "enunciado": "Numa pesquisa com 100 estudantes, a média de horas de estudo foi 4h com desvio padrão 1h. Assumindo distribuição normal, quantos estudam entre 3h e 5h (aproximadamente 68%)?",
    "opcoes": [
      "55",
      "60",
      "65",
      "68",
      "72"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística/Distribuição normal"
  },
  {
    "id": "macro23-007",
    "vest": "MACRO",
    "ano": 2023,
    "num": 7,
    "enunciado": "A equação 3x² – 5x + k = 0 tem duas raízes reais iguais. Qual é o valor de k?",
    "opcoes": [
      "25/10",
      "25/12",
      "25/14",
      "25/16",
      "25/18"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação quadrática"
  },
  {
    "id": "macro23-008",
    "vest": "MACRO",
    "ano": 2023,
    "num": 8,
    "enunciado": "O produto escalar de dois vetores é zero. Isso significa que os vetores são:",
    "opcoes": [
      "Paralelos",
      "Opostos",
      "Perpendiculares",
      "Unitários",
      "Nulos"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Vetores"
  },
  {
    "id": "macro23-009",
    "vest": "MACRO",
    "ano": 2023,
    "num": 9,
    "enunciado": "Qual é o número de diagonais de um polígono com 15 lados?",
    "opcoes": [
      "85",
      "90",
      "95",
      "100",
      "105"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Polígonos"
  },
  {
    "id": "macro23-010",
    "vest": "MACRO",
    "ano": 2023,
    "num": 10,
    "enunciado": "Uma função f(x)=3x–2 tem inversa f⁻¹(x). Qual é f⁻¹(7)?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função inversa"
  },
  {
    "id": "macro23-011",
    "vest": "MACRO",
    "ano": 2023,
    "num": 11,
    "enunciado": "Qual é o valor de i²⁰²³ sendo i a unidade imaginária?",
    "opcoes": [
      "1",
      "–1",
      "i",
      "–i",
      "0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "macro23-012",
    "vest": "MACRO",
    "ano": 2023,
    "num": 12,
    "enunciado": "A razão entre a área lateral e a área total de um cubo de aresta a é:",
    "opcoes": [
      "1/2",
      "2/3",
      "3/4",
      "4/5",
      "5/6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "macro23-013",
    "vest": "MACRO",
    "ano": 2023,
    "num": 13,
    "enunciado": "Qual é o conjunto solução de: x²–7x+12≤0?",
    "opcoes": [
      "x≤3 ou x≥4",
      "3≤x≤4",
      "x<3 ou x>4",
      "–4≤x≤–3",
      "x≤–4 ou x≥–3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Inequação quadrática"
  },
  {
    "id": "macro23-014",
    "vest": "MACRO",
    "ano": 2023,
    "num": 14,
    "enunciado": "Qual é o valor de sen(π/4) + cos(π/3)?",
    "opcoes": [
      "(√2+1)/2",
      "(√2+2)/2",
      "(2√2+1)/4",
      "(√2–1)/2",
      "√3/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "macro23-015",
    "vest": "MACRO",
    "ano": 2023,
    "num": 15,
    "enunciado": "Uma PA tem a₁=–3 e razão 4. Qual é o menor valor de n para que aₙ>100?",
    "opcoes": [
      "n=25",
      "n=26",
      "n=27",
      "n=28",
      "n=29"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro24-001",
    "vest": "MACRO",
    "ano": 2024,
    "num": 1,
    "enunciado": "Um investidor aplicou R$ 12.000,00 a juros compostos de 2,5% ao mês. Qual é o montante após 4 meses? (Use (1,025)⁴≈1,1038)",
    "opcoes": [
      "R$ 13.100,00",
      "R$ 13.200,00",
      "R$ 13.245,60",
      "R$ 13.300,00",
      "R$ 13.400,00"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Juros compostos"
  },
  {
    "id": "macro24-002",
    "vest": "MACRO",
    "ano": 2024,
    "num": 2,
    "enunciado": "Quais são as raízes da equação x³ – 6x² + 11x – 6 = 0, sabendo que x=1 é raiz?",
    "opcoes": [
      "1, 2 e 3",
      "1, –2 e –3",
      "1, 2 e –3",
      "1, –2 e 3",
      "2, 3 e 4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Polinômios"
  },
  {
    "id": "macro24-003",
    "vest": "MACRO",
    "ano": 2024,
    "num": 3,
    "enunciado": "A matriz A = [[cos θ, –sen θ],[sen θ, cos θ]] representa uma rotação de ângulo θ. Para θ=90°, qual é o determinante de A?",
    "opcoes": [
      "–1",
      "0",
      "1",
      "2",
      "–2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Matrizes / trigonometria"
  },
  {
    "id": "macro24-004",
    "vest": "MACRO",
    "ano": 2024,
    "num": 4,
    "enunciado": "Qual é o coeficiente do termo x³ na expansão de (2x+1)⁵?",
    "opcoes": [
      "40",
      "60",
      "80",
      "100",
      "120"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Binômio de Newton"
  },
  {
    "id": "macro24-005",
    "vest": "MACRO",
    "ano": 2024,
    "num": 5,
    "enunciado": "O limite lim(x→2) (x²–4)/(x–2) é igual a:",
    "opcoes": [
      "0",
      "2",
      "4",
      "6",
      "8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limites"
  },
  {
    "id": "macro24-006",
    "vest": "MACRO",
    "ano": 2024,
    "num": 6,
    "enunciado": "Qual é o valor de x em: log₂(x) + log₂(x–2) = 3?",
    "opcoes": [
      "x=3",
      "x=4",
      "x=5",
      "x=6",
      "x=7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "macro24-007",
    "vest": "MACRO",
    "ano": 2024,
    "num": 7,
    "enunciado": "Numa distribuição normal com média 60 e desvio padrão 8, qual é a probabilidade de um valor estar entre 52 e 68?",
    "opcoes": [
      "55%",
      "60%",
      "65%",
      "68%",
      "72%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "macro24-008",
    "vest": "MACRO",
    "ano": 2024,
    "num": 8,
    "enunciado": "Os vetores u=(2,3) e v=(k,–2) são perpendiculares. Qual é o valor de k?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Vetores"
  },
  {
    "id": "macro24-009",
    "vest": "MACRO",
    "ano": 2024,
    "num": 9,
    "enunciado": "Qual é a solução da equação trigonométrica sen(x)=√3/2 para 0°≤x≤360°?",
    "opcoes": [
      "x=30° e x=150°",
      "x=60° e x=120°",
      "x=45° e x=135°",
      "x=30° e x=120°",
      "x=60° e x=150°"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "macro24-010",
    "vest": "MACRO",
    "ano": 2024,
    "num": 10,
    "enunciado": "Qual é a área da região limitada pela parábola y=x² e a reta y=4? (Cálculo integral)",
    "opcoes": [
      "8/3 u²",
      "10/3 u²",
      "16/3 u²",
      "20/3 u²",
      "32/3 u²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral"
  },
  {
    "id": "macro24-011",
    "vest": "MACRO",
    "ano": 2024,
    "num": 11,
    "enunciado": "Quais são os valores de k para que a reta y=kx+2 seja tangente à parábola y=x²?",
    "opcoes": [
      "k=±1",
      "k=±2",
      "k=±3",
      "k=±4",
      "k=±5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Tangência"
  },
  {
    "id": "macro24-012",
    "vest": "MACRO",
    "ano": 2024,
    "num": 12,
    "enunciado": "Um número complexo z = 3 + 4i tem módulo:",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "macro24-013",
    "vest": "MACRO",
    "ano": 2024,
    "num": 13,
    "enunciado": "Qual é a soma dos termos da PA de razão 6 cujo primeiro termo é 2 e o último é 50?",
    "opcoes": [
      "182",
      "196",
      "208",
      "216",
      "224"
    ],
    "materia": "Matemática",
    "serie": 3
  },
  {
    "id": "macro24-014",
    "vest": "MACRO",
    "ano": 2024,
    "num": 14,
    "enunciado": "Qual é a imagem do ponto P(2,5) numa homotetia de centro na origem e razão –1/2?",
    "opcoes": [
      "(–1,–2,5)",
      "(–2,–5)",
      "(1,2,5)",
      "(4,10)",
      "(–4,–10)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Homotetia"
  },
  {
    "id": "macro24-015",
    "vest": "MACRO",
    "ano": 2024,
    "num": 15,
    "enunciado": "Qual é o valor de x em: 3^(x+2) – 3^x = 24?",
    "opcoes": [
      "x=0",
      "x=1",
      "x=2",
      "x=3",
      "x=4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "psc1-15-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 1,
    "enunciado": "Uma pizzaria vendeu 240 pizzas em um dia. Se 3/8 eram de calabresa, quantas pizzas de calabresa foram vendidas?",
    "opcoes": [
      "80",
      "85",
      "90",
      "95",
      "100"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Frações"
  },
  {
    "id": "psc1-15-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 2,
    "enunciado": "Um estudante gastou R$ 45,00 em material escolar, representando 30% do seu dinheiro. Quanto dinheiro ele tinha?",
    "opcoes": [
      "R$ 120,00",
      "R$ 135,00",
      "R$ 150,00",
      "R$ 165,00",
      "R$ 180,00"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-15-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 3,
    "enunciado": "Qual é o valor de x em: 5x – 8 = 3x + 10?",
    "opcoes": [
      "x=6",
      "x=7",
      "x=8",
      "x=9",
      "x=10"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação do 1º grau"
  },
  {
    "id": "psc1-15-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 4,
    "enunciado": "Um terreno quadrado tem perímetro de 72 m. Qual é a área desse terreno?",
    "opcoes": [
      "256 m²",
      "289 m²",
      "324 m²",
      "361 m²",
      "400 m²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "psc1-15-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 5,
    "enunciado": "Um triângulo retângulo tem catetos de 8 cm e 15 cm. Qual é a hipotenusa?",
    "opcoes": [
      "16 cm",
      "17 cm",
      "18 cm",
      "19 cm",
      "20 cm"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Pitágoras"
  },
  {
    "id": "psc1-15-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 6,
    "enunciado": "Uma urna tem 5 bolas amarelas e 3 bolas pretas. Retira-se uma bola ao acaso. Qual é a probabilidade de ser preta?",
    "opcoes": [
      "1/8",
      "2/8",
      "3/8",
      "4/8",
      "5/8"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "psc1-15-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 7,
    "enunciado": "O produto de dois números consecutivos é 182. Quais são esses números?",
    "opcoes": [
      "12 e 13",
      "13 e 14",
      "14 e 15",
      "15 e 16",
      "16 e 17"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação"
  },
  {
    "id": "psc1-15-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 8,
    "enunciado": "A temperatura em Manaus pela manhã era 26°C e à tarde subiu 8°C. À noite caiu 5°C. Qual foi a temperatura final?",
    "opcoes": [
      "27°C",
      "28°C",
      "29°C",
      "30°C",
      "31°C"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Operações"
  },
  {
    "id": "psc1-15-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 9,
    "enunciado": "Simplificando a expressão 6(x+2) – 2(x–3), obtém-se:",
    "opcoes": [
      "4x+6",
      "4x+18",
      "4x+12",
      "8x+6",
      "4x+24"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Álgebra"
  },
  {
    "id": "psc1-15-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2015,
    "num": 10,
    "enunciado": "Numa turma de 30 alunos, a média de altura é 1,65 m. Se um aluno de 1,95 m entrar na turma, qual é a nova média aproximada?",
    "opcoes": [
      "1,65 m",
      "1,66 m",
      "1,67 m",
      "1,68 m",
      "1,69 m"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Média"
  },
  {
    "id": "psc1-16-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 1,
    "enunciado": "Um carro percorre 360 km com 30 litros de combustível. Quantos litros serão necessários para percorrer 480 km?",
    "opcoes": [
      "36 L",
      "38 L",
      "40 L",
      "42 L",
      "44 L"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Regra de três"
  },
  {
    "id": "psc1-16-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 2,
    "enunciado": "O dobro de um número diminuído de 7 é igual a 25. Qual é esse número?",
    "opcoes": [
      "14",
      "15",
      "16",
      "17",
      "18"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação do 1º grau"
  },
  {
    "id": "psc1-16-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 3,
    "enunciado": "Uma caixa retangular tem 5 m de comprimento, 3 m de largura e 2 m de altura. Qual é o volume?",
    "opcoes": [
      "20 m³",
      "25 m³",
      "28 m³",
      "30 m³",
      "35 m³"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Volume"
  },
  {
    "id": "psc1-16-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 4,
    "enunciado": "Numa promoção, um tênis com preço original de R$ 200,00 está com 25% de desconto. Qual é o preço promocional?",
    "opcoes": [
      "R$ 140,00",
      "R$ 145,00",
      "R$ 148,00",
      "R$ 150,00",
      "R$ 155,00"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-16-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 5,
    "enunciado": "Um polígono regular tem 6 lados. Qual é a soma dos seus ângulos internos?",
    "opcoes": [
      "540°",
      "600°",
      "660°",
      "720°",
      "780°"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Polígonos"
  },
  {
    "id": "psc1-16-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 6,
    "enunciado": "Numa classe de 25 alunos, 40% são meninos. Quantas meninas há na classe?",
    "opcoes": [
      "12",
      "13",
      "14",
      "15",
      "16"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-16-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 7,
    "enunciado": "A soma de três números consecutivos pares é 54. Qual é o maior deles?",
    "opcoes": [
      "16",
      "18",
      "20",
      "22",
      "24"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação"
  },
  {
    "id": "psc1-16-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 8,
    "enunciado": "Dois ângulos suplementares têm medidas na razão 2:3. Qual é o maior ângulo?",
    "opcoes": [
      "96°",
      "100°",
      "104°",
      "108°",
      "112°"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Ângulos"
  },
  {
    "id": "psc1-16-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 9,
    "enunciado": "Um mapa com escala 1:50.000 mostra dois pontos separados por 6 cm. Qual é a distância real em km?",
    "opcoes": [
      "2 km",
      "2,5 km",
      "3 km",
      "3,5 km",
      "4 km"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Escala"
  },
  {
    "id": "psc1-16-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2016,
    "num": 10,
    "enunciado": "Qual é o valor de 2³ + 3² – √25?",
    "opcoes": [
      "10",
      "11",
      "12",
      "13",
      "14"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Potenciação"
  },
  {
    "id": "psc1-17-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 1,
    "enunciado": "Uma loja vendeu 180 produtos em janeiro. Em fevereiro, as vendas cresceram 20%. Quantos produtos foram vendidos em fevereiro?",
    "opcoes": [
      "200",
      "210",
      "214",
      "216",
      "220"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-17-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 2,
    "enunciado": "Qual é o valor de x na equação: (x+3)/2 = (x–1)/3 + 2?",
    "opcoes": [
      "x=5",
      "x=6",
      "x=7",
      "x=8",
      "x=9"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação fracionária"
  },
  {
    "id": "psc1-17-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 3,
    "enunciado": "A diagonal de um quadrado mede 10 cm. Qual é a área do quadrado?",
    "opcoes": [
      "40 cm²",
      "45 cm²",
      "50 cm²",
      "55 cm²",
      "60 cm²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "psc1-17-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 4,
    "enunciado": "Numa caixa com 4 bolas vermelhas, 3 azuis e 5 brancas, qual é a probabilidade de sortear uma bola que NÃO seja branca?",
    "opcoes": [
      "5/12",
      "6/12",
      "7/12",
      "8/12",
      "9/12"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "psc1-17-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 5,
    "enunciado": "Qual é o MDC e o MMC de 12 e 18?",
    "opcoes": [
      "MDC=3 e MMC=36",
      "MDC=6 e MMC=36",
      "MDC=6 e MMC=24",
      "MDC=3 e MMC=24",
      "MDC=6 e MMC=18"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: MDC e MMC"
  },
  {
    "id": "psc1-17-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 6,
    "enunciado": "O perímetro de um retângulo é 56 cm. Se o comprimento é o dobro da largura, qual é a área?",
    "opcoes": [
      "200 cm²",
      "220 cm²",
      "240 cm²",
      "252 cm²",
      "264 cm²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "psc1-17-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 7,
    "enunciado": "Um número inteiro positivo é divisível por 2, 3 e 5. Qual é o menor número com essa característica?",
    "opcoes": [
      "20",
      "25",
      "30",
      "35",
      "40"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: MMC"
  },
  {
    "id": "psc1-17-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 8,
    "enunciado": "Uma torneira enche um tanque de 400 litros em 8 horas. Quantos litros são enchidos por hora?",
    "opcoes": [
      "40 L/h",
      "45 L/h",
      "50 L/h",
      "55 L/h",
      "60 L/h"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Razão"
  },
  {
    "id": "psc1-17-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 9,
    "enunciado": "Qual é o valor da expressão numérica: 4² – (3+1)² + √36?",
    "opcoes": [
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Expressões numéricas"
  },
  {
    "id": "psc1-17-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2017,
    "num": 10,
    "enunciado": "João tem o triplo da idade de Maria. Daqui a 5 anos, a soma das idades será 40. Qual é a idade atual de João?",
    "opcoes": [
      "20 anos",
      "21 anos",
      "22 anos",
      "23 anos",
      "24 anos"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Sistema de equações"
  },
  {
    "id": "psc1-18-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 1,
    "enunciado": "Uma piscina retangular tem 8 m de comprimento, 4 m de largura e 1,5 m de profundidade. Qual é o volume de água para enchê-la completamente?",
    "opcoes": [
      "40 m³",
      "44 m³",
      "46 m³",
      "48 m³",
      "52 m³"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Volume"
  },
  {
    "id": "psc1-18-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 2,
    "enunciado": "A soma de dois números é 95 e a diferença é 17. Qual é o maior número?",
    "opcoes": [
      "52",
      "54",
      "56",
      "58",
      "60"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Sistema de equações"
  },
  {
    "id": "psc1-18-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 3,
    "enunciado": "Um estudante acertou 18 de 25 questões numa prova. Qual foi seu percentual de acerto?",
    "opcoes": [
      "68%",
      "70%",
      "72%",
      "74%",
      "76%"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-18-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 4,
    "enunciado": "Qual é a área de um círculo com diâmetro de 14 cm? (Use π≈3,14)",
    "opcoes": [
      "143,07 cm²",
      "148,72 cm²",
      "153,86 cm²",
      "158,40 cm²",
      "163,28 cm²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "psc1-18-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 5,
    "enunciado": "Um número é aumentado em 40% e depois reduzido em 40%. Qual é a variação percentual total?",
    "opcoes": [
      "0%",
      "–8%",
      "–10%",
      "–12%",
      "–16%"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem composta"
  },
  {
    "id": "psc1-18-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 6,
    "enunciado": "Numa fábrica, 3 máquinas produzem 270 peças por hora. Quantas peças 7 máquinas produzem em 4 horas?",
    "opcoes": [
      "2.400",
      "2.450",
      "2.480",
      "2.500",
      "2.520"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Regra de três composta"
  },
  {
    "id": "psc1-18-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 7,
    "enunciado": "Qual é o valor de x em: 2(x–3) + 4 = 3(x+1) – 5?",
    "opcoes": [
      "x=–1",
      "x=0",
      "x=1",
      "x=2",
      "x=3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação"
  },
  {
    "id": "psc1-18-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 8,
    "enunciado": "Em um triângulo, os ângulos estão na razão 2:3:5. Qual é o maior ângulo?",
    "opcoes": [
      "72°",
      "80°",
      "88°",
      "90°",
      "96°"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Ângulos"
  },
  {
    "id": "psc1-18-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 9,
    "enunciado": "Uma mercearia comprou 150 kg de arroz por R$ 210,00. Por quanto deve vender o kg para obter 30% de lucro?",
    "opcoes": [
      "R$ 1,72",
      "R$ 1,80",
      "R$ 1,82",
      "R$ 1,90",
      "R$ 1,96"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-18-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2018,
    "num": 10,
    "enunciado": "Qual é o número de faces, arestas e vértices de um cubo?",
    "opcoes": [
      "6 faces, 10 arestas e 8 vértices",
      "6 faces, 12 arestas e 8 vértices",
      "8 faces, 12 arestas e 6 vértices",
      "6 faces, 12 arestas e 6 vértices",
      "8 faces, 10 arestas e 8 vértices"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "psc1-19-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 1,
    "enunciado": "Um estudante lê 45 páginas por dia. Após quantos dias terá lido um livro de 360 páginas?",
    "opcoes": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Divisão"
  },
  {
    "id": "psc1-19-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 2,
    "enunciado": "O preço de uma blusa aumentou de R$ 60,00 para R$ 78,00. Qual foi o percentual de aumento?",
    "opcoes": [
      "25%",
      "28%",
      "30%",
      "32%",
      "35%"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-19-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 3,
    "enunciado": "Qual é o valor da expressão: (–2)³ + (–3)² – (–1)⁴?",
    "opcoes": [
      "–8",
      "–2",
      "0",
      "2",
      "8"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Potenciação"
  },
  {
    "id": "psc1-19-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 4,
    "enunciado": "Um tanque cilíndrico tem raio 2 m e altura 3 m. Qual é o volume? (Use π≈3,14)",
    "opcoes": [
      "36,68 m³",
      "37,68 m³",
      "38,68 m³",
      "39,68 m³",
      "40,68 m³"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Volume do cilindro"
  },
  {
    "id": "psc1-19-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 5,
    "enunciado": "Numa classe, 60% dos alunos são aprovados. Se 24 alunos foram aprovados, quantos alunos há na classe?",
    "opcoes": [
      "35",
      "38",
      "40",
      "42",
      "45"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-19-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 6,
    "enunciado": "A base de um triângulo mede 12 cm e sua altura mede 9 cm. Qual é a área?",
    "opcoes": [
      "48 cm²",
      "50 cm²",
      "52 cm²",
      "54 cm²",
      "56 cm²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Área do triângulo"
  },
  {
    "id": "psc1-19-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 7,
    "enunciado": "Se a+b=10 e a–b=4, qual é o valor de a²–b²?",
    "opcoes": [
      "36",
      "38",
      "40",
      "42",
      "44"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Produtos notáveis"
  },
  {
    "id": "psc1-19-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 8,
    "enunciado": "Uma caixa d'água cúbica tem 2,5 m de aresta. Quantos litros ela comporta? (1 m³=1.000 L)",
    "opcoes": [
      "13.250 L",
      "14.500 L",
      "15.000 L",
      "15.625 L",
      "16.000 L"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Volume"
  },
  {
    "id": "psc1-19-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 9,
    "enunciado": "Dois ângulos complementares têm medidas na razão 1:4. Qual é o maior ângulo?",
    "opcoes": [
      "64°",
      "68°",
      "72°",
      "76°",
      "80°"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Ângulos"
  },
  {
    "id": "psc1-19-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2019,
    "num": 10,
    "enunciado": "Qual é o valor de x em: x/4 + x/3 = 14?",
    "opcoes": [
      "x=20",
      "x=22",
      "x=24",
      "x=26",
      "x=28"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação fracionária"
  },
  {
    "id": "psc1-20-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 1,
    "enunciado": "Uma família gasta 35% do salário com alimentação, 20% com aluguel e o restante com outras despesas. Se o salário é R$ 4.000,00, quanto sobra para outras despesas?",
    "opcoes": [
      "R$ 1.600,00",
      "R$ 1.700,00",
      "R$ 1.800,00",
      "R$ 1.900,00",
      "R$ 2.000,00"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-20-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 2,
    "enunciado": "Qual é o conjunto dos divisores comuns de 24 e 36?",
    "opcoes": [
      "{1,2,3,4,6,8,12}",
      "{1,2,3,4,6,12}",
      "{1,2,4,6,12}",
      "{2,3,4,6,12}",
      "{1,2,3,6,12}"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Divisores"
  },
  {
    "id": "psc1-20-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 3,
    "enunciado": "Um retângulo tem área de 252 cm² e comprimento de 18 cm. Qual é o perímetro?",
    "opcoes": [
      "58 cm",
      "60 cm",
      "62 cm",
      "64 cm",
      "66 cm"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "psc1-20-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 4,
    "enunciado": "Numa escola com 500 alunos, 55% são do ensino fundamental. Quantos são do ensino médio?",
    "opcoes": [
      "200",
      "210",
      "220",
      "225",
      "230"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-20-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 5,
    "enunciado": "Qual é o valor de x em: 3x + 2(x – 4) = 5x – 1?",
    "opcoes": [
      "x=–7",
      "x=–3,5",
      "x=0",
      "x=3,5",
      "x=7"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação"
  },
  {
    "id": "psc1-20-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 6,
    "enunciado": "Num triângulo isósceles, os ângulos da base medem 50° cada. Qual é o ângulo do vértice?",
    "opcoes": [
      "70°",
      "75°",
      "80°",
      "85°",
      "90°"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Triângulos"
  },
  {
    "id": "psc1-20-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 7,
    "enunciado": "Um dado é lançado duas vezes. Qual é a probabilidade de a soma dos resultados ser 10?",
    "opcoes": [
      "1/12",
      "2/12",
      "3/12",
      "4/12",
      "5/12"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "psc1-20-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 8,
    "enunciado": "A expressão (x+5)² expandida é:",
    "opcoes": [
      "x²+5",
      "x²+10x+25",
      "x²+25",
      "x²+10x",
      "x²+5x+25"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Produtos notáveis"
  },
  {
    "id": "psc1-20-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 9,
    "enunciado": "Um viajante percorre 2/5 do trajeto no primeiro dia e 1/3 no segundo. Que fração ainda falta percorrer?",
    "opcoes": [
      "2/15",
      "4/15",
      "6/15",
      "8/15",
      "10/15"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Frações"
  },
  {
    "id": "psc1-20-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2020,
    "num": 10,
    "enunciado": "Qual é o valor de x em: √(2x+1) = 5?",
    "opcoes": [
      "x=10",
      "x=11",
      "x=12",
      "x=13",
      "x=14"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação com radical"
  },
  {
    "id": "psc1-21-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 1,
    "enunciado": "Um comerciante comprou 80 kg de manga a R$ 2,50/kg e vendeu a R$ 3,80/kg. Qual foi o lucro total?",
    "opcoes": [
      "R$ 96,00",
      "R$ 100,00",
      "R$ 104,00",
      "R$ 108,00",
      "R$ 112,00"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Operações"
  },
  {
    "id": "psc1-21-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 2,
    "enunciado": "Qual é o valor de x em: 4(x+2) – 3(x–1) = 20?",
    "opcoes": [
      "x=7",
      "x=8",
      "x=9",
      "x=10",
      "x=11"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação"
  },
  {
    "id": "psc1-21-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 3,
    "enunciado": "Uma caixa tem formato de prisma retangular com base 6×4 cm e altura 5 cm. Qual é a área total da superfície?",
    "opcoes": [
      "140 cm²",
      "144 cm²",
      "148 cm²",
      "152 cm²",
      "156 cm²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "psc1-21-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 4,
    "enunciado": "Em uma turma, a razão entre aprovados e reprovados é 7:3. Se há 120 alunos, quantos foram aprovados?",
    "opcoes": [
      "72",
      "78",
      "82",
      "84",
      "90"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Razão e proporção"
  },
  {
    "id": "psc1-21-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 5,
    "enunciado": "Qual é o resultado de (3x – 2)(3x + 2)?",
    "opcoes": [
      "9x²–4",
      "9x²+4",
      "6x²–4",
      "9x²–12x+4",
      "9x²+12x+4"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Produtos notáveis"
  },
  {
    "id": "psc1-21-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 6,
    "enunciado": "Uma chaleira aquece 1,5 litros de água em 4 minutos. Em quantos minutos aquecerá 6 litros?",
    "opcoes": [
      "12 min",
      "14 min",
      "16 min",
      "18 min",
      "20 min"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Regra de três"
  },
  {
    "id": "psc1-21-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 7,
    "enunciado": "O MMC de 15, 20 e 30 é:",
    "opcoes": [
      "30",
      "40",
      "50",
      "60",
      "70"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: MMC"
  },
  {
    "id": "psc1-21-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 8,
    "enunciado": "Num grupo de 40 jovens, 25% praticam natação, 40% praticam futebol e os demais não praticam esporte. Quantos não praticam esporte?",
    "opcoes": [
      "12",
      "13",
      "14",
      "15",
      "16"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-21-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 9,
    "enunciado": "Qual é a área de um trapézio com bases 14 cm e 8 cm e altura 6 cm?",
    "opcoes": [
      "60 cm²",
      "62 cm²",
      "64 cm²",
      "66 cm²",
      "68 cm²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Área do trapézio"
  },
  {
    "id": "psc1-21-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2021,
    "num": 10,
    "enunciado": "Qual é o valor de x em: |x – 5| = 3?",
    "opcoes": [
      "x=2 ou x=7",
      "x=2 ou x=8",
      "x=1 ou x=8",
      "x=3 ou x=7",
      "x=2 ou x=9"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação modular"
  },
  {
    "id": "psc1-22-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 1,
    "enunciado": "Uma loja tem 360 produtos em estoque. Se 5/9 são roupas, quantos produtos NÃO são roupas?",
    "opcoes": [
      "140",
      "150",
      "155",
      "160",
      "165"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Frações"
  },
  {
    "id": "psc1-22-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 2,
    "enunciado": "Fatorando x² – 9x + 20, obtemos:",
    "opcoes": [
      "(x–4)(x–5)",
      "(x+4)(x+5)",
      "(x–4)(x+5)",
      "(x+4)(x–5)",
      "(x–2)(x–10)"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Fatoração"
  },
  {
    "id": "psc1-22-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 3,
    "enunciado": "A velocidade média de um carro em uma viagem foi 80 km/h. Se a viagem durou 3h30min, qual foi a distância percorrida?",
    "opcoes": [
      "260 km",
      "270 km",
      "275 km",
      "280 km",
      "285 km"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Velocidade"
  },
  {
    "id": "psc1-22-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 4,
    "enunciado": "O perímetro de um triângulo equilátero é 39 cm. Qual é o comprimento de cada lado?",
    "opcoes": [
      "11 cm",
      "12 cm",
      "13 cm",
      "14 cm",
      "15 cm"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Polígono"
  },
  {
    "id": "psc1-22-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 5,
    "enunciado": "Se x = –2 e y = 3, qual é o valor de 2x² – 3y + x?",
    "opcoes": [
      "–3",
      "–1",
      "1",
      "3",
      "5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Expressões algébricas"
  },
  {
    "id": "psc1-22-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 6,
    "enunciado": "Numa prateleira com 5 livros de matemática e 3 de física, de quantas maneiras podem ser arranjados os livros de matemática em sequência?",
    "opcoes": [
      "60",
      "80",
      "100",
      "120",
      "140"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Permutação"
  },
  {
    "id": "psc1-22-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 7,
    "enunciado": "Qual é o valor de: 3/4 ÷ 9/16?",
    "opcoes": [
      "3/4",
      "4/3",
      "27/64",
      "1/3",
      "2/3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Frações"
  },
  {
    "id": "psc1-22-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 8,
    "enunciado": "Um quadrado tem área de 196 cm². Qual é o seu perímetro?",
    "opcoes": [
      "52 cm",
      "54 cm",
      "56 cm",
      "58 cm",
      "60 cm"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "psc1-22-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 9,
    "enunciado": "Três amigos dividem uma conta de R$ 210,00 nas proporções 2:3:5. Quanto paga o que tem maior parte?",
    "opcoes": [
      "R$ 90,00",
      "R$ 95,00",
      "R$ 100,00",
      "R$ 105,00",
      "R$ 110,00"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Proporção"
  },
  {
    "id": "psc1-22-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2022,
    "num": 10,
    "enunciado": "Qual é o resultado de: √(144) + ³√(27) – 2⁴?",
    "opcoes": [
      "–1",
      "0",
      "1",
      "2",
      "3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Radiciação e potenciação"
  },
  {
    "id": "psc1-23-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 1,
    "enunciado": "Um funcionário recebe R$ 2.800,00 de salário e tem descontos de 11% de INSS e 7,5% de IR. Qual é o salário líquido?",
    "opcoes": [
      "R$ 2.282,00",
      "R$ 2.296,00",
      "R$ 2.310,00",
      "R$ 2.324,00",
      "R$ 2.338,00"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-23-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 2,
    "enunciado": "A expressão algébrica (2x+3)² – (2x–3)² simplificada é:",
    "opcoes": [
      "12x",
      "18x",
      "24x",
      "30x",
      "36x"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Produtos notáveis"
  },
  {
    "id": "psc1-23-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 3,
    "enunciado": "Uma pista de corrida tem formato circular com raio de 50 m. Qual é a distância percorrida em 5 voltas? (Use π≈3,14)",
    "opcoes": [
      "1.450 m",
      "1.500 m",
      "1.550 m",
      "1.570 m",
      "1.600 m"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Circunferência"
  },
  {
    "id": "psc1-23-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 4,
    "enunciado": "Num bairro com 2.500 moradores, 48% são mulheres. Quantos homens há no bairro?",
    "opcoes": [
      "1.250",
      "1.280",
      "1.290",
      "1.300",
      "1.310"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-23-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 5,
    "enunciado": "Qual é o valor de x em: 2x² = 50?",
    "opcoes": [
      "x=±4",
      "x=±5",
      "x=±6",
      "x=±7",
      "x=±8"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação do 2º grau"
  },
  {
    "id": "psc1-23-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 6,
    "enunciado": "Um cubo tem aresta de 5 cm. Qual é o volume e a área total?",
    "opcoes": [
      "V=100 cm³ e AT=125 cm²",
      "V=125 cm³ e AT=150 cm²",
      "V=125 cm³ e AT=160 cm²",
      "V=125 cm³ e AT=150 cm²",
      "V=150 cm³ e AT=150 cm²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "psc1-23-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 7,
    "enunciado": "Numa sala há 15 meninas e 10 meninos. Sorteando um aluno, qual é a probabilidade de ser menina?",
    "opcoes": [
      "1/5",
      "2/5",
      "3/5",
      "4/5",
      "1/3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "psc1-23-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 8,
    "enunciado": "Qual é o menor inteiro positivo que, dividido por 4, 6 e 9, deixa sempre resto 1?",
    "opcoes": [
      "35",
      "37",
      "37",
      "37",
      "37"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: MMC"
  },
  {
    "id": "psc1-23-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 9,
    "enunciado": "Um retângulo tem lados (x+3) cm e (x–1) cm. Se a área é 40 cm², qual é o valor de x?",
    "opcoes": [
      "x=5",
      "x=6",
      "x=7",
      "x=8",
      "x=9"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação do 2º grau"
  },
  {
    "id": "psc1-23-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2023,
    "num": 10,
    "enunciado": "A soma de n termos de uma PA é dada por Sₙ = n(n+1)/2. Qual é S₁₀?",
    "opcoes": [
      "45",
      "50",
      "55",
      "60",
      "65"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "psc1-24-001",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 1,
    "enunciado": "Uma torneira pinga 2 litros por hora. Em quantos dias ela desperdiçará 120 litros?",
    "opcoes": [
      "2 dias",
      "2,5 dias",
      "3 dias",
      "3,5 dias",
      "4 dias"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Razão"
  },
  {
    "id": "psc1-24-002",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 2,
    "enunciado": "Fatorando completamente a expressão 3x² – 12, obtemos:",
    "opcoes": [
      "3(x–2)(x+2)",
      "3(x²–4)",
      "3(x–4)(x+4)",
      "(3x–6)(x+2)",
      "3x(x–4)"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Fatoração"
  },
  {
    "id": "psc1-24-003",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 3,
    "enunciado": "Um celular custa R$ 1.800,00 à vista ou em 12 parcelas de R$ 175,00. Qual é o acréscimo percentual no parcelamento?",
    "opcoes": [
      "14,3%",
      "15,5%",
      "16,7%",
      "17,8%",
      "18,9%"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Porcentagem"
  },
  {
    "id": "psc1-24-004",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 4,
    "enunciado": "Qual é a área de um setor circular com raio 10 cm e ângulo central de 90°? (Use π≈3,14)",
    "opcoes": [
      "72,50 cm²",
      "75,86 cm²",
      "78,50 cm²",
      "81,64 cm²",
      "84,78 cm²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Setor circular"
  },
  {
    "id": "psc1-24-005",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 5,
    "enunciado": "O número 720 é divisível por todos os números abaixo, EXCETO:",
    "opcoes": [
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Divisibilidade"
  },
  {
    "id": "psc1-24-006",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 6,
    "enunciado": "Dois pontos A(1,2) e B(4,6) formam um segmento. Qual é o comprimento de AB?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria analítica / Pitágoras"
  },
  {
    "id": "psc1-24-007",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 7,
    "enunciado": "Uma quadra esportiva retangular tem 28 m de comprimento e 15 m de largura. Qual é a área total de piso a ser pintado?",
    "opcoes": [
      "380 m²",
      "400 m²",
      "410 m²",
      "420 m²",
      "440 m²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Área"
  },
  {
    "id": "psc1-24-008",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 8,
    "enunciado": "Qual é o valor de x em: (x+2)/3 – (x–1)/2 = 1?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=3",
      "x=4",
      "x=5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação fracionária"
  },
  {
    "id": "psc1-24-009",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 9,
    "enunciado": "Numa sequência, cada termo é o triplo do anterior. Se o 1º termo é 2, qual é o 5º termo?",
    "opcoes": [
      "108",
      "126",
      "144",
      "162",
      "180"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "psc1-24-010",
    "vest": "PSC",
    "etapa": 1,
    "ano": 2024,
    "num": 10,
    "enunciado": "Um saco contém 6 bolas numeradas de 1 a 6. Retirando duas bolas sem reposição, qual é a probabilidade de a soma ser 7?",
    "opcoes": [
      "1/5",
      "2/5",
      "3/5",
      "4/5",
      "1/3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "psc2-15-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 1,
    "enunciado": "Um táxi cobra R$ 5,50 de bandeirada mais R$ 2,20 por km rodado. Qual é o valor da corrida para 12 km?",
    "opcoes": [
      "R$ 29,50",
      "R$ 30,40",
      "R$ 31,90",
      "R$ 32,80",
      "R$ 33,70"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-15-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 2,
    "enunciado": "A função quadrática f(x) = x² – 6x + 8 tem raízes em:",
    "opcoes": [
      "x=1 e x=8",
      "x=2 e x=4",
      "x=–2 e x=–4",
      "x=–2 e x=4",
      "x=2 e x=–4"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-15-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 3,
    "enunciado": "Numa PA, o 1º termo é 3 e a razão é 4. Qual é o 8º termo?",
    "opcoes": [
      "29",
      "30",
      "31",
      "32",
      "33"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-15-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 4,
    "enunciado": "Dois triângulos semelhantes têm lados correspondentes de 6 cm e 9 cm. Se a área do menor é 24 cm², qual é a área do maior?",
    "opcoes": [
      "48 cm²",
      "50 cm²",
      "52 cm²",
      "54 cm²",
      "56 cm²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Semelhança"
  },
  {
    "id": "psc2-15-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 5,
    "enunciado": "No triângulo retângulo, o ângulo A mede 30° e o cateto adjacente a A mede 8√3 cm. Qual é o cateto oposto? (tg30°=√3/3)",
    "opcoes": [
      "6 cm",
      "7 cm",
      "8 cm",
      "9 cm",
      "10 cm"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-15-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 6,
    "enunciado": "A solução do sistema { 3x+y=11 e x–2y=0 } é:",
    "opcoes": [
      "(2,5)",
      "(3,2)",
      "(4,–1)",
      "(2,3)",
      "(1,8)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Sistemas"
  },
  {
    "id": "psc2-15-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 7,
    "enunciado": "Uma PG tem a₁=4 e q=3. Qual é o produto a₁×a₂×a₃?",
    "opcoes": [
      "432",
      "480",
      "512",
      "576",
      "624"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-15-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 8,
    "enunciado": "O gráfico de f(x)=ax²+bx+c tem vértice em (3,–4) e a>0. Qual é o valor mínimo da função?",
    "opcoes": [
      "–6",
      "–5",
      "–4",
      "–3",
      "–2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-15-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 9,
    "enunciado": "Pelo Teorema de Tales, se uma reta paralela a um lado de um triângulo divide os outros dois lados proporcionalmente, e os segmentos são 6, 9 e x, qual é x se o quarto segmento é 12?",
    "opcoes": [
      "6",
      "8",
      "10",
      "12",
      "14"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Tales"
  },
  {
    "id": "psc2-15-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2015,
    "num": 10,
    "enunciado": "Qual é a soma dos 15 primeiros termos da PA: 5, 8, 11, 14, ...?",
    "opcoes": [
      "320",
      "345",
      "360",
      "375",
      "390"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-16-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 1,
    "enunciado": "Uma função afim f(x)=3x–7 tem zero (raiz) em:",
    "opcoes": [
      "x=5/3",
      "x=7/3",
      "x=3/7",
      "x=7",
      "x=3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-16-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 2,
    "enunciado": "A função f(x) = –2x² + 8x – 6 tem valor máximo de:",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-16-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 3,
    "enunciado": "Numa PG, a₁=2 e a₄=54. Qual é a razão q?",
    "opcoes": [
      "q=2",
      "q=3",
      "q=4",
      "q=5",
      "q=6"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-16-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 4,
    "enunciado": "Dois postes têm alturas de 4 m e 6 m e estão a 10 m de distância. Seus topos são ligados por um fio. Qual é o comprimento do fio?",
    "opcoes": [
      "10,2 m",
      "10,5 m",
      "10,8 m",
      "11,0 m",
      "11,2 m"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Pitágoras"
  },
  {
    "id": "psc2-16-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 5,
    "enunciado": "Numa classe, a média de notas é 7,2 com 25 alunos. Se dois alunos com notas 5,0 e 6,0 saem, qual é a nova média? (Arredonde para 2 casas)",
    "opcoes": [
      "7,38",
      "7,42",
      "7,46",
      "7,50",
      "7,54"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Média"
  },
  {
    "id": "psc2-16-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 6,
    "enunciado": "O seno de um ângulo agudo é 0,6. Qual é o cosseno desse mesmo ângulo?",
    "opcoes": [
      "0,6",
      "0,7",
      "0,8",
      "0,9",
      "1,0"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-16-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 7,
    "enunciado": "Um segmento de reta é dividido pelo Teorema de Tales em partes de 5 cm e 8 cm. O segmento paralelo ao lado do triângulo divide o outro lado em partes de 10 cm e x. Qual é x?",
    "opcoes": [
      "12 cm",
      "14 cm",
      "16 cm",
      "18 cm",
      "20 cm"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Tales"
  },
  {
    "id": "psc2-16-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 8,
    "enunciado": "Qual é o discriminante (Δ) da equação 2x² – 5x + 3 = 0 e quantas raízes reais ela tem?",
    "opcoes": [
      "Δ=1; 2 raízes reais",
      "Δ=1; 1 raiz real",
      "Δ=–1; sem raízes",
      "Δ=4; 2 raízes reais",
      "Δ=0; 1 raiz real"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Equação quadrática"
  },
  {
    "id": "psc2-16-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 9,
    "enunciado": "Um capital de R$ 3.000,00 foi aplicado a juros simples de 2% ao mês. Após 6 meses, qual é o montante?",
    "opcoes": [
      "R$ 3.300,00",
      "R$ 3.320,00",
      "R$ 3.340,00",
      "R$ 3.360,00",
      "R$ 3.380,00"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Juros simples"
  },
  {
    "id": "psc2-16-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2016,
    "num": 10,
    "enunciado": "Quantos termos tem a PA: 3, 7, 11, ..., 99?",
    "opcoes": [
      "22",
      "23",
      "24",
      "25",
      "26"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-17-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 1,
    "enunciado": "Uma função afim tem f(2)=9 e f(5)=18. Qual é o coeficiente angular?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-17-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 2,
    "enunciado": "As raízes da equação x²–7x+12=0 são x₁ e x₂. Qual é x₁+x₂ e x₁×x₂?",
    "opcoes": [
      "soma=7 e produto=12",
      "soma=–7 e produto=12",
      "soma=7 e produto=–12",
      "soma=12 e produto=7",
      "soma=–12 e produto=7"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Relações de Girard"
  },
  {
    "id": "psc2-17-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 3,
    "enunciado": "Uma PG infinita tem a₁=20 e q=1/4. Qual é a soma de todos os termos?",
    "opcoes": [
      "24",
      "26",
      "28",
      "30",
      "32"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "psc2-17-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 4,
    "enunciado": "Um observador a 30 m de distância de um prédio vê o topo com ângulo de elevação de 60°. Qual é a altura do prédio? (tg60°=√3≈1,73)",
    "opcoes": [
      "48,9 m",
      "50,0 m",
      "51,9 m",
      "52,8 m",
      "54,0 m"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-17-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 5,
    "enunciado": "Dois triângulos são semelhantes com razão de semelhança 2:5. Se o perímetro do menor é 18 cm, qual é o perímetro do maior?",
    "opcoes": [
      "40 cm",
      "42 cm",
      "44 cm",
      "45 cm",
      "48 cm"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Semelhança"
  },
  {
    "id": "psc2-17-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 6,
    "enunciado": "Qual é a soma dos 20 primeiros termos da PA 2, 5, 8, 11, ...?",
    "opcoes": [
      "590",
      "600",
      "610",
      "620",
      "630"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-17-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 7,
    "enunciado": "Qual é o valor de x em: { 2x+3y=16 e 4x–y=6 }?",
    "opcoes": [
      "x=2",
      "x=2,5",
      "x=3",
      "x=3,5",
      "x=4"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Sistemas"
  },
  {
    "id": "psc2-17-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 8,
    "enunciado": "A parábola f(x)=x²–4x+3 intercepta o eixo x nos pontos:",
    "opcoes": [
      "x=1 e x=3",
      "x=–1 e x=–3",
      "x=1 e x=–3",
      "x=–1 e x=3",
      "x=2 e x=3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-17-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 9,
    "enunciado": "Numa progressão aritmética, a₃+a₇=40. Qual é o quinto termo?",
    "opcoes": [
      "18",
      "19",
      "20",
      "21",
      "22"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-17-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2017,
    "num": 10,
    "enunciado": "Um terreno triangular tem lados medidos por um topógrafo. Pelo Teorema de Tales, uma linha paralela à base divide os outros lados em 4 m e 6 m (lado esquerdo). Se o lado direito total é 15 m, qual é a parte superior do lado direito?",
    "opcoes": [
      "4 m",
      "5 m",
      "6 m",
      "7 m",
      "8 m"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Tales"
  },
  {
    "id": "psc2-18-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 1,
    "enunciado": "Uma empresa de streaming cobra R$ 18,00 por mês mais R$ 4,50 por filme extra assistido. Um cliente gastou R$ 40,50 em um mês. Quantos filmes extras ele assistiu?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-18-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 2,
    "enunciado": "Qual é o vértice da parábola f(x)=2x²–8x+3?",
    "opcoes": [
      "(2,–5)",
      "(2,–4)",
      "(2,–3)",
      "(4,–5)",
      "(4,–3)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-18-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 3,
    "enunciado": "Numa PA crescente de 6 termos, o primeiro é 4 e o último é 24. Qual é a soma dos termos?",
    "opcoes": [
      "78",
      "80",
      "82",
      "84",
      "86"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-18-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 4,
    "enunciado": "Uma escada de 5 m apoia-se em uma parede vertical. A base da escada está a 3 m da parede. A que altura da parede chega o topo da escada?",
    "opcoes": [
      "3 m",
      "4 m",
      "4,5 m",
      "5 m",
      "6 m"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Pitágoras"
  },
  {
    "id": "psc2-18-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 5,
    "enunciado": "Dois triângulos semelhantes têm perímetros de 24 cm e 36 cm. Se a área do menor é 32 cm², qual é a área do maior?",
    "opcoes": [
      "64 cm²",
      "68 cm²",
      "70 cm²",
      "72 cm²",
      "76 cm²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Semelhança"
  },
  {
    "id": "psc2-18-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 6,
    "enunciado": "Um capital de R$ 5.000,00 foi aplicado a juros compostos de 3% ao mês. Qual é o montante após 2 meses?",
    "opcoes": [
      "R$ 5.290,00",
      "R$ 5.300,00",
      "R$ 5.304,50",
      "R$ 5.310,00",
      "R$ 5.320,00"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Juros compostos"
  },
  {
    "id": "psc2-18-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 7,
    "enunciado": "Qual é a solução do sistema: { x+2y=10 e 3x–y=9 }?",
    "opcoes": [
      "(2,4)",
      "(3,4)",
      "(4,3)",
      "(4,2)",
      "(5,2)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Sistemas"
  },
  {
    "id": "psc2-18-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 8,
    "enunciado": "Uma PG tem a₁=3, q=2 e n=6 termos. Qual é a soma dos termos?",
    "opcoes": [
      "177",
      "183",
      "186",
      "189",
      "192"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-18-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 9,
    "enunciado": "O cateto oposto a um ângulo de 45° num triângulo retângulo mede 10 cm. Qual é a hipotenusa? (sen45°=√2/2)",
    "opcoes": [
      "10 cm",
      "10√2 cm",
      "5√2 cm",
      "20 cm",
      "15 cm"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-18-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2018,
    "num": 10,
    "enunciado": "A função f(x)=x²–4 tem imagem negativa para:",
    "opcoes": [
      "x<–2 ou x>2",
      "–2<x<2",
      "x>2",
      "x<–2",
      "x=±2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-19-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 1,
    "enunciado": "Um aparelho de ar-condicionado consome 1,5 kWh por hora. Se o preço do kWh é R$ 0,72, quanto custa deixá-lo ligado por 8 horas?",
    "opcoes": [
      "R$ 7,56",
      "R$ 8,00",
      "R$ 8,42",
      "R$ 8,64",
      "R$ 9,00"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim / multiplicação"
  },
  {
    "id": "psc2-19-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 2,
    "enunciado": "Quais são os valores de x para que f(x)=x²–3x–10 seja positiva?",
    "opcoes": [
      "x<–2 ou x>5",
      "–2<x<5",
      "x<2 ou x>–5",
      "x>5",
      "x<–2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Inequação quadrática"
  },
  {
    "id": "psc2-19-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 3,
    "enunciado": "Numa PA, a₂=7 e a₅=16. Qual é a razão e o 10º termo?",
    "opcoes": [
      "r=3 e a₁₀=31",
      "r=3 e a₁₀=34",
      "r=3 e a₁₀=28",
      "r=4 e a₁₀=37",
      "r=4 e a₁₀=33"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-19-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 4,
    "enunciado": "Uma sombra de 4,5 m é projetada por um poste de 6 m de altura. Ao mesmo tempo, uma árvore projeta sombra de 7,5 m. Qual é a altura da árvore?",
    "opcoes": [
      "8 m",
      "9 m",
      "10 m",
      "11 m",
      "12 m"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Semelhança / Tales"
  },
  {
    "id": "psc2-19-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 5,
    "enunciado": "Qual é o ângulo θ, com 0°<θ<90°, tal que 2sen(θ)=√3?",
    "opcoes": [
      "30°",
      "45°",
      "60°",
      "75°",
      "90°"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-19-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 6,
    "enunciado": "A soma dos 10 primeiros termos de uma PG com a₁=1 e q=2 é:",
    "opcoes": [
      "1.021",
      "1.023",
      "1.025",
      "1.027",
      "1.029"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-19-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 7,
    "enunciado": "Qual é a equação da reta que passa por (0,3) e tem coeficiente angular 2?",
    "opcoes": [
      "y=2x",
      "y=2x+3",
      "y=3x+2",
      "y=x+3",
      "y=2x–3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-19-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 8,
    "enunciado": "A diagonal de um retângulo mede 13 cm. Se um lado mede 5 cm, qual é a área do retângulo?",
    "opcoes": [
      "55 cm²",
      "60 cm²",
      "65 cm²",
      "70 cm²",
      "75 cm²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Pitágoras"
  },
  {
    "id": "psc2-19-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 9,
    "enunciado": "Qual é o valor de x em: { 5x–2y=16 e 2x+3y=11 }?",
    "opcoes": [
      "x=2",
      "x=3",
      "x=4",
      "x=5",
      "x=6"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Sistemas"
  },
  {
    "id": "psc2-19-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2019,
    "num": 10,
    "enunciado": "O produto de dois números em PG é 144 e o quociente entre eles é 4. Quais são os números?",
    "opcoes": [
      "6 e 24",
      "8 e 18",
      "12 e 12",
      "4 e 36",
      "9 e 16"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-20-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 1,
    "enunciado": "Um plano de telefonia cobra R$ 35,00 fixos mais R$ 0,18 por minuto além de 60 min inclusos. Qual é a conta de um usuário que falou 100 minutos no mês?",
    "opcoes": [
      "R$ 41,00",
      "R$ 42,00",
      "R$ 42,20",
      "R$ 43,20",
      "R$ 44,00"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-20-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 2,
    "enunciado": "Para quais valores de k a equação kx²–6x+3=0 tem duas raízes reais distintas?",
    "opcoes": [
      "k>3",
      "k<3",
      "k>3 e k≠0",
      "k<3 e k≠0",
      "k=3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Equação quadrática"
  },
  {
    "id": "psc2-20-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 3,
    "enunciado": "Numa PA, a soma dos 8 primeiros termos é 100 e a razão é 3. Qual é o primeiro termo?",
    "opcoes": [
      "–2,25",
      "–1,25",
      "0",
      "1,25",
      "2,25"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-20-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 4,
    "enunciado": "Do alto de uma torre de 40 m, avista-se um ponto no solo com ângulo de depressão de 30°. Qual é a distância do ponto à base da torre? (tg30°=√3/3≈0,577)",
    "opcoes": [
      "60,3 m",
      "65,0 m",
      "69,3 m",
      "72,4 m",
      "75,0 m"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-20-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 5,
    "enunciado": "Dois triângulos retângulos são semelhantes. No menor, os catetos são 3 e 4. No maior, o cateto correspondente ao de 3 mede 9. Qual é a hipotenusa do maior?",
    "opcoes": [
      "12 cm",
      "13 cm",
      "14 cm",
      "15 cm",
      "16 cm"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Semelhança"
  },
  {
    "id": "psc2-20-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 6,
    "enunciado": "Uma PG tem a₂=6 e a₅=48. Qual é a razão q?",
    "opcoes": [
      "q=2",
      "q=3",
      "q=4",
      "q=5",
      "q=6"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-20-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 7,
    "enunciado": "Qual é a equação da reta paralela a y=3x–1 que passa pelo ponto (2,7)?",
    "opcoes": [
      "y=3x–1",
      "y=3x+1",
      "y=3x+2",
      "y=3x–2",
      "y=2x+3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-20-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 8,
    "enunciado": "Qual é o valor de sen²(θ)+cos²(θ)+tg²(45°)?",
    "opcoes": [
      "1",
      "1,5",
      "2",
      "2,5",
      "3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Identidades trigonométricas"
  },
  {
    "id": "psc2-20-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 9,
    "enunciado": "O quinto termo de uma PA é 18 e o nono é 30. Qual é a soma dos 12 primeiros termos?",
    "opcoes": [
      "234",
      "246",
      "252",
      "258",
      "264"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-20-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2020,
    "num": 10,
    "enunciado": "A função f(x)=x²+bx+c tem zeros em x=1 e x=–5. Quais são os valores de b e c?",
    "opcoes": [
      "b=4 e c=–5",
      "b=–4 e c=–5",
      "b=4 e c=5",
      "b=–4 e c=5",
      "b=6 e c=–5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-21-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 1,
    "enunciado": "Uma empresa de delivery cobra R$ 6,00 de taxa fixa mais R$ 1,80 por km. Dois clientes moram a 5 km e 12 km. Qual é a diferença entre as duas cobranças?",
    "opcoes": [
      "R$ 10,60",
      "R$ 11,60",
      "R$ 12,60",
      "R$ 13,60",
      "R$ 14,60"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-21-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 2,
    "enunciado": "A parábola y=x²–2x–8 corta o eixo x em dois pontos. Qual é a distância entre esses pontos?",
    "opcoes": [
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-21-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 3,
    "enunciado": "Numa PA, a₁=–5 e r=4. Qual é o primeiro termo positivo e sua posição?",
    "opcoes": [
      "a₃=3",
      "a₄=7",
      "a₃=7",
      "a₄=3",
      "a₅=11"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-21-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 4,
    "enunciado": "Um helicóptero está a 500 m de altura. O piloto vê uma balsa no rio com ângulo de depressão de 45°. Qual é a distância horizontal da balsa ao ponto abaixo do helicóptero?",
    "opcoes": [
      "400 m",
      "450 m",
      "500 m",
      "550 m",
      "600 m"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-21-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 5,
    "enunciado": "Dois triângulos semelhantes têm áreas de 25 cm² e 100 cm². Qual é a razão de semelhança?",
    "opcoes": [
      "1:2",
      "1:3",
      "1:4",
      "2:3",
      "3:4"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Semelhança"
  },
  {
    "id": "psc2-21-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 6,
    "enunciado": "Um capital é aplicado a 1,5% ao mês em juros compostos. Após 3 meses, o montante é R$ 9.136,35. Qual foi o capital inicial? (Use (1,015)³≈1,0457)",
    "opcoes": [
      "R$ 8.600,00",
      "R$ 8.700,00",
      "R$ 8.734,16",
      "R$ 8.800,00",
      "R$ 8.900,00"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Juros compostos"
  },
  {
    "id": "psc2-21-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 7,
    "enunciado": "Qual é o conjunto solução do sistema: { y≥2x–1 e y<–x+5 }?",
    "opcoes": [
      "x<2",
      "x>2",
      "x≤2",
      "x≥2",
      "Não tem solução"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Sistemas e inequações"
  },
  {
    "id": "psc2-21-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 8,
    "enunciado": "Numa PG, a soma dos 4 primeiros termos é 15 e a razão é 2. Qual é o primeiro termo?",
    "opcoes": [
      "1",
      "1,5",
      "2",
      "2,5",
      "3"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-21-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 9,
    "enunciado": "Qual é o valor de cos(120°)?",
    "opcoes": [
      "√3/2",
      "1/2",
      "–1/2",
      "–√3/2",
      "0"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-21-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2021,
    "num": 10,
    "enunciado": "A reta r passa pelos pontos (0,4) e (3,0). Qual é a equação de r?",
    "opcoes": [
      "y=–4x/3+4",
      "y=4x/3+4",
      "y=–3x/4+3",
      "y=3x/4–4",
      "y=–4x+3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-22-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 1,
    "enunciado": "Uma função afim f é crescente e f(–1)=0 e f(3)=8. Qual é o valor de f(10)?",
    "opcoes": [
      "20",
      "22",
      "24",
      "26",
      "28"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-22-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 2,
    "enunciado": "O discriminante de ax²+bx+c=0 é Δ=b²–4ac. Para a equação 3x²+kx+3=0 ter raízes reais iguais, qual deve ser k?",
    "opcoes": [
      "k=±4",
      "k=±5",
      "k=±6",
      "k=±7",
      "k=±8"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Equação quadrática"
  },
  {
    "id": "psc2-22-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 3,
    "enunciado": "Numa PA, os três primeiros termos são (x–2), (x+1) e (x+7). Qual é o valor de x e a razão?",
    "opcoes": [
      "x=0 e r=3",
      "x=1 e r=3",
      "x=–1 e r=4",
      "x=2 e r=5",
      "x=0 e r=5"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-22-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 4,
    "enunciado": "Um barco navega em linha reta 8 km para leste e depois 6 km para norte. Qual é a distância em linha reta até o ponto de partida?",
    "opcoes": [
      "8 km",
      "9 km",
      "10 km",
      "11 km",
      "12 km"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Pitágoras"
  },
  {
    "id": "psc2-22-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 5,
    "enunciado": "Qual é o valor de sen(30°)×cos(60°)+cos(30°)×sen(60°)?",
    "opcoes": [
      "1/4",
      "1/2",
      "√3/2",
      "1",
      "√2/2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Adição de arcos"
  },
  {
    "id": "psc2-22-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 6,
    "enunciado": "Uma PG tem a₁=5 e soma infinita S=25. Qual é a razão q?",
    "opcoes": [
      "q=1/4",
      "q=2/5",
      "q=3/5",
      "q=4/5",
      "q=1/5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "psc2-22-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 7,
    "enunciado": "Qual é a equação da reta perpendicular a y=2x+1 que passa por (4,3)?",
    "opcoes": [
      "y=–x/2+5",
      "y=–x/2+3",
      "y=2x–5",
      "y=–2x+5",
      "y=x/2+1"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Retas perpendiculares"
  },
  {
    "id": "psc2-22-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 8,
    "enunciado": "Qual é a área do triângulo com vértices A(0,0), B(6,0) e C(3,4)?",
    "opcoes": [
      "10 u²",
      "11 u²",
      "12 u²",
      "13 u²",
      "14 u²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Área de triângulo"
  },
  {
    "id": "psc2-22-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 9,
    "enunciado": "Numa progressão aritmética, a₁+a₂+a₃=18 e a₁×a₂×a₃=162. Quais são os três termos?",
    "opcoes": [
      "3, 6 e 9",
      "2, 6 e 10",
      "4, 6 e 8",
      "1, 6 e 11",
      "5, 6 e 7"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-22-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2022,
    "num": 10,
    "enunciado": "Um triângulo tem lados 7, 24 e 25. Esse triângulo é:",
    "opcoes": [
      "Acutângulo",
      "Obtusângulo",
      "Retângulo",
      "Equilátero",
      "Isósceles"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Pitágoras"
  },
  {
    "id": "psc2-23-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 1,
    "enunciado": "Duas funções afins são f(x)=3x+1 e g(x)=–x+9. Para qual valor de x elas se interceptam?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=3",
      "x=4",
      "x=5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-23-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 2,
    "enunciado": "A parábola f(x)=–x²+4x+5 tem vértice em:",
    "opcoes": [
      "(2,9)",
      "(2,8)",
      "(2,7)",
      "(4,9)",
      "(4,5)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-23-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 3,
    "enunciado": "Uma PA tem 10 termos. A soma dos termos pares é 80 e a soma dos ímpares é 75. Qual é a razão?",
    "opcoes": [
      "r=1",
      "r=2",
      "r=3",
      "r=4",
      "r=5"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-23-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 4,
    "enunciado": "Num triângulo retângulo, sen(A)=5/13. Qual é cos(A) e tg(A)?",
    "opcoes": [
      "cos=12/13 e tg=5/12",
      "cos=5/12 e tg=12/13",
      "cos=13/12 e tg=5/12",
      "cos=12/5 e tg=5/13",
      "cos=5/13 e tg=12/5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-23-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 5,
    "enunciado": "A soma de uma PG infinita é 12 e o primeiro termo é 4. Qual é a razão?",
    "opcoes": [
      "q=1/3",
      "q=2/3",
      "q=1/4",
      "q=3/4",
      "q=1/6"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "psc2-23-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 6,
    "enunciado": "Dois semelhantes triângulos têm razão de semelhança 3:4. Se o perímetro do maior é 48 cm, qual é o perímetro do menor?",
    "opcoes": [
      "32 cm",
      "34 cm",
      "36 cm",
      "38 cm",
      "40 cm"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Semelhança"
  },
  {
    "id": "psc2-23-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 7,
    "enunciado": "Qual é o valor de x em: 2^(x+1) = 3^x? (Use log2≈0,301 e log3≈0,477)",
    "opcoes": [
      "x≈1,71",
      "x≈1,81",
      "x≈1,91",
      "x≈2,01",
      "x≈2,11"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Equação exponencial com log"
  },
  {
    "id": "psc2-23-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 8,
    "enunciado": "Um terreno retangular tem diagonal de 26 m e um lado de 10 m. Qual é a área do terreno?",
    "opcoes": [
      "220 m²",
      "230 m²",
      "240 m²",
      "250 m²",
      "260 m²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Pitágoras"
  },
  {
    "id": "psc2-23-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 9,
    "enunciado": "Qual é o valor de x em: { 3x–2y=7 e 6x+y=21 }?",
    "opcoes": [
      "x=2",
      "x=3",
      "x=4",
      "x=5",
      "x=6"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Sistemas"
  },
  {
    "id": "psc2-23-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2023,
    "num": 10,
    "enunciado": "A função quadrática f(x)=x²–6x+k não possui raízes reais. Qual é o conjunto de valores possíveis para k?",
    "opcoes": [
      "k<9",
      "k>9",
      "k=9",
      "k≤9",
      "k≥9"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-24-001",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 1,
    "enunciado": "Um vendedor recebe R$ 1.200,00 fixos mais 5% de comissão sobre as vendas. Para ganhar R$ 2.700,00 em um mês, qual deve ser o valor total de suas vendas?",
    "opcoes": [
      "R$ 28.000,00",
      "R$ 29.000,00",
      "R$ 30.000,00",
      "R$ 31.000,00",
      "R$ 32.000,00"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc2-24-002",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 2,
    "enunciado": "A função f(x)=x²–8x+15 tem raízes x₁ e x₂. Qual é o valor de x₁²+x₂²?",
    "opcoes": [
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Relações de Girard"
  },
  {
    "id": "psc2-24-003",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 3,
    "enunciado": "Numa PA de 5 termos, o termo central é 12 e a razão é 3. Qual é a soma de todos os termos?",
    "opcoes": [
      "55",
      "58",
      "60",
      "62",
      "65"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-24-004",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 4,
    "enunciado": "Um avião voa horizontalmente a 3.000 m de altitude. O piloto avista uma pista com ângulo de depressão de 30°. Qual é a distância horizontal até a pista? (tg30°=√3/3)",
    "opcoes": [
      "3.000√3 m",
      "4.000 m",
      "3.000 m",
      "2.000√3 m",
      "5.000 m"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-24-005",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 5,
    "enunciado": "Dois triângulos têm lados correspondentes nas proporções 5:8. Se o perímetro do menor é 30 cm, qual é a área do maior sabendo que a área do menor é 50 cm²?",
    "opcoes": [
      "108 cm²",
      "118 cm²",
      "128 cm²",
      "138 cm²",
      "148 cm²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Semelhança"
  },
  {
    "id": "psc2-24-006",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 6,
    "enunciado": "Uma PG tem a₃=12 e a₆=96. Qual é a razão e o primeiro termo?",
    "opcoes": [
      "q=2 e a₁=3",
      "q=2 e a₁=4",
      "q=3 e a₁=4",
      "q=2 e a₁=6",
      "q=3 e a₁=3"
    ],
    "materia": "Matemática",
    "serie": 2
  },
  {
    "id": "psc2-24-007",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 7,
    "enunciado": "Qual é a solução do sistema: { 4x–3y=10 e 2x+y=8 }?",
    "opcoes": [
      "(3,2)",
      "(4,0)",
      "(3,3)",
      "(2,4)",
      "(5,–2)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Sistemas"
  },
  {
    "id": "psc2-24-008",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 8,
    "enunciado": "Qual é o valor de tg(θ) se sen(θ)=3/5 e θ é agudo?",
    "opcoes": [
      "3/4",
      "4/5",
      "3/5",
      "4/3",
      "5/3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc2-24-009",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 9,
    "enunciado": "Para qual valor de x a função f(x)=3x²–12x+9 assume valor mínimo? E qual é esse valor mínimo?",
    "opcoes": [
      "x=2 e f_min=–3",
      "x=2 e f_min=0",
      "x=2 e f_min=–6",
      "x=4 e f_min=–3",
      "x=1 e f_min=0"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "psc2-24-010",
    "vest": "PSC",
    "etapa": 2,
    "ano": 2024,
    "num": 10,
    "enunciado": "Uma reta r tem equação 2x–3y+6=0. Qual é o coeficiente angular e o ponto onde corta o eixo y?",
    "opcoes": [
      "a=2/3 e (0,2)",
      "a=3/2 e (0,2)",
      "a=2/3 e (0,–2)",
      "a=–2/3 e (0,2)",
      "a=2/3 e (0,3)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Função afim"
  },
  {
    "id": "psc3-15-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 1,
    "enunciado": "Qual é o valor de log₂(64) + log₃(27)?",
    "opcoes": [
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "psc3-15-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 2,
    "enunciado": "A equação log(x²–3x)=log(4) tem soluções:",
    "opcoes": [
      "x=4 e x=–1",
      "x=4 e x=1",
      "x=–4 e x=1",
      "x=4 e x=–4",
      "x=1 e x=–1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "psc3-15-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 3,
    "enunciado": "Qual é o número de diagonais de um polígono convexo com 10 lados?",
    "opcoes": [
      "30",
      "32",
      "34",
      "35",
      "36"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinatória"
  },
  {
    "id": "psc3-15-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 4,
    "enunciado": "O número complexo z = (3+4i) tem módulo:",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "psc3-15-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 5,
    "enunciado": "A distância entre os pontos A(–2,3) e B(4,–5) é:",
    "opcoes": [
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-15-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 6,
    "enunciado": "Numa pesquisa com 5 valores: 4, 7, 8, 10 e 11, qual é a variância?",
    "opcoes": [
      "5,2",
      "6,0",
      "6,4",
      "7,2",
      "8,0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "psc3-15-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 7,
    "enunciado": "Qual é a equação da circunferência com centro (2,–3) e raio 5?",
    "opcoes": [
      "(x–2)²+(y+3)²=5",
      "(x–2)²+(y+3)²=25",
      "(x+2)²+(y–3)²=25",
      "(x–2)²+(y–3)²=25",
      "(x+2)²+(y+3)²=5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-15-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 8,
    "enunciado": "Qual é o valor de sen(210°)?",
    "opcoes": [
      "√3/2",
      "1/2",
      "–1/2",
      "–√3/2",
      "0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc3-15-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 9,
    "enunciado": "De quantas formas podemos escolher uma comissão de 3 pessoas em um grupo de 8?",
    "opcoes": [
      "48",
      "52",
      "56",
      "60",
      "64"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "psc3-15-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2015,
    "num": 10,
    "enunciado": "Qual é a equação da reta que passa por A(1,2) e B(3,8)?",
    "opcoes": [
      "y=3x–1",
      "y=2x+1",
      "y=3x+1",
      "y=2x–1",
      "y=3x–2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-16-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 1,
    "enunciado": "Resolva: log₄(x) + log₄(x–3) = 1",
    "opcoes": [
      "x=4",
      "x=5",
      "x=6",
      "x=7",
      "x=8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "psc3-16-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 2,
    "enunciado": "O ponto médio do segmento AB é M(3,1). Se A=(1,–3), quais são as coordenadas de B?",
    "opcoes": [
      "(4,4)",
      "(5,5)",
      "(5,4)",
      "(4,5)",
      "(6,5)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-16-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 3,
    "enunciado": "Qual é o conjugado e o módulo de z = 5 – 12i?",
    "opcoes": [
      "z̄=5+12i e |z|=13",
      "z̄=–5+12i e |z|=13",
      "z̄=5+12i e |z|=17",
      "z̄=5–12i e |z|=13",
      "z̄=–5–12i e |z|=17"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "psc3-16-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 4,
    "enunciado": "Qual é o valor de cos(300°)?",
    "opcoes": [
      "–1/2",
      "1/2",
      "–√3/2",
      "√3/2",
      "0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc3-16-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 5,
    "enunciado": "Numa classe de 30 alunos, a nota média foi 6,8 com desvio padrão 1,2. Quantos alunos têm nota entre 5,6 e 8,0 (intervalo μ±σ)? Considere 68% dos dados.",
    "opcoes": [
      "18",
      "19",
      "20",
      "21",
      "22"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "psc3-16-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 6,
    "enunciado": "Quantos anagramas tem a palavra ESTUDO?",
    "opcoes": [
      "600",
      "660",
      "720",
      "780",
      "840"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Permutação"
  },
  {
    "id": "psc3-16-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 7,
    "enunciado": "A circunferência x²+y²–4x+6y–3=0 tem centro e raio:",
    "opcoes": [
      "C=(2,–3) e r=4",
      "C=(2,–3) e r=5",
      "C=(–2,3) e r=4",
      "C=(2,3) e r=4",
      "C=(–2,–3) e r=5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Circunferência"
  },
  {
    "id": "psc3-16-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 8,
    "enunciado": "Qual é o resultado de (2+3i)×(1–2i)?",
    "opcoes": [
      "8–i",
      "8+i",
      "–4+i",
      "4+i",
      "8–4i"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "psc3-16-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 9,
    "enunciado": "Qual é a área do triângulo com vértices A(0,0), B(5,0) e C(2,4)?",
    "opcoes": [
      "8 u²",
      "9 u²",
      "10 u²",
      "11 u²",
      "12 u²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-16-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2016,
    "num": 10,
    "enunciado": "Qual é o valor de log₅(125) – log₂(1/8)?",
    "opcoes": [
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "psc3-17-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 1,
    "enunciado": "A função f(x)=log₂(x–3) tem domínio:",
    "opcoes": [
      "x>0",
      "x>2",
      "x>3",
      "x≥3",
      "x>–3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "psc3-17-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 2,
    "enunciado": "Qual é a distância do ponto P(3,4) à reta 3x–4y+5=0?",
    "opcoes": [
      "2/5",
      "4/5",
      "6/5",
      "8/5",
      "10/5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-17-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 3,
    "enunciado": "Qual é a forma trigonométrica do número complexo z = –√3 + i?",
    "opcoes": [
      "2(cos150°+isen150°)",
      "2(cos120°+isen120°)",
      "2(cos30°+isen30°)",
      "√2(cos150°+isen150°)",
      "2(cos210°+isen210°)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Forma trigonométrica"
  },
  {
    "id": "psc3-17-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 4,
    "enunciado": "Qual é o valor de sen(75°)? (Use sen(45°+30°))",
    "opcoes": [
      "(√6+√2)/4",
      "(√6–√2)/4",
      "(√3+1)/4",
      "(√3–1)/4",
      "√6/4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Adição de arcos"
  },
  {
    "id": "psc3-17-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 5,
    "enunciado": "Numa prova de 10 questões de V ou F, qual é a probabilidade de acertar todas ao acaso?",
    "opcoes": [
      "1/512",
      "1/1024",
      "1/2048",
      "1/256",
      "1/128"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "psc3-17-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 6,
    "enunciado": "O ponto P(x,y) pertence à mediatriz do segmento AB onde A(1,3) e B(5,7). Qual é a equação dessa mediatriz?",
    "opcoes": [
      "x+y=8",
      "x–y=0",
      "x+y=6",
      "y=x",
      "x+y=7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-17-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 7,
    "enunciado": "Qual é o número de permutações da palavra BANANA?",
    "opcoes": [
      "60",
      "80",
      "100",
      "120",
      "140"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Permutação com repetição"
  },
  {
    "id": "psc3-17-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 8,
    "enunciado": "A moda e a mediana do conjunto {3, 5, 5, 7, 8, 9, 9, 9, 10} são:",
    "opcoes": [
      "moda=9 e mediana=8",
      "moda=9 e mediana=9",
      "moda=5 e mediana=8",
      "moda=9 e mediana=7",
      "moda=5 e mediana=9"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "psc3-17-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 9,
    "enunciado": "Qual é a equação reduzida da elipse com focos em F₁(–3,0) e F₂(3,0) e soma das distâncias 10?",
    "opcoes": [
      "x²/25+y²/16=1",
      "x²/16+y²/25=1",
      "x²/25+y²/9=1",
      "x²/9+y²/25=1",
      "x²/10+y²/16=1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cônicas"
  },
  {
    "id": "psc3-17-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2017,
    "num": 10,
    "enunciado": "Se log(2)≈0,301 e log(3)≈0,477, qual é o valor aproximado de log(72)?",
    "opcoes": [
      "1,837",
      "1,857",
      "1,877",
      "1,897",
      "1,917"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "psc3-18-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 1,
    "enunciado": "Qual é o valor de x em: log₃(x+5) – log₃(x–1) = 1?",
    "opcoes": [
      "x=2",
      "x=3",
      "x=4",
      "x=5",
      "x=6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "psc3-18-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 2,
    "enunciado": "Qual é a área do triângulo com vértices A(1,1), B(4,1) e C(3,5) calculada pela fórmula da determinante?",
    "opcoes": [
      "5 u²",
      "6 u²",
      "7 u²",
      "8 u²",
      "9 u²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-18-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 3,
    "enunciado": "O número complexo z=1+i elevado ao quadrado é:",
    "opcoes": [
      "2i",
      "1+2i",
      "2+2i",
      "–2i",
      "2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "psc3-18-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 4,
    "enunciado": "Numa turma, as notas foram: 5, 6, 6, 7, 7, 7, 8, 8, 9, 10. Qual é a média, moda e mediana?",
    "opcoes": [
      "média=7,3; moda=7; mediana=7",
      "média=7,2; moda=7; mediana=7",
      "média=7,3; moda=6; mediana=7",
      "média=7; moda=7; mediana=7,5",
      "média=7,5; moda=7; mediana=7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "psc3-18-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 5,
    "enunciado": "Qual é a equação da parábola com foco F(0,2) e diretriz y=–2?",
    "opcoes": [
      "x²=4y",
      "x²=8y",
      "x²=2y",
      "y²=8x",
      "x²=16y"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cônicas"
  },
  {
    "id": "psc3-18-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 6,
    "enunciado": "Qual é o valor de tg(2α) se tg(α)=1/2?",
    "opcoes": [
      "3/4",
      "4/3",
      "1",
      "5/4",
      "4/5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Fórmulas duplo arco"
  },
  {
    "id": "psc3-18-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 7,
    "enunciado": "Quantos números de 4 algarismos distintos podem ser formados com os dígitos 1, 2, 3, 4 e 5?",
    "opcoes": [
      "100",
      "110",
      "120",
      "130",
      "140"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Arranjo"
  },
  {
    "id": "psc3-18-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 8,
    "enunciado": "A circunferência de equação (x–1)²+(y+2)²=r² é tangente ao eixo x. Qual é o valor de r?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Circunferência"
  },
  {
    "id": "psc3-18-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 9,
    "enunciado": "Qual é o valor de sen(α–β) sabendo que sen(α)=4/5, cos(α)=3/5, sen(β)=5/13 e cos(β)=12/13?",
    "opcoes": [
      "16/65",
      "28/65",
      "33/65",
      "40/65",
      "56/65"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Subtração de arcos"
  },
  {
    "id": "psc3-18-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2018,
    "num": 10,
    "enunciado": "Numa amostra de 6 dados: 2, 4, 4, 5, 7, 8, qual é o desvio padrão? (média=5)",
    "opcoes": [
      "√(14/3)",
      "√(18/5)",
      "√(10/3)",
      "2",
      "√5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "psc3-19-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 1,
    "enunciado": "Resolva: log(x+2) + log(x–1) = log(4x–4)",
    "opcoes": [
      "x=2",
      "x=3",
      "x=4",
      "x=5",
      "x=6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "psc3-19-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 2,
    "enunciado": "Qual é o afixo do número complexo z = (2+i)/(1–i)?",
    "opcoes": [
      "1/2+3i/2",
      "3/2+i/2",
      "1+i",
      "1/2–3i/2",
      "–1/2+3i/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Divisão de complexos"
  },
  {
    "id": "psc3-19-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 3,
    "enunciado": "Qual é a equação da reta tangente à circunferência x²+y²=25 no ponto T(3,4)?",
    "opcoes": [
      "3x+4y=25",
      "4x+3y=25",
      "3x–4y=25",
      "3x+4y=5",
      "4x–3y=25"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Circunferência"
  },
  {
    "id": "psc3-19-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 4,
    "enunciado": "Numa distribução binomial com n=5 e p=1/2, qual é a probabilidade de exatamente 3 sucessos?",
    "opcoes": [
      "5/32",
      "6/32",
      "8/32",
      "10/32",
      "12/32"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Distribuição binomial"
  },
  {
    "id": "psc3-19-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 5,
    "enunciado": "Qual é a equação da hipérbole com vértices em (±3,0) e focos em (±5,0)?",
    "opcoes": [
      "x²/9–y²/16=1",
      "x²/16–y²/9=1",
      "x²/25–y²/9=1",
      "x²/9–y²/25=1",
      "x²/9+y²/16=1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cônicas"
  },
  {
    "id": "psc3-19-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 6,
    "enunciado": "Qual é o valor de cos(α) se sen(α)=–√3/2 e α∈(180°,270°)?",
    "opcoes": [
      "1/2",
      "–1/2",
      "√3/2",
      "–√3/2",
      "0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "psc3-19-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 7,
    "enunciado": "Em quantas ordens distintas 4 homens e 2 mulheres podem ser sentados em fila, se as mulheres ficam sempre juntas?",
    "opcoes": [
      "120",
      "144",
      "240",
      "288",
      "360"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Permutação com restrição"
  },
  {
    "id": "psc3-19-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 8,
    "enunciado": "Qual é o valor de log₆(216)?",
    "opcoes": [
      "2",
      "2,5",
      "3",
      "3,5",
      "4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "psc3-19-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 9,
    "enunciado": "A média de 8 valores é 12. Ao incluir um novo valor, a média passa a 11,5. Qual é o novo valor incluído?",
    "opcoes": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Média"
  },
  {
    "id": "psc3-19-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2019,
    "num": 10,
    "enunciado": "Qual é o produto (3+2i)(3–2i)?",
    "opcoes": [
      "9+4",
      "9–4",
      "13",
      "5",
      "9+4i²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "psc3-20-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 1,
    "enunciado": "A função logarítmica f(x)=log₁/₂(x) é decrescente. Para quais valores de x temos f(x)>0?",
    "opcoes": [
      "x>1",
      "0<x<1",
      "x>0",
      "x<0",
      "x≥1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função logarítmica"
  },
  {
    "id": "psc3-20-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 2,
    "enunciado": "Qual é o argumento (ângulo) do número complexo z=–1+√3i?",
    "opcoes": [
      "60°",
      "90°",
      "120°",
      "150°",
      "180°"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Forma trigonométrica"
  },
  {
    "id": "psc3-20-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 3,
    "enunciado": "Qual é a posição relativa entre a reta r: 2x–y+1=0 e a circunferência x²+y²=9?",
    "opcoes": [
      "Secante",
      "Tangente",
      "Externa",
      "Interna",
      "Coincidente"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Posição reta-circunferência"
  },
  {
    "id": "psc3-20-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 4,
    "enunciado": "Numa pesquisa, os dados têm média 50 e desvio padrão 10. Qual é o coeficiente de variação (CV)?",
    "opcoes": [
      "10%",
      "15%",
      "20%",
      "25%",
      "30%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "psc3-20-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 5,
    "enunciado": "Qual é a equação da reta que passa pela origem e é perpendicular à reta 3x–4y+5=0?",
    "opcoes": [
      "y=3x/4",
      "y=4x/3",
      "y=–4x/3",
      "y=–3x/4",
      "y=4x"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-20-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 6,
    "enunciado": "Num grupo de 10 pessoas, quantas comissões de 4 podem ser formadas se 2 pessoas específicas não podem ser da mesma comissão?",
    "opcoes": [
      "140",
      "154",
      "168",
      "182",
      "196"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação com restrição"
  },
  {
    "id": "psc3-20-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 7,
    "enunciado": "Qual é a solução em radianos de sen(x)=–1/2 para x∈[0,2π)?",
    "opcoes": [
      "x=π/6 e x=5π/6",
      "x=7π/6 e x=11π/6",
      "x=π/3 e x=2π/3",
      "x=π/4 e x=3π/4",
      "x=5π/3 e x=4π/3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equações trigonométricas"
  },
  {
    "id": "psc3-20-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 8,
    "enunciado": "Qual é o valor de: log₂(8) × log₈(32)?",
    "opcoes": [
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "psc3-20-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 9,
    "enunciado": "Qual é o 4º termo do desenvolvimento de (x+2)⁶ pelo Binômio de Newton?",
    "opcoes": [
      "160x³",
      "120x³",
      "80x³",
      "40x³",
      "20x³"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Binômio de Newton"
  },
  {
    "id": "psc3-20-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2020,
    "num": 10,
    "enunciado": "Se z₁=2+3i e z₂=1–2i, qual é z₁+z₂ e z₁–z₂?",
    "opcoes": [
      "z₁+z₂=3+i e z₁–z₂=1+5i",
      "z₁+z₂=3–i e z₁–z₂=1+5i",
      "z₁+z₂=3+i e z₁–z₂=1–5i",
      "z₁+z₂=2+i e z₁–z₂=1+5i",
      "z₁+z₂=3+i e z₁–z₂=–1+5i"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "psc3-21-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 1,
    "enunciado": "Qual é o domínio da função f(x) = log₃(x²–9)?",
    "opcoes": [
      "x>3",
      "x<–3 ou x>3",
      "–3<x<3",
      "x≠±3",
      "x>0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "psc3-21-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 2,
    "enunciado": "O ponto P(a,b) pertence à circunferência (x–2)²+(y+1)²=25 e tem ordenada b=3. Qual é o valor de a?",
    "opcoes": [
      "a=–1 ou a=5",
      "a=1 ou a=5",
      "a=–1 ou a=–5",
      "a=0 ou a=4",
      "a=2 ou a=6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Circunferência"
  },
  {
    "id": "psc3-21-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 3,
    "enunciado": "Qual é o valor de i⁴⁷, sendo i a unidade imaginária?",
    "opcoes": [
      "1",
      "–1",
      "i",
      "–i",
      "0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "psc3-21-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 4,
    "enunciado": "Numa classe de 40 alunos, as notas têm média 7 e desvio padrão 1,5. Qual é a porcentagem de alunos com nota entre 5,5 e 8,5 (μ±σ)?",
    "opcoes": [
      "55%",
      "60%",
      "65%",
      "68%",
      "72%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Distribuição normal"
  },
  {
    "id": "psc3-21-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 5,
    "enunciado": "Uma elipse tem equação x²/16+y²/7=1. Quais são os focos?",
    "opcoes": [
      "F(±2,0)",
      "F(±3,0)",
      "F(±4,0)",
      "F(±5,0)",
      "F(0,±3)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cônicas"
  },
  {
    "id": "psc3-21-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 6,
    "enunciado": "Qual é o valor de sen(α+β), dado que sen(α)=3/5, cos(α)=4/5, sen(β)=5/13 e cos(β)=12/13?",
    "opcoes": [
      "56/65",
      "63/65",
      "48/65",
      "33/65",
      "16/65"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Adição de arcos"
  },
  {
    "id": "psc3-21-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 7,
    "enunciado": "Em quantos arranjos de 3 letras distintas podem ser formados com as letras de MATEMÁTICA (sem repetição de letras)?",
    "opcoes": [
      "240",
      "270",
      "300",
      "330",
      "360"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Arranjo"
  },
  {
    "id": "psc3-21-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 8,
    "enunciado": "Qual é a equação da parábola com vértice na origem, eixo de simetria no eixo y e passando pelo ponto (4,2)?",
    "opcoes": [
      "y=x²/8",
      "y=x²/4",
      "x²=8y",
      "x²=4y",
      "y²=8x"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cônicas"
  },
  {
    "id": "psc3-21-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 9,
    "enunciado": "Resolva: 2^(x²–3x) = 1/8",
    "opcoes": [
      "x=–1 ou x=3",
      "x=1 ou x=–3",
      "x=–1 ou x=–3",
      "x=1 ou x=3",
      "x=3 ou x=0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "psc3-21-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2021,
    "num": 10,
    "enunciado": "Um dado honesto é lançado 3 vezes. Qual é a probabilidade de obter número par nas 3 vezes?",
    "opcoes": [
      "1/8",
      "2/8",
      "3/8",
      "4/8",
      "5/8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "psc3-22-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 1,
    "enunciado": "Qual é o valor de x em: 2log₅(x) = log₅(36)?",
    "opcoes": [
      "x=4",
      "x=5",
      "x=6",
      "x=7",
      "x=8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "psc3-22-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 2,
    "enunciado": "Qual é a distância entre os centros das circunferências (x–1)²+(y–2)²=9 e (x+2)²+(y–6)²=16?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-22-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 3,
    "enunciado": "Qual é a forma algébrica do número complexo z=4(cos90°+isen90°)?",
    "opcoes": [
      "4+4i",
      "4i",
      "4",
      "–4i",
      "2+2i"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Forma trigonométrica"
  },
  {
    "id": "psc3-22-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 4,
    "enunciado": "A hipérbole x²/9–y²/16=1 tem assíntotas:",
    "opcoes": [
      "y=±4x/3",
      "y=±3x/4",
      "y=±4x",
      "y=±3x",
      "y=±x"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cônicas"
  },
  {
    "id": "psc3-22-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 5,
    "enunciado": "Numa progressão geométrica de termos complexos, a₁=1+i e q=1+i. Qual é a₃?",
    "opcoes": [
      "2i",
      "–2",
      "2i–2",
      "4i",
      "–2i"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: PG e complexos"
  },
  {
    "id": "psc3-22-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 6,
    "enunciado": "Qual é o valor de cos(2α) se cos(α)=3/5?",
    "opcoes": [
      "7/25",
      "9/25",
      "11/25",
      "14/25",
      "17/25"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Fórmulas duplo arco"
  },
  {
    "id": "psc3-22-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 7,
    "enunciado": "Numa turma de 12 alunos, quantos grupos de 5 alunos podem ser formados para uma gincana?",
    "opcoes": [
      "682",
      "720",
      "756",
      "792",
      "828"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "psc3-22-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 8,
    "enunciado": "Resolva a inequação: log₂(x+3) > 3",
    "opcoes": [
      "x>5",
      "x>3",
      "x>8",
      "x>–3",
      "x>4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Inequação logarítmica"
  },
  {
    "id": "psc3-22-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 9,
    "enunciado": "Qual é a área da região delimitada pela elipse x²/25+y²/9=1? (Use π≈3,14)",
    "opcoes": [
      "42,39 u²",
      "45,00 u²",
      "47,10 u²",
      "49,50 u²",
      "51,20 u²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cônicas"
  },
  {
    "id": "psc3-22-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2022,
    "num": 10,
    "enunciado": "Um evento A tem probabilidade 0,4 e evento B tem probabilidade 0,5. Se são independentes, qual é P(A∩B)?",
    "opcoes": [
      "0,10",
      "0,15",
      "0,20",
      "0,25",
      "0,30"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "psc3-23-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 1,
    "enunciado": "Qual é a imagem da função f(x) = 2log₃(x–1)+4 para x>1?",
    "opcoes": [
      "Im=(0,+∞)",
      "Im=(4,+∞)",
      "Im=ℝ",
      "Im=(–∞,4)",
      "Im=[4,+∞)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Função logarítmica"
  },
  {
    "id": "psc3-23-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 2,
    "enunciado": "O baricentro do triângulo com vértices A(2,4), B(6,0) e C(4,8) é:",
    "opcoes": [
      "(3,4)",
      "(4,3)",
      "(4,4)",
      "(5,4)",
      "(3,5)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "psc3-23-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 3,
    "enunciado": "Qual é o valor de z = (1+i√3)³ usando a forma trigonométrica?",
    "opcoes": [
      "–8",
      "8",
      "8i",
      "–8i",
      "–4+4i√3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Potência de complexo"
  },
  {
    "id": "psc3-23-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 4,
    "enunciado": "A função f(x)=log(x²–5x+6) tem domínio:",
    "opcoes": [
      "x<2 ou x>3",
      "2<x<3",
      "x>3",
      "x<2",
      "x=2 ou x=3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Domínio de logaritmo"
  },
  {
    "id": "psc3-23-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 5,
    "enunciado": "Qual é a equação da reta tangente interna comum às circunferências x²+y²=4 e (x–5)²+y²=1?",
    "opcoes": [
      "x=2",
      "x=3",
      "x=4",
      "x=5/3×3",
      "3x+4y=0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Posição de circunferências"
  },
  {
    "id": "psc3-23-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 6,
    "enunciado": "Qual é o valor de sen²(15°)+cos²(15°)+2sen(15°)cos(15°)?",
    "opcoes": [
      "1",
      "1+sen(30°)",
      "2",
      "1+1/2",
      "1+√3/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Identidades trigonométricas"
  },
  {
    "id": "psc3-23-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 7,
    "enunciado": "De um baralho de 52 cartas, retirando 2 cartas sem reposição, qual é a probabilidade de ambas serem ás?",
    "opcoes": [
      "1/169",
      "1/221",
      "2/221",
      "4/221",
      "1/52"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "psc3-23-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 8,
    "enunciado": "Qual é o valor de: log₄(2) + log₄(32)?",
    "opcoes": [
      "2",
      "2,5",
      "3",
      "3,5",
      "4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "psc3-23-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 9,
    "enunciado": "Uma pesquisa tem os seguintes dados agrupados em classes. A classe modal tem frequência 18 e a moda é estimada pelo método de Czuber. A classe anterior tem frequência 12 e a posterior 10. Se a amplitude é 5, qual é a moda?",
    "opcoes": [
      "Moda≈3,21+Li",
      "Moda≈3,75+Li",
      "Moda≈2,50+Li",
      "Moda≈4,00+Li",
      "Moda≈2,86+Li"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "psc3-23-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2023,
    "num": 10,
    "enunciado": "Quantas soluções inteiras positivas tem a equação x+y+z=10 com x,y,z≥1?",
    "opcoes": [
      "C(9,2)=36",
      "C(10,2)=45",
      "C(7,2)=21",
      "C(8,2)=28",
      "C(11,2)=55"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinatória"
  },
  {
    "id": "psc3-24-001",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 1,
    "enunciado": "Qual é o valor de x em: log₂(x+4) + log₂(x–2) = 4?",
    "opcoes": [
      "x=3",
      "x=4",
      "x=5",
      "x=6",
      "x=7"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "psc3-24-002",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 2,
    "enunciado": "A hipérbole y²/16–x²/9=1 tem focos em:",
    "opcoes": [
      "F(0,±3)",
      "F(0,±4)",
      "F(0,±5)",
      "F(±5,0)",
      "F(±3,0)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cônicas"
  },
  {
    "id": "psc3-24-003",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 3,
    "enunciado": "Qual é a forma polar do número complexo z=–2+2i√3?",
    "opcoes": [
      "4(cos120°+isen120°)",
      "4(cos150°+isen150°)",
      "2(cos120°+isen120°)",
      "4(cos60°+isen60°)",
      "2(cos150°+isen150°)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Forma trigonométrica"
  },
  {
    "id": "psc3-24-004",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 4,
    "enunciado": "Qual é o valor de cos(α–β) sabendo que sen(α)=1/2, cos(α)=√3/2, sen(β)=√2/2 e cos(β)=√2/2?",
    "opcoes": [
      "(√6+√2)/4",
      "(√6–√2)/4",
      "(√2+√6)/2",
      "(√6+1)/4",
      "(√3+√2)/4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Subtração de arcos"
  },
  {
    "id": "psc3-24-005",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 5,
    "enunciado": "A reta r: ax+by+c=0 é tangente à circunferência x²+y²=r². Qual é a condição necessária?",
    "opcoes": [
      "|c|/√(a²+b²)=r",
      "|c|/√(a²+b²)<r",
      "|c|/√(a²+b²)>r",
      "a²+b²=r²",
      "c²=a²+b²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Posição reta-circunferência"
  },
  {
    "id": "psc3-24-006",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 6,
    "enunciado": "Num conjunto de dados com média 20 e desvio padrão 4, qual é a porcentagem de dados entre 12 e 28, assumindo distribuição normal? (μ±2σ≈95%)",
    "opcoes": [
      "68%",
      "72%",
      "80%",
      "90%",
      "95%"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Distribuição normal"
  },
  {
    "id": "psc3-24-007",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 7,
    "enunciado": "De quantas formas distintas podemos distribuir 8 livros diferentes entre 3 prateleiras, colocando 3, 3 e 2 livros respectivamente?",
    "opcoes": [
      "C(8,3)×C(5,3)×C(2,2)",
      "P(8,3)×P(5,3)",
      "C(8,2)×C(6,3)×C(3,3)",
      "C(8,3)×C(5,2)×C(3,3)",
      "8!/(3!×3!×2!)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "psc3-24-008",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 8,
    "enunciado": "Resolva: log₃(x²–2x) = log₃(3x–4)",
    "opcoes": [
      "x=1 e x=4",
      "x=2 e x=4",
      "x=1 e x=2",
      "x=4 apenas",
      "x=2 apenas"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "psc3-24-009",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 9,
    "enunciado": "Qual é a equação da elipse com focos F₁(0,–4) e F₂(0,4) e vértices em (0,±5)?",
    "opcoes": [
      "x²/9+y²/25=1",
      "x²/25+y²/9=1",
      "x²/16+y²/25=1",
      "x²/9+y²/16=1",
      "x²/25+y²/16=1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cônicas"
  },
  {
    "id": "psc3-24-010",
    "vest": "PSC",
    "etapa": 3,
    "ano": 2024,
    "num": 10,
    "enunciado": "Qual é o número de subconjuntos de um conjunto com 6 elementos?",
    "opcoes": [
      "32",
      "48",
      "64",
      "72",
      "96"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Conjuntos"
  },
  {
    "id": "sis1-15-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 1,
    "enunciado": "Uma função f(x)=2x³–3x²+1 tem raiz em x=1. Fatorando f(x) por (x–1), qual é o quociente?",
    "opcoes": [
      "2x²–x–1",
      "2x²+x–1",
      "2x²–x+1",
      "x²–x–1",
      "2x²+x+1"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Polinômios"
  },
  {
    "id": "sis1-15-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 2,
    "enunciado": "Qual é o valor de sen(π/12)? (Use sen(π/4–π/6))",
    "opcoes": [
      "(√6–√2)/4",
      "(√6+√2)/4",
      "(√3–1)/4",
      "(√2–√3)/4",
      "(√6–1)/4"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Subtração de arcos"
  },
  {
    "id": "sis1-15-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 3,
    "enunciado": "O determinante da matriz [[2,1,0],[3,–1,2],[1,4,–1]] é:",
    "opcoes": [
      "–15",
      "–12",
      "–9",
      "–6",
      "–3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Determinante"
  },
  {
    "id": "sis1-15-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 4,
    "enunciado": "Um capital de R$ 10.000,00 é aplicado a 1% ao mês em juros compostos. Qual é o montante após 6 meses? (Use (1,01)⁶≈1,0615)",
    "opcoes": [
      "R$ 10.510,00",
      "R$ 10.560,00",
      "R$ 10.615,00",
      "R$ 10.660,00",
      "R$ 10.710,00"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Juros compostos"
  },
  {
    "id": "sis1-15-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 5,
    "enunciado": "Qual é a área da região limitada pela parábola y=–x²+4 e o eixo x?",
    "opcoes": [
      "8/3 u²",
      "10/3 u²",
      "14/3 u²",
      "16/3 u²",
      "32/3 u²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis1-15-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 6,
    "enunciado": "Quantos anagramas da palavra LIMITE começam com vogal?",
    "opcoes": [
      "180",
      "240",
      "280",
      "320",
      "360"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Permutação"
  },
  {
    "id": "sis1-15-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 7,
    "enunciado": "Qual é a equação geral da reta que passa por A(3,–2) e é paralela à reta 2x–3y+1=0?",
    "opcoes": [
      "2x–3y–12=0",
      "2x–3y+12=0",
      "3x–2y–12=0",
      "2x+3y–12=0",
      "2x–3y–6=0"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "sis1-15-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 8,
    "enunciado": "Uma variável aleatória X tem distribuição de Poisson com λ=3. Qual é a probabilidade P(X=0)? (Use e⁻³≈0,0498)",
    "opcoes": [
      "0,0398",
      "0,0448",
      "0,0498",
      "0,0548",
      "0,0598"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Distribuição de Poisson"
  },
  {
    "id": "sis1-15-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 9,
    "enunciado": "Qual é o limite: lim(x→0) sen(3x)/x?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis1-15-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2015,
    "num": 10,
    "enunciado": "A derivada de f(x)=x³ln(x) é:",
    "opcoes": [
      "3x²ln(x)",
      "x²(3ln(x)+1)",
      "x²ln(x)+x³",
      "3x²+1/x",
      "x³/x+3x²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis1-16-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x)=sen(x²+1)?",
    "opcoes": [
      "cos(x²+1)",
      "2x×cos(x²+1)",
      "2x×sen(x²+1)",
      "–2x×cos(x²+1)",
      "cos(2x+1)"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Derivada (regra da cadeia)"
  },
  {
    "id": "sis1-16-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 2,
    "enunciado": "O sistema AX=B tem solução única quando det(A)≠0. Para A=[[k,2],[3,k]], quais valores de k garantem solução única?",
    "opcoes": [
      "k≠√6",
      "k≠±√6",
      "k≠6",
      "k≠±6",
      "k≠2"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Matrizes e sistemas"
  },
  {
    "id": "sis1-16-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 3,
    "enunciado": "Calcule: ∫(2x+3)dx de x=0 até x=2",
    "opcoes": [
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis1-16-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 4,
    "enunciado": "Qual é o valor de x em: 4^x – 6×2^x + 8 = 0? (Substitua u=2^x)",
    "opcoes": [
      "x=1 e x=3",
      "x=1 e x=2",
      "x=2 e x=3",
      "x=0 e x=2",
      "x=1 e x=4"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "sis1-16-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 5,
    "enunciado": "A covariância entre X e Y é 12, σ_X=4 e σ_Y=6. Qual é o coeficiente de correlação de Pearson?",
    "opcoes": [
      "0,3",
      "0,4",
      "0,5",
      "0,6",
      "0,7"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Estatística"
  },
  {
    "id": "sis1-16-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 6,
    "enunciado": "Qual é o ponto de inflexão de f(x)=x³–6x²+9x+1?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=3",
      "x=4",
      "x=5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis1-16-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 7,
    "enunciado": "Um vetor u=(2,–1,3) e v=(1,4,–2). Qual é u×v (produto vetorial)?",
    "opcoes": [
      "(–10,8,9)",
      "(10,–8,9)",
      "(–10,8,–9)",
      "(10,8,9)",
      "(–10,–8,9)"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Produto vetorial"
  },
  {
    "id": "sis1-16-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 8,
    "enunciado": "Qual é o valor do limite: lim(x→∞) (3x²+2x)/(x²–5)?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis1-16-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 9,
    "enunciado": "Qual é o número de raízes reais de f(x)=x⁴–5x²+4?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Polinômios"
  },
  {
    "id": "sis1-16-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2016,
    "num": 10,
    "enunciado": "A transformação linear T:ℝ²→ℝ² dada por T(x,y)=(2x+y, x–y) tem matriz:",
    "opcoes": [
      "[[2,1],[1,–1]]",
      "[[2,–1],[1,1]]",
      "[[1,2],[–1,1]]",
      "[[2,1],[–1,1]]",
      "[[1,–1],[2,1]]"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Transformações lineares"
  },
  {
    "id": "sis1-17-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 1,
    "enunciado": "Qual é a integral de f(x)=e^(2x)+cos(x)?",
    "opcoes": [
      "e^(2x)/2+sen(x)+C",
      "2e^(2x)+sen(x)+C",
      "e^(2x)/2–sen(x)+C",
      "e^(2x)+sen(x)+C",
      "2e^(2x)–sen(x)+C"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis1-17-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 2,
    "enunciado": "Qual é o valor de lim(x→0) (1–cos(x))/x²?",
    "opcoes": [
      "0",
      "1/4",
      "1/2",
      "1",
      "2"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis1-17-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 3,
    "enunciado": "A matriz A=[[1,2],[3,4]] tem inversa A⁻¹. Qual é o elemento a₁₁ de A⁻¹?",
    "opcoes": [
      "–1",
      "–2",
      "2",
      "–4",
      "4"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Matriz inversa"
  },
  {
    "id": "sis1-17-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 4,
    "enunciado": "Uma distribuição normal tem μ=100 e σ=15. Qual é o escore z de um valor x=130?",
    "opcoes": [
      "z=1",
      "z=1,5",
      "z=2",
      "z=2,5",
      "z=3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Distribuição normal"
  },
  {
    "id": "sis1-17-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 5,
    "enunciado": "Qual é a derivada de f(x)=arctan(x)?",
    "opcoes": [
      "1/(1+x²)",
      "1/√(1–x²)",
      "–1/(1+x²)",
      "1/(1–x²)",
      "x/(1+x²)"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Derivada de funções inversas"
  },
  {
    "id": "sis1-17-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 6,
    "enunciado": "Qual é o valor de ∫₀^π sen(x)dx?",
    "opcoes": [
      "0",
      "1",
      "2",
      "π",
      "π/2"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis1-17-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 7,
    "enunciado": "Qual é o número de soluções inteiras não-negativas de x₁+x₂+x₃=10?",
    "opcoes": [
      "C(10,2)=45",
      "C(11,2)=55",
      "C(12,2)=66",
      "C(13,2)=78",
      "C(9,2)=36"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Combinatória"
  },
  {
    "id": "sis1-17-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 8,
    "enunciado": "A função f(x)=x²e^(–x) tem ponto de máximo local em:",
    "opcoes": [
      "x=0",
      "x=1",
      "x=2",
      "x=3",
      "x=4"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis1-17-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 9,
    "enunciado": "Qual é o produto escalar dos vetores u=(1,2,3) e v=(4,–1,2)?",
    "opcoes": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Produto escalar"
  },
  {
    "id": "sis1-17-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2017,
    "num": 10,
    "enunciado": "O polinômio P(x)=x³+ax²+bx+c tem raízes 1, 2 e 3. Quais são os valores de a, b e c?",
    "opcoes": [
      "a=–6, b=11, c=–6",
      "a=6, b=11, c=6",
      "a=–6, b=–11, c=6",
      "a=6, b=–11, c=–6",
      "a=–6, b=11, c=6"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Polinômios/Girard"
  },
  {
    "id": "sis1-18-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 1,
    "enunciado": "Qual é o valor de x em: 3^(2x–1) = 27^(x–2)?",
    "opcoes": [
      "x=–3",
      "x=–2",
      "x=–1",
      "x=1",
      "x=3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "sis1-18-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 2,
    "enunciado": "Uma PA tem 14 primeiros termos com soma 0 e 15 primeiros termos com soma 45. Qual é o maior elemento negativo da PA?",
    "opcoes": [
      "–3",
      "–2",
      "–1",
      "0",
      "1"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "sis1-18-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 3,
    "enunciado": "Qual é a solução de: log₂(x+3) = log₂(5) – log₂(x–1)?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=3",
      "x=4",
      "x=5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "sis1-18-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 4,
    "enunciado": "A função f(x)=|x–2|+|x+3| tem valor mínimo de:",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Função modular"
  },
  {
    "id": "sis1-18-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 5,
    "enunciado": "Qual é o número de subconjuntos com exatamente 2 elementos do conjunto {1,2,3,4,5,6}?",
    "opcoes": [
      "10",
      "12",
      "14",
      "15",
      "18"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "sis1-18-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 6,
    "enunciado": "A diagonal de um retângulo de lados a e b satisfaz d²=a²+b². Se d=10 e a–b=2, qual é a área do retângulo?",
    "opcoes": [
      "42 u²",
      "44 u²",
      "46 u²",
      "48 u²",
      "50 u²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Pitágoras"
  },
  {
    "id": "sis1-18-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 7,
    "enunciado": "Uma PG tem primeiro termo 2 e razão √2. Qual é o 7º termo?",
    "opcoes": [
      "8",
      "8√2",
      "16",
      "16√2",
      "32"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "sis1-18-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 8,
    "enunciado": "Qual é o valor de cos(α) sabendo que tg(α)=–3/4 e α∈(90°,180°)?",
    "opcoes": [
      "4/5",
      "3/5",
      "–3/5",
      "–4/5",
      "–1/5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "sis1-18-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 9,
    "enunciado": "Qual é a soma dos termos da PG infinita 1, 1/3, 1/9, 1/27, ...?",
    "opcoes": [
      "3/4",
      "1",
      "4/3",
      "3/2",
      "2"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "sis1-18-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2018,
    "num": 10,
    "enunciado": "Num grupo de 10 pessoas, de quantas formas podemos escolher um presidente, um vice e um secretário, todos diferentes?",
    "opcoes": [
      "480",
      "600",
      "720",
      "840",
      "960"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Arranjo"
  },
  {
    "id": "sis1-19-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 1,
    "enunciado": "Qual é o número complexo z tal que z+(2–3i)=5+i?",
    "opcoes": [
      "z=3+4i",
      "z=3–4i",
      "z=7–2i",
      "z=–3+4i",
      "z=7+4i"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Números complexos"
  },
  {
    "id": "sis1-19-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 2,
    "enunciado": "A função f(x)=√(4–x²) tem como domínio e imagem:",
    "opcoes": [
      "D=[–2,2] e Im=[0,2]",
      "D=(–2,2) e Im=(0,2]",
      "D=[–2,2] e Im=[0,4]",
      "D=ℝ e Im=[0,2]",
      "D=[0,2] e Im=[0,2]"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Domínio/Imagem"
  },
  {
    "id": "sis1-19-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 3,
    "enunciado": "Qual é a razão de uma PG em que a₂=6 e a₅=162?",
    "opcoes": [
      "q=2",
      "q=3",
      "q=4",
      "q=5",
      "q=6"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "sis1-19-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 4,
    "enunciado": "Qual é o valor de: log₃(5)×log₅(9)?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Mudança de base"
  },
  {
    "id": "sis1-19-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 5,
    "enunciado": "Numa turma de 30 alunos, a probabilidade de um aluno ser reprovado é 1/5. Qual é a probabilidade de exatamente 0 alunos serem reprovados em um grupo de 3?",
    "opcoes": [
      "(4/5)³",
      "(1/5)³",
      "3×(1/5)×(4/5)²",
      "1–(4/5)³",
      "(1/5)×(4/5)²"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Probabilidade binomial"
  },
  {
    "id": "sis1-19-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 6,
    "enunciado": "Qual é o ponto de mínimo da função f(x)=x²–4x+7?",
    "opcoes": [
      "(1,4)",
      "(2,3)",
      "(3,4)",
      "(4,7)",
      "(2,7)"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "sis1-19-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 7,
    "enunciado": "Um segmento AB tem A(–1,4) e B(5,–2). Qual é o ponto médio M e o comprimento AB?",
    "opcoes": [
      "M=(2,1) e AB=6√2",
      "M=(2,1) e AB=6",
      "M=(2,1) e AB=3√2",
      "M=(3,1) e AB=6√2",
      "M=(2,2) e AB=6√2"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "sis1-19-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 8,
    "enunciado": "Qual é o valor de sen(α)+cos(α) se sen(α)×cos(α)=1/4?",
    "opcoes": [
      "√2/2",
      "√3/2",
      "√(3/2)",
      "√(1+1/2)",
      "√(3/2)"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "sis1-19-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 9,
    "enunciado": "O polinômio P(x)=2x³–x²–13x–6 tem x=3 como raiz. Quais são as outras raízes?",
    "opcoes": [
      "x=–2 e x=–1/2",
      "x=2 e x=–1/2",
      "x=–2 e x=1/2",
      "x=2 e x=1/2",
      "x=–3 e x=1/2"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Polinômios"
  },
  {
    "id": "sis1-19-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2019,
    "num": 10,
    "enunciado": "Qual é o número de permutações com repetição da palavra MISSISSIPPI? (4 S, 4 I, 2 P, 1 M)",
    "opcoes": [
      "34.650",
      "36.500",
      "38.400",
      "40.000",
      "42.250"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Permutação com repetição"
  },
  {
    "id": "sis1-20-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 1,
    "enunciado": "Numa PA, a soma dos 14 primeiros termos é 0 e a soma dos 15 primeiros é 45. Qual é o 15º termo?",
    "opcoes": [
      "40",
      "42",
      "44",
      "45",
      "48"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "sis1-20-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 2,
    "enunciado": "Qual é o valor de x em: 4^x+4^(x+1)=80?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=3",
      "x=4",
      "x=5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "sis1-20-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 3,
    "enunciado": "Um lote de 20 peças tem 4 defeituosas. Retirando 3 peças ao acaso, qual é a probabilidade de todas serem perfeitas?",
    "opcoes": [
      "C(16,3)/C(20,3)",
      "C(4,3)/C(20,3)",
      "C(16,2)/C(20,3)",
      "16/20",
      "4/20"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Probabilidade combinatória"
  },
  {
    "id": "sis1-20-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 4,
    "enunciado": "O gráfico da função f(x)=2^x e g(x)=2^(–x) se interceptam em:",
    "opcoes": [
      "(0,0)",
      "(0,1)",
      "(1,1)",
      "(1,2)",
      "(–1,1)"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Função exponencial"
  },
  {
    "id": "sis1-20-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 5,
    "enunciado": "Qual é o domínio de f(x)=log(x²–5x+6)?",
    "opcoes": [
      "x<2 ou x>3",
      "2<x<3",
      "x>3",
      "x<2",
      "x≠2 e x≠3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Domínio do logaritmo"
  },
  {
    "id": "sis1-20-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 6,
    "enunciado": "Qual é o coeficiente de x⁴ no desenvolvimento de (x+2)⁶?",
    "opcoes": [
      "50",
      "55",
      "60",
      "65",
      "70"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Binômio de Newton"
  },
  {
    "id": "sis1-20-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 7,
    "enunciado": "Duas retas r₁: 3x–4y+5=0 e r₂: 6x–8y–3=0. Qual é a distância entre elas?",
    "opcoes": [
      "13/10",
      "14/10",
      "15/10",
      "13/8",
      "13/6"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Distância entre retas paralelas"
  },
  {
    "id": "sis1-20-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 8,
    "enunciado": "Qual é a soma infinita da PG: 3, –1, 1/3, –1/9, ...?",
    "opcoes": [
      "9/4",
      "3/4",
      "5/4",
      "7/4",
      "2"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "sis1-20-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 9,
    "enunciado": "Qual é o valor de sen(2α) se cos(α)=–3/5 e α∈(90°,180°)?",
    "opcoes": [
      "24/25",
      "–24/25",
      "7/25",
      "–7/25",
      "12/25"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Duplo arco"
  },
  {
    "id": "sis1-20-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2020,
    "num": 10,
    "enunciado": "Uma função afim f(x)=ax+b tem f(f(x))=9x+8. Quais são os valores de a e b?",
    "opcoes": [
      "a=3 e b=4",
      "a=3 e b=2",
      "a=–3 e b=4",
      "a=3 e b=–4",
      "a=9 e b=8"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Composição de funções"
  },
  {
    "id": "sis1-21-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 1,
    "enunciado": "Qual é o conjunto solução da inequação log₂(x+1) ≥ 3?",
    "opcoes": [
      "x≥7",
      "x≥6",
      "x>7",
      "x>6",
      "x≥8"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Inequação logarítmica"
  },
  {
    "id": "sis1-21-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 2,
    "enunciado": "Uma função f é definida por f(x)=x²–2x–3. Para quais valores de x temos f(x)<0?",
    "opcoes": [
      "–1<x<3",
      "x<–1 ou x>3",
      "–3<x<1",
      "x<–3 ou x>1",
      "–1≤x≤3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Função quadrática"
  },
  {
    "id": "sis1-21-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 3,
    "enunciado": "A soma de todos os termos de uma PA finita com 20 termos é 380. Qual é a média aritmética dos termos?",
    "opcoes": [
      "17",
      "18",
      "19",
      "20",
      "21"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "sis1-21-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 4,
    "enunciado": "Qual é o valor de x em 25^x – 6×5^x + 5 = 0? (Substitua u=5^x)",
    "opcoes": [
      "x=0 e x=1",
      "x=1 e x=2",
      "x=0 e x=2",
      "x=–1 e x=1",
      "x=1 e x=3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "sis1-21-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 5,
    "enunciado": "Qual é a equação da circunferência com diâmetro AB, onde A(1,3) e B(5,7)?",
    "opcoes": [
      "(x–3)²+(y–5)²=8",
      "(x–3)²+(y–5)²=4",
      "(x–3)²+(y–5)²=16",
      "(x–3)²+(y–5)²=2",
      "(x+3)²+(y+5)²=8"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Circunferência"
  },
  {
    "id": "sis1-21-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 6,
    "enunciado": "Quantos números naturais de 3 algarismos distintos e ímpares podem ser formados com os dígitos 1,2,3,4,5?",
    "opcoes": [
      "24",
      "30",
      "36",
      "42",
      "48"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Análise combinatória"
  },
  {
    "id": "sis1-21-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 7,
    "enunciado": "Qual é a soma dos termos da PG infinita: 4, 4/3, 4/9, 4/27, ...?",
    "opcoes": [
      "5",
      "6",
      "7",
      "8",
      "9"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "sis1-21-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 8,
    "enunciado": "Se f(x)=2x+1 e g(x)=x²–3, qual é (f∘g)(2)?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Composição"
  },
  {
    "id": "sis1-21-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 9,
    "enunciado": "Qual é o valor do ângulo α (0°<α<360°) tal que cos(α)=–√2/2 e sen(α)<0?",
    "opcoes": [
      "α=135°",
      "α=225°",
      "α=225°",
      "α=315°",
      "α=245°"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "sis1-21-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2021,
    "num": 10,
    "enunciado": "Num plano cartesiano, qual é a inclinação da reta que passa por A(2,3) e B(6,11)?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "sis1-22-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 1,
    "enunciado": "Qual é o valor de x em: log₄(x)+log₄(x+6)=2?",
    "opcoes": [
      "x=2",
      "x=4",
      "x=6",
      "x=8",
      "x=10"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "sis1-22-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 2,
    "enunciado": "A função f(x)=|2x–4|+3 tem valor mínimo em x=:",
    "opcoes": [
      "x=0",
      "x=1",
      "x=2",
      "x=3",
      "x=4"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Função modular"
  },
  {
    "id": "sis1-22-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 3,
    "enunciado": "Qual é o 5º termo do desenvolvimento de (2x–y)⁷?",
    "opcoes": [
      "–560x³y⁴",
      "560x³y⁴",
      "–280x³y⁴",
      "280x³y⁴",
      "140x³y⁴"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Binômio de Newton"
  },
  {
    "id": "sis1-22-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 4,
    "enunciado": "Qual é o número de divisores naturais de 360?",
    "opcoes": [
      "20",
      "22",
      "24",
      "26",
      "28"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Teoria dos números"
  },
  {
    "id": "sis1-22-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 5,
    "enunciado": "Qual é a distância do ponto P(4,1) à reta 4x–3y+5=0?",
    "opcoes": [
      "3",
      "3,5",
      "4",
      "4,5",
      "5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Distância ponto-reta"
  },
  {
    "id": "sis1-22-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 6,
    "enunciado": "Uma urna tem 5 bolas vermelhas e 4 azuis. Retirando 2 bolas sem reposição, qual é a probabilidade de uma de cada cor?",
    "opcoes": [
      "5/9",
      "4/9",
      "20/36",
      "20/72",
      "5/18"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "sis1-22-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 7,
    "enunciado": "Qual é o conjunto solução de: 2^(x²) < 2^(3x–2)?",
    "opcoes": [
      "1<x<2",
      "x<1 ou x>2",
      "0<x<2",
      "x<0 ou x>3",
      "1≤x≤2"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Inequação exponencial"
  },
  {
    "id": "sis1-22-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 8,
    "enunciado": "Qual é o valor de (1+i)^8?",
    "opcoes": [
      "8",
      "12",
      "16",
      "20",
      "24"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Potência de complexo"
  },
  {
    "id": "sis1-22-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 9,
    "enunciado": "Numa PG, a₁=5 e S∞=25. Qual é a razão q?",
    "opcoes": [
      "1/3",
      "2/5",
      "3/5",
      "4/5",
      "1/2"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "sis1-22-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2022,
    "num": 10,
    "enunciado": "O ângulo entre os vetores u=(1,0) e v=(1,1) é:",
    "opcoes": [
      "30°",
      "45°",
      "60°",
      "90°",
      "120°"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Produto escalar"
  },
  {
    "id": "sis1-23-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 1,
    "enunciado": "Qual é o valor de x em: 9^x – 4×3^x + 3 = 0? (Substitua u=3^x)",
    "opcoes": [
      "x=0 e x=1",
      "x=1 e x=2",
      "x=0 e x=2",
      "x=–1 e x=1",
      "x=1 e x=3"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "sis1-23-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 2,
    "enunciado": "A função f(x)=log₁/₃(x+2) é decrescente. Qual é seu domínio?",
    "opcoes": [
      "x>–2",
      "x>0",
      "x≥–2",
      "x>2",
      "x>–1"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Logaritmo"
  },
  {
    "id": "sis1-23-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 3,
    "enunciado": "Num triângulo retângulo com catetos 5 e 12, qual é a tangente do ângulo oposto ao cateto 5?",
    "opcoes": [
      "5/12",
      "5/13",
      "12/5",
      "12/13",
      "13/12"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Trigonometria"
  },
  {
    "id": "sis1-23-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 4,
    "enunciado": "Qual é a soma dos 10 primeiros termos da PA: 5, 8, 11, 14, ...?",
    "opcoes": [
      "175",
      "185",
      "195",
      "205",
      "215"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "sis1-23-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 5,
    "enunciado": "Quantos triângulos distintos podem ser formados com os vértices de um polígono regular de 8 lados?",
    "opcoes": [
      "40",
      "48",
      "56",
      "64",
      "72"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "sis1-23-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 6,
    "enunciado": "Qual é a probabilidade de tirar pelo menos um 6 em dois lançamentos de um dado?",
    "opcoes": [
      "1/3",
      "11/36",
      "12/36",
      "13/36",
      "14/36"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Probabilidade"
  },
  {
    "id": "sis1-23-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 7,
    "enunciado": "Qual é o valor de x tal que log(x²–1)=log(3x–3)?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=4",
      "x=1 e x=4",
      "x=2 e x=4"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação logarítmica"
  },
  {
    "id": "sis1-23-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 8,
    "enunciado": "Qual é o valor do coeficiente angular da reta perpendicular à reta y=3x+5?",
    "opcoes": [
      "3",
      "1/3",
      "–1/3",
      "–3",
      "1"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "sis1-23-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 9,
    "enunciado": "Uma PG tem termos positivos, a₁=4 e a₃=36. Qual é a razão e a₂?",
    "opcoes": [
      "q=3 e a₂=12",
      "q=2 e a₂=8",
      "q=3 e a₂=9",
      "q=9 e a₂=6",
      "q=3 e a₂=6"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "sis1-23-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2023,
    "num": 10,
    "enunciado": "Qual é o módulo do número complexo z=(3+4i)/(1–2i)?",
    "opcoes": [
      "1",
      "√5",
      "√10",
      "5/√5",
      "√(9+16)/√(1+4)=1"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Divisão de complexos"
  },
  {
    "id": "sis1-24-001",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 1,
    "enunciado": "Qual é o conjunto solução da equação 2^(x+3) = 32?",
    "opcoes": [
      "x=1",
      "x=2",
      "x=3",
      "x=4",
      "x=5"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Equação exponencial"
  },
  {
    "id": "sis1-24-002",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 2,
    "enunciado": "A sequência 3, a, 27 é uma PG. Qual é o valor de a?",
    "opcoes": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "sis1-24-003",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 3,
    "enunciado": "Qual é o domínio da função f(x) = √(2x–6)?",
    "opcoes": [
      "x>3",
      "x≥3",
      "x>6",
      "x≥6",
      "x≥0"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Domínio"
  },
  {
    "id": "sis1-24-004",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 4,
    "enunciado": "Qual é o valor de log₃(243)?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Logaritmos"
  },
  {
    "id": "sis1-24-005",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 5,
    "enunciado": "Uma PA tem a₁=–8 e razão r=3. Qual é o primeiro termo positivo da PA?",
    "opcoes": [
      "a₃",
      "a₄",
      "a₅",
      "a₆",
      "a₇"
    ],
    "materia": "Matemática",
    "serie": 1
  },
  {
    "id": "sis1-24-006",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 6,
    "enunciado": "Um capital é investido a juros compostos de 2% ao mês. Após 3 meses o montante é R$ 10.612,08. Qual foi o capital inicial? (Use (1,02)³≈1,0612)",
    "opcoes": [
      "R$ 9.800,00",
      "R$ 9.900,00",
      "R$ 10.000,00",
      "R$ 10.100,00",
      "R$ 10.200,00"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Juros compostos"
  },
  {
    "id": "sis1-24-007",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 7,
    "enunciado": "Qual é o número de anagramas da palavra ESCOLA que começam e terminam com vogal?",
    "opcoes": [
      "72",
      "96",
      "120",
      "144",
      "168"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Permutação com restrição"
  },
  {
    "id": "sis1-24-008",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 8,
    "enunciado": "Qual é a soma dos infinitos termos da PG: 8, 4, 2, 1, ...?",
    "opcoes": [
      "12",
      "14",
      "16",
      "18",
      "20"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: PG infinita"
  },
  {
    "id": "sis1-24-009",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 9,
    "enunciado": "Qual é o resultado de C(8,3) + C(8,5)?",
    "opcoes": [
      "96",
      "100",
      "108",
      "112",
      "116"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Combinação"
  },
  {
    "id": "sis1-24-010",
    "vest": "SIS",
    "etapa": 1,
    "ano": 2024,
    "num": 10,
    "enunciado": "A função f(x)=x³–3x tem máximo local e mínimo local em:",
    "opcoes": [
      "máx em x=–1 e mín em x=1",
      "máx em x=1 e mín em x=–1",
      "máx em x=–2 e mín em x=2",
      "máx em x=0 e mín em x=2",
      "máx em x=–1 e mín em x=0"
    ],
    "materia": "Matemática",
    "serie": 1,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-15-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x) = x⁴ – 3x² + 2x – 5?",
    "opcoes": [
      "4x³–6x+2",
      "4x³–3x+2",
      "4x³–6x–2",
      "3x³–6x+2",
      "4x²–6x+2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-15-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 2,
    "enunciado": "Qual é o valor de ∫₁³ (3x²–2x+1)dx?",
    "opcoes": [
      "18",
      "20",
      "22",
      "24",
      "26"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis2-15-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 3,
    "enunciado": "A matriz A=[[2,–1],[3,4]] tem determinante e traço:",
    "opcoes": [
      "det=11 e traço=6",
      "det=11 e traço=5",
      "det=8 e traço=6",
      "det=11 e traço=7",
      "det=5 e traço=6"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Matrizes"
  },
  {
    "id": "sis2-15-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 4,
    "enunciado": "Qual é a equação da reta tangente à curva f(x)=x³–x no ponto x=1?",
    "opcoes": [
      "y=2x–2",
      "y=2x+2",
      "y=x–1",
      "y=2x–1",
      "y=3x–2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-15-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 5,
    "enunciado": "Qual é o valor de lim(x→2) (x²–4)/(x–2)?",
    "opcoes": [
      "0",
      "2",
      "4",
      "6",
      "8"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis2-15-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 6,
    "enunciado": "Qual é a área entre f(x)=x² e g(x)=x no intervalo [0,1]?",
    "opcoes": [
      "1/6",
      "1/4",
      "1/3",
      "1/2",
      "2/3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis2-15-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 7,
    "enunciado": "Qual é o produto das matrizes A=[[1,2],[0,3]] e B=[[2,1],[1,0]]?",
    "opcoes": [
      "[[4,1],[3,0]]",
      "[[4,0],[3,1]]",
      "[[3,1],[3,0]]",
      "[[4,1],[0,3]]",
      "[[2,1],[3,0]]"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Produto de matrizes"
  },
  {
    "id": "sis2-15-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 8,
    "enunciado": "Qual é o ponto crítico (candidato a extremo) de f(x)=x³–12x?",
    "opcoes": [
      "x=±1",
      "x=±2",
      "x=±3",
      "x=±4",
      "x=±5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-15-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 9,
    "enunciado": "Uma empresa produz x unidades com custo C(x)=x²–10x+30. Para qual valor de x o custo é mínimo?",
    "opcoes": [
      "x=3",
      "x=4",
      "x=5",
      "x=6",
      "x=7"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Otimização"
  },
  {
    "id": "sis2-15-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2015,
    "num": 10,
    "enunciado": "Qual é o valor de lim(x→0) (e^x–1)/x?",
    "opcoes": [
      "0",
      "1/2",
      "1",
      "2",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limite fundamental"
  },
  {
    "id": "sis2-16-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x) = (x²+1)×ln(x)?",
    "opcoes": [
      "2x×ln(x)+(x²+1)/x",
      "2x×ln(x)–(x²+1)/x",
      "(x²+1)/x",
      "2x/x+ln(x)",
      "2x+ln(x)/x"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada (produto)"
  },
  {
    "id": "sis2-16-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 2,
    "enunciado": "Calcule ∫ x×e^x dx (use integração por partes com u=x e dv=e^x dx)",
    "opcoes": [
      "xe^x–e^x+C",
      "xe^x+e^x+C",
      "x²e^x–xe^x+C",
      "xe^x+C",
      "e^x(x–1)+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integração por partes"
  },
  {
    "id": "sis2-16-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 3,
    "enunciado": "O sistema linear abaixo é possível e determinado para det(A)≠0. Para A=[[1,k],[2,6]], qual valor de k torna o sistema impossível?",
    "opcoes": [
      "k=1",
      "k=2",
      "k=3",
      "k=4",
      "k=5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Sistemas lineares"
  },
  {
    "id": "sis2-16-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 4,
    "enunciado": "Qual é o volume do sólido gerado pela rotação de y=√x em torno do eixo x para 0≤x≤4? (V=π∫y²dx)",
    "opcoes": [
      "4π",
      "6π",
      "8π",
      "10π",
      "12π"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Volume de revolução"
  },
  {
    "id": "sis2-16-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 5,
    "enunciado": "Qual é o valor de lim(x→∞) (5x³+2x)/(3x³–x²+1)?",
    "opcoes": [
      "0",
      "1",
      "5/3",
      "3/5",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis2-16-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 6,
    "enunciado": "A função f(x)=xe^(–x) tem ponto de máximo em:",
    "opcoes": [
      "x=–1",
      "x=0",
      "x=1",
      "x=2",
      "x=e"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-16-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 7,
    "enunciado": "Qual é a integral ∫(1/x)dx?",
    "opcoes": [
      "x+C",
      "ln|x|+C",
      "1/x²+C",
      "–1/x²+C",
      "e^x+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis2-16-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 8,
    "enunciado": "Qual é a norma do vetor v=(3,–4,0)?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Vetores"
  },
  {
    "id": "sis2-16-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 9,
    "enunciado": "Qual é a equação do plano que passa por A(1,0,0), B(0,2,0) e C(0,0,3)?",
    "opcoes": [
      "6x+3y+2z=6",
      "2x+3y+6z=6",
      "x/1+y/2+z/3=1",
      "x+2y+3z=6",
      "3x+2y+z=6"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria analítica 3D"
  },
  {
    "id": "sis2-16-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2016,
    "num": 10,
    "enunciado": "Qual é a área da superfície do cubo de aresta 5 cm?",
    "opcoes": [
      "100 cm²",
      "120 cm²",
      "140 cm²",
      "150 cm²",
      "175 cm²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-17-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 1,
    "enunciado": "Qual é o limite: lim(x→3) (x²–9)/(x²–5x+6)?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis2-17-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 2,
    "enunciado": "A derivada de f(x)=tg(x) é:",
    "opcoes": [
      "sec(x)",
      "sec²(x)",
      "–sec²(x)",
      "cos²(x)",
      "–cos²(x)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-17-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 3,
    "enunciado": "Qual é o volume de um cone com raio 6 cm e altura 10 cm? (V=πr²h/3, π≈3,14)",
    "opcoes": [
      "364,8 cm³",
      "376,8 cm³",
      "384,8 cm³",
      "394,8 cm³",
      "404,8 cm³"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-17-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 4,
    "enunciado": "Qual é a integral de f(x)=sen(3x)?",
    "opcoes": [
      "–cos(3x)/3+C",
      "cos(3x)/3+C",
      "–3cos(3x)+C",
      "3cos(3x)+C",
      "–cos(3x)+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis2-17-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 5,
    "enunciado": "Qual é o valor do determinante de [[1,2,3],[0,4,5],[0,0,6]]?",
    "opcoes": [
      "18",
      "20",
      "22",
      "24",
      "26"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Determinante triangular"
  },
  {
    "id": "sis2-17-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 6,
    "enunciado": "Uma função f(x)=ax²+bx+c tem f(0)=2, f'(0)=3 e f''(x)=4. Quais são a, b e c?",
    "opcoes": [
      "a=2, b=3, c=2",
      "a=3, b=2, c=2",
      "a=2, b=2, c=3",
      "a=4, b=3, c=2",
      "a=2, b=4, c=3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-17-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 7,
    "enunciado": "Qual é a área do trapézio com bases 8 e 12 e altura 5?",
    "opcoes": [
      "45 u²",
      "48 u²",
      "50 u²",
      "52 u²",
      "55 u²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria plana"
  },
  {
    "id": "sis2-17-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 8,
    "enunciado": "Qual é o valor de ∫₀² x²dx?",
    "opcoes": [
      "4/3",
      "6/3",
      "8/3",
      "10/3",
      "12/3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis2-17-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 9,
    "enunciado": "A distância entre os planos paralelos 2x+y–2z+3=0 e 2x+y–2z–6=0 é:",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria analítica 3D"
  },
  {
    "id": "sis2-17-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2017,
    "num": 10,
    "enunciado": "Qual é o ponto de inflexão de f(x)=x³–3x²+4?",
    "opcoes": [
      "(0,4)",
      "(1,2)",
      "(2,0)",
      "(1,4)",
      "(2,4)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-18-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x) = ln(x²+3)?",
    "opcoes": [
      "2x/(x²+3)",
      "1/(x²+3)",
      "2/(x²+3)",
      "x/(x²+3)",
      "2x/ln(x²+3)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada (regra da cadeia)"
  },
  {
    "id": "sis2-18-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 2,
    "enunciado": "Calcule ∫₀¹ e^(2x)dx.",
    "opcoes": [
      "(e²–1)/2",
      "(e²+1)/2",
      "e²–1",
      "e²/2",
      "(e–1)/2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis2-18-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 3,
    "enunciado": "A área de um triângulo com vértices A(0,0), B(6,0) e C(3,4) é:",
    "opcoes": [
      "10 u²",
      "11 u²",
      "12 u²",
      "13 u²",
      "14 u²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "sis2-18-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 4,
    "enunciado": "Qual é a equação da reta normal à curva f(x)=x² no ponto x=2?",
    "opcoes": [
      "y=–x/4+9/2",
      "y=x/4+9/2",
      "y=4x–4",
      "y=–4x+4",
      "y=–x/4+2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Reta normal"
  },
  {
    "id": "sis2-18-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 5,
    "enunciado": "Qual é o valor de lim(x→0) sen(5x)/sen(2x)?",
    "opcoes": [
      "2/5",
      "1",
      "5/2",
      "5",
      "2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limite trigonométrico"
  },
  {
    "id": "sis2-18-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 6,
    "enunciado": "A função f(x)=x³–6x²+9x+1 tem intervalo de crescimento em:",
    "opcoes": [
      "(–∞,1)∪(3,+∞)",
      "(1,3)",
      "(–∞,3)",
      "(0,1)",
      "(3,+∞)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-18-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 7,
    "enunciado": "Qual é o volume da esfera de raio 3? (V=4πr³/3, π≈3,14)",
    "opcoes": [
      "100,48 cm³",
      "108,52 cm³",
      "112,06 cm³",
      "113,04 cm³",
      "120,16 cm³"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-18-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 8,
    "enunciado": "Qual é a solução do sistema usando a Regra de Cramer: {2x+y=5; x–3y=–4}?",
    "opcoes": [
      "x=1 e y=3",
      "x=2 e y=1",
      "x=1 e y=2",
      "x=3 e y=1",
      "x=2 e y=3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Regra de Cramer"
  },
  {
    "id": "sis2-18-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 9,
    "enunciado": "Qual é a integral ∫ cos²(x)dx? (Use cos²x=(1+cos2x)/2)",
    "opcoes": [
      "x/2+sen(2x)/4+C",
      "x/2–sen(2x)/4+C",
      "x+sen(2x)/2+C",
      "sen(2x)/4+C",
      "x/2+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral trigonométrica"
  },
  {
    "id": "sis2-18-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2018,
    "num": 10,
    "enunciado": "Qual é o comprimento de arco de uma circunferência de raio 4 para um ângulo central de 90°?",
    "opcoes": [
      "π",
      "2π",
      "3π",
      "4π",
      "6π"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria"
  },
  {
    "id": "sis2-19-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x) = x²×sen(x)?",
    "opcoes": [
      "2x×sen(x)+x²×cos(x)",
      "2x×cos(x)+x²×sen(x)",
      "x²×cos(x)",
      "2x×sen(x)",
      "2x×sen(x)–x²×cos(x)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada (produto)"
  },
  {
    "id": "sis2-19-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 2,
    "enunciado": "Qual é a área entre a parábola y=x² e a reta y=4?",
    "opcoes": [
      "28/3",
      "30/3",
      "32/3",
      "34/3",
      "36/3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis2-19-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 3,
    "enunciado": "Qual é o valor de lim(x→1) (x³–1)/(x–1)?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis2-19-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 4,
    "enunciado": "Qual é a equação da assíntota horizontal de f(x)=(3x+1)/(x–2)?",
    "opcoes": [
      "y=1",
      "y=2",
      "y=3",
      "y=4",
      "y=5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Assíntota"
  },
  {
    "id": "sis2-19-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 5,
    "enunciado": "A matrix A=[[1,2],[3,4]] e B=[[0,1],[1,0]]. Qual é A–B?",
    "opcoes": [
      "[[1,1],[2,4]]",
      "[[1,2],[2,4]]",
      "[[0,2],[2,4]]",
      "[[1,1],[3,4]]",
      "[[1,2],[3,3]]"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Matrizes"
  },
  {
    "id": "sis2-19-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 6,
    "enunciado": "Qual é o volume do cilindro com raio 5 e altura 8? (π≈3,14)",
    "opcoes": [
      "618,0 cm³",
      "620,4 cm³",
      "625,0 cm³",
      "628,0 cm³",
      "632,0 cm³"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-19-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 7,
    "enunciado": "Qual é a derivada de f(x) = e^(3x)/(x+1)?",
    "opcoes": [
      "(3e^(3x)(x+1)–e^(3x))/(x+1)²",
      "e^(3x)/(x+1)²",
      "3e^(3x)–e^(3x)",
      "(e^(3x)(3x+2))/(x+1)²",
      "3e^(3x)(x+1)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada (quociente)"
  },
  {
    "id": "sis2-19-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 8,
    "enunciado": "Qual é o valor de ∫ (2/√x)dx?",
    "opcoes": [
      "√x+C",
      "2√x+C",
      "4√x+C",
      "x/√x+C",
      "√x/2+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis2-19-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 9,
    "enunciado": "Qual é a soma dos ângulos internos de um polígono com 8 lados?",
    "opcoes": [
      "900°",
      "1.000°",
      "1.080°",
      "1.100°",
      "1.200°"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria"
  },
  {
    "id": "sis2-19-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2019,
    "num": 10,
    "enunciado": "Qual é o valor de lim(x→+∞) e^(–x)?",
    "opcoes": [
      "–1",
      "0",
      "1",
      "e",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis2-20-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x) = arcsen(x)?",
    "opcoes": [
      "1/√(1–x²)",
      "–1/√(1–x²)",
      "1/(1+x²)",
      "1/√(1+x²)",
      "–1/(1+x²)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-20-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 2,
    "enunciado": "Calcule ∫₀^(π/2) cos(x)dx.",
    "opcoes": [
      "0",
      "1/2",
      "1",
      "3/2",
      "2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis2-20-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 3,
    "enunciado": "Qual é o determinante de [[a,b],[c,d]] se a=3, b=–1, c=5, d=2?",
    "opcoes": [
      "9",
      "10",
      "11",
      "12",
      "13"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Determinante"
  },
  {
    "id": "sis2-20-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 4,
    "enunciado": "Qual é o ponto de máximo global de f(x)=–x²+6x–5 no intervalo [0,4]?",
    "opcoes": [
      "x=0",
      "x=1",
      "x=2",
      "x=3",
      "x=4"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Otimização"
  },
  {
    "id": "sis2-20-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 5,
    "enunciado": "Qual é o valor de lim(x→0) (√(x+4)–2)/x?",
    "opcoes": [
      "0",
      "1/4",
      "1/2",
      "1",
      "4"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis2-20-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 6,
    "enunciado": "Qual é a área lateral do cone com raio 4 e geratriz 7? (π≈3,14)",
    "opcoes": [
      "85,96 cm²",
      "86,96 cm²",
      "87,92 cm²",
      "88,92 cm²",
      "89,96 cm²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-20-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 7,
    "enunciado": "Qual é a equação da assíntota vertical de f(x)=1/(x²–4)?",
    "opcoes": [
      "x=0",
      "x=±1",
      "x=±2",
      "x=±4",
      "x=2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Assíntota vertical"
  },
  {
    "id": "sis2-20-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 8,
    "enunciado": "Qual é o valor de ∫ x/(x²+1)dx?",
    "opcoes": [
      "ln(x²+1)/2+C",
      "arctan(x)+C",
      "ln(x²+1)+C",
      "x²/(x²+1)+C",
      "1/(x²+1)+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral por substituição"
  },
  {
    "id": "sis2-20-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 9,
    "enunciado": "Qual é a diagonal de um paralelepípedo com dimensões 3×4×12?",
    "opcoes": [
      "11",
      "12",
      "13",
      "14",
      "15"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-20-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2020,
    "num": 10,
    "enunciado": "A função f(x)=x⁴–8x²+3 tem pontos de inflexão em:",
    "opcoes": [
      "x=0",
      "x=±1",
      "x=±√(4/3)",
      "x=±2",
      "x=±√3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-21-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x) = x×ln(x) – x?",
    "opcoes": [
      "ln(x)",
      "ln(x)+1",
      "ln(x)–1",
      "1/x",
      "x/ln(x)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-21-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 2,
    "enunciado": "Qual é o valor de ∫₁^e (1/x)dx?",
    "opcoes": [
      "0",
      "1/e",
      "1",
      "e",
      "e–1"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis2-21-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 3,
    "enunciado": "Qual é o volume do tetraedro regular de aresta 6? (V=a³√2/12)",
    "opcoes": [
      "12√2",
      "18√2",
      "24√2",
      "30√2",
      "36√2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-21-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 4,
    "enunciado": "Qual é a integral ∫ (x²+1)/(x³+3x)dx?",
    "opcoes": [
      "ln|x³+3x|/3+C",
      "ln|x²+3|/3+C",
      "(x²+1)/3+C",
      "ln|x³+3x|+C",
      "1/(x³+3x)+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral por substituição"
  },
  {
    "id": "sis2-21-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 5,
    "enunciado": "Qual é o limite: lim(x→0) (1+3x)^(1/x)?",
    "opcoes": [
      "e",
      "e²",
      "e³",
      "3e",
      "1"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limite fundamental"
  },
  {
    "id": "sis2-21-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 6,
    "enunciado": "A função f(x)=x³–3x²–9x+5 tem máximo local em x=–1 e mínimo local em x=3. Quais são os valores de f(–1) e f(3)?",
    "opcoes": [
      "f(–1)=10 e f(3)=–22",
      "f(–1)=12 e f(3)=–20",
      "f(–1)=8 e f(3)=–18",
      "f(–1)=10 e f(3)=–18",
      "f(–1)=12 e f(3)=–22"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-21-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 7,
    "enunciado": "Qual é o valor de ∫₀² (2x+1)²dx?",
    "opcoes": [
      "24",
      "26",
      "28",
      "30",
      "32"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis2-21-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 8,
    "enunciado": "O produto interno de u=(2,1,–3) e v=(1,–2,4) é:",
    "opcoes": [
      "–12",
      "–10",
      "–8",
      "–6",
      "–4"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Produto escalar"
  },
  {
    "id": "sis2-21-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 9,
    "enunciado": "Qual é o valor de lim(x→4) (x–4)/(√x–2)?",
    "opcoes": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis2-21-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2021,
    "num": 10,
    "enunciado": "Qual é a área total de um prisma reto triangular equilátero de aresta 4 e altura 10?",
    "opcoes": [
      "(120+8√3) u²",
      "(100+8√3) u²",
      "(80+8√3) u²",
      "(120+4√3) u²",
      "(100+4√3) u²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-22-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x) = cos(x)/x?",
    "opcoes": [
      "(–xsen(x)–cos(x))/x²",
      "(–xsen(x)+cos(x))/x²",
      "–sen(x)/x",
      "cos(x)/x²",
      "–cos(x)/x²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada (quociente)"
  },
  {
    "id": "sis2-22-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 2,
    "enunciado": "Qual é o valor de ∫₀¹ (3x²–2x+1)dx?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis2-22-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 3,
    "enunciado": "O volume do paralelepípedo com arestas a=3, b=4 e c=5 é:",
    "opcoes": [
      "50 u³",
      "55 u³",
      "60 u³",
      "65 u³",
      "70 u³"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-22-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 4,
    "enunciado": "Qual é a integral ∫ tg(x)dx?",
    "opcoes": [
      "–ln|cos(x)|+C",
      "ln|cos(x)|+C",
      "sec²(x)+C",
      "–sec(x)+C",
      "ln|sen(x)|+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis2-22-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 5,
    "enunciado": "Qual é o valor de lim(x→∞) (2x²+3x)/(x²+1)?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis2-22-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 6,
    "enunciado": "A função f(x)=2x³+3x²–12x+1 tem pontos críticos em:",
    "opcoes": [
      "x=–2 e x=1",
      "x=1 e x=2",
      "x=–1 e x=2",
      "x=–2 e x=2",
      "x=0 e x=1"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-22-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 7,
    "enunciado": "Qual é a distância entre os pontos A(1,2,3) e B(4,6,3)?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria analítica 3D"
  },
  {
    "id": "sis2-22-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 8,
    "enunciado": "Qual é o valor de ∫ x√(x²+1)dx?",
    "opcoes": [
      "√(x²+1)/2+C",
      "(x²+1)^(3/2)/3+C",
      "√(x²+1)+C",
      "(x²+1)^(3/2)/2+C",
      "x(x²+1)^(1/2)+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral por substituição"
  },
  {
    "id": "sis2-22-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 9,
    "enunciado": "Qual é o ângulo entre os vetores u=(1,0,0) e v=(1,1,0)?",
    "opcoes": [
      "30°",
      "45°",
      "60°",
      "90°",
      "120°"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Vetores"
  },
  {
    "id": "sis2-22-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2022,
    "num": 10,
    "enunciado": "Qual é a área total da pirâmide quadrada de base 6 e apótema da face 5?",
    "opcoes": [
      "96 u²",
      "100 u²",
      "106 u²",
      "116 u²",
      "120 u²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-23-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x) = e^(x)×cos(x)?",
    "opcoes": [
      "e^x(cos(x)–sen(x))",
      "e^x(cos(x)+sen(x))",
      "e^x×cos(x)",
      "–e^x×sen(x)",
      "e^x(sen(x)–cos(x))"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada (produto)"
  },
  {
    "id": "sis2-23-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 2,
    "enunciado": "Calcule ∫₀^π sen²(x)dx. (Use sen²x=(1–cos2x)/2)",
    "opcoes": [
      "π/4",
      "π/2",
      "π",
      "3π/4",
      "2π"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral trigonométrica"
  },
  {
    "id": "sis2-23-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 3,
    "enunciado": "Qual é o volume do tronco de cone com raios 3 e 6 e altura 4? (V=πh(R²+Rr+r²)/3, π≈3,14)",
    "opcoes": [
      "263,76 cm³",
      "265,76 cm³",
      "267,76 cm³",
      "268,04 cm³",
      "270,00 cm³"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-23-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 4,
    "enunciado": "Qual é o valor de lim(x→0) (e^(2x)–1)/(3x)?",
    "opcoes": [
      "0",
      "1/3",
      "2/3",
      "1",
      "2/3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limite fundamental"
  },
  {
    "id": "sis2-23-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 5,
    "enunciado": "Qual é o valor de ∫₋₁¹ x³dx?",
    "opcoes": [
      "–1",
      "–1/2",
      "0",
      "1/2",
      "1"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral de função ímpar"
  },
  {
    "id": "sis2-23-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 6,
    "enunciado": "A matriz A=[[2,1],[5,3]] tem inversa A⁻¹. Qual é o elemento a₂₁ de A⁻¹?",
    "opcoes": [
      "5",
      "–5",
      "3",
      "–3",
      "1"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Matriz inversa"
  },
  {
    "id": "sis2-23-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 7,
    "enunciado": "Qual é o comprimento do arco de y=x²/2 de x=0 a x=1? (Use L=∫√(1+f'²)dx≈1,148)",
    "opcoes": [
      "1,048",
      "1,098",
      "1,148",
      "1,198",
      "1,248"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Comprimento de arco"
  },
  {
    "id": "sis2-23-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 8,
    "enunciado": "Qual é o valor de ∫ sec²(x)dx?",
    "opcoes": [
      "sen(x)+C",
      "–cos(x)+C",
      "tg(x)+C",
      "sec(x)tg(x)+C",
      "–cotg(x)+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral fundamental"
  },
  {
    "id": "sis2-23-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 9,
    "enunciado": "Qual é a equação do plano tangente à superfície z=x²+y² no ponto (1,1,2)?",
    "opcoes": [
      "z=2x+2y–2",
      "z=2x+2y+2",
      "z=x+y",
      "z=2x–2y+2",
      "z=x+y+2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Cálculo multivariável"
  },
  {
    "id": "sis2-23-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2023,
    "num": 10,
    "enunciado": "A área da superfície esférica de raio 5 é: (A=4πr², π≈3,14)",
    "opcoes": [
      "298,0 cm²",
      "308,0 cm²",
      "314,0 cm²",
      "328,0 cm²",
      "340,0 cm²"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Geometria espacial"
  },
  {
    "id": "sis2-24-001",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 1,
    "enunciado": "Qual é a derivada de f(x) = √(3x²+1)?",
    "opcoes": [
      "3x/√(3x²+1)",
      "6x/√(3x²+1)",
      "3x²/√(3x²+1)",
      "1/√(3x²+1)",
      "6x×√(3x²+1)"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada (cadeia)"
  },
  {
    "id": "sis2-24-002",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 2,
    "enunciado": "Calcule ∫₀² (x³–2x)dx.",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis2-24-003",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 3,
    "enunciado": "Qual é o ponto de inflexão de f(x)=x⁴–6x²+1?",
    "opcoes": [
      "x=±1",
      "x=±√2",
      "x=±√3",
      "x=0",
      "x=±2"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-24-004",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 4,
    "enunciado": "Qual é o valor de lim(x→0) (x²+2x)/x?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Limites"
  },
  {
    "id": "sis2-24-005",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 5,
    "enunciado": "A área sob a curva f(x)=e^x de x=0 a x=2 é:",
    "opcoes": [
      "e²–1",
      "e²+1",
      "e²",
      "e²–2",
      "2e²–1"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral definida"
  },
  {
    "id": "sis2-24-006",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 6,
    "enunciado": "Qual é o volume do sólido de revolução gerado por f(x)=x+1 em torno do eixo x para 0≤x≤2? (V=π∫y²dx)",
    "opcoes": [
      "22π/3",
      "24π/3",
      "26π/3",
      "28π/3",
      "30π/3"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Volume de revolução"
  },
  {
    "id": "sis2-24-007",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 7,
    "enunciado": "O determinante de [[2,0,1],[3,1,2],[1,–1,3]] é:",
    "opcoes": [
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Determinante 3×3"
  },
  {
    "id": "sis2-24-008",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 8,
    "enunciado": "Qual é a integral ∫ e^(–2x)dx?",
    "opcoes": [
      "–e^(–2x)/2+C",
      "e^(–2x)/2+C",
      "–2e^(–2x)+C",
      "2e^(–2x)+C",
      "–e^(–2x)+C"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis2-24-009",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 9,
    "enunciado": "A função f(x)=x³–6x²+12x–8 tem ponto de inflexão em x=2 com f(2)=0. Qual é a natureza desse ponto?",
    "opcoes": [
      "Máximo local",
      "Mínimo local",
      "Ponto de inflexão horizontal (tangente horizontal)",
      "Ponto de descontinuidade",
      "Assíntota"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Derivada"
  },
  {
    "id": "sis2-24-010",
    "vest": "SIS",
    "etapa": 2,
    "ano": 2024,
    "num": 10,
    "enunciado": "Qual é o valor de ∫₀^(π/4) (1+tg²(x))dx?",
    "opcoes": [
      "π/4–1",
      "π/4",
      "1",
      "π/4+1",
      "1–π/4"
    ],
    "materia": "Matemática",
    "serie": 2,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis3-15-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 1,
    "enunciado": "Qual é a integral ∫₀¹ x×e^(x²)dx?",
    "opcoes": [
      "(e–1)/2",
      "(e+1)/2",
      "e/2",
      "(e–1)",
      "e–1/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral por substituição"
  },
  {
    "id": "sis3-15-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 2,
    "enunciado": "Qual é o valor de lim(x→0) (sen(x)–x)/x³?",
    "opcoes": [
      "0",
      "–1/6",
      "1/6",
      "–1/2",
      "1/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limite (Taylor)"
  },
  {
    "id": "sis3-15-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 3,
    "enunciado": "Qual é o valor do determinante de [[1,1,1],[1,2,3],[1,4,9]]?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Determinante"
  },
  {
    "id": "sis3-15-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 4,
    "enunciado": "A equação da esfera com centro C(1,–2,3) e raio 4 é:",
    "opcoes": [
      "(x–1)²+(y+2)²+(z–3)²=16",
      "(x+1)²+(y–2)²+(z+3)²=16",
      "(x–1)²+(y–2)²+(z–3)²=16",
      "(x–1)²+(y+2)²+(z–3)²=4",
      "(x–1)²+(y+2)²+(z+3)²=16"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica 3D"
  },
  {
    "id": "sis3-15-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 5,
    "enunciado": "Qual é a regra de L'Hôpital aplicada ao lim(x→0) ln(1+x)/x?",
    "opcoes": [
      "0",
      "1/2",
      "1",
      "2",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: L'Hôpital"
  },
  {
    "id": "sis3-15-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 6,
    "enunciado": "Qual é a solução geral da EDO: dy/dx = 2xy?",
    "opcoes": [
      "y=Ce^(x²)",
      "y=Ce^(2x)",
      "y=x²+C",
      "y=Ce^(x)",
      "y=Ce^(–x²)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO separável"
  },
  {
    "id": "sis3-15-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 7,
    "enunciado": "O gradiente de f(x,y)=x²y+y³ no ponto (1,2) é:",
    "opcoes": [
      "(4,13)",
      "(4,12)",
      "(4,11)",
      "(3,13)",
      "(2,13)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Derivadas parciais"
  },
  {
    "id": "sis3-15-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 8,
    "enunciado": "Qual é a transformada de Laplace de f(t)=e^(at)?",
    "opcoes": [
      "1/(s–a)",
      "1/(s+a)",
      "a/(s–a)",
      "s/(s–a)",
      "1/s"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Transformada de Laplace"
  },
  {
    "id": "sis3-15-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 9,
    "enunciado": "Qual é a distância entre as retas paralelas r₁: x–2y+3=0 e r₂: x–2y–7=0?",
    "opcoes": [
      "2√5",
      "2",
      "√5",
      "4√5/5",
      "10/√5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica"
  },
  {
    "id": "sis3-15-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2015,
    "num": 10,
    "enunciado": "Qual é o valor de ∫₀^∞ e^(–x)dx?",
    "opcoes": [
      "0",
      "1/2",
      "1",
      "2",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral imprópria"
  },
  {
    "id": "sis3-16-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 1,
    "enunciado": "Qual é o valor de ∫₀^(π/2) sen(x)×cos(x)dx?",
    "opcoes": [
      "0",
      "1/4",
      "1/2",
      "1",
      "3/4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis3-16-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 2,
    "enunciado": "Qual é a derivada direcional de f(x,y)=x²+xy no ponto (1,1) na direção u=(1/√2, 1/√2)?",
    "opcoes": [
      "√2",
      "2√2",
      "3√2/2",
      "5√2/2",
      "3/√2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Derivada direcional"
  },
  {
    "id": "sis3-16-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 3,
    "enunciado": "Qual é a solução da EDO: y''–3y'+2y=0?",
    "opcoes": [
      "y=C₁e^x+C₂e^(2x)",
      "y=C₁e^(–x)+C₂e^(–2x)",
      "y=C₁cos(x)+C₂sen(x)",
      "y=C₁e^x+C₂xe^x",
      "y=C₁+C₂e^(2x)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO linear"
  },
  {
    "id": "sis3-16-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 4,
    "enunciado": "O produto vetorial u×v, onde u=(1,0,0) e v=(0,1,0), é:",
    "opcoes": [
      "(0,0,1)",
      "(1,1,0)",
      "(0,0,–1)",
      "(1,0,1)",
      "(0,1,0)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Produto vetorial"
  },
  {
    "id": "sis3-16-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 5,
    "enunciado": "Qual é a soma da série geométrica: Σ(1/2)^n de n=0 a ∞?",
    "opcoes": [
      "1",
      "3/2",
      "2",
      "5/2",
      "3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Série geométrica"
  },
  {
    "id": "sis3-16-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 6,
    "enunciado": "Qual é o jacobiano da transformação x=r×cos(θ), y=r×sen(θ)?",
    "opcoes": [
      "r",
      "r²",
      "1/r",
      "cos(θ)",
      "sen(θ)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Jacobiano"
  },
  {
    "id": "sis3-16-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 7,
    "enunciado": "Qual é o valor de lim(x→∞) x×sen(1/x)?",
    "opcoes": [
      "0",
      "1/2",
      "1",
      "2",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limite"
  },
  {
    "id": "sis3-16-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 8,
    "enunciado": "A função f(x,y)=x²+y² tem ponto crítico em (0,0). Esse ponto é:",
    "opcoes": [
      "Máximo local",
      "Mínimo local",
      "Ponto de sela",
      "Indeterminado",
      "Máximo global"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cálculo multivariável"
  },
  {
    "id": "sis3-16-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 9,
    "enunciado": "Qual é a integral dupla ∬_R dA onde R=[0,2]×[0,3]?",
    "opcoes": [
      "3",
      "4",
      "5",
      "6",
      "8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral dupla"
  },
  {
    "id": "sis3-16-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2016,
    "num": 10,
    "enunciado": "Qual é a transformada de Laplace de f(t)=t?",
    "opcoes": [
      "1/s",
      "1/s²",
      "2/s³",
      "s",
      "1/(s+1)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Transformada de Laplace"
  },
  {
    "id": "sis3-17-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 1,
    "enunciado": "Qual é o valor de ∫₁^e ln(x)dx?",
    "opcoes": [
      "1",
      "e–1",
      "e–2",
      "1–e",
      "e"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integração por partes"
  },
  {
    "id": "sis3-17-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 2,
    "enunciado": "A série de Taylor de e^x centrada em 0 é: e^x=Σxⁿ/n!. Qual é a aproximação de e^(0,1) usando os 3 primeiros termos?",
    "opcoes": [
      "1,100",
      "1,105",
      "1,110",
      "1,115",
      "1,120"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Série de Taylor"
  },
  {
    "id": "sis3-17-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 3,
    "enunciado": "Qual é o autovalor da matriz [[3,1],[0,3]]?",
    "opcoes": [
      "λ=1",
      "λ=2",
      "λ=3",
      "λ=4",
      "λ=6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Autovalores"
  },
  {
    "id": "sis3-17-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 4,
    "enunciado": "Qual é a integral ∫ x/(√(1–x²))dx?",
    "opcoes": [
      "–√(1–x²)+C",
      "√(1–x²)+C",
      "arcsen(x)+C",
      "–arcsen(x)+C",
      "x√(1–x²)+C"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral por substituição"
  },
  {
    "id": "sis3-17-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 5,
    "enunciado": "Qual é a solução particular da EDO y'=y com y(0)=3?",
    "opcoes": [
      "y=3e^x",
      "y=e^(3x)",
      "y=3x+1",
      "y=3e^(–x)",
      "y=3+e^x"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO"
  },
  {
    "id": "sis3-17-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 6,
    "enunciado": "O plano π passa pelos pontos A(1,0,0), B(0,1,0) e C(0,0,2). Qual é o vetor normal ao plano?",
    "opcoes": [
      "(2,2,1)",
      "(1,1,2)",
      "(2,1,2)",
      "(1,2,1)",
      "(2,2,–1)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica 3D"
  },
  {
    "id": "sis3-17-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 7,
    "enunciado": "Qual é o valor de lim(x→0⁺) x×ln(x)?",
    "opcoes": [
      "–∞",
      "–1",
      "0",
      "1",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limite"
  },
  {
    "id": "sis3-17-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 8,
    "enunciado": "Qual é a integral ∫₀¹ ∫₀^x 2y dy dx?",
    "opcoes": [
      "1/4",
      "1/3",
      "1/2",
      "2/3",
      "3/4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral dupla"
  },
  {
    "id": "sis3-17-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 9,
    "enunciado": "Qual é o rank da matriz [[1,2,3],[2,4,6],[3,6,9]]?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Álgebra linear"
  },
  {
    "id": "sis3-17-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2017,
    "num": 10,
    "enunciado": "Qual é a derivada de f(x)=x^x?",
    "opcoes": [
      "x^x×(1+ln(x))",
      "x^x×ln(x)",
      "x×x^(x–1)",
      "x^x/ln(x)",
      "x^(x–1)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Derivada logarítmica"
  },
  {
    "id": "sis3-18-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 1,
    "enunciado": "Qual é o valor de ∫₀^(π) x×sen(x)dx? (Integração por partes)",
    "opcoes": [
      "π",
      "2π",
      "π/2",
      "–π",
      "π–2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integração por partes"
  },
  {
    "id": "sis3-18-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 2,
    "enunciado": "Qual é o autovetor associado ao autovalor λ=2 da matriz [[3,1],[1,3]]?",
    "opcoes": [
      "(1,–1)",
      "(1,1)",
      "(–1,1)",
      "(2,1)",
      "(1,2)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Autovetor"
  },
  {
    "id": "sis3-18-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 3,
    "enunciado": "Qual é o valor de lim(x→0) (1–cos(x))/x²?",
    "opcoes": [
      "0",
      "1/4",
      "1/2",
      "1",
      "2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limite"
  },
  {
    "id": "sis3-18-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 4,
    "enunciado": "A equação da reta no espaço que passa por A(1,2,3) com vetor diretor v=(2,–1,4) é:",
    "opcoes": [
      "(x–1)/2=(y–2)/(–1)=(z–3)/4",
      "(x+1)/2=(y+2)/1=(z+3)/4",
      "x/2=y/–1=z/4",
      "(x–2)/1=(y+1)/2=(z–4)/3",
      "x–1=2y–4=4z–12"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Geometria analítica 3D"
  },
  {
    "id": "sis3-18-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 5,
    "enunciado": "Qual é a integral ∫ dx/√(4–x²)?",
    "opcoes": [
      "arcsen(x/2)+C",
      "arccos(x/2)+C",
      "arctan(x/2)+C",
      "2arcsen(x)+C",
      "arcsen(x)/2+C"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral trigonométrica"
  },
  {
    "id": "sis3-18-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 6,
    "enunciado": "Qual é a soma da série Σn/(2^n) de n=1 a ∞?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Séries"
  },
  {
    "id": "sis3-18-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 7,
    "enunciado": "Qual é o gradiente de f(x,y,z)=x²y+yz² no ponto (1,2,3)?",
    "opcoes": [
      "(4,10,12)",
      "(4,10,13)",
      "(4,11,12)",
      "(5,10,12)",
      "(4,9,12)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Gradiente"
  },
  {
    "id": "sis3-18-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 8,
    "enunciado": "Qual é a solução da EDO: y'+y=e^x com y(0)=1?",
    "opcoes": [
      "y=(e^x+e^(–x))/2",
      "y=e^x/2+Ce^(–x)",
      "y=(e^x+1)e^(–x)",
      "y=e^x/2+e^(–x)/2",
      "y=e^x"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO linear"
  },
  {
    "id": "sis3-18-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 9,
    "enunciado": "Qual é o volume do sólido delimitado pelo cilindro x²+y²=4 e os planos z=0 e z=3?",
    "opcoes": [
      "10π",
      "11π",
      "12π",
      "13π",
      "14π"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Volume"
  },
  {
    "id": "sis3-18-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2018,
    "num": 10,
    "enunciado": "Qual é a transformada de Laplace de f(t)=sen(at)?",
    "opcoes": [
      "a/(s²+a²)",
      "s/(s²+a²)",
      "a/(s²–a²)",
      "1/(s²+a²)",
      "a²/(s²+a²)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Transformada de Laplace"
  },
  {
    "id": "sis3-19-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 1,
    "enunciado": "Qual é o valor de ∫₀¹ ∫₀¹ (x+y)dy dx?",
    "opcoes": [
      "1/2",
      "3/4",
      "1",
      "5/4",
      "3/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral dupla"
  },
  {
    "id": "sis3-19-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 2,
    "enunciado": "Qual é o valor de lim(x→0) (e^x–1–x)/x²?",
    "opcoes": [
      "0",
      "1/4",
      "1/3",
      "1/2",
      "1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limite (Taylor)"
  },
  {
    "id": "sis3-19-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 3,
    "enunciado": "O espaço nulo (kernel) da matriz [[1,2],[2,4]] tem dimensão:",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Álgebra linear"
  },
  {
    "id": "sis3-19-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 4,
    "enunciado": "Qual é a integral ∫ dx/(x²+4x+5)?",
    "opcoes": [
      "arctan(x+2)+C",
      "arctan(x+2)/2+C",
      "ln|x²+4x+5|+C",
      "arctan(x)/2+C",
      "2arctan(x+2)+C"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis3-19-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 5,
    "enunciado": "Qual é o divergente do campo vetorial F=(x²,y²,z²)?",
    "opcoes": [
      "2x+2y+2z",
      "x+y+z",
      "2xyz",
      "x²+y²+z²",
      "0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cálculo vetorial"
  },
  {
    "id": "sis3-19-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 6,
    "enunciado": "Qual é a solução da EDO: y''+ 4y=0?",
    "opcoes": [
      "y=C₁cos(2x)+C₂sen(2x)",
      "y=C₁e^(2x)+C₂e^(–2x)",
      "y=C₁cos(4x)+C₂sen(4x)",
      "y=C₁+C₂e^(2x)",
      "y=(C₁+C₂x)e^(2x)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO"
  },
  {
    "id": "sis3-19-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 7,
    "enunciado": "Qual é o valor de ∫₀^∞ x×e^(–x)dx?",
    "opcoes": [
      "0",
      "1/2",
      "1",
      "2",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral imprópria (por partes)"
  },
  {
    "id": "sis3-19-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 8,
    "enunciado": "Qual é o rotacional do campo F=(y,–x,0)?",
    "opcoes": [
      "(0,0,–2)",
      "(0,0,2)",
      "(2,0,0)",
      "(0,–2,0)",
      "(0,0,0)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Rotacional"
  },
  {
    "id": "sis3-19-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 9,
    "enunciado": "Qual é o ponto de mínimo de f(x,y)=x²+y²–2x–4y+8?",
    "opcoes": [
      "(1,2)",
      "(2,1)",
      "(1,4)",
      "(2,4)",
      "(0,0)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Otimização multivariável"
  },
  {
    "id": "sis3-19-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2019,
    "num": 10,
    "enunciado": "Qual é a transformada de Laplace de f(t)=cos(at)?",
    "opcoes": [
      "a/(s²+a²)",
      "s/(s²+a²)",
      "1/(s–a)",
      "s/(s²–a²)",
      "a/(s²–a²)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Transformada de Laplace"
  },
  {
    "id": "sis3-20-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 1,
    "enunciado": "Qual é o valor da integral ∫₀² ∫₀^(√(4–x²)) dy dx em coordenadas polares?",
    "opcoes": [
      "π/2",
      "π",
      "2π",
      "3π/2",
      "4π"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral dupla"
  },
  {
    "id": "sis3-20-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 2,
    "enunciado": "A série Σ1/n² converge para π²/6. Qual é o valor de Σ1/(2n)²?",
    "opcoes": [
      "π²/6",
      "π²/12",
      "π²/24",
      "π²/4",
      "π²/8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Séries"
  },
  {
    "id": "sis3-20-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 3,
    "enunciado": "Qual é a derivada de f(x)=arctan(e^x)?",
    "opcoes": [
      "e^x/(1+e^(2x))",
      "1/(1+e^(2x))",
      "e^x/(1+e^x)",
      "1/(1+e^x)",
      "arctan(e^x)/e^x"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Derivada (cadeia)"
  },
  {
    "id": "sis3-20-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 4,
    "enunciado": "Qual é a solução geral da EDO: y'–2y=4?",
    "opcoes": [
      "y=Ce^(2x)–2",
      "y=Ce^(2x)+2",
      "y=Ce^(–2x)–2",
      "y=Ce^(2x)–4",
      "y=4e^(2x)+C"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO linear"
  },
  {
    "id": "sis3-20-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 5,
    "enunciado": "Qual é o valor do determinante de uma matriz 3×3 com autovalores 2, 3 e 5?",
    "opcoes": [
      "10",
      "20",
      "25",
      "30",
      "35"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Autovalores"
  },
  {
    "id": "sis3-20-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 6,
    "enunciado": "Qual é o valor de lim(x→+∞) (ln(x))/x?",
    "opcoes": [
      "–∞",
      "–1",
      "0",
      "1",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: L'Hôpital"
  },
  {
    "id": "sis3-20-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 7,
    "enunciado": "Qual é o laplaciano de f(x,y)=x²y+xy²?",
    "opcoes": [
      "2y+2x",
      "2x+2y",
      "2xy",
      "2y–2x",
      "4xy"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Laplaciano"
  },
  {
    "id": "sis3-20-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 8,
    "enunciado": "Qual é a integral ∫ dx/(x×ln(x))?",
    "opcoes": [
      "ln(ln(x))+C",
      "ln(x)²/2+C",
      "1/(x×ln(x)²)+C",
      "ln|x|+C",
      "1/ln(x)+C"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral por substituição"
  },
  {
    "id": "sis3-20-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 9,
    "enunciado": "O teorema de Green relaciona integral de linha com integral dupla. Para F=(P,Q) e curva C simples fechada, ∮_C Pdx+Qdy=?",
    "opcoes": [
      "∬(∂Q/∂x–∂P/∂y)dA",
      "∬(∂P/∂x–∂Q/∂y)dA",
      "∬(∂Q/∂x+∂P/∂y)dA",
      "∬(∂P/∂y–∂Q/∂x)dA",
      "∬(∂P/∂x+∂Q/∂y)dA"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Teorema de Green"
  },
  {
    "id": "sis3-20-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2020,
    "num": 10,
    "enunciado": "Qual é a transformada inversa de Laplace de F(s)=1/(s²+1)?",
    "opcoes": [
      "cos(t)",
      "sen(t)",
      "e^t",
      "t",
      "1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Transformada inversa"
  },
  {
    "id": "sis3-21-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 1,
    "enunciado": "Qual é o valor de ∫₀^(π/2) cos³(x)dx?",
    "opcoes": [
      "1/3",
      "1/2",
      "2/3",
      "3/4",
      "1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral trigonométrica"
  },
  {
    "id": "sis3-21-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 2,
    "enunciado": "Qual é o valor de lim(x→0) (tg(x)–x)/x³?",
    "opcoes": [
      "0",
      "1/6",
      "1/3",
      "1/2",
      "1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limite (Taylor)"
  },
  {
    "id": "sis3-21-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 3,
    "enunciado": "Quais são os autovalores da matriz [[2,1],[1,2]]?",
    "opcoes": [
      "λ=1 e λ=3",
      "λ=2 e λ=4",
      "λ=0 e λ=3",
      "λ=1 e λ=4",
      "λ=2 e λ=3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Autovalores"
  },
  {
    "id": "sis3-21-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 4,
    "enunciado": "Qual é a solução da EDO: y''–y=0 com y(0)=1 e y'(0)=0?",
    "opcoes": [
      "y=e^x",
      "y=cos(x)",
      "y=(e^x+e^(–x))/2",
      "y=e^(–x)",
      "y=sen(x)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO"
  },
  {
    "id": "sis3-21-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 5,
    "enunciado": "Qual é o valor de ∫∫_R e^(x+y) dA, onde R=[0,1]×[0,1]?",
    "opcoes": [
      "(e–1)",
      "(e–1)²",
      "e²–1",
      "e²–e",
      "(e²–2e+1)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral dupla"
  },
  {
    "id": "sis3-21-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 6,
    "enunciado": "Qual é o gradiente de f(x,y)=ln(x²+y²) no ponto (1,0)?",
    "opcoes": [
      "(2,0)",
      "(0,2)",
      "(1,0)",
      "(0,1)",
      "(2,2)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Gradiente"
  },
  {
    "id": "sis3-21-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 7,
    "enunciado": "Qual é o valor da série alternada Σ(–1)^n/n de n=1 a ∞?",
    "opcoes": [
      "–ln(2)",
      "ln(2)",
      "0",
      "1",
      "π/4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Séries"
  },
  {
    "id": "sis3-21-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 8,
    "enunciado": "Qual é o valor de ∫ dx/(1+e^x)?",
    "opcoes": [
      "x–ln(1+e^x)+C",
      "ln(1+e^x)+C",
      "arctan(e^x)+C",
      "–ln(1+e^(–x))+C",
      "x+ln(1+e^x)+C"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral"
  },
  {
    "id": "sis3-21-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 9,
    "enunciado": "O plano tangente a z=√(x²+y²) no ponto (3,4,5) é:",
    "opcoes": [
      "3x+4y–5z=0",
      "3x+4y=5z",
      "3x–4y+5z=0",
      "x+y=z",
      "3x+4y+5z=50"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Plano tangente"
  },
  {
    "id": "sis3-21-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2021,
    "num": 10,
    "enunciado": "Qual é a transformada de Laplace de f(t)=t²?",
    "opcoes": [
      "1/s²",
      "2/s²",
      "1/s³",
      "2/s³",
      "6/s⁴"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Transformada de Laplace"
  },
  {
    "id": "sis3-22-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 1,
    "enunciado": "Qual é o valor de ∫₀^1 x²×e^x dx? (Use integração por partes)",
    "opcoes": [
      "e–2",
      "2e–4",
      "e–1",
      "2e–3",
      "e–3"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integração por partes (2×)"
  },
  {
    "id": "sis3-22-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 2,
    "enunciado": "O núcleo (kernel) da transformação T:ℝ³→ℝ² dada por T(x,y,z)=(x+y, y+z) tem dimensão:",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Álgebra linear"
  },
  {
    "id": "sis3-22-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 3,
    "enunciado": "Qual é o valor de lim(x→∞) (1+1/x)^x?",
    "opcoes": [
      "1",
      "2",
      "e",
      "π",
      "∞"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limite fundamental"
  },
  {
    "id": "sis3-22-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 4,
    "enunciado": "Qual é a integral ∫ x²/(x³+1) dx?",
    "opcoes": [
      "ln|x³+1|/3+C",
      "ln|x³+1|+C",
      "3ln|x³+1|+C",
      "x³/(3x³+3)+C",
      "ln|x|+C"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Substituição"
  },
  {
    "id": "sis3-22-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 5,
    "enunciado": "Qual é o divergente do campo F=(xy, yz, xz)?",
    "opcoes": [
      "y+z+x",
      "x+y+z",
      "2x+2y",
      "yz+xy",
      "y+z"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Divergente"
  },
  {
    "id": "sis3-22-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 6,
    "enunciado": "A solução da EDO y''+2y'+y=0 é:",
    "opcoes": [
      "y=(C₁+C₂x)e^(–x)",
      "y=C₁e^(–x)+C₂e^x",
      "y=C₁cos(x)+C₂sen(x)",
      "y=C₁e^(–2x)+C₂e^(–x)",
      "y=C₁xe^x+C₂e^x"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO"
  },
  {
    "id": "sis3-22-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 7,
    "enunciado": "Qual é o valor de ∫₀^∞ e^(–x²)dx? (Integral de Gauss)",
    "opcoes": [
      "1",
      "√π",
      "√π/2",
      "π/2",
      "√(2π)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral de Gauss"
  },
  {
    "id": "sis3-22-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 8,
    "enunciado": "Qual é o traço (trace) da matriz [[2,3,1],[0,–1,4],[0,0,5]]?",
    "opcoes": [
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Álgebra linear"
  },
  {
    "id": "sis3-22-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 9,
    "enunciado": "Qual é o valor mínimo de f(x,y)=x²+y²–2x–4y sujeito a x+y=3?",
    "opcoes": [
      "–4",
      "–3",
      "–2",
      "–1",
      "0"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Otimização com restrição"
  },
  {
    "id": "sis3-22-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2022,
    "num": 10,
    "enunciado": "Qual é a transformada de Laplace de f(t)=t×e^(at)?",
    "opcoes": [
      "1/(s–a)²",
      "1/(s+a)²",
      "a/(s–a)²",
      "s/(s–a)²",
      "(s–a)/(s–a)²"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Transformada de Laplace"
  },
  {
    "id": "sis3-23-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 1,
    "enunciado": "Qual é o valor de ∫₀^(π/2) ∫₀^(cos θ) r dr dθ (coordenadas polares)?",
    "opcoes": [
      "π/4",
      "π/8",
      "π/2",
      "1/2",
      "π/6"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral em coordenadas polares"
  },
  {
    "id": "sis3-23-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 2,
    "enunciado": "Qual é o valor de lim(x→0) (x–arctan(x))/x³?",
    "opcoes": [
      "0",
      "1/6",
      "1/3",
      "1/2",
      "1"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limite (Taylor)"
  },
  {
    "id": "sis3-23-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 3,
    "enunciado": "A matriz de rotação de ângulo θ no plano é R(θ). Para θ=π/2, qual é R(π/2)?",
    "opcoes": [
      "[[0,–1],[1,0]]",
      "[[0,1],[–1,0]]",
      "[[–1,0],[0,–1]]",
      "[[1,0],[0,–1]]",
      "[[0,1],[1,0]]"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Matrizes de rotação"
  },
  {
    "id": "sis3-23-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 4,
    "enunciado": "Qual é a solução da EDO: dy/dx = (y+1)/(x+1)?",
    "opcoes": [
      "y+1=C(x+1)",
      "y=Cx",
      "y+1=Ce^x",
      "y=C(x+1)–1",
      "y+1=C/(x+1)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO separável"
  },
  {
    "id": "sis3-23-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 5,
    "enunciado": "Qual é a integral ∫ dx/(x²√(x²–9))? (Use x=3sec θ)",
    "opcoes": [
      "√(x²–9)/(9x)+C",
      "√(x²–9)/(3x)+C",
      "arcsen(3/x)/9+C",
      "√(x²–9)/(27x)+C",
      "arctan(x/3)/9+C"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Substituição trigonométrica"
  },
  {
    "id": "sis3-23-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 6,
    "enunciado": "Qual é a série de Maclaurin de f(x)=1/(1–x) para |x|<1?",
    "opcoes": [
      "Σxⁿ de n=0 a ∞",
      "Σ(–x)ⁿ",
      "Σxⁿ/n!",
      "Σnxⁿ",
      "Σx^(2n)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Série de potências"
  },
  {
    "id": "sis3-23-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 7,
    "enunciado": "Qual é o rotacional de F=(z,x,y)?",
    "opcoes": [
      "(1,1,1)",
      "(1,0,1)",
      "(0,1,1)",
      "(1,1,0)",
      "(–1,–1,–1)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Rotacional"
  },
  {
    "id": "sis3-23-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 8,
    "enunciado": "Qual é o valor de ∫₀¹ ∫₀¹ ∫₀¹ xyz dz dy dx?",
    "opcoes": [
      "1/4",
      "1/8",
      "1/16",
      "1/6",
      "1/2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral tripla"
  },
  {
    "id": "sis3-23-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 9,
    "enunciado": "A matriz A é ortogonal se A^T×A=I. Qual é o determinante de toda matriz ortogonal?",
    "opcoes": [
      "0",
      "±1/2",
      "±1",
      "2",
      "qualquer valor"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Matrizes ortogonais"
  },
  {
    "id": "sis3-23-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2023,
    "num": 10,
    "enunciado": "Qual é a transformada de Laplace de f(t)=u(t–a) (função degrau unitário deslocada)?",
    "opcoes": [
      "e^(–as)/s",
      "e^(as)/s",
      "1/(s+a)",
      "a/s²",
      "e^(–as)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Transformada de Laplace"
  },
  {
    "id": "sis3-24-001",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 1,
    "enunciado": "Qual é o valor de ∫₀^(π/4) sec²(x)×tg(x)dx?",
    "opcoes": [
      "1/4",
      "1/3",
      "1/2",
      "2/3",
      "3/4"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral por substituição"
  },
  {
    "id": "sis3-24-002",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 2,
    "enunciado": "Qual é o valor de lim(x→0) (e^(3x)–e^(2x))/x?",
    "opcoes": [
      "0",
      "1",
      "2",
      "3",
      "5"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Limite"
  },
  {
    "id": "sis3-24-003",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 3,
    "enunciado": "A matriz A=[[4,1],[2,3]] tem autovalores λ₁ e λ₂. Qual é λ₁+λ₂ e λ₁×λ₂?",
    "opcoes": [
      "soma=7 e produto=10",
      "soma=5 e produto=12",
      "soma=7 e produto=12",
      "soma=6 e produto=10",
      "soma=7 e produto=8"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Autovalores"
  },
  {
    "id": "sis3-24-004",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 4,
    "enunciado": "Qual é a solução geral da EDO: y''–4y'+4y=0?",
    "opcoes": [
      "y=(C₁+C₂x)e^(2x)",
      "y=C₁e^(2x)+C₂e^(–2x)",
      "y=C₁cos(2x)+C₂sen(2x)",
      "y=C₁e^(4x)+C₂xe^(4x)",
      "y=C₁e^(–2x)+C₂xe^(–2x)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: EDO"
  },
  {
    "id": "sis3-24-005",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 5,
    "enunciado": "Qual é o valor de ∫₀^∞ x×e^(–2x)dx?",
    "opcoes": [
      "1/8",
      "1/4",
      "1/2",
      "1",
      "2"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral imprópria (por partes)"
  },
  {
    "id": "sis3-24-006",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 6,
    "enunciado": "Qual é o ponto de sela de f(x,y)=x³–3xy²?",
    "opcoes": [
      "(0,0)",
      "(1,1)",
      "(–1,0)",
      "(0,1)",
      "(1,–1)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Otimização multivariável"
  },
  {
    "id": "sis3-24-007",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 7,
    "enunciado": "Qual é o valor de ∫∫_D x dA, onde D é o disco x²+y²≤1?",
    "opcoes": [
      "0",
      "π/4",
      "π/2",
      "π",
      "2π"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Integral dupla"
  },
  {
    "id": "sis3-24-008",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 8,
    "enunciado": "Qual é a série de Taylor de ln(1+x) centrada em 0 para |x|≤1, x≠–1?",
    "opcoes": [
      "Σ(–1)^(n+1)xⁿ/n de n=1 a ∞",
      "Σxⁿ/n!",
      "Σ(–1)^n xⁿ",
      "Σxⁿ/(n+1)",
      "Σ(–1)^n/(n×xⁿ)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Série de Taylor"
  },
  {
    "id": "sis3-24-009",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 9,
    "enunciado": "O teorema de Stokes relaciona integral de superfície com integral de linha. ∬_S (∇×F)·dS=?",
    "opcoes": [
      "∮_C F·dr",
      "∬_S F·dS",
      "∭_V divF dV",
      "∮_C F×dr",
      "∇²F"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Cálculo vetorial"
  },
  {
    "id": "sis3-24-010",
    "vest": "SIS",
    "etapa": 3,
    "ano": 2024,
    "num": 10,
    "enunciado": "Qual é a transformada de Laplace de f(t)=e^(–at)cos(bt)?",
    "opcoes": [
      "(s+a)/((s+a)²+b²)",
      "b/((s+a)²+b²)",
      "(s–a)/((s–a)²+b²)",
      "s/(s²+b²)",
      "a/((s+a)²+b²)"
    ],
    "materia": "Matemática",
    "serie": 3,
    "contexto": "Tema: Transformada de Laplace"
  }
];
function getDificuldade(q) {
  const ctx = (q.contexto || '').toLowerCase();
  // Nível 4 — avançado (SIS 3, conteúdo universitário)
  if (ctx.includes('transformada') || ctx.includes('integral') || ctx.includes('autovalor') ||
      ctx.includes('edo') || ctx.includes('laplace') || ctx.includes('série de taylor') ||
      (q.vest === 'SIS' && q.etapa >= 3)) return 4;
  // Nível 3 — difícil
  if (ctx.includes('cônica') || ctx.includes('combinação') || ctx.includes('permutação') ||
      ctx.includes('determinante') || ctx.includes('logarit') || ctx.includes('trigonometr') ||
      (q.vest === 'SIS' && q.etapa === 2) || (q.vest === 'PSC' && q.etapa === 3)) return 3;
  // Nível 2 — médio
  if (ctx.includes('probabilidade') || ctx.includes('exponencial') ||
      ctx.includes('geometr') || ctx.includes('matr') ||
      ctx.includes('quadrática') || ctx.includes('progressão') ||
      ctx.includes('estatística')) return 2;
  // Nível 1 — fácil
  return 1;
}

// Referência explícita para os módulos carregados dinamicamente pelo Router.
window.VOAAM_BANCO = bancoDB;
