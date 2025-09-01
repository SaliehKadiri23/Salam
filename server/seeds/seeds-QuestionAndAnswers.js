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
    dateAsked: new Date("2025-08-15T10:30:00Z"),
    dateAnswered: new Date("2025-08-16T14:45:00Z"),
    questionCategory: "fiqh",
    isAnswered: true,
    likes: 34,
    question:
      "What is the ruling on delaying the Maghrib prayer intentionally, and under what circumstances might this be permissible or discouraged according to fiqh?",
    answer:
      "Intentionally delaying Maghrib beyond its prescribed time without valid excuse is considered disliked (makruh) in most schools. However, it may be permitted if one falls asleep, forgets, or is genuinely uncertain about the prayer time, in which case it should be prayed as soon as one remembers.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-08-17T09:00:00Z"),
    questionCategory: "general",
    isAnswered: false,
    likes: 5,
    question:
      "How does one reconcile differences between interpretation of Quranic verses among various scholars while maintaining unity in faith?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-08-18T13:20:00Z"),
    dateAnswered: new Date("2025-08-19T11:30:00Z"),
    questionCategory: "daily-life",
    isAnswered: true,
    likes: 22,
    question:
      "What are the recommended etiquettes when visiting someone’s home in Islam, particularly regarding entering, greeting, and interacting respectfully?",
    answer:
      "When entering a home, it is recommended to say 'Assalamu Alaikum', ask permission before entering, remove one’s shoes if customary, greet with kindness, respect the household’s privacy, accept or politely decline refreshment, and leave with a similar greeting and gratitude. These actions uphold good character and mutual respect.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-08-19T15:45:00Z"),
    dateAnswered: new Date("2025-08-20T12:00:00Z"),
    questionCategory: "finance",
    isAnswered: true,
    likes: 47,
    question:
      "Could you explain how profit-sharing contracts (like Mudarabah and Musharakah) comply with Islamic finance principles, especially in comparison to conventional interest-based systems?",
    answer:
      "Mudarabah and Musharakah are based on risk-sharing and joint venture principles: in Mudarabah, one party provides capital while the other manages, sharing profits as agreed. In Musharakah, both parties contribute capital (and possibly skill), share profits proportionally, and carry losses according to investment. This aligns with Islamic prohibitions against Riba (interest), as no fixed return is guaranteed—profit is earned through genuine trade or investment, not time or capital alone.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-08-21T08:15:00Z"),
    questionCategory: "worship",
    isAnswered: false,
    likes: 8,
    question:
      "What steps can a person take to improve concentration (khushu') in their daily prayers, especially when distracted by worldly thoughts?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-08-22T17:30:00Z"),
    dateAnswered: new Date("2025-08-23T09:50:00Z"),
    questionCategory: "fiqh",
    isAnswered: true,
    likes: 29,
    question:
      "If a traveler combines prayers while still within the city limits (not a journey by definition), under what conditions is this allowed according to fiqh, and what definitions of 'travel' apply?",
    answer:
      "Combining prayers like Dhuhr-Asr or Maghrib-Isha is generally permitted only when traveling upon reaching the minimum distance (e.g., ~48 miles) from home. However, fiqh exceptions allow combining within the city in cases of rain, illness, etc., even if not traveling. Intent and hardship are key; the traveler status is defined by distance, but excuses can permit combining regardless.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-08-24T10:00:00Z"),
    questionCategory: "general",
    isAnswered: false,
    likes: 3,
    question:
      "How can Muslims engage with interfaith dialogue in a way that preserves Islamic integrity while showing respect to others?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-08-25T14:10:00Z"),
    dateAnswered: new Date("2025-08-26T16:25:00Z"),
    questionCategory: "daily-life",
    isAnswered: true,
    likes: 31,
    question:
      "What guidance does Islam provide regarding financial transparency in marriage, such as discussing debts, expenses, and mutual financial responsibilities?",
    answer:
      "Islam emphasizes honesty and mutual consultation (Shura). Couples should disclose debts, agree on household expenses, and ensure fairness and cooperation. Financial transparency fosters trust, avoids misunderstandings, and aligns with Islamic values of integrity and responsibility.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-08-27T11:05:00Z"),
    questionCategory: "worship",
    isAnswered: false,
    likes: 6,
    question:
      "Is it permissible to attend a gathering focused on spiritual chanting or ritual remembrance (dhikr), and what etiquettes should one observe in such settings?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-08-28T09:30:00Z"),
    dateAnswered: new Date("2025-08-29T10:40:00Z"),
    questionCategory: "fiqh",
    isAnswered: true,
    likes: 27,
    question:
      "When does impurity (najasah) invalidate wudu, and how are different types of impurities treated in terms of purification?",
    answer:
      "Contact with impure substances like urine or blood invalidates wudu. If impurity is dry and removed before washing, wudu can still be valid if cleanliness is ensured. Types like urine, feces, and alcohol differ: physical removal and ritual washing (wudu or ghusl) as appropriate restores purity. Persistent impurities require proper cleaning before prayer.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-08-29T13:45:00Z"),
    questionCategory: "finance",
    isAnswered: false,
    likes: 4,
    question:
      "How does Islamic finance view modern derivative contracts (e.g., futures or options), and what criteria determine their permissibility?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-08-30T07:20:00Z"),
    dateAnswered: new Date("2025-08-31T08:55:00Z"),
    questionCategory: "worship",
    isAnswered: true,
    likes: 18,
    question:
      "What is the significance of reciting Surah Al-Fatiha in every rak’ah, and why is it considered a pillar of the prayer?",
    answer:
      "Surah Al-Fatiha is known as the essence of the Qur’an. It is a pillar (arkān) of prayer because it is a direct address to Allah, seeking guidance, mercy, and affirming His sovereignty. Without its recitation, a prayer is considered invalid according to consensus.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-09-01T06:50:00Z"),
    questionCategory: "daily-life",
    isAnswered: false,
    likes: 2,
    question:
      "What does Islam teach about handling grievances within the family, especially when emotions are high and reconciliation seems difficult?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-08-14T12:15:00Z"),
    dateAnswered: new Date("2025-08-15T09:30:00Z"),
    questionCategory: "fiqh",
    isAnswered: true,
    likes: 25,
    question:
      "If someone inadvertently eats something haram and then fasts during Ramadan, is their fast valid, and what are the steps they should take afterward?",
    answer:
      "If one unintentionally consumes haram, the fast remains valid if repentance is sincere. They should continue fasting, seek forgiveness, and avoid repeating the act. If it was deliberate, repentance, making up the fast (qada), and possibly offering expiation (kaffara) if occurred frequently, may be required.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-08-12T14:00:00Z"),
    questionCategory: "general",
    isAnswered: false,
    likes: 10,
    question:
      "How can one maintain Islamic values in a secular workplace without causing conflict, especially when cultural norms among colleagues differ significantly?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-08-11T16:20:00Z"),
    dateAnswered: new Date("2025-08-12T10:15:00Z"),
    questionCategory: "finance",
    isAnswered: true,
    likes: 19,
    question:
      "What is Zakat al-Fitr, how is its rate determined, and why is it required before Eid prayer?",
    answer:
      "Zakat al-Fitr is obligatory charity given to the needy before Eid prayer. It purifies the fasting person’s shortcomings and ensures the poor can celebrate. Its rate is typically one saa’ of staple food (about 2.5–3 kg) or its cash equivalent, based on local value.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-08-10T11:30:00Z"),
    questionCategory: "worship",
    isAnswered: false,
    likes: 7,
    question:
      "What role does intention (niyyah) play in worship, and how should a person ensure their deeds are accepted and sincere?",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    answeredBy: "64f1ac01a2b4c3d4e5f6a702",
    dateAsked: new Date("2025-08-09T09:10:00Z"),
    dateAnswered: new Date("2025-08-10T07:45:00Z"),
    questionCategory: "daily-life",
    isAnswered: true,
    likes: 23,
    question:
      "Is it permissible to travel for leisure with the family, and what Islamic guidelines should be considered to strike a balance between enjoyment and spiritual purpose?",
    answer:
      "Travel for leisure with family is permissible if halal means are used and it doesn’t distract from obligations. One should maintain prayer, modest behavior, avoid extravagance, and seek opportunities for learning or community benefit.",
  },
  {
    askedBy: "64f1abf1a2b4c3d4e5f6a701",
    dateAsked: new Date("2025-08-08T08:25:00Z"),
    questionCategory: "finance",
    isAnswered: false,
    likes: 11,
    question:
      "How can one ensure that their savings and investments are halal—what checks should they perform on companies or funds before investing?",
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
