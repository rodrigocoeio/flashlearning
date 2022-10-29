const path = require("path");
const fs = require("fs");
const silenceMode = true;

const readFolder = async function (folder) {
  const directoryPath = path.join(__dirname, folder);
  const categories = {};
  const cards = [];

  const files = fs.readdirSync(directoryPath);

  files.forEach(async function (fileName) {
    const fullFilePath = folder + "/" + fileName;

    if (fs.lstatSync(fullFilePath).isDirectory()) {
      if (!silenceMode) console.log("reading category: " + fileName);

      const categoryRead = await readFolder(fullFilePath);
      const category = {
        name: capitalizeFirstLetter(fileName),
        cards: categoryRead.cards,
      };

      categories[fileName] = category;
    } else {
      const fileExtension = getExtensionFromFileName(fileName);

      if (fileExtension === "txt") {
        if (!silenceMode) console.log("reading card: " + fileName);

        const cardName = removeExtensionFromFileName(fileName);
        const cardImage = cardName + ".jpg";
        const cardAudio = cardName + ".mp3"

        cards.push({
          name: formatCardName(cardName),
          image: fs.existsSync(folder + "/" + cardImage) ? cardImage : false,
          audio: fs.existsSync(folder + "/" + cardAudio) ? cardAudio : false,
          translation: fs.readFileSync(fullFilePath, {
            encoding: "utf8",
            flag: "r",
          }),
        });
      }
    }
  });

  return {
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

const formatCardName = function(cardName) {
  const fileNameSplited = cardName.split("-");

  cardName = fileNameSplited[1] ? fileNameSplited[1].trim() : fileNameSplited[0];

  return capitalizeFirstLetter(cardName);
}

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
