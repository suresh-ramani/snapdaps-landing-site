/**
 * A real, scannable QR code for https://snapdaps.ai (version 2, error correction M, 25×25) — every QR
 * on the site (`QrPattern`) opens snapdaps.ai and nothing else. Generated once with a standard QR
 * encoder and checked with the browser's BarcodeDetector (decodes to "https://snapdaps.ai").
 * Don't hand-edit the rows: regenerate the whole code if the link ever changes.
 * Shared by QrPattern, so it lives in a plain module.
 */
export const QR_URL = "https://snapdaps.ai";
export const qrRows = [
  "1111111000100000101111111",
  "1000001001010001001000001",
  "1011101011100010101011101",
  "1011101010110110001011101",
  "1011101011101100001011101",
  "1000001011110001101000001",
  "1111111010101010101111111",
  "0000000011100010000000000",
  "1011111000110001101111100",
  "0100000010101100100100010",
  "0000011110100111010111011",
  "0011110100000101000000001",
  "0001101001011011111110111",
  "1100110101100000100101010",
  "1001011111111001101111011",
  "1010100001010011011110001",
  "1010001101110001111110100",
  "0000000011101111100011000",
  "1111111000100110101010111",
  "1000001010101100100011010",
  "1011101010101011111110101",
  "1011101011000001011011111",
  "1011101010011000010001101",
  "1000001000110011101111001",
  "1111111010110000001111111",
];

/**
 * The same code as one SVG path in a 25×25 grid — each row's dark cells merged into runs — so a QR
 * is one DOM node instead of ~220 <rect>s (keeps the DOM small wherever a QR shows).
 */
export const qrPath = qrRows
  .map((row, y) => {
    let d = "";
    for (let x = 0; x < row.length; ) {
      if (row[x] !== "1") {
        x++;
        continue;
      }
      let w = 1;
      while (row[x + w] === "1") w++;
      d += `M${x} ${y}h${w}v1h-${w}z`;
      x += w;
    }
    return d;
  })
  .join("");
