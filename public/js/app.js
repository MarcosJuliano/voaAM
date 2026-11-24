// =============================================================
// js/app.js — Entry point da aplicação VoaAM
//
// Carrega todos os módulos na ordem correta de dependência.
// Para adicionar um novo módulo: acrescente um <script> no
// index.html ANTES deste arquivo, ou importe aqui se usar bundler.
//
// Ordem de carregamento (via index.html):
//   1. js/modules/state.js        — estado global + perfil + corações
//   2. js/data/topics.js          — tópicos por matéria/série
//   3. js/data/quizzes.js         — aulas e quizzes
//   4. js/data/simulados.js       — catálogo de simulados
//   5. js/data/banco.js           — banco de questões
//   6. js/modules/utils.js        — getDificuldade + pós-proc banco
//   7. js/modules/gamification.js — XP, streak, conquistas
//   8. js/modules/materia.js      — tela Estudar
//   9. js/modules/aula.js         — aula + quiz
//  10. js/modules/simulado.js     — simulado cronometrado
//  11. js/modules/praticar.js     — aba Praticar
//  12. js/modules/exercicios.js   — exercícios Duolingo
//  13. js/modules/auth.js         — login/cadastro/sessão
//  14. js/modules/nav.js          — goTo + perfil + theme + init
//  15. js/app.js                  — (este arquivo) init final
// =============================================================

// ─── INIT FINAL ───
// Executado depois que todos os módulos foram carregados.
(function initApp() {
  // Aplica o perfil salvo (se existir)
  if (typeof perfil !== 'undefined' && perfil) {
    aplicarPerfil();
  }

  // Renderiza tópicos na tela de matéria
  if (typeof renderTopics === 'function') renderTopics();

  // O tema já foi aplicado no <head>, antes do CSS e do carregamento dos módulos.

  // Fecha aula-view com tecla Escape (acessibilidade teclado)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const aulaView = document.getElementById('aula-view');
      if (aulaView && aulaView.classList.contains('open')) {
        closeAula();
      }
    }
  });
  authInit();
})();
