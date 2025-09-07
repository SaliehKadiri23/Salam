const mongoose = require("mongoose");
const DuaRequest = require("../models/duaRequest");

const dbUrl = "mongodb://127.0.0.1:27017/salam";
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connection Successful"))
  .catch((e) => console.log("error: ", e));

mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection Error : ")
);
mongoose.connection.once("open", () => {
  console.log("Database connected!");
});

const duas = [
  /* Health */
  {
    content:
      "Allahumma Rabban-nas, adhhib al-ba’sa, ishfi anta al-Shafi, la shifa’a illa shifa’uka, shifa’an la yughadiru saqama.",
    category: "health",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Annee massaniyad-durru wa anta arhamur-rahimeen. (Indeed, adversity has touched me, and You are the Most Merciful of the merciful.)",
    category: "health",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Allahumma inni as’aluka al-‘afwa wal-‘afiyah fid-dunya wal-akhirah. (O Allah, I ask You for forgiveness and well-being in this world and the Hereafter.)",
    category: "health",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Bismillahilladhi la yadurru ma’ ismihi shay’un fil-ardi wa la fis-sama’i wa Huwas-Samiʿul-ʿAlim. (In the Name of Allah, nothing can cause harm…) ",
    category: "health",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Allahumma shfi mardana wa marda al-Muslimeen. (O Allah, cure our sick and the sick among the Muslims.)",
    category: "health",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },

  /* Guidance */
  {
    content:
      "O Allah, I seek Your guidance by virtue of Your knowledge… if You know this matter to be good for me… then ordain it for me… and make me content with it.",
    category: "guidance",
    isAnonymous: false,
    author: "Omar",
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content: "Rabbi zidni ‘ilma (My Lord, increase me in knowledge).",
    category: "guidance",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Allahumma la sahla illa ma ja'altahu sahlan… wa anta taj‘alu al-hazna, iza shi’ta, sahlan. (O Allah, nothing is easy except what You make easy…) ",
    category: "guidance",
    isAnonymous: false,
    author: "Zainab",
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "May Allah relieve you of all the difficulties you are facing right now. May Allah give you the strength to overcome your trials. Ameen.",
    category: "guidance",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Allahumma inni a'udhu bika min al-hammi wal-huzni, wal-'ajzi wal-kasali, wal-bukhli wal-jubni, wa dal' al-dayni wa ghalabat al-rijal.",
    category: "guidance",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },

  /* Success */
  {
    content:
      "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina ‘adhaban-nar. (Our Lord, grant us good in this world and the Hereafter…) ",
    category: "success",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Wama tawfeeqee illa billahi alayhi tawakkaltu wa-ilayhi oneeb. (My success is only by Allah; upon Him I rely…) ",
    category: "success",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Allahumma la sahla illa ma ja’altahu sahlan… (O Allah, there is no ease except what You make easy.)",
    category: "success",
    isAnonymous: false,
    author: "Fatima",
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Allahumma inni as’aluka ‘ilman nafi’an, wa rizqan tayyiban, wa ‘amalan mutaqabbalan. (O Allah, I ask You for beneficial knowledge, good provision and accepted deeds.)",
    category: "success",
    isAnonymous: false,
    author: "Ahmed",
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Hasbunallahu wa ni‘mal wakeel. (Sufficient for us is Allah, and He is the best disposer of affairs.)",
    category: "success",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },

  /* Family */
  {
    content:
      "Allahumma barik lana fi ahli wa awladina wa thabbit qulubana 'ala deenik.",
    category: "family",
    isAnonymous: false,
    author: "Leila",
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "May Allah bless our marriages with tranquility, righteousness, and pious offspring.",
    category: "family",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "Oh Allah, make me a source of comfort and blessings for my parents, and grant them good health and ultimate reward.",
    category: "family",
    isAnonymous: false,
    author: "Yusuf",
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },

  /* Community */
  {
    content:
      "O Allah, ease the suffering of the Ummah, grant justice, and make us a source of benefit and peace.",
    category: "community",
    isAnonymous: false,
    author: "Hassan",
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
  {
    content:
      "May Allah grant shifa to those afflicted, patience to their loved ones, and relief to our entire Ummah.",
    category: "community",
    isAnonymous: true,
    userId: "64f1abf1a2b4c3d4e5f6a111",
  },
];


async function seedDuaRequests() {
  await DuaRequest.deleteMany({}).then((res) => console.log(res));
  await DuaRequest.insertMany(duas)
    .then((res) => console.log("Inserted Forums Successfully", res))
    .catch((e) => console.log("Error : ", e));
}

seedDuaRequests();

