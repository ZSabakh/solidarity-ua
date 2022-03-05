const City = require("../models/city.model");
const HelpTypes = require("../models/help.types.model");

function Initialization() {
  HelpTypes.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      HelpTypes.insertMany([
        { name: { en: "Accomodation", ua: "Проживання", ka: "საცხოვრებელი" } },
        { name: { en: "Transportation", ua: "Транспорт", ka: "ტრანსპორტი" } },
        { name: { en: "Other", ua: "Інший", ka: "სხვა" } },
      ]);
    }
  });

  City.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      City.insertMany([
        { name: { en: "Tbilisi", ua: "Тбілісі", ka: "თბილისი" } },
        { name: { en: "Batumi", ua: "Батумі", ka: "ბათუმი" } },
        { name: { en: "Kutaisi", ua: "Кутаїсі", ka: "ქუთაისი" } },
        { name: { en: "Rustavi", ua: "Руставі", ka: "რუსთავი" } },
        { name: { en: "Gori", ua: "Горі", ka: "გორი" } },
        { name: { en: "Zugdidi", ua: "Зугдіді", ka: "ზუგდიდი" } },
        { name: { en: "Poti", ua: "Поті", ka: "ფოთი" } },
        { name: { en: "Kobuleti", ua: "Кобулеті", ka: "ქობულეთი" } },
        { name: { en: "Khashuri", ua: "Хашурі", ka: "ხაშური" } },
        { name: { en: "Samtredia", ua: "Самтредія", ka: "სამტრედია" } },
        { name: { en: "Telavi", ua: "Телаві", ka: "თელავი" } },
        { name: { en: "Akhaltsikhe", ua: "Ахалцихе", ka: "ახალციხე" } },
      ]);
    }
  });
}

module.exports = Initialization;
