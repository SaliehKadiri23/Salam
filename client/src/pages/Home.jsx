import { useId, useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MosqueHeroImage from "../assets/Mosque - Hero Image.png";
import { Calendar, ExternalLink } from "lucide-react";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setSelectedCategory } from "../redux/resourcesSlice";

const Home = () => {
  


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
        {/* Subtle vignette & radial spotlight for award-like depth */}
        <div className="pointer-events-none absolute inset-0 from-black/50 to-transparent " />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-balance text-4xl font-black tracking-tight md:text-6xl">
            Empowering the Ummah Worldwide
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg font-light text-white md:text-xl">
            Our mission is to provide a comprehensive online platform for
            Muslims to connect, learn, and grow in their faith.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#resources"
              className="inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3 text-base font-bold text-white shadow-lg shadow-green-600/10 transition-transform hover:-translate-y-0.5 hover:bg-green-600 focus:outline-none "
            >
              Explore Resources
            </a>
            <a
              href="#events"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-base font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 hover:-translate-y-0.5 "
            >
              Upcoming Events
            </a>
          </div>
        </div>
      </section>

      {/* Prayer Tools */}
      <PrayerTools />
      <Resources />

      {/* Events */}
      <Events/>
      
    </div>
  );
};

// Events Section
function Events(){
  const formatDate = (iso) => new Date(iso).toLocaleDateString();
  const { eventsData } = useSelector((state) => state.eventsAndNews);
  const latestThreeEvents = useMemo(
    () => eventsData.filter((e,idx)=> (idx >= eventsData.length -3)),
    []
  );

  const navigate= useNavigate()
  return (
    <div className="w-full flex justify-center items-center bg-gray-100">
      <section
        id="events"
        className="rounded-xl bg-slate-50 dark:bg-slate-300 p-6 max-w-[1130px] w-full my-7 mx-3 "
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Events</h3>
          <div className="text-sm text-gray-800 font-bold">
            Join upcoming community activities
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {latestThreeEvents.map((e) => (
            <button
              key={e.id}
              onClick={() => navigate(e.eventLink)}
              className="rounded-lg bg-gray-100 shadow-sm transition-all duration-300 hover:scale-110 overflow-hidden"
            >
              <div
                className="h-44 bg-cover bg-center"
                style={{ backgroundImage: `url('${e.image}')` }}
                role="img"
                aria-label={e.title}
              />
              <div className="p-4">
                <div className="flex items-start flex-col justify-evenly gap-3">
                  <h4 className="font-semibold text-lg">{e.title}</h4>
                  <time className="text-sm text-gray-700">
                    {formatDate(e.date)}
                  </time>
                </div>
                <p className="mt-2 text-left text-sm text-gray-600">
                  {e.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Calendar size={18} className="text-green-600 " />
                  <button
                    onClick={() => navigate(e.eventLink)}
                    className="text-sm font-medium text-green-500"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

// Prayer Tools Section
function PrayerTools() {
  const [tab, setTab] = useState("times");
  const tablistId = useId();

  const prayerTimes = useMemo(
    () => [
      { name: "Fajr", time: "04:58" },
      { name: "Dhuhr", time: "12:21" },
      { name: "Asr", time: "15:34" },
      { name: "Maghrib", time: "18:42" },
      { name: "Isha", time: "20:05" },
    ],
    []
  );

  return (
    <div className="w-full bg-gray-100/90 ">
       <section
      id="prayer-tools"
      className="container mx-auto w-full max-w-6xl px-4 py-16 "
    >
      <header className="mb-10 text-center">
        <h3 className="text-3xl font-bold">Prayer Tools</h3>
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
        <div className="mt-8 divide-y divide-gray-200 rounded-2xl bg-white/80 shadow-sm ring-1 ring-gray-200 backdrop-blur">
          {tab === "times" && (
            <div
              role="tabpanel"
              aria-labelledby={tablistId}
              className="p-2 md:p-4"
            >
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-3">
                  Today's Prayer Times
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {prayerTimes.map((p) => (
                    <div
                      key={p.name}
                      className="flex flex-col transition-all duration-300 hover:scale-110 items-center p-3 rounded-md bg-gray-50"
                    >
                      <div className="text-sm text-gray-500">{p.name}</div>
                      <div className="text-lg font-bold">{p.time}</div>
                      <div className="text-xs font-bold text-green-600">0H 23M 11S</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "hijri" && (
            <div
              role="tabpanel"
              aria-labelledby={tablistId}
              className="grid gap-4 p-6"
            >
              <div className="grid grid-cols-7 gap-1 rounded-xl bg-gray-200 p-3 text-center text-sm">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <span key={d} className="py-1 font-semibold text-gray-600">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 31 }).map((_, i) => (
                  <button
                    key={i}
                    className="rounded-md bg-white py-2 hover:scale-105 text-gray-700 ring-1 ring-gray-200 transition hover:bg-green-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-bg-green-500/50"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === "qibla" && (
            <div role="tabpanel" aria-labelledby={tablistId} className="p-6">
              <div className="grid items-center justify-items-center gap-4 text-center">
                <div className="relative aspect-square w-48 rounded-full border-8 border-gray-100 bg-white shadow-inner">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="size-1.5 rounded-full bg-green-500" />
                  </div>
                  <div className="absolute inset-0 animate-spin rounded-full border-t-8 border-t-green-500 border-transparent" />
                </div>
                <p className="text-sm text-gray-700">
                  Replace with device orientation & geo logic as soon IN SHA
                  ALLAH.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    </div>
   
  );
}
// Tab button component
function TabButton({
  active,
  onClick,
  label,
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        "whitespace-nowrap rounded-t-lg border-b-2 px-3 py-3 text-sm font-medium outline-none transition",
        active
          ? "border-b-green-400 text-green-500"
          : "border-b-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
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
        category:"quran",
        desc: "Explore the complete text of the Qur'an with translations and commentary.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD5mc4cugco4BtST0cp4f9PBPfrAeuJ8Bg_H9DgsFL_JMJZTvxO0NlwOdTB2VM53hlBEilyHWRCY8XXpiwBxuito4Bp1VRBQ9GiAGGE6lNxQ_PFsHNxfM118JRHVO6QJXL1Es9IowDDkjYhPOjeIG3My2LJlVcRwAolYO7Wp6sw1xn4-fAIMmXdhmxx7slrm21DNgq9eLu2X9HKuwz_cy7aAvP9RX4oUXs_IBwTTZHdq56oTr9V6QMubwciPiokJDuc4xAz3_hhl4A",
      },
      {
        title: "Authentic Hadith",
        category:"hadith",
        desc: "Access a vast collection of authentic Hadith from various sources.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA6re382bpArMytF44yfUE2VoZNLdZIk3n8bqzpH_Ke4dUIdHYIYu18MoAOn1yzSCStOlDDB77quk8ojHN3u-9L9sliSmb-M1_VJ9Mg-UD6YelXX1fELhDyFTjYXpIcGUVOfg6_J5p1ZyH2_0g6sV-D97Y9hzShBW1wl9mkoUW9VqyIxPMkZMoagLX7ktO-FlapW-3gdAhGCrA60N2HAMA55wtgUTEqS-5JJd6VmB2QIeev9MbO02IdIGStD1kLEPgJP3-ThHgYuhU",
      },
      {
        title: "Islamic Articles",
        link:"/blog",
        desc: "Read insightful articles on Islam, from theology to contemporary issues.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCjFDCpbDXaG_slokdkCBJmhrA8WzkX_-GDfvpL-cJYKD82sRmfuMgVAv9_EHuSpLW8YlSVCehGd-ADhOAkcfQv78a7U1EfuHCsotSxlaisNGqE6kmuHcMuSzp7aiqT7ID0CaogJzuCSgm0LwPsooMQ6clLyAcB3ZLJ8EfSjzID8fMrbO3cB5nqHdKdgwf8AVO2uqz2YU6SxKYd75sqtpfmeGG96HRbQsa50ye4ySRFCvjAthWhC0l-PRb4Y6EaQWZHiYMywm2usEc",
      },
    ],
    []
  );

  const navigate = useNavigate()
  const dispatch = useDispatch()



  return (
    <section id="resources" className="bg-gray-200 py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-10 text-center">
          <h3 className="text-3xl font-bold">
            Resources &amp; Educational Content
          </h3>
        </header>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {cards.map((c) => (
            <button
              key={c.title}
              onClick={()=> navigate(c.link ? c.link : dispatch(setSelectedCategory(c.category) ) && "/resources")}
              className="group text-left overflow-hidden rounded-2xl bg-white/80 shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-md backdrop-blur"
            >
              <div
                className="md:h-48 h-44 mt-[-10px] w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${c.image}')` }}
                aria-hidden
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold">{c.title}</h4>
                <p className="mt-2 text-sm text-gray-500">
                  {c.desc}
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-green-500 hover:underline"
                >
                  Learn more <ExternalLink className="size-4" aria-hidden />
                </a>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
