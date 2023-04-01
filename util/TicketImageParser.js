const Tesseract = require("tesseract.js");

const ParseTextFromImage = ({ file }) => {
  try {
    Tesseract.recognize(file, "eng")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err)
  }
};

module.exports = {
  ParseTextFromImage,
};
