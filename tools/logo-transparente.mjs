// Recupera o alpha do logo original, composto de branco e dourado sobre bordô.
// Resolve também os pixels suavizados das bordas, evitando halos do fundo antigo.
export async function geraLogoTransparente(sharp, origem, destino) {
  const { data, info } = await sharp(origem)
    .extract({ left: 200, top: 455, width: 1100, height: 520 })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const fundo = [111, 20, 24];
  const cores = [[255, 255, 255], [205, 132, 13]];
  for (let i = 0; i < data.length; i += 4) {
    let melhor = null;
    for (const cor of cores) {
      const vetor = cor.map((v, c) => v - fundo[c]);
      const alpha = Math.max(0, Math.min(1,
        vetor.reduce((s, v, c) => s + v * (data[i + c] - fundo[c]), 0)
        / vetor.reduce((s, v) => s + v * v, 0)));
      const erro = vetor.reduce((s, v, c) => s + (data[i + c] - fundo[c] - alpha * v) ** 2, 0);
      if (!melhor || erro < melhor.erro) melhor = { cor, alpha, erro };
    }
    data[i] = melhor.cor[0];
    data[i + 1] = melhor.cor[1];
    data[i + 2] = melhor.cor[2];
    data[i + 3] = Math.round(melhor.alpha * 255);
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize(248, 112, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ lossless: true, quality: 100, effort: 6 }).toFile(destino);
}
