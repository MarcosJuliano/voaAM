/** Exporta questões já existentes, usando a lógica do projeto C# para embaralhar por Fisher–Yates no servidor.
 * Execute da raiz: node scripts/gerar_catalogo.js
 * Nunca publique o JSON resultante em public/: ele contém gabaritos.
 */
const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');const ctx={window:{},console,Math};vm.createContext(ctx);
const ler=(p)=>fs.readFileSync(path.join(ROOT,p),'utf8');
const files=['public/js/data/banco.js',...['enem2023','enem2024','enem2025','macro2023','macro2024','macro2025','psc1','psc2','psc3','sis1','sis2','sis3'].map(k=>`public/js/data/${k}_mat.js`),'public/js/modules/simulado_completo.js'];
files.forEach(f=>vm.runInContext(ler(f),ctx,{filename:f}));
const usados=new Set(), itens=[], letras=['A','B','C','D','E'];
function inserir(q){if(!q.id||!q.enunciado||!Array.isArray(q.alternativas)||q.alternativas.length<2||q.alternativas.some(s=>!String(s||'').trim())||!Number.isInteger(q.correta)||q.correta<0||q.correta>=q.alternativas.length||usados.has(q.id))return;usados.add(q.id);itens.push(q)}
const geral=vm.runInContext('bancoDB',ctx);
for(const q of geral){inserir({id:'banco:'+q.id,fonte:'Banco de questões',vestibular:q.vest,ano:q.ano||null,etapa:q.etapa||null,disciplina:q.materia||'Matemática',assunto:q.assunto||q.tema||'Geral',enunciado:q.enunciado,alternativas:q.opcoes,correta:q.correta,imagem:null,explicacao:q.contexto||''})}
const provas=vm.runInContext('Object.keys(SC_PROVAS)',ctx);
for(const key of provas){
 const lista=vm.runInContext(`scGetQuestoes(${JSON.stringify(key)})`,ctx);
 const vest=key.replace(/\d+$/,'').replace(/\d$/,'');
 const etapa=/^(SIS|PSC)[123]$/.test(key)?Number(key.slice(-1)):null;
 for(const q of lista){const ano=q._ano||Number(key.match(/20\d\d/)?.[0])||null;const num=q._numOriginal||q.num;const g=vm.runInContext(`scGetGabarito(${JSON.stringify(key)},${q.num},${q._ano||'null'},${q._numOriginal||'null'})`,ctx);const subject=vm.runInContext(`scGetAssunto(${JSON.stringify(key)},${q.num},${q._ano||'null'},${q._numOriginal||'null'})`,ctx); const opts=letras.map(l=>q.alt?.[l]).filter(x=>x!=null);
 inserir({id:`oficial:${key}:${ano}:${num}`,fonte:'Prova cadastrada',prova:key,vestibular:vest,ano,etapa,disciplina:'Matemática',assunto:subject||'Matemática',enunciado:q.enunciado,alternativas:opts,correta:letras.indexOf(String(g||'').trim().toUpperCase()),imagem:q.img||null,explicacao:''});}
}
for(const [arquivo,disciplina] of Object.entries({biologia:'Biologia',historia:'História',matematica:'Matemática',portugues:'Português'})){
 const docs=JSON.parse(ler(`integracao/questoes-csharp/${arquivo}.json`).replace(/^\uFEFF/,''));
 docs.forEach((q,i)=>inserir({id:`dotnet:${arquivo}:${i+1}`,fonte:'Projeto C# (exercícios)',prova:'C#',vestibular:'GERAL',ano:null,etapa:null,disciplina,assunto:disciplina,enunciado:q.enunciado,alternativas:q.Alternativas,correta:(q.Alternativas||[]).findIndex(a=>a===q.Alternativacorreta),imagem:null,explicacao:''}));
}
const destino=path.join(ROOT,'database/questoes_treino.json');fs.writeFileSync(destino,JSON.stringify(itens,null,2)+'\n');
const porFonte={};for(const q of itens)porFonte[q.fonte]=(porFonte[q.fonte]||0)+1;
console.log('Questões exportadas para o backend:',itens.length,porFonte);
