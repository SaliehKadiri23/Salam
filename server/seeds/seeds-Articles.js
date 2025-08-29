const mongoose = require("mongoose");
const Article = require("../models/article");

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



// The Articles
const articles = [
  {
    title: "The Essence of Faith: Understanding the Pillars of Islam",
    excerpt:
      "Explore the foundational principles of Islam, including prayer, charity, fasting, and pilgrimage, and their significance in building a strong spiritual foundation.",
    content:
      "The Five Pillars of Islam form the foundation of Muslim life and practice. These pillars - Shahada (declaration of faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage) - provide structure and guidance for Muslims worldwide. Each pillar serves a unique purpose in strengthening one's relationship with Allah and the community. The Shahada represents the fundamental belief in the oneness of Allah and the prophethood of Muhammad. Regular prayer maintains spiritual connection throughout the day. Zakat purifies wealth and supports those in need. Fasting during Ramadan develops self-discipline and empathy. The Hajj pilgrimage unites Muslims from all backgrounds in worship and reflection.",
    category: "Islam",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-15",
    image: "iuuu",
    isBookmarked: false,
    likes: 142,
    readTime: 1,
  },
  {
    title: "Celebrating Eid: Traditions and Festivities Around the World",
    excerpt:
      "Discover the diverse ways Muslims celebrate Eid al-Fitr and Eid al-Adha, from traditional foods and clothing to community gatherings and charitable acts.",
    content:
      "Eid celebrations vary beautifully across different cultures while maintaining core Islamic principles. In Indonesia, families gather for ketupat and rendang. In Turkey, children receive new clothes and sweets. In Morocco, communities share tagine and pastries. In Pakistan and India, elaborate feasts include biryani and kheer. Despite cultural differences, common elements unite all celebrations: communal prayers, charity giving, family visits, and sharing meals with neighbors. These festivities strengthen community bonds and express gratitude for Allah's blessings. The joy of Eid reflects the completion of spiritual journeys - whether the month-long fast of Ramadan or the pilgrimage to Mecca.",
    category: "Culture",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-12",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    isBookmarked: true,
    likes: 89,
    readTime: 1,
  },
  {
    title: "Mindful Living: Incorporating Islamic Principles into Daily Life",
    excerpt:
      "Learn how to integrate Islamic values into your daily routine, promoting mindfulness, gratitude, and ethical conduct in all aspects of life.",
    content:
      "Islamic mindfulness extends beyond the prayer mat into every aspect of daily life. The concept of Muraqaba encourages constant awareness of Allah's presence. Starting each day with morning dhikr and gratitude practices sets a positive tone. Mindful eating involves saying Bismillah before meals and avoiding waste. Work becomes worship when performed with sincerity and honesty. Relationships flourish through practicing patience, forgiveness, and compassion. Evening reflections help assess the day's actions and seek forgiveness. This holistic approach creates a balanced life aligned with Islamic values, fostering inner peace and spiritual growth while contributing positively to society.",
    category: "Lifestyle",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-14",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 156,
    readTime: 1,
  },
  {
    title: "Building Bridges: Interfaith Dialogue and Community Engagement",
    excerpt:
      "Explore the importance of interfaith dialogue in fostering understanding, respect, and cooperation between different religious communities.",
    content:
      "Islam emphasizes building bridges with people of all faiths through respectful dialogue and shared values. The Quran teaches that diversity is part of Allah's plan for humanity. Interfaith initiatives create opportunities to address misconceptions and build genuine relationships. Common ground exists in shared concerns about social justice, environmental protection, and community welfare. Successful dialogue requires active listening, empathy, and willingness to learn from others. Muslims can share Islam's message of peace while respecting others' beliefs. These conversations often reveal surprising similarities in moral values and spiritual aspirations, fostering mutual understanding and cooperation for the greater good of society.",
    category: "Community",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-13",
    image: "iu",
    isBookmarked: false,
    likes: 73,
    readTime: 1,
  },
  {
    title: "The Role of Women in Islam: Contributions and Empowerment",
    excerpt:
      "Examine the significant roles women have played in Islamic history and continue to play in contemporary Muslim societies worldwide.",
    content:
      "Women have played crucial roles throughout Islamic history, from Khadijah's business leadership to Aisha's scholarship in hadith. Islam granted women rights to education, property ownership, and participation in society 1400 years ago. Contemporary Muslim women excel as doctors, engineers, teachers, and leaders while maintaining their faith. The hijab represents personal choice and spiritual commitment rather than oppression. Organizations worldwide support Muslim women's education and entrepreneurship. Challenges exist, but they often stem from cultural practices rather than Islamic teachings. The Quran emphasizes that men and women are equal in spiritual worth and both have responsibilities toward family and society. Modern Muslim women continue to inspire through their achievements and contributions.",
    category: "Islam",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-11",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0a9ba23fe38?w=400&h=250&fit=crop",
    isBookmarked: true,
    likes: 198,
    readTime: 1,
  },
  {
    title: "Islamic Art and Architecture: A Journey Through Time",
    excerpt:
      "Take a visual journey through the rich history of Islamic art and architecture, from intricate mosque designs to beautiful calligraphy.",
    content:
      "Islamic art reflects the religion's emphasis on unity, beauty, and divine perfection. Geometric patterns represent infinite nature of Allah's creation. Calligraphy elevates Arabic script to divine art form, adorning mosques and manuscripts. Architecture varies from Moorish Spain to Mughal India, yet maintains common elements: courtyards, minarets, and decorative arches. The Alhambra showcases intricate tilework and mathematical precision. Istanbul's Blue Mosque demonstrates Ottoman grandeur with cascading domes. Modern Islamic architecture blends traditional elements with contemporary design. These artistic expressions serve not merely as decoration but as spiritual contemplation tools, reminding believers of Allah's beauty and encouraging reflection on the divine.",
    category: "Culture",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-10",
    image:
      "https://images.unsplash.com/photo-1519302959554-a75be0afc82a?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 234,
    readTime: 1,
  },
  {
    title: "Ramadan Reflections: The Spiritual Journey of Fasting",
    excerpt:
      "Discover the deeper meanings behind Ramadan fasting and how this holy month transforms hearts, minds, and communities.",
    content:
      "Ramadan transcends mere abstinence from food and drink to become a comprehensive spiritual transformation. The pre-dawn suhur meal strengthens family bonds through shared preparation. Daytime fasting develops self-control and empathy for the less fortunate. Increased Quran recitation deepens spiritual connection. Tarawih prayers unite communities in worship. Charitable giving reaches its peak during this blessed month. The discipline learned extends beyond Ramadan, creating lasting positive changes. Iftar gatherings foster social connections and hospitality. Laylat al-Qadr offers intense spiritual reflection. The month concludes with Eid celebrations, marking successful completion of this spiritual journey and renewed commitment to Islamic values.",
    category: "Islam",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-16",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 167,
    readTime: 1,
  },
  {
    title: "Halal Living: Beyond Food - A Comprehensive Lifestyle",
    excerpt:
      "Understand how the concept of halal extends beyond dietary choices to encompass all aspects of ethical and conscious living.",
    content:
      "Halal represents more than dietary laws; it encompasses a complete ethical lifestyle. In business, it means honest dealing and avoiding interest-based transactions. In relationships, it promotes respect, commitment, and family values. Halal entertainment avoids content that contradicts Islamic values while embracing wholesome activities. Fashion choices balance modesty with personal expression. Investment decisions consider ethical implications beyond financial returns. Social interactions emphasize kindness, justice, and community welfare. This comprehensive approach creates harmony between spiritual beliefs and daily actions, leading to a purposeful life aligned with divine guidance and beneficial to both individual and society.",
    category: "Lifestyle",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-09",
    image: "uvfufeuheri",
    isBookmarked: true,
    likes: 145,
    readTime: 1,
  },
  {
    title: "The Beauty of Arabic Language and Its Preservation",
    excerpt:
      "Explore the linguistic richness of Arabic, its role in Islamic scholarship, and efforts to preserve this sacred language.",
    content:
      "Arabic serves as the language of the Quran, uniting Muslims worldwide in worship and study. Its grammatical complexity allows for nuanced expression of spiritual concepts. Classical Arabic poetry demonstrates the language's artistic potential. Modern Arabic adapts to contemporary needs while maintaining classical roots. Islamic scholarship requires Arabic proficiency for authentic understanding of religious texts. Universities worldwide offer Arabic programs to meet growing interest. Technology aids language learning through apps and online resources. Preservation efforts include digitizing manuscripts and promoting Arabic literature. The language's beauty lies not only in its sounds and structure but in its capacity to convey profound spiritual truths and connect believers across cultures and centuries.",
    category: "Culture",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-08",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 89,
    readTime: 1,
  },
  {
    title: "Muslim Youth: Navigating Modern Challenges with Faith",
    excerpt:
      "Address the unique challenges facing young Muslims today and how Islamic principles provide guidance for contemporary issues.",
    content:
      "Young Muslims navigate complex modern challenges while maintaining their faith identity. Social media presents both opportunities for dawah and risks of negative influences. Career choices must balance personal ambition with Islamic values. Dating culture conflicts with Islamic courtship principles, requiring creative solutions. Academic pressures compete with religious obligations, necessitating time management skills. Peer pressure to compromise values tests resolve and character. However, Islam provides frameworks for addressing these challenges through community support, mentorship programs, and youth organizations. Modern technology enables access to Islamic education and global Muslim networks. Young leaders emerge as positive role models, demonstrating successful integration of faith and contemporary life.",
    category: "Community",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-07",
    image: "f439934",
    isBookmarked: false,
    likes: 176,
    readTime: 1,
  },
  {
    title: "Sustainable Living: Environmental Stewardship in Islam",
    excerpt:
      "Learn how Islamic teachings promote environmental responsibility and sustainable practices for protecting our planet.",
    content:
      "Islam emphasizes humans as trustees (khalifa) of Earth, responsible for environmental protection. The Prophet Muhammad promoted conservation through his actions and teachings. Avoiding waste (israf) applies to all resources, not just food. Renewable energy aligns with Islamic principles of balance and harmony. Urban planning should consider community needs and natural preservation. Islamic finance supports green investments and sustainable development. Modern Muslims lead environmental initiatives worldwide, from solar energy projects to reforestation programs. The concept of haram extends to activities that harm the environment unnecessarily. This religious framework provides strong motivation for environmental activism and sustainable lifestyle choices, demonstrating how faith and ecology naturally align.",
    category: "Lifestyle",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-06",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 123,
    readTime: 1,
  },
  {
    title: "The Science of Islamic Golden Age: Contributions to Humanity",
    excerpt:
      "Discover the remarkable scientific achievements of Muslim scholars and their lasting impact on modern knowledge.",
    content:
      "Islamic Golden Age scholars made groundbreaking contributions across multiple fields. Al-Khwarizmi developed algebra and algorithms still used today. Ibn Sina's medical texts guided European physicians for centuries. Al-Biruni calculated Earth's circumference with remarkable accuracy. Islamic astronomers corrected Greek astronomical errors and developed precise instruments. The House of Wisdom in Baghdad became a center of translation and research. Muslim scholars preserved and expanded upon Greek philosophy while developing original theories. Their work in optics, chemistry, mathematics, and medicine laid foundations for modern science. The integration of rational inquiry with faith demonstrates Islam's compatibility with scientific advancement. These contributions remind us that seeking knowledge is both a religious duty and a path to understanding Allah's creation.",
    category: "Islam",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-05",
    image: "feiuuuuuu",
    isBookmarked: true,
    likes: 267,
    readTime: 1,
  },
  {
    title: "Islamic Finance: Ethical Banking and Investment Principles",
    excerpt:
      "Understand the principles of Islamic finance and how it offers ethical alternatives to conventional banking systems.",
    content:
      "Islamic finance operates on principles that prohibit interest (riba), gambling (gharar), and unethical investments. Sharia-compliant banking uses profit-sharing and asset-backed financing instead of interest. Sukuk (Islamic bonds) provide investment opportunities aligned with Islamic values. Microfinance programs support small businesses in Muslim communities. Islamic insurance (takaful) operates on mutual cooperation rather than gambling principles. Modern Islamic banks compete successfully with conventional institutions while maintaining ethical standards. Investment screening excludes businesses involving alcohol, gambling, and other prohibited activities. The system promotes real economic activity and discourages speculation. Growing global acceptance demonstrates the viability of ethical finance principles for all communities, not just Muslims.",
    category: "Community",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-04",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 134,
    readTime: 1,
  },
  {
    title: "Hajj: The Journey of a Lifetime",
    excerpt:
      "Experience the spiritual transformation of Hajj pilgrimage and its profound impact on millions of Muslims worldwide.",
    content:
      "Hajj represents the pinnacle of Islamic spiritual experience, uniting millions in worship at Islam's holiest sites. The journey begins with entering ihram, symbolizing equality before Allah. Tawaf around the Kaaba connects pilgrims with Abraham's legacy. Sa'i between Safa and Marwa commemorates Hagar's search for water. Standing at Arafat provides intense spiritual reflection and supplication. The symbolic stoning of devils represents rejection of temptation. Eid al-Adha celebrates Abraham's willingness to sacrifice for Allah. The diversity of pilgrims demonstrates Islam's universal message. Many describe Hajj as life-changing, returning home with renewed faith and perspective. The physical challenges pale compared to spiritual rewards, creating memories and connections lasting a lifetime.",
    category: "Islam",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-03",
    image: "uiweewuuewyue",
    isBookmarked: false,
    likes: 345,
    readTime: 1,
  },
  {
    title: "Islamic Parenting: Raising Children with Faith and Values",
    excerpt:
      "Discover effective strategies for raising children with strong Islamic values while navigating modern parenting challenges.",
    content:
      "Islamic parenting balances love and discipline, guidance and independence. Teaching children to pray early establishes spiritual foundations. Quranic stories provide moral lessons and entertainment. Modeling good behavior proves more effective than lectures alone. Encouraging questions about faith builds stronger understanding. Balancing religious education with secular learning prepares children for success. Setting boundaries while showing compassion reflects prophetic parenting style. Creating Islamic home environment supports value development. Involving children in charity work builds empathy and gratitude. Addressing modern challenges like social media requires updated approaches grounded in timeless principles. The goal remains raising confident, compassionate Muslims who contribute positively to society while maintaining their faith identity.",
    category: "Lifestyle",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-02",
    image: "rure90ed",
    isBookmarked: true,
    likes: 189,
    readTime: 1,
  },
  {
    title: "The Power of Dua: Connecting with Allah Through Prayer",
    excerpt:
      "Explore the spiritual significance of dua (supplication) and how personal prayer strengthens the relationship with Allah.",
    content:
      "Dua represents intimate conversation with Allah, transcending formal prayer requirements. The Prophet taught specific duas for every life situation, from waking up to sleeping. Personal supplications in any language are equally valid and powerful. Morning and evening remembrance (adhkar) provide spiritual protection throughout the day. Dua during difficult times offers comfort and hope through divine connection. Gratitude duas acknowledge Allah's countless blessings in our lives. Group supplications unite communities in shared concerns and celebrations. The etiquette of dua includes beginning with praise and seeking forgiveness. Consistent dua practice develops stronger faith and trust in Allah's wisdom. Even unanswered prayers serve divine purposes beyond human understanding, strengthening patience and reliance on Allah.",
    category: "Islam",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-08-01",
    image: "uruqhrirrf",
    isBookmarked: false,
    likes: 201,
    readTime: 1,
  },
  {
    title: "Muslims in Tech: Innovation Through Islamic Values",
    excerpt:
      "Meet Muslim entrepreneurs and engineers who are shaping the technology landscape while maintaining their Islamic principles.",
    content:
      "Muslim technologists contribute significantly to global innovation while maintaining Islamic ethics. Halal app development considers user privacy and content appropriateness. Tech entrepreneurs create solutions for Muslim communities, from prayer apps to halal food finders. Islamic finance technology enables sharia-compliant banking worldwide. Artificial intelligence research includes Muslim perspectives on ethics and human dignity. Cybersecurity experts protect digital infrastructure with principles of trust and responsibility. Educational technology makes Islamic learning accessible globally. Social media platforms designed for Muslim users prioritize community values and safety. These innovations demonstrate how Islamic principles enhance rather than hinder technological progress. The integration of faith and technology creates opportunities for positive social impact.",
    category: "Community",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-07-31",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 156,
    readTime: 1,
  },
  {
    title: "Converts to Islam: Stories of Spiritual Discovery",
    excerpt:
      "Read inspiring stories of individuals who found their spiritual home in Islam and the transformative journey of conversion.",
    content:
      "Conversion to Islam often begins with intellectual curiosity about the religion's logical theology and comprehensive lifestyle. Many converts appreciate Islam's emphasis on direct relationship with Allah without intermediaries. The Quran's scientific accuracy and literary beauty convince rational seekers. Islamic gender roles and family values appeal to those seeking structured relationships. Community support helps new Muslims navigate their spiritual journey with guidance and friendship. Learning Arabic and Islamic jurisprudence takes time and patience but deepens understanding. Challenges include family reactions and cultural adjustments, but faith provides strength. Many converts become passionate advocates for Islam, sharing their transformation stories. Their fresh perspectives enrich Muslim communities and provide bridges to non-Muslim families and friends.",
    category: "Islam",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-07-30",
    image: "hh5ireuiherq",
    isBookmarked: true,
    likes: 178,
    readTime: 1,
  },
  {
    title: "Islamic Healing: Traditional Medicine and Modern Wellness",
    excerpt:
      "Explore the rich tradition of Islamic healing practices and their relevance to contemporary health and wellness approaches.",
    content:
      "Islamic healing integrates physical, mental, and spiritual wellness approaches based on Quranic guidance and prophetic traditions. Honey, black seed, and dates are mentioned for their medicinal properties. Cupping (hijama) therapy continues as popular alternative treatment. Herbal medicine tradition preserves ancient knowledge of natural remedies. Prayer and dhikr provide mental health benefits through meditation and stress reduction. Charity and forgiveness promote psychological healing and community harmony. Modern research validates many traditional Islamic healing methods. Contemporary Muslim doctors integrate spiritual care with medical practice. The holistic approach addresses root causes rather than just symptoms. Patients benefit from treating body and soul together, recognizing Allah as the ultimate healer while utilizing medical means.",
    category: "Lifestyle",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-07-29",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 143,
    readTime: 1,
  },
  {
    title: "The Mosque: Community Center and Spiritual Sanctuary",
    excerpt:
      "Understand the multifaceted role of mosques in Muslim communities as centers for worship, education, and social support.",
    content:
      "Mosques serve as more than prayer venues, functioning as comprehensive community centers. Five daily prayers unite diverse congregations in worship and fellowship. Friday sermons address current issues through Islamic perspectives. Educational programs include Quran classes, Arabic lessons, and Islamic studies. Social services help community members with food, clothing, and financial support. Wedding ceremonies and funeral services mark important life transitions. Youth programs engage young Muslims through sports, arts, and mentorship. Interfaith dialogues build bridges with neighboring communities. Architecture reflects local culture while maintaining Islamic elements. Modern mosques adapt to contemporary needs while preserving traditional functions. The mosque remains central to Muslim community life, providing spiritual guidance and practical support for believers throughout their life journey.",
    category: "Community",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-07-28",
    image: "nuiruqhpqry",
    isBookmarked: false,
    likes: 167,
    readTime: 1,
  },
  {
    title: "Quranic Wisdom for Mental Health and Wellbeing",
    excerpt:
      "Discover how Quranic teachings and Islamic practices contribute to mental health, emotional balance, and psychological resilience.",
    content:
      "The Quran provides comprehensive guidance for mental health and emotional wellbeing through timeless wisdom. Verses about patience (sabr) during hardship build psychological resilience. Trust in Allah (tawakkul) reduces anxiety about uncertain futures. Regular prayer creates structured mindfulness practices that calm the mind. Gratitude practices mentioned in Quran improve overall life satisfaction. Community connections through mosque attendance combat isolation and depression. Forgiveness teachings promote healing from past traumas and resentments. Dhikr (remembrance of Allah) functions as therapeutic meditation reducing stress. Islamic counseling integrates spiritual resources with modern psychological techniques. The balance between hope and fear creates healthy motivation without despair. Professional Muslim therapists help clients access these spiritual resources for healing and growth.",
    category: "Islam",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-07-27",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    isBookmarked: true,
    likes: 234,
    readTime: 1,
  },
  {
    title: "Islamic Education: Balancing Religious and Secular Knowledge",
    excerpt:
      "Examine approaches to Islamic education that successfully integrate religious teachings with modern academic requirements.",
    content:
      "Islamic education aims to develop both worldly knowledge and spiritual understanding in balanced harmony. Traditional madrasas focus on religious sciences including Quran, hadith, and Islamic law. Modern Islamic schools integrate secular subjects with Islamic worldview and values. Homeschooling allows families to customize religious and academic education together. University Islamic studies programs provide scholarly approach to religious learning. Online platforms make Islamic education accessible to global Muslim communities. Teacher training ensures educators can effectively integrate faith and academics. Curriculum development addresses contemporary issues through Islamic perspectives. Student assessment measures both intellectual achievement and character development. The goal remains producing knowledgeable Muslims who contribute positively to society while maintaining strong faith identity and commitment to Islamic principles.",
    category: "Culture",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-07-26",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 145,
    readTime: 1,
  },
  {
    title: "Modesty in the Modern World: Fashion and Faith",
    excerpt:
      "Explore how Muslim fashion evolves to meet contemporary style preferences while maintaining Islamic modesty requirements.",
    content:
      "Modest fashion has become a billion-dollar industry serving style-conscious Muslim consumers worldwide. Designers create beautiful clothing that covers appropriately while following current trends. Hijab styles vary from simple wraps to elaborate designer pieces reflecting personal taste. Modest swimwear enables Muslim women to participate in water activities comfortably. Professional attire meets workplace requirements while maintaining Islamic dress code. Athletic wear allows Muslim women to exercise while preserving modesty and comfort. Fashion weeks now showcase modest clothing lines from established designers. Online retailers cater specifically to modest fashion market with diverse options. Social media influencers demonstrate how to style modest outfits fashionably. The industry proves that modesty and style are not mutually exclusive but rather complementary.",
    category: "Lifestyle",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-07-25",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0a9ba23fe38?w=400&h=250&fit=crop",
    isBookmarked: false,
    likes: 189,
    readTime: 1,
  },
  {
    title: "Building Islamic Communities in Non-Muslim Societies",
    excerpt:
      "Learn strategies for establishing strong Muslim communities in diverse societies while contributing to broader social harmony.",
    content:
      "Muslim minorities build thriving communities by balancing Islamic identity with civic participation in diverse societies. Community centers provide gathering spaces for worship, education, and social events. Interfaith partnerships address common concerns like education, social justice, and community safety. Cultural festivals share Islamic traditions with broader society while building understanding. Professional organizations support Muslim career development and networking opportunities. Advocacy groups protect religious rights and combat discrimination through legal channels. Youth programs help young Muslims navigate dual identity challenges successfully. Charitable work demonstrates Islamic values through service to all community members. Political participation ensures Muslim voices influence policy decisions affecting their lives. These efforts create model communities that enrich society while maintaining religious authenticity.",
    category: "Community",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-07-24",
    image: "her39qr",
    isBookmarked: false,
    likes: 167,
    readTime: 1,
  },
  {
    title: "The Future of Islamic Scholarship in the Digital Age",
    excerpt:
      "Examine how digital technology is transforming Islamic scholarship, education, and religious discourse in the 21st century.",
    content:
      "Digital technology revolutionizes Islamic scholarship by making classical texts accessible to global audiences instantly. Online databases contain millions of hadith with sophisticated search capabilities previously impossible. Virtual reality enables pilgrimage experiences for those unable to travel physically. Artificial intelligence assists in Arabic text analysis and translation projects. Digital libraries preserve rare manuscripts while allowing worldwide scholarly access. Online fatwa services connect Muslims with qualified scholars for religious guidance. Educational apps gamify Islamic learning for children and new Muslims. Social media platforms facilitate religious discussions and community building across continents. However, challenges include ensuring authenticity and combating misinformation in digital religious content. The future requires balancing technological innovation with traditional scholarly rigor and spiritual authenticity.",
    category: "Islam",
    author: "68b0adc5dae81c0cc8eafe30",
    publishDate: "2025-07-23",
    image: "r9efeuir",
    isBookmarked: true,
    likes: 278,
    readTime: 1,
  },
];

async function seedArticles() {
  await Article.deleteMany({}).then((res) => console.log(res));
  await Article.insertMany(articles)
    .then((res) => console.log("Inserted Articles Successfully", res))
    .catch((e) => console.log("Error : ", e));
}

seedArticles();
