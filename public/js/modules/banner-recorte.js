const bannerRecorte = document.getElementById('banner-recorte');
const bannerCanvas = document.getElementById('banner-recorte-previa');
const bannerContexto = bannerCanvas.getContext('2d', {alpha: false});
const bannerZoom = document.getElementById('banner-recorte-zoom');
const bannerX = document.getElementById('banner-recorte-x');
const bannerY = document.getElementById('banner-recorte-y');
const bannerAplicar = document.getElementById('banner-recorte-aplicar');
const bannerErro = document.getElementById('banner-recorte-erro');
let sessaoRecorte = null;
let arrasteBanner = null;

function pintarRecorteBanner() {
  if (!sessaoRecorte) return;
  const {imagem} = sessaoRecorte;
  const escala = Math.max(bannerCanvas.width / imagem.naturalWidth, bannerCanvas.height / imagem.naturalHeight)
    * Number(bannerZoom.value);
  const largura = Math.min(imagem.naturalWidth, bannerCanvas.width / escala);
  const altura = Math.min(imagem.naturalHeight, bannerCanvas.height / escala);
  const sobraX = imagem.naturalWidth - largura;
  const sobraY = imagem.naturalHeight - altura;
  bannerContexto.fillStyle = '#121122';
  bannerContexto.fillRect(0, 0, bannerCanvas.width, bannerCanvas.height);
  bannerContexto.drawImage(imagem, sobraX * Number(bannerX.value) / 100, sobraY * Number(bannerY.value) / 100,
    largura, altura, 0, 0, bannerCanvas.width, bannerCanvas.height);
  return {sobraX, sobraY, escala};
}

async function abrirRecorteBanner(arquivo, aplicar, informarErro) {
  const sessao = {imagem: new Image(), aplicar};
  sessaoRecorte = sessao;
  const url = URL.createObjectURL(arquivo);
  try {
    if (!bannerContexto) throw new Error('A prévia de imagem não está disponível neste navegador.');
    sessao.imagem.src = url;
    await sessao.imagem.decode();
    if (sessaoRecorte !== sessao) return;
    if (sessao.imagem.naturalWidth * sessao.imagem.naturalHeight > 12_000_000) {
      throw new Error('Use uma imagem com até 12 megapixels.');
    }
    bannerZoom.value = '1';
    bannerX.value = bannerY.value = '50';
    bannerErro.textContent = '';
    pintarRecorteBanner();
    bannerRecorte.showModal();
  } catch (erro) {
    if (sessaoRecorte !== sessao) return;
    sessaoRecorte = null;
    informarErro(erro.name === 'EncodingError' ? 'Não foi possível ler a imagem.' : erro.message);
  } finally {
    URL.revokeObjectURL(url);
  }
}

for (const controle of [bannerZoom, bannerX, bannerY]) controle.addEventListener('input', pintarRecorteBanner);
bannerCanvas.addEventListener('pointerdown', e => {
  if (!e.isPrimary || e.button !== 0) return;
  const geometria = pintarRecorteBanner();
  if (!geometria) return;
  arrasteBanner = {
    ...geometria, id: e.pointerId, x: e.clientX, y: e.clientY,
    horizontal: Number(bannerX.value), vertical: Number(bannerY.value),
  };
  bannerCanvas.setPointerCapture(e.pointerId);
});
bannerCanvas.addEventListener('pointermove', e => {
  if (arrasteBanner?.id !== e.pointerId) return;
  const {x, y, horizontal, vertical, sobraX, sobraY, escala} = arrasteBanner;
  const area = bannerCanvas.getBoundingClientRect();
  if (sobraX > 0) bannerX.value = horizontal - 100 * (e.clientX - x) * bannerCanvas.width / (area.width * escala * sobraX);
  if (sobraY > 0) bannerY.value = vertical - 100 * (e.clientY - y) * bannerCanvas.height / (area.height * escala * sobraY);
  pintarRecorteBanner();
});
bannerCanvas.addEventListener('lostpointercapture', () => { arrasteBanner = null; });

document.getElementById('banner-recorte-cancelar').addEventListener('click', () => bannerRecorte.close());
bannerRecorte.addEventListener('close', () => {
  sessaoRecorte = null;
  arrasteBanner = null;
});
document.getElementById('banner-recorte-form').addEventListener('submit', async e => {
  e.preventDefault();
  const sessao = sessaoRecorte;
  if (!sessao || bannerAplicar.disabled) return;
  bannerAplicar.disabled = true;
  try {
    const blob = await new Promise(resolve => bannerCanvas.toBlob(resolve, 'image/jpeg', 0.86));
    if (sessaoRecorte !== sessao || !bannerRecorte.open) return;
    if (!blob) throw new Error('Não foi possível gerar o recorte.');
    sessao.aplicar(new File([blob], 'banner.jpg', {type: 'image/jpeg'}));
    bannerRecorte.close();
  } catch (erro) {
    if (sessaoRecorte === sessao && bannerRecorte.open) bannerErro.textContent = erro.message;
  } finally {
    bannerAplicar.disabled = false;
  }
});
