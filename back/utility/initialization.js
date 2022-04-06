const City = require("../models/city.model");
const HelpTypes = require("../models/help.types.model");
const Resource = require("../models/resource.model");
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

  Resource.estimatedDocumentCount(async (err, count) => {
    // await Resource.deleteMany({});

    if (!err && count === 0) {
      Resource.insertMany([
        {
          name: { en: "", ua: "", ka: "" },
          description: {
            en: `Hotline for Ukrainians in need<br/>
            +995 511 105 146<br/>
            +995 511 105 147<br/>
            +995 511 105 148<br/>
            `,
            ua: `Гаряча лінія для потребуючих українців<br/>
            +995 511 105 146<br/>
            +995 511 105 147<br/>
            +995 511 105 148<br/>
            `,
            ka: `ცხელი ხაზი უკრაინელებისთვის<br/>
            +995 511 105 146<br/>
            +995 511 105 147<br/>
            +995 511 105 148<br/>
            `,
          },
          link: "tel:+995511105146",
          image: "https://i.ibb.co/jJWQcKf/undraw-Active-support-re-b7sj.png",
        },
        {
          name: { en: "Medical services", ua: "Медичні послуги", ka: "სამედიცინო სერვისები" },
          description: {
            en: "Healthcare providers, including those who offer free services to Ukrainian citizens",
            ua: "Медичні працівники, у тому числі ті, хто надає безкоштовні послуги громадянам України",
            ka: "სამედიცინო დაწესებულებები რომლებიც დახმარებას სთავაზობენ უკრაინის მოქალაქეებს",
          },
          link: "https://dopomoga.ge/Home/PostInternalPage/114",
          image: "https://i.ibb.co/z4psP2Y/healthcare.png",
        },
        {
          name: { en: "Education", ua: "Освіта", ka: "განათლება" },
          description: {
            en: "Opportunities for continuing education",
            ua: "Можливості продовження освіти",
            ka: "სწავლის გაგრძელების შესაძლებლობები",
          },
          link: "https://dopomoga.ge/Home/PostInternalPage/115",
          image: "https://i.ibb.co/vvm4VM3/undraw-education-f8ru.png",
        },
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
