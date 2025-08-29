const mongoose = require("mongoose");
const User = require("../models/user")

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

const user1 = {
  profileInfo: {
    firstName: "Salieh",
    lastName: "Kadiri",
    role: "imam",
    selectedLanguage: "en",
    email: "saliehefuah@gmail.com",
    location: "Kano, Nigeria",
    phone: "09037786418",
    joinDate: new Date(),
    lastLogin: new Date(),
    isEmailVerified: true,
    digitalTasbih: 15000,
    isPrayerAlertsEnabled: true,
    isAdhanAudioEnabled: true,
    isSubscribedToNewsLetter: true,
  },

  registeredEvents: [],

  roleSpecificData: {
    mosque: "Masjid A",
    certification: "MSSN",
    experience: 19,
    specialization: "Islamic Culture",
    references: "FUK",
    adminExperience: "Mosque",
  },

  userProgress: {
    bookmarkedItems: {
      resources: [],
      articles: [],
    },
    completedItems: {
      resources: [],
    },
    progressItems: {
      resources: [],
    },
  },
}
const user2 = {
  profileInfo: {
    firstName: "Efuah",
    lastName: "Saliu",
    role: "chief-imam",
    selectedLanguage: "ar",
    email: "salieh7787@gmail.com",
    location: "Bauchi, Nigeria",
    phone: "07049481444",
    joinDate: new Date(),
    lastLogin: new Date(),
    isEmailVerified: false,
    digitalTasbih: 3000,
    isPrayerAlertsEnabled: true,
    isAdhanAudioEnabled: true,
    isSubscribedToNewsLetter: false,
  },

  registeredEvents: [],

  roleSpecificData: {
    mosque: "Masjid B",
    certification: "",
    experience: 34,
    specialization: "Islamic Fiqh",
    references: "BSJ",
    adminExperience: "Events",
  },

  userProgress: {
    bookmarkedItems: {
      resources: [],
      articles: [],
    },
    completedItems: {
      resources: [],
    },
    progressItems: {
      resources: [],
    },
  },
}


const users = [user1, user2]

async function seedUsers() {
  await User.deleteMany({}).then((res) => console.log(res));
  await User.insertMany(users)
    .then((res) => console.log("Inserted Users Successfully", res))
    .catch((e) => console.log("Error : ", e));
}

seedUsers();


