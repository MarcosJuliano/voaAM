// Ícones locais em SVG. Evita emojis variados nas telas e não depende de CDN.
(() => {
  const iconMap = new Map(Object.entries({
    '🏠':'house','🏡':'house','📚':'book-open','📖':'book-open','📘':'book-open','📕':'book-open',
    '✏️':'pencil','✏':'pencil','📝':'pencil','✍️':'pencil','✍':'pencil','🖊️':'pencil',
    '📐':'ruler','📏':'ruler','📊':'chart-column','📈':'chart-column','📉':'chart-column',
    '📥':'archive','📂':'archive','📁':'archive','📄':'file-text','📋':'file-text','🗂️':'archive',
    '👤':'user-round','👩':'user-round','👨':'user-round','👦':'user-round','👧':'user-round','😎':'user-round',
    '🎓':'graduation-cap','⭐':'star','🌟':'star','✨':'sparkles','🏆':'trophy',
    '⚡':'zap','🔥':'flame','🌿':'leaf','🍃':'leaf','💚':'heart','❤️':'heart','🖤':'heart',
    '💔':'heart-crack','🔒':'lock','🔓':'lock','🛡️':'shield-check','🛡':'shield-check',
    '⏱️':'clock','⏰':'clock','📅':'calendar-days','🗓️':'calendar-days','🎯':'target',
    '✅':'check-circle','✔️':'check-circle','✔':'check-circle','☑️':'check-circle',
    '❌':'circle-x','⚠️':'triangle-alert','❗':'triangle-alert',
    '🔄':'refresh-cw','🔁':'refresh-cw','⚙️':'settings','🔧':'settings',
    '💡':'lightbulb','🌙':'moon','☀️':'sun','☀':'sun','🚀':'rocket',
    '💰':'wallet','💵':'wallet','💸':'wallet','💳':'wallet',
    '🧮':'calculator','🔢':'calculator','🔡':'book-open','🧩':'shapes','🎲':'dice-five',
    '🟢':'circle-dot','🟡':'circle-dot','🟠':'circle-dot','🔴':'circle-dot',
    '📺':'monitor','▶️':'play','▶':'play','🎬':'monitor',
    '🇧🇷':'flag','📌':'pin','🔍':'search','💬':'message-circle',
    '1️⃣':'list-ordered','2️⃣':'list-ordered','3️⃣':'list-ordered',
    '🥇':'trophy','🥈':'trophy','🥉':'trophy','💎':'gem','🧠':'brain',
    '✉️':'mail','📧':'mail','👁':'eye','🙈':'eye-off','💥':'sparkles',
  }));
  const seg = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('pt-BR',{granularity:'grapheme'}) : null;
  const pict = /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u;
  function nomeIcone(token) {
    if (iconMap.has(token)) return iconMap.get(token);
    const normalized = token.replace(/[\uFE0E\uFE0F]/g,'');
    for(const [k,name] of iconMap) if(k.replace(/[\uFE0E\uFE0F]/g,'') === normalized) return name;
    return pict.test(token) ? 'sparkles' : null;
  }
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('class','voa-svg-icon'); svg.setAttribute('aria-hidden','true');
    const use=document.createElementNS('http://www.w3.org/2000/svg','use');
    use.setAttribute('href',`/assets/icons.svg#${name}`);svg.appendChild(use);return svg;
  }
  function trocarTexto(node) {
    if(!node.nodeValue || !seg) return;
    if(node.parentElement?.closest('script,style,textarea,code,pre,svg,[data-no-iconify]')) return;
    const partes = [...seg.segment(node.nodeValue)].map(s=>s.segment);
    if(!partes.some(p => nomeIcone(p))) return;
    const frag = document.createDocumentFragment();
    for(const parte of partes) frag.append(nomeIcone(parte) ? icon(nomeIcone(parte)) : document.createTextNode(parte));
    node.replaceWith(frag);
  }
  function scan(root) {
    if(root.nodeType === Node.TEXT_NODE) {trocarTexto(root);return;}
    if(root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    if(root.nodeType === Node.ELEMENT_NODE && root.matches('script,style,textarea,code,pre,svg,[data-no-iconify]')) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const textos=[];while(walker.nextNode()) textos.push(walker.currentNode);
    textos.forEach(trocarTexto);
  }
  const observer=new MutationObserver(mutations => {
    for(const m of mutations) {
      if(m.type==='characterData') trocarTexto(m.target);
      else for(const n of m.addedNodes) scan(n);
    }
  });
  const start=()=>{scan(document.body);observer.observe(document.body,{childList:true,subtree:true,characterData:true});};
  if(document.body) start(); else document.addEventListener('DOMContentLoaded',start,{once:true});
  window.voaIcon=icon;
})();
