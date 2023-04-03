const fs = require("fs");
const pdf2img = require("pdf-img-convert");
const { ParseTextFromImage } = require("./TicketImageParser");
const pdf = require('pdf-parse');

const textract = require('textract');

const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */

const loadPdfFile = async ({ file }) => {
  const path = `${__dirname}/../${file.path}`;
  try {
    // const images = await pdf2img.convert(path);
    // for (const image of images) {
    //   ParseTextFromImage({ file: image });
    // }
    const data = await pdf(fs.readFileSync(path));
    console.log(data.text);
    // textract.fromFileWithPath(path, (error,text)=>{
    //   console.log("**********8")
    //   console.log(error);
    //   console.log(text);
    // });
    

  } catch (err) {
    console.log(err);
  }

  const places = [
    "Lunch 2º Lote",
    "Ingresso Social",
    "Av Pedro Álvares Cabral",
    " Av IV Centenário – portões 6 e 7A 04094-050",
  ];
  const dates = [
    new Date("2023-04-05 12:00"),
    new Date("2023-04-05 10:00"),
    new Date("2023-04-06 12:00"),
    new Date("2023-04-07 10:00"),
  ];
  try {
    const data = await pdfExtract.extract(path, options);
    const contents = data?.pages[0]?.content;
    const metadata = data?.meta?.metadata;
    console.log(metadata);
    for (const row of contents) {
      console.log(row.str);
    }
    // return {
    //   parse: true,
    //   data: {
    //     originPrice: 2400 + Math.floor(Math.random() * 100),
    //     seat: places[Math.ceil(Math.random() * 3)],
    //     qrcode: "1156952038967",
    //     dateTime:dates[Math.ceil(Math.random() * 4)],
    //   },
    // };
    return {
      parse: false,
      data: {
        originPrice: 2400 + Math.floor(Math.random() * 100),
        seat: places[Math.ceil(Math.random() * 3)],
        qrcode: "1156952038967",
        dateTime: dates[Math.ceil(Math.random() * 4)],
      },
    };
  } catch (err) {
    console.log(err);
    return { parse: false, data: null };
  }
};
module.exports = { loadPdfFile };
