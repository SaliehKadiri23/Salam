import { useEffect, useId, useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MosqueHeroImage from "../assets/Mosque - Hero Image.png";
import { Calendar, ExternalLink } from "lucide-react";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setSelectedCategory } from "../redux/resourcesSlice";
import { motion } from "framer-motion";
import { calculateTimeLeft } from "../components/prayer-times/utils/timeHelpers";
import HijriCalendar from "../components/prayer-times/calendar/HijriCalendar";
import { useGetPrayerTimesByIPLocationQuery } from "../services/apiSlice";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative grid min-h-[560px] place-items-center overflow-hidden bg-neutral-900 text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,0,0,0.40), rgba(0,0,200,0.45)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmyGnr2rVhh9Kp-_WusfJMQz2dkSWFqtBF7ZWN1f92W5L9QBTolsujpVx1X2koPZ6-HWTLxO13W2_7jMJizKPUaFwbf-Ba_TAVZfNNDEluGmt9f0PS2t9EnjRXD4xx9A8PxzWsAdUlpUFBuT08b9BiddbsvkSv53yXnwuf9YFC-8U7FfORC_U4WgQxPUSu36iaeHeOxgtHLRXcMQR6jB4nJK2JYshe2oXmK9fqoowv_pLTJalxhhlFlFxjIR_zn6rLb6SKfcddyPQ')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/*  overlay for dark mode */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 to-transparent dark:from-black/70 dark:to-black/40" />

        
        <div className="pointer-events-none absolute inset-0 bg-black/0 dark:bg-black/30" />

        <motion.div
          initial={{
            opacity: 0,
            y: 150,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.35 },
          }}
          exit={{
            opacity: 0,
            y: -300,
          }}
          className="relative z-10 mx-auto max-w-4xl px-4 text-center"
        >
          <h2 className="text-balance text-4xl font-black bg-gradient-to-r tracking-tight md:text-6xl">
            Empowering the Ummah Worldwide
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg font-light text-white/90 dark:text-white/95 md:text-xl">
            Our mission is to provide a comprehensive online platform for
            Muslims to connect, learn, and grow in their faith.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              initial={{
                opacity: 0,
                y: 200,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              }}
              exit={{
                opacity: 0,
                y: 200,
              }}
              href="#resources"
              className="inline-flex items-center justify-center rounded-xl bg-green-500 dark:bg-green-700 dark:hover:bg-green-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-green-600/10 transition-transform hover:-translate-y-0.5 hover:bg-green-600 focus:outline-none"
            >
              Explore Resources
            </motion.a>
            <motion.a
              initial={{
                opacity: 0,
                y: 300,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8 },
              }}
              exit={{
                opacity: 0,
                y: 300,
              }}
              href="#events"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 dark:bg-white/5 px-6 py-3 dark:ring-emerald-600 font-semibold text-white ring-1 ring-inset ring-white/30 dark:ring-white/20 backdrop-blur transition-all hover:bg-white/15 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 hover:-translate-y-0.5"
            >
              Upcoming Events
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Prayer Tools */}
      <PrayerTools currentTime={currentTime} />

      {/* Resources */}
      <Resources />

      {/* Events */}
      <Events />
    </div>
  );
};



