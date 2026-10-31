/* QR pattern adapted from shadcn/ui's homepage QR card (MIT). Decorative only — not scannable. */
/** Shared by QrPattern (client) and the event scenes (server), so it lives in a plain module. */
export const qrRows = [
  "111111100101101111111",
  "100000101001001000001",
  "101110101111101011101",
  "101110100100001011101",
  "101110101010101011101",
  "100000100111001000001",
  "111111101010101111111",
  "000000001101000000000",
  "101011111001111010110",
  "010100001110010101001",
  "111010111011101111010",
  "001101000101000010101",
  "110111101111010111011",
  "000000001001010001010",
  "111111101101111101001",
  "100000100010001001111",
  "101110101011101110100",
  "101110100110100010011",
  "101110101000111101110",
  "100000101101000011001",
  "111111101011101101111",
];

/**
 * The same pattern as one SVG path in a 21×21 grid — each row's dark cells merged into runs — so a QR
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
