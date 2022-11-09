const path = require("path");
const fs = require("fs");
const silenceMode = true;

const readFolder = async function (folder, category) {
  const directoryPath = path.join(__dirname, folder);
  const categories = {};
  const cards = [];
  let cover = false;

  const files = fs.readdirSync(directoryPath);

  files.forEach(async function (fileName) {
    const fullFilePath = folder + "/" + fileName;

    if (fs.lstatSync(fullFilePath).isDirectory()) {
      if (!silenceMode) console.log("reading category: " + fileName);

      const fullCategoryName = category
        ? category.fullName + "/" + fileName
        : fileName;
      const categoryRead = await readFolder(fullFilePath, {name:fileName, fullName: fullCategoryName});

      if (
        categoryRead.cards.length > 0 ||
        Object.keys(categoryRead.categories).length > 0
      ) {
        const category = {
          name: fileName,
          fullName: fullCategoryName,
          cover: categoryRead.cover,
          cards: categoryRead.cards,
          categories: categoryRead.categories,
        };

        categories[fileName] = category;
      }
    } else {
      const fileExtension = getExtensionFromFileName(fileName);

      if (fileExtension === "txt") {
        if (!silenceMode) console.log("reading card: " + fileName);

        const cardName = removeExtensionFromFileName(fileName);
        const cardImage = cardName + ".jpg";
        const cardAudio = cardName + ".mp3";
        const cardFileText = fs.readFileSync(fullFilePath, {
          encoding: "utf8",
          flag: "r",
        });
        const cardFileTextLines = cardFileText.split("\n");

        const card = {
          name:
            cardFileTextLines.length > 1
              ? cardFileTextLines[0]
              : formatCardName(cardName),
          category: category.fullName,
          image: fs.existsSync(folder + "/" + cardImage) ? cardImage : false,
          audio: fs.existsSync(folder + "/" + cardAudio) ? cardAudio : false,
          translation:
            cardFileTextLines.length > 1 ? cardFileTextLines[1] : cardFileText,
        };

        if (card.name == category.name) {
          cover = card;
        } else {
          cards.push(card);
        }
      }
    }
  });

  return {
    cover,
    categories,
    cards,
  };
};

const removeExtensionFromFileName = function (fileName) {
  return fileName.split(".").slice(0, -1).join(".");
};

const getExtensionFromFileName = function (fileName) {
  const fileNameSplited = fileName.split(".");

  return fileNameSplited[1] ? fileNameSplited[1] : "";
};

const formatCardName = function (cardName) {
  const fileNameSplited = cardName.split("-");

  cardName = fileNameSplited[1]
    ? fileNameSplited[1].trim()
    : fileNameSplited[0];

  return capitalizeFirstLetter(cardName);
};

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const readCategories = async function (folder, callback) {
  const categories = await readFolder(folder);
  callback(categories);
};

const folder = "./public/cards";
const categoriesJsonPath = "./src/stores/categories.json";

if (!silenceMode) console.log("reading cards...");

readCategories(folder, function (categories) {
  fs.writeFileSync(categoriesJsonPath, JSON.stringify(categories));
});
