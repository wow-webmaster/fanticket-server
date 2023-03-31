const fs = require("fs");
const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */

const loadPdfFile = async ({ file }) => {
  const path = `${__dirname}/../${file.path}`;
  const places = [
    "Lunch 2º Lote",
    "Ingresso Social",
    "Av Pedro Álvares Cabral",
    " Av IV Centenário – portões 6 e 7A 04094-050",
  ];
  try {
    const data = await pdfExtract.extract(path, options);
    const contents = data?.pages[0]?.content;
    for (const row of contents) {
    }
    // return {
    //   parse: true,
    //   data: {
    //     originPrice: 2400 + Math.floor(Math.random() * 100),
    //     seat: places[Math.ceil(Math.random() * 3)],
    //     qrcode: "1156952038967",
    //   },
    // };
    return {
      parse: false,
      data: {
        originPrice: 2400 + Math.floor(Math.random() * 100),
        seat: places[Math.ceil(Math.random() * 3)],
        qrcode: "1156952038967",
      },
    };
  } catch (err) {
    return { parse: false, data: null };
  }
};
module.exports = { loadPdfFile };
