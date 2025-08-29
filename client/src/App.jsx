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
import Community from "./pages/Community";
import VolunteerBoard from "./pages/VolunteerBoard";
import QuestionsAndAnswers from "./pages/QuestionsAndAnswers";
import DuaRequestWall from "./pages/DuaRequestWall";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Test from "./pages/Test";

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
        {/* Prayer Times */}
        <Route path="prayer_times" element={<PrayerTimes />} />
        <Route path="prayers" element={<PrayerTimes />} />

        {/* Resources */}
        <Route path="resources" element={<Resources />} />

        {/* Events & News */}
        <Route path="events_and_news" element={<EventsAndNews />} />
        <Route path="events" element={<EventsAndNews />} />
        <Route path="news" element={<EventsAndNews />} />

        {/* About Us */}
        <Route path="about_us" element={<AboutUs />} />

        {/* Donate */}
        <Route path="donate" element={<Donate />} />

        {/* Donate Form Page */}
        <Route path="donate_form" element={<DonationForm />} />

        {/* Blog And Articles */}
        <Route path="blog_and_articles" element={<BlogAndArticles />} />
        <Route path="articles" element={<BlogAndArticles />} />
        <Route path="blog" element={<BlogAndArticles />} />

        {/* Community */}
        <Route path="community" element={<Community />} />
        <Route path="volunteer_board" element={<VolunteerBoard />} />
        <Route path="questions_and_answers" element={<QuestionsAndAnswers />} />
        <Route path="dua_request" element={<DuaRequestWall />} />
        <Route path="contact_us" element={<ContactUs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="test" element={<Test />} />

      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
