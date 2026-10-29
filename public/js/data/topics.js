// js/data/topics.js — Tópicos de Matemática e Redação por série
// Para adicionar tópicos: insira objetos nos arrays abaixo.
// quizId deve corresponder a uma chave em js/data/quizzes.js

const mathTopics = {
  1: [
    { icon:'📊', name:'Conjuntos e Números Reais', sub:'6 questões', quizId:'conjuntos' },
    { icon:'📈', name:'Função Afim (1º grau)', sub:'8 questões', quizId:'funcao_afim' },
    { icon:'📉', name:'Função Quadrática (2º grau)', sub:'8 questões', quizId:'funcao_quad' },
    { icon:'🔢', name:'Progressão Aritmética (PA)', sub:'6 questões', quizId:'pa' },
    { icon:'⚡', name:'Progressão Geométrica (PG)', sub:'6 questões', quizId:'pg' },
    { icon:'📐', name:'Trigonometria Básica', sub:'8 questões', quizId:'trig' },
    { icon:'🔷', name:'Geometria Plana', sub:'6 questões', quizId:'geo_plana' },
  ],
  2: [
    { icon:'📊', name:'Trigonometria Completa', sub:'8 questões', quizId:'trig2' },
    { icon:'🔲', name:'Matrizes e Determinantes', sub:'6 questões', quizId:'matrizes' },
    { icon:'🔗', name:'Sistemas Lineares', sub:'6 questões', quizId:'sistemas' },
    { icon:'🔺', name:'Geometria Espacial', sub:'8 questões', quizId:'geo_esp' },
    { icon:'📐', name:'Geometria Analítica', sub:'8 questões', quizId:'geo_anal' },
  ],
  3: [
    { icon:'📊', name:'Logaritmos e Exponenciais', sub:'8 questões', quizId:'log' },
    { icon:'🎲', name:'Análise Combinatória', sub:'6 questões', quizId:'comb' },
    { icon:'🎯', name:'Probabilidade', sub:'6 questões', quizId:'prob' },
    { icon:'📈', name:'Estatística', sub:'6 questões', quizId:'estat' },
    { icon:'💰', name:'Matemática Financeira', sub:'6 questões', quizId:'fin' },
  ]
};

const redTopics = {
  1: [
    { icon:'📖', name:'Tipos Textuais', sub:'4 questões', quizId:'tipos' },
    { icon:'🔗', name:'Coerência e Coesão', sub:'6 questões', quizId:'coerencia' },
    { icon:'🔡', name:'Elementos da Narrativa', sub:'4 questões', quizId:'narr' },
  ],
  2: [
    { icon:'✍️', name:'Artigo de Opinião', sub:'6 questões', quizId:'artigo' },
    { icon:'💬', name:'Argumentação', sub:'6 questões', quizId:'arg' },
    { icon:'🧩', name:'Contra-argumento', sub:'4 questões', quizId:'contra' },
    { icon:'🎨', name:'Repertório Sociocultural', sub:'6 questões', quizId:'rep' },
  ],
  3: [
    { icon:'📝', name:'Dissertação Argumentativa', sub:'8 questões', quizId:'diss' },
    { icon:'🌟', name:'5 Competências ENEM', sub:'10 questões', quizId:'comp' },
    { icon:'🔧', name:'Proposta de Intervenção', sub:'6 questões', quizId:'interv' },
    { icon:'🏆', name:'Redação Nota 1000', sub:'Análise', quizId:'nota1000' },
  ]
};

