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
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-07-01T10:15:00Z"),
    dateAnswered: new Date("2025-07-02T09:30:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a710",
    isAnswered: true,
    likes: 12,
    question: "What are the Five Pillars of Islam?",
    answer: "The Five Pillars are Shahadah, Salah, Zakat, Sawm, and Hajj.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-07-03T14:20:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a711",
    isAnswered: false,
    likes: 5,
    question: "Can faith (Iman) increase and decrease over time?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-06-28T08:50:00Z"),
    dateAnswered: new Date("2025-06-29T12:10:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a712",
    isAnswered: true,
    likes: 8,
    question: "What is Taqwa and why is it important?",
    answer:
      "Taqwa is God-consciousness or piety, encouraging avoidance of sin and drawing closer to Allah.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-07-05T16:00:00Z"),
    dateAnswered: new Date("2025-07-05T18:45:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a713",
    isAnswered: true,
    likes: 20,
    question: "Why is alcohol prohibited in Islam?",
    answer:
      "Allah prohibits alcohol due to its harms to individuals and society, and to preserve intellect and health.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-07-06T11:30:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a714",
    isAnswered: false,
    likes: 3,
    question: "What is the concept of Shariah in Islam?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-06-25T09:00:00Z"),
    dateAnswered: new Date("2025-06-26T07:15:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a711",
    isAnswered: true,
    likes: 15,
    question: "Do Muslims believe in Jesus?",
    answer:
      "Yes, Islam acknowledges Jesus (peace be upon him) as a prophet and messenger of Allah.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-07-07T13:45:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a712",
    isAnswered: false,
    likes: 2,
    question: "What is Islamic adab and why is it important?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-06-20T10:10:00Z"),
    dateAnswered: new Date("2025-06-21T14:30:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a714",
    isAnswered: true,
    likes: 9,
    question: "What are the moral teachings of Islam?",
    answer:
      "Islam emphasizes honesty, justice, compassion, caring for orphans, keeping promises, and humility.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-07-08T17:20:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a710",
    isAnswered: false,
    likes: 1,
    question: "What is the meaning of Ibadah in Islam?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-06-15T08:05:00Z"),
    dateAnswered: new Date("2025-06-15T12:00:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a711",
    isAnswered: true,
    likes: 18,
    question: "What does Islam teach about the Quran?",
    answer:
      "The Quran is the final revelation from Allah, preserved unchanged, and a complete guide for humanity.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-07-09T20:00:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a712",
    isAnswered: false,
    likes: 4,
    question: "Why is pork forbidden in Islam?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-06-10T07:30:00Z"),
    dateAnswered: new Date("2025-06-10T09:45:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a714",
    isAnswered: true,
    likes: 22,
    question:
      "How do Muslims view religious diversity and interfaith relations?",
    answer:
      "Islam teaches respect for other faiths, mutual understanding, and justice for all people.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-07-10T09:15:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a710",
    isAnswered: false,
    likes: 0,
    question: "What constitutes being able to perform Hajj?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-06-05T11:55:00Z"),
    dateAnswered: new Date("2025-06-06T14:20:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a713",
    isAnswered: true,
    likes: 16,
    question: "Can a Muslim delay Hajj for financial reasons?",
    answer:
      "Yes, if one’s wealth is essential and saving it benefits the family, they may delay the Hajj.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-07-11T15:40:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a713",
    isAnswered: false,
    likes: 2,
    question: "Why do pilgrims wear specific garments during Hajj (Ihram)?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-06-01T06:45:00Z"),
    dateAnswered: new Date("2025-06-01T08:00:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a710",
    isAnswered: true,
    likes: 14,
    question: "Who is Allah in Islam?",
    answer:
      "Allah is the one and only God, Creator and Sustainer of the universe, unique with no partner.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-07-12T18:10:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a712",
    isAnswered: false,
    likes: 6,
    question: "Is Islam spread by the sword?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-05-28T13:00:00Z"),
    dateAnswered: new Date("2025-05-29T10:30:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a714",
    isAnswered: true,
    likes: 19,
    question: "What is jihad in the Islamic context?",
    answer:
      "Jihad means striving in the path of Allah, including spiritual, moral, and communal effort.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-07-13T12:25:00Z"),
    questionCategory: "64f1ad11a2b4c3d4e5f6a713",
    isAnswered: false,
    likes: 3,
    question:
      "What etiquette (adab) should be followed when entering a mosque?",
  },
];

;

async function seedQuestionsAndAnswers() {
  await QuestionAndAnswer.deleteMany({}).then((res) => console.log(res));
  await QuestionAndAnswer.insertMany(questionsAndAnswers)
    .then((res) => console.log("Inserted Articles Successfully", res))
    .catch((e) => console.log("Error : ", e));
}

seedQuestionsAndAnswers();