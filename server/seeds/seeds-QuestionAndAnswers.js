const mongoose = require("mongoose");
const QuestionAndAnswer = require("../models/questionsAndAnswers");

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

const questionsAndAnswers = [
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a101",
    answeredBy: "64f1abf1a2b4c3d4e5f6a111",
    dateAsked: new Date("2025-07-01T09:00:00Z"),
    dateAnswered: new Date("2025-07-02T10:30:00Z"),
    questionCategory: "general",
    isAnswered: true,
    likedBy: ["64f1abf1a2b4c3d4e5f6a201", "64f1abf1a2b4c3d4e5f6a202"],
    likes: 2,
    question: "What do Muslims believe about the Last Day and resurrection?",
    answer:
      "Muslims believe that on the Last Day all humans will be resurrected and judged by Allah based on their deeds, and rewarded or punished accordingly.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a102",
    dateAsked: new Date("2025-07-03T11:15:00Z"),
    questionCategory: "worship",
    isAnswered: false,
    question: "How should one perform Wudu correctly according to the Sunnah?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a103",
    answeredBy: "64f1abf1a2b4c3d4e5f6a111",
    dateAsked: new Date("2025-07-05T14:00:00Z"),
    dateAnswered: new Date("2025-07-05T18:00:00Z"),
    questionCategory: "fiqh",
    isAnswered: true,
    likedBy: ["64f1abf1a2b4c3d4e5f6a203"],
    likes: 1,
    question:
      "If a person forgets to pray due to genuine forgetfulness, what is the ruling?",
    answer:
      "If one misses a prayer out of genuine forgetfulness, the correct action is to perform it as soon as one remembers (Qada), and it will be accepted by Allah.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a104",
    dateAsked: new Date("2025-07-07T08:30:00Z"),
    questionCategory: "daily-life",
    isAnswered: false,
    likedBy: ["64f1abf1a2b4c3d4e5f6a204"],
    likes: 1,
    question:
      "What is the Islamic perspective on environmental stewardship and caring for nature?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a105",
    answeredBy: "64f1abf1a2b4c3d4e5f6a111",
    dateAsked: new Date("2025-07-08T16:45:00Z"),
    dateAnswered: new Date("2025-07-09T09:00:00Z"),
    questionCategory: "finance",
    isAnswered: true,
    likedBy: ["64f1abf1a2b4c3d4e5f6a205", "64f1abf1a2b4c3d4e5f6a206"],
    likes: 2,
    question: "How do Islamic finance principles handle loans and interest?",
    answer:
      "Islamic finance prohibits Riba (interest). Instead, profit-based instruments like Murabaha and Musharakah are used to ensure fairness and shared risk.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a106",
    dateAsked: new Date("2025-07-10T12:10:00Z"),
    questionCategory: "general",
    isAnswered: false,
    question:
      "Can you explain the concept of Taqwa in Islam and how one can cultivate it?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a107",
    answeredBy: "64f1abf1a2b4c3d4e5f6a111",
    dateAsked: new Date("2025-07-11T13:20:00Z"),
    dateAnswered: new Date("2025-07-12T14:00:00Z"),
    questionCategory: "worship",
    isAnswered: true,
    likedBy: ["64f1abf1a2b4c3d4e5f6a207"],
    likes: 1,
    question:
      "What is the importance of Sadaqah and how does it differ from Zakat?",
    answer:
      "Sadaqah is voluntary charity given at any time, while Zakat is obligatory and calculated on eligible wealth annually.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a108",
    dateAsked: new Date("2025-07-13T09:00:00Z"),
    questionCategory: "daily-life",
    isAnswered: false,
    question:
      "What Islamic etiquette should one observe when entering a mosque?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a109",
    answeredBy: "64f1abf1a2b4c3d4e5f6a111",
    dateAsked: new Date("2025-07-14T10:30:00Z"),
    dateAnswered: new Date("2025-07-15T11:45:00Z"),
    questionCategory: "fiqh",
    isAnswered: true,
    question:
      "Is Wudu invalidated by touching a non-mahram, and what nullifies it?",
    answer:
      "Most schools agree that mere contact without desire doesn’t invalidate Wudu; bodily fluids, deep sleep, or loss of consciousness do.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a110",
    dateAsked: new Date("2025-07-16T14:15:00Z"),
    questionCategory: "finance",
    isAnswered: false,
    likedBy: ["64f1abf1a2b4c3d4e5f6a208"],
    likes: 1,
    question:
      "How should a Muslim approach modern insurance while avoiding Riba and uncertainty (gharar)?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a111",
    answeredBy: "64f1abf1a2b4c3d4e5f6a111",
    dateAsked: new Date("2025-07-17T12:00:00Z"),
    dateAnswered: new Date("2025-07-18T08:30:00Z"),
    questionCategory: "general",
    isAnswered: true,
    likedBy: ["64f1abf1a2b4c3d4e5f6a209", "64f1abf1a2b4c3d4e5f6a210"],
    likes: 2,
    question:
      "What does Islam teach about religious tolerance and peaceful coexistence with other faiths?",
    answer:
      "Islam emphasizes justice and peaceful coexistence. The Quran states 'there is no compulsion in religion' and advocates respectful dialogue.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a112",
    dateAsked: new Date("2025-07-19T15:20:00Z"),
    questionCategory: "worship",
    isAnswered: false,
    question:
      "Is listening to the Qur’an while fasting allowed, and does it affect the fast?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a113",
    answeredBy: "64f1abf1a2b4c3d4e5f6a111",
    dateAsked: new Date("2025-07-20T09:45:00Z"),
    dateAnswered: new Date("2025-07-20T13:10:00Z"),
    questionCategory: "daily-life",
    isAnswered: true,
    likedBy: ["64f1abf1a2b4c3d4e5f6a211"],
    likes: 1,
    question:
      "What is the Islamic ruling on eating halal meat if there's doubt about how it was slaughtered?",
    answer:
      "If there’s genuine uncertainty, one should avoid it unless no alternatives exist and necessity demands it.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a114",
    dateAsked: new Date("2025-07-21T10:00:00Z"),
    questionCategory: "fiqh",
    isAnswered: false,
    question:
      "Can someone intentionally break their fast during Ramadan and make it up later?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a115",
    answeredBy: "64f1abf1a2b4c3d4e5f6a111",
    dateAsked: new Date("2025-07-22T11:10:00Z"),
    dateAnswered: new Date("2025-07-23T12:25:00Z"),
    questionCategory: "general",
    isAnswered: true,
    likedBy: ["64f1abf1a2b4c3d4e5f6a212", "64f1abf1a2b4c3d4e5f6a213"],
    likes: 2,
    question:
      "What is the significance of prophets in Islam and how are they distinguished from Allah?",
    answer:
      "Prophets are honored messengers chosen by Allah. Muslims deeply respect them but never attribute divine status to them; worship is for Allah alone.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a116",
    dateAsked: new Date("2025-07-23T13:30:00Z"),
    questionCategory: "finance",
    isAnswered: false,
    question:
      "Is cryptocurrency considered halal in Islam, and under what conditions?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a117",
    answeredBy: "64f1abf1a2b4c3d4e5f6a111",
    dateAsked: new Date("2025-07-24T14:45:00Z"),
    dateAnswered: new Date("2025-07-25T09:05:00Z"),
    questionCategory: "worship",
    isAnswered: true,
    likedBy: ["64f1abf1a2b4c3d4e5f6a214"],
    likes: 1,
    question:
      "What is the reward for reading parts of the Qur’an, and how often should one read?",
    answer:
      "Every letter of the Qur’an has ten rewards. Even reading a few verses daily fosters consistency and reflection, yielding multiplied blessings.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a118",
    dateAsked: new Date("2025-07-25T16:00:00Z"),
    questionCategory: "daily-life",
    isAnswered: false,
    question:
      "How should one maintain Islamic ethics in the workplace, especially when facing unfair treatment?",
  },
];
;
;
;

async function seedQuestionsAndAnswers() {
  await QuestionAndAnswer.deleteMany({}).then((res) => console.log(res));
  await QuestionAndAnswer.insertMany(questionsAndAnswers)
    .then((res) => console.log("Inserted Articles Successfully", res))
    .catch((e) => console.log("Error : ", e));
}

seedQuestionsAndAnswers();
