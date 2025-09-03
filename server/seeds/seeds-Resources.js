const mongoose = require("mongoose");
const Resource = require("../models/resource");

const dbUrl = "mongodb://127.0.0.1:27017/salam";

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to database for seeding"))
  .catch((e) => console.log("Connection error: ", e));

// Simple Islamic educational resources
const seedResources = [
  {
    title: "The Fundamentals of Islamic Belief (Aqeedah)",
    description: "A comprehensive guide to understanding the core beliefs of Islam, including the oneness of Allah, angels, divine books, prophets, the Day of Judgment, and divine decree.",
    category: "aqidah",
    type: "course",
    duration: "2h 15min",
    author: "Dr. Umar Sulaiman Al-Ashqar",
    rating: 4.9,
    views: 15420,
    image: "https://images.unsplash.com/photo-1584502062692-99d0115f3f79?w=400&h=300&fit=crop",
    tags: ["aqidah", "iman", "faith", "beliefs", "foundations"],
    publishedDate: new Date("2024-01-15"),
    estimatedTime: 135,
    contentSections: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Introduction to Islamic Creed",
        content: "Aqeedah (creed) forms the foundation of a Muslim's faith. It encompasses the core beliefs that every Muslim must understand and affirm. Aqeedah is derived from the Arabic root word meaning 'to believe firmly.' It refers to the firm conviction and unwavering belief in the fundamental principles of Islam.",
        media: [],
        order: 1
      },
      {
        id: new mongoose.Types.ObjectId(),
        title: "The Oneness of Allah (Tawhid)",
        content: "Tawhid is the cornerstone of Islamic faith, emphasizing the absolute unity and uniqueness of Allah. It has three aspects: Tawhid ar-Rububiyyah (Lordship), Tawhid al-Asma wa Sifat (Names and Attributes), and Tawhid al-Ibadah (Worship).",
        media: [],
        order: 2
      }
    ],
    usefulResources: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Aqeedah Textbook",
        url: "https://example.com/aqeedah-textbook.pdf",
        description: "Comprehensive textbook covering all aspects of Islamic creed"
      }
    ]
  },
  {
    title: "Quranic Exegesis: Understanding Surah Al-Baqarah",
    description: "An in-depth analysis of the longest chapter in the Quran, exploring its themes, structure, and practical applications for contemporary life.",
    category: "quran",
    type: "course",
    duration: "8h 30min",
    author: "Dr. Yasir Qadhi",
    rating: 4.8,
    views: 8930,
    image: "https://images.unsplash.com/photo-1544816565-c9b20136fef0?w=400&h=300&fit=crop",
    tags: ["quran", "tafsir", "al-baqarah", "exegesis", "study"],
    publishedDate: new Date("2024-02-10"),
    estimatedTime: 510,
    contentSections: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Introduction to Surah Al-Baqarah",
        content: "Surah Al-Baqarah, the second and longest chapter of the Quran, contains 286 verses revealed primarily in Madinah. It covers legislation, stories, moral guidance, and theological principles.",
        media: [],
        order: 1
      },
      {
        id: new mongoose.Types.ObjectId(),
        title: "Verses 1-39: Foundations of Faith",
        content: "The opening verses of Surah Al-Baqarah lay the groundwork for understanding the entire chapter. This verse establishes the Quran's authority as divine guidance for believers who possess taqwa (God-consciousness).",
        media: [],
        order: 2
      }
    ],
    usefulResources: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Al-Baqarah Commentary",
        url: "https://example.com/al-baqarah-commentary.pdf",
        description: "Detailed verse-by-verse commentary on Surah Al-Baqarah"
      }
    ]
  },
  {
    title: "Prophetic Biography: The Life of Prophet Muhammad ﷺ",
    description: "A comprehensive examination of the life, character, and legacy of the final messenger of Allah, exploring lessons for personal development and community leadership.",
    category: "seerah",
    type: "course",
    duration: "6h 45min",
    author: "Dr. Omar Suleiman",
    rating: 4.9,
    views: 12750,
    image: "https://images.unsplash.com/photo-1584502062692-99d0115f3f79?w=400&h=300&fit=crop",
    tags: ["seerah", "prophet", "leadership", "character", "biography"],
    publishedDate: new Date("2024-03-05"),
    estimatedTime: 405,
    contentSections: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Early Life and Lineage",
        content: "The Prophet Muhammad ﷺ was born into the prestigious Quraysh tribe, specifically the Banu Hashim clan, known for their nobility and honor. He was born on Monday, 12th Rabi' al-Awwal, Year of the Elephant (570 CE).",
        media: [],
        order: 1
      },
      {
        id: new mongoose.Types.ObjectId(),
        title: "The Advent of Revelation",
        content: "At the age of 40, while meditating in the Cave of Hira, the Prophet Muhammad ﷺ received his first revelation. The first revelation was from Surah Al-Alaq 96:1-5: 'Read in the name of your Lord who created - Created man from a clinging substance.'",
        media: [],
        order: 2
      }
    ],
    usefulResources: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Seerah Reader",
        url: "https://example.com/seerah-reader.pdf",
        description: "Comprehensive reader on the life of Prophet Muhammad ﷺ"
      }
    ]
  },
  {
    title: "Islamic Jurisprudence: Understanding Fiqh Principles",
    description: "An introduction to the science of Islamic jurisprudence, exploring sources of law, legal reasoning, and practical applications for daily life.",
    category: "fiqh",
    type: "course",
    duration: "5h 20min",
    author: "Dr. Hatem al-Haj",
    rating: 4.7,
    views: 7420,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    tags: ["fiqh", "jurisprudence", "law", "halal", "haram"],
    publishedDate: new Date("2024-04-18"),
    estimatedTime: 320,
    contentSections: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Sources of Islamic Law",
        content: "Islamic jurisprudence (Fiqh) is built upon four primary sources that provide guidance for all aspects of life. These are: The Quran (the primary and most authoritative source), The Sunnah (actions, statements, and approvals of the Prophet), Ijma' (consensus of qualified scholars on a legal issue), and Qiyas (analogical reasoning based on established principles).",
        media: [],
        order: 1
      },
      {
        id: new mongoose.Types.ObjectId(),
        title: "Classification of Legal Rulings",
        content: "Islamic law classifies human actions into five distinct categories that guide moral and legal behavior: Obligatory (Fard/Wajib), Recommended (Mustahabb/Sunnah), Permissible (Mubah), Disliked (Makruh), and Forbidden (Haram).",
        media: [],
        order: 2
      }
    ],
    usefulResources: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Fiqh Reference Manual",
        url: "https://example.com/fiqh-manual.pdf",
        description: "Comprehensive manual on Islamic jurisprudence principles"
      }
    ]
  },
  {
    title: "Islamic Finance and Economics",
    description: "Exploring the principles of Islamic finance, including ethical investing, interest-free banking, and wealth distribution mechanisms.",
    category: "fiqh",
    type: "article",
    duration: "25 min read",
    author: "Dr. Monzer Kahf",
    rating: 4.6,
    views: 5310,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
    tags: ["finance", "economics", "riba", "zakah", "investment"],
    publishedDate: new Date("2024-05-22"),
    estimatedTime: 25,
    contentSections: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Fundamental Principles",
        content: "Islamic finance operates on principles that distinguish it fundamentally from conventional financial systems. Core principles include: Prohibition of Interest (Riba), Risk Sharing (Musharakah), Asset-Backed Transactions, Ethical Investment Screening, and Fair Distribution of Wealth.",
        media: [],
        order: 1
      },
      {
        id: new mongoose.Types.ObjectId(),
        title: "Islamic Banking Products",
        content: "Islamic banks have developed innovative products that comply with religious principles while meeting modern financial needs. These include: Murabaha (Cost-Plus Financing), Ijarah (Leasing), Musharakah (Partnership), Mudarabah (Profit-Sharing), and Sukuk (Islamic Bonds).",
        media: [],
        order: 2
      }
    ],
    usefulResources: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Islamic Finance Handbook",
        url: "https://example.com/islamic-finance-handbook.pdf",
        description: "Complete guide to Islamic financial principles and practices"
      }
    ]
  },
  {
    title: "Contemporary Issues in Islamic Thought",
    description: "Addressing modern challenges facing Muslim communities, including integration, identity, and ethical dilemmas in a globalized world.",
    category: "culture",
    type: "article",
    duration: "18 min read",
    author: "Dr. Tariq Ramadan",
    rating: 4.5,
    views: 3240,
    image: "https://images.unsplash.com/photo-1584502062692-99d0115f3f79?w=400&h=300&fit=crop",
    tags: ["contemporary", "identity", "integration", "ethics", "challenges"],
    publishedDate: new Date("2024-06-15"),
    estimatedTime: 18,
    contentSections: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Navigating Modern Identity",
        content: "Muslims today face the challenge of maintaining their religious identity while participating in diverse, secular societies. The key is balancing fixed religious elements with flexible cultural expressions, while maintaining core boundaries.",
        media: [],
        order: 1
      },
      {
        id: new mongoose.Types.ObjectId(),
        title: "Ethical Dilemmas in Professional Life",
        content: "Muslim professionals often encounter situations that test their commitment to Islamic principles. Common challenges include prayer times conflicting with work schedules, workplace dress codes, dietary restrictions, and ethical boundaries in certain industries.",
        media: [],
        order: 2
      }
    ],
    usefulResources: [
      {
        id: new mongoose.Types.ObjectId(),
        title: "Integration Strategies",
        url: "https://example.com/integration-strategies.pdf",
        description: "Practical strategies for Muslim integration in Western societies"
      }
    ]
  }
];

const seedDB = async () => {
  await Resource.deleteMany({});
  await Resource.insertMany(seedResources);
  console.log("Database seeded successfully with", seedResources.length, "resources!");
};

seedDB().then(() => {
  mongoose.connection.close();
});