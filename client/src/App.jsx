import React, { useState, useEffect } from 'react'
import axios from "axios"
import Layout from './layout/Layout';
import Home from './pages/Home';
import PrayerTimes from "./pages/PrayerTimes";
import Resources from "./pages/Resources";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

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
        {/* <Route
          path="/PrayerTimesDesktopVariant1"
          element={<PrayerTimesDesktopVariant1 />}
        />
        <Route
          path="/PrayerTimesDesktopVariant11"
          element={<PrayerTimesDesktopVariant11 />}
        /> */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App