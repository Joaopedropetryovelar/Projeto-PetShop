function removerAcentosEMaiusculo(texto = '') {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .toUpperCase()
    .trim();
}

// Monta um campo no formato ID + TAMANHO (2 dígitos) + VALOR
function tlv(id, valor) {
  const tamanho = String(valor.length).padStart(2, '0');
  return `${id}${tamanho}${valor}`;
}

// CRC16/CCITT-FALSE (poly 0x1021, init 0xFFFF) - é o checksum exigido
// no final do payload Pix.
function crc16(payload) {
  let crc = 0xffff;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;

    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// Transforma "R$ 50,00" em 50 (número)
export function valorParaNumero(textoPreco = '') {
  const limpo = String(textoPreco)
    .replace(/[^\d,.-]/g, '')
    .replace(',', '.');

  const numero = parseFloat(limpo);
  return Number.isFinite(numero) ? numero : 0;
}

// Gera um identificador de transação (txid) válido a partir do id do
// agendamento no Firestore (só letras e números, até 25 caracteres).
export function gerarTxId(baseId = '') {
  const limpo = String(baseId).replace(/[^a-zA-Z0-9]/g, '');
  const txid = limpo ? `PET${limpo}` : 'PETSHOP';
  return txid.slice(0, 25) || '***';
}

// Monta o payload completo do Pix (string que vira o QR Code)
export function gerarPayloadPix({
  chave,
  nomeRecebedor,
  cidade,
  valor,
  txid,
  descricao
}) {
  if (!chave) {
    throw new Error(
      'Configure a chave Pix em src/Data/PixConfig.js antes de gerar o QR Code.'
    );
  }

  const nome = removerAcentosEMaiusculo(nomeRecebedor).slice(0, 25) || 'PET SHOP';
  const cidadeFormatada =
    removerAcentosEMaiusculo(cidade).slice(0, 15) || 'SAO PAULO';
  const txidFinal = (txid || gerarTxId()).slice(0, 25) || '***';

  let contaPix = tlv('00', 'br.gov.bcb.pix') + tlv('01', chave.trim());

  if (descricao) {
    contaPix += tlv('02', removerAcentosEMaiusculo(descricao).slice(0, 50));
  }

  let payload =
    tlv('00', '01') + // Payload Format Indicator
    tlv('01', '12') + // Point of Initiation Method (12 = QR de uso único)
    tlv('26', contaPix) + // Informações da conta Pix
    tlv('52', '0000') + // Merchant Category Code
    tlv('53', '986'); // Moeda (986 = BRL)

  if (valor && Number(valor) > 0) {
    payload += tlv('54', Number(valor).toFixed(2));
  }

  payload +=
    tlv('58', 'BR') +
    tlv('59', nome) +
    tlv('60', cidadeFormatada) +
    tlv('62', tlv('05', txidFinal));

  payload += '6304';
  payload += crc16(payload);

  return payload;
}