// Prayer Tools Section
function PrayerTools({currentTime}) {
  const [tab, setTab] = useState("times");
  const tablistId = useId();
  
  // RTK Query hook for fetching prayer times
  const { data, error, isLoading } = useGetPrayerTimesByIPLocationQuery();
  const prayerTimesFromStore = useSelector(
    (state) => state.prayerTimes.prayerTimes
  );
  const prayerTimes = data?.prayerTimes || prayerTimesFromStore || [];

  return (
    <div className="w-full bg-gray-100/90 dark:bg-gradient-to-l from-black/85 via-black/90 to-black/75 ">
      <motion.section
        initial={{
          opacity: 0,
          y: 300,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
        exit={{
          opacity: 0,
          y: 300,
        }}
        viewport={{ once: true }}
        id="prayer-tools"
        className="container mx-auto w-full max-w-6xl px-4 py-16 "
      >
        <header className="mb-10 text-center">
          <h3 className="text-3xl font-bold dark:text-white">Prayer Tools</h3>
        </header>

        {/* Tabs */}
        <div className="mx-auto max-w-4xl">
          <div className="border-b border-gray-200">
            <div
              role="tablist"
              aria-label="Prayer tools"
              id={tablistId}
              className="flex flex-wrap items-center justify-center gap-2 md:gap-6"
            >
              <TabButton
                active={tab === "times"}
                onClick={() => setTab("times")}
                label="Real-Time Prayer Times"
              />
              <TabButton
                active={tab === "hijri"}
                onClick={() => setTab("hijri")}
                label="Hijri Calendar"
              />
              <TabButton
                active={tab === "qibla"}
                onClick={() => setTab("qibla")}
                label="Qibla Compass"
              />
            </div>
          </div>

          {/* Panels */}
          <div className="mt-8 divide-y divide-gray-200 rounded-2xl bg-white/80 dark:bg-emerald-900 shadow-sm ring-1 ring-gray-200 dark:ring-emerald-600 backdrop-blur">
            {tab === "times" && (
              <>
                {isLoading && (
                  <div className="text-center py-4">
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Fetching prayer times...
                    </p>
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <p>Error: {error.message || 'Failed to fetch prayer times'}</p>
                  </div>
                )}
                
                {!isLoading && !error && (
                  <div
                    role="tabpanel"
                    aria-labelledby={tablistId}
                    className="p-2 md:p-4"
                  >
                    <div className="bg-white dark:bg-black/85 rounded-xl p-6 shadow">
                      <h3 className="text-lg font-semibold mb-3 dark:text-white/95">
                        Today's Prayer Times
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {prayerTimes.map((p) => {
                          const timeLeft = calculateTimeLeft(p.begins, currentTime);

                          return (
                            <div
                              key={p.name}
                              className="flex flex-col transition-all duration-300 hover:scale-110 items-center p-3 rounded-md bg-gray-50 dark:bg-black/40 dark:border dark:border-emerald-600"
                            >
                              <div className="text-sm text-gray-500 dark:text-gray-100">
                                {p.name}
                              </div>
                              <div className="text-lg font-bold dark:text-gray-100">
                                {p.name === "Sunrise" ? p.begins : p.iqama}
                              </div>
                              <div className="text-xs font-bold text-green-600 dark:text-green-400">
                                {timeLeft}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {tab === "hijri" && (
              <div
                role="tabpanel"
                aria-labelledby={tablistId}
                className="grid gap-4 p-3"
              >
                <HijriCalendar />
              </div>
            )}

            {tab === "qibla" && (
              <div role="tabpanel" aria-labelledby={tablistId} className="p-6">
                <div className="grid items-center justify-items-center gap-4 text-center">
                  <div className="relative aspect-square w-48 rounded-full border-8 border-gray-100 bg-white dark:bg-black shadow-inner">
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="size-1.5 rounded-full bg-green-500" />
                    </div>
                    <div className="absolute inset-0 animate-spin rounded-full border-t-8 border-t-green-500 border-transparent" />
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-100">
                    Replace with device orientation & geo logic as soon IN SHA
                    ALLAH.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
// Tab button component
function TabButton({ active, onClick, label }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        "whitespace-nowrap rounded-t-lg border-b-2 px-3 py-3 text-sm font-medium outline-none transition",
        active
          ? "border-b-green-400 text-green-500"
          : "border-b-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-white/85 dark:hover:text-white",
        "focus-visible:ring-2 focus-visible:ring-green-500/40",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Resources() {
  const cards = useMemo(
    () => [
      {
        title: "The Noble Qur'an",
        category: "quran",
        desc: "Explore the complete text of the Qur'an with translations and commentary.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD5mc4cugco4BtST0cp4f9PBPfrAeuJ8Bg_H9DgsFL_JMJZTvxO0NlwOdTB2VM53hlBEilyHWRCY8XXpiwBxuito4Bp1VRBQ9GiAGGE6lNxQ_PFsHNxfM118JRHVO6QJXL1Es9IowDDkjYhPOjeIG3My2LJlVcRwAolYO7Wp6sw1xn4-fAIMmXdhmxx7slrm21DNgq9eLu2X9HKuwz_cy7aAvP9RX4oUXs_IBwTTZHdq56oTr9V6QMubwciPiokJDuc4xAz3_hhl4A",
      },
      {
        title: "Authentic Hadith",
        category: "hadith",
        desc: "Access a vast collection of authentic Hadith from various sources.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA6re382bpArMytF44yfUE2VoZNLdZIk3n8bqzpH_Ke4dUIdHYIYu18MoAOn1yzSCStOlDDB77quk8ojHN3u-9L9sliSmb-M1_VJ9Mg-UD6YelXX1fELhDyFTjYXpIcGUVOfg6_J5p1ZyH2_0g6sV-D97Y9hzShBW1wl9mkoUW9VqyIxPMkZMoagLX7ktO-FlapW-3gdAhGCrA60N2HAMA55wtgUTEqS-5JJd6VmB2QIeev9MbO02IdIGStD1kLEPgJP3-ThHgYuhU",
      },
      {
        title: "Islamic Articles",
        link: "/blog",
        desc: "Read insightful articles on Islam, from theology to contemporary issues.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCjFDCpbDXaG_slokdkCBJmhrA8WzkX_-GDfvpL-cJYKD82sRmfuMgVAv9_EHuSpLW8YlSVCehGd-ADhOAkcfQv78a7U1EfuHCsotSxlaisNGqE6kmuHcMuSzp7aiqT7ID0CaogJzuCSgm0LwPsooMQ6clLyAcB3ZLJ8EfSjzID8fMrbO3cB5nqHdKdgwf8AVO2uqz2YU6SxKYd75sqtpfmeGG96HRbQsa50ye4ySRFCvjAthWhC0l-PRb4Y6EaQWZHiYMywm2usEc",
      },
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <section id="resources" className="bg-gray-200 dark:bg-gray-600 py-16">
      <motion.div
        initial={{
          opacity: 0,
          y: 300,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
        exit={{
          opacity: 0,
          y: 300,
        }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl px-4"
      >
        <header className="mb-10 text-center">
          <h3 className="text-3xl font-bold dark:text-white/85">
            Resources &amp; Educational Content
          </h3>
        </header>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {cards.map((c, index) => (
            <button
              viewport={{ once: true }}
              key={c.title}
              onClick={() =>
                navigate(
                  c.link
                    ? c.link
                    : dispatch(setSelectedCategory(c.category)) && "/resources"
                )
              }
              className="group text-left overflow-hidden rounded-2xl bg-white/80 dark:bg-black/40 shadow-sm ring-1 ring-gray-200 dark:ring-emerald-600 transition duration-300 hover:-translate-y-1 hover:shadow-md backdrop-blur"
            >
              <div
                className="md:h-48 h-44 mt-[-10px] w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${c.image}')` }}
                aria-hidden
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold dark:text-gray-100">{c.title}</h4>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-green-500 dark:text-green-400">
                  Learn more <ExternalLink className="size-4" aria-hidden />
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Events Section
function Events() {
  const formatDate = (iso) => new Date(iso).toLocaleDateString();
  const { eventsData } = useSelector((state) => state.eventsAndNews);
  const latestThreeEvents = useMemo(
    () => (eventsData || []).slice(-3),
    [eventsData]
  );

  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center items-center bg-gray-100 dark:bg-gray-500">
      <section
        id="events"
        className="rounded-xl bg-slate-50 dark:bg-slate-700 p-6 max-w-[1130px] w-full my-7 mx-3 "
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold dark:text-gray-100">Events</h3>
          <div className="text-sm text-gray-800 font-bold dark:text-gray-200">
            Join upcoming community activities
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {latestThreeEvents.map((e, index) => (
            <motion.button
              initial={{
                opacity: 0,
                y: 200,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.3 + (0.2 * index) / 2 },
              }}
              exit={{
                opacity: 0,
                y: 200,
              }}
              viewport={{ once: true }}
              key={e.id}
              onClick={() => navigate(e.eventLink)}
              className="rounded-lg bg-gray-100 dark:bg-black/40 dark:border dark:border-emerald-600 shadow-sm transition-all duration-300 hover:scale-110 overflow-hidden"
            >
              <div
                className="h-44 bg-cover bg-center"
                style={{ backgroundImage: `url('${e.image}')` }}
                role="img"
                aria-label={e.title}
              />
              <div className="p-4">
                <div className="flex items-start flex-col justify-evenly gap-3">
                  <h4 className="font-semibold text-lg dark:text-gray-100">{e.title}</h4>
                  <time className="text-sm text-gray-700 dark:text-gray-200">
                    {formatDate(e.date)}
                  </time>
                </div>
                <p className="mt-2 text-left text-sm text-gray-600 dark:text-gray-200">
                  {e.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Calendar size={18} className="text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-500">
                    Learn more
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
