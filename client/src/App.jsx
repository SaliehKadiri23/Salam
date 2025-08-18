import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import PrayerTimes from "./pages/PrayerTimes";
import Resources from "./pages/Resources";
import Donate from "./pages/Donate";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import EventsAndNews from "./pages/EventsAndNews";
import AboutUs from "./pages/AboutUs";
import DonationForm from "./pages/DonateForm";
import BlogAndArticles from "./pages/BlogAndArticles";

const App = () => {
  // const [response, setResponse] = useState("")

  // useEffect(() => {
  //   async function greetBackend(){
  //     try {
  //       let message = await axios.get("http://localhost:7000/cow");
  //       setResponse(message.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   greetBackend();
  // }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="prayer_times" element={<PrayerTimes />} />
        <Route path="resources" element={<Resources />} />
        <Route path="events_and_news" element={<EventsAndNews />} />
        <Route path="about_us" element={<AboutUs />} />
        <Route path="donate" element={<Donate />} />
        <Route path="donate_form" element={<DonationForm />} />
        {/* <Route path="blog_and_articles" element={<BlogAndArticles />} /> */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
