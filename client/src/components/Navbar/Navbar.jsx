import { useMemo, useState } from "react";
import {
  Menu,
  X,
  Sun,
  Star,
  Stars,
  MoonStar,
  ChevronRightIcon,
  Globe,
  ChevronDown,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLanguage } from "../../redux/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [morePagesDropDown, setMorePagesDropDown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [theme, toggle] = useTheme()

  const menuPagesDesktop = [
    { title: "Prayer Times", link: "prayer_times" },
    { title: "Resources", link: "resources" },
    { title: "Community", link: "community" },
    { title: "Donate", link: "donate" },
    { title: "More" },
  ];
  const menuPagesMobile = [
    { title: "Prayer Times", link: "prayer_times" },
    { title: "Resources", link: "resources" },
    { title: "Community", link: "community" },
    { title: "Donate", link: "donate" },
    { title: "Events & News", link: "events_and_news" },
    { title: "Blog", link: "blog" },
    { title: "About Us", link: "about_us" },
    { title: "Contact Us", link: "contact_us" },
  ];

  const { selectedLanguage, languages } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate()
  return (
    <header className="shadow-sm sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 dark:bg-black/85 dark:border-gray-400/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between  min-h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r  from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Stars
                  fill="yellow"
                  className="text-yellow-600 font-bold size-7"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-green-300 to-emerald-500 rounded-xl blur opacity-55 animate-pulse" />
            </div>
            <h1 className="text-3xl ml-2 font-bold text-gradient-to-r bg-gradient-to-r from-green-600 to-green-200 bg-clip-text text-transparent">
              Salam
            </h1>

            <Star
              fill="#00a63e"
              className="text-green-600 font-bold ml-[-6.05em] mb-[-2.3em]"
              size={"0.7em"}
            />
            <Star
              fill="#00a63e"
              className="text-green-600 font-bold ml-[0.05em] mb-[-2.3em]"
              size={"0.6em"}
            />
            <Star
              fill="#00a63e"
              className="text-green-600 font-bold ml-[0.05em] mb-[-2.3em]"
              size={"0.5em"}
            />
            <Star
              fill="#00a63e"
              className="text-green-600 font-bold ml-[0.05em] mb-[-2.3em]"
              size={"0.4em"}
            />
            <Star
              fill="#00a63e"
              className="text-green-600 font-bold ml-[0.0em] mb-[-2.3em]"
              size={"0.3em"}
            />
            <Stars
              fill="#a1ebb8"
              className="text-green-600 font-bold ml-[-1.0em] mb-[1.3em]"
              size={"1.2em"}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ">
            <nav className="flex gap-3 lg:gap-5 xl:gap-12">
              {menuPagesDesktop.map((item, index) =>
                menuPagesDesktop.length - 1 === index ? (
                  <div
                    key={item.title}
                    onMouseEnter={() => setMorePagesDropDown(true)}
                    onMouseLeave={() => setMorePagesDropDown(false)}
                  >
                    <p className="text-gray-700 z-200 dark:hover:text-green-600 dark:text-white flex justify-between items-center text-sm lg:text-md  xl:text-lg hover:text-green-600 font-medium transition-colors duration-200 relative group">
                      {item.title}{" "}
                      <ChevronRightIcon
                        className={`transition-all duration-300   ${
                          morePagesDropDown ? "rotate-0" : "rotate-90"
                        }`}
                      />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300" />
                    </p>
                    {
                      <div
                        className={`transition-all duration-300 z-2000 bg-white dark:bg-black/70 border rounded-lg shadow-sm border-gray-300 dark:border-gray-500 z-50 absolute ${
                          morePagesDropDown !== true && "hidden"
                        }`}
                      >
                        <div className="py-2 px-3 flex flex-col gap-2">
                          {[
                            { title: "Blog", link: "blog" },
                            { title: "Events & News", link: "events_and_news" },
                            { title: "About Us", link: "about_us" },
                            { title: "Contact Us", link: "contact_us" },
                          ].map((item) => (
                            <NavLink
                              to={`/${item.link}`}
                              key={item.title}
                              className="text-gray-700 dark:text-white dark:hover:text-green-600 flex justify-between items-center text-sm lg:text-lg hover:text-green-600 font-medium transition-colors duration-200 relative group"
                            >
                              {" "}
                              {item.title}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300" />
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    }
                  </div>
                ) : (
                  <NavLink
                    to={`/${item.link}`}
                    key={item.title}
                    className="text-gray-700 text-sm lg:text-md dark:text-white dark:hover:text-green-600 hover:text-green-600 xl:text-lg font-medium transition-colors duration-200 relative group"
                  >
                    {item.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300" />
                  </NavLink>
                )
              )}
            </nav>
          </div>

          <div className="flex gap-7 sm:gap-14 md:gap-2 lg:gap-7 justify-center items-center">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="w-full bg-emerald-600 border border-emerald-600 text-white py-2 px-2 rounded-xl transition-all hover:border-yellow-400 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>
                    {
                      languages.find((lang) => lang.code === selectedLanguage)
                        ?.name
                    }
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transform transition-transform ${
                    showLanguageDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showLanguageDropdown && (
                <div className="absolute top-full mt-1 left-0 right-0 mb-2 bg-emerald-800 border border-emerald-600 rounded-xl shadow-xl overflow-hidden z-10">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        dispatch(setSelectedLanguage(language.code));
                        setShowLanguageDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white hover:bg-emerald-700 transition-colors"
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Change Theme Background */}
            <div className="md:scale-90 lg:scale-100">
              {theme === "dark" ? (
                <button
                  onClick={toggle}
                  className="bg-gray-200 p-2 rounded-full z-10 transition-all duration-300 hover:rotate-360"
                >
                  <MoonStar size={"1.5em"} fill="grey" />
                </button>
              ) : (
                <button
                  onClick={toggle}
                  className="bg-gray-200 p-2 rounded-full transition-all duration-300 hover:rotate-360"
                >
                  <Sun
                    size={"1.5em"}
                    fill="yellow"
                    color="#d89c2c"
                    className="transition-all duration-300 hover:rotate-360"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-4 text-gray-600 dark:text-white/95 dark:hover:text-green-600 hover:text-green-600 rounded-lg"
          >
            {isMenuOpen ? (
              <X className="w-6 scale-125 hover:scale-145 transition-all duration-300 h-6" />
            ) : (
              <Menu className="w-6 scale-125 hover:scale-145  transition-all duration-300 h-6" />
            )}
          </button>

          {/* Only When Logged - In */}
          {/* <div className="hidden md:flex items-center ml-4">
            <div className="size-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full overflow-hidden ring-2 ring-white shadow-lg hover:scale-105 transition-transform duration-200">
              <img
                // src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5-0papwQrmLrhdypIS_bdOqEXSZ7-qljcpnEWE-HG1lpU1bmb106DVURRMF0VrVR06lTP_RMlj1qiCNdgxsQRLRz8nthUNwzx_eiJ2pnjXj0xLuWuYvQEVVMHKX1KEI4q-fY88Y3blxyAnlj9ttoGSFAFPDSYL2pPZNOMRrLnqNGqREUevT8a-9CsMVM_vTeVVDvSLpgM3Uj2yWCVf6D7z5VdXjxHAbAiRQ9JjdjOavP92WFrPdIG2TaQZC8uCFN7Kcj84CpG9IY"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}

          {/* Sign Up / Log In */}
          <div className="hidden md:flex flex-col my-1 gap-1 justify-center items-center lg:flex-row lg:gap-4 md:justify-between ">
            <button onClick={() => navigate("/sign_up")}>
              <p className="px-2  rounded-md py-1 lg:py-2 bg-gradient-to-r from-green-400 to-green-600 grow-1 font-bold text-white transition-all duration-300 hover:bg-gradient-to-l hover:scale-110">
                Sign Up
              </p>
            </button>
            <button onClick={() => navigate("/login")}>
              <p className="px-3  rounded-md py-1 lg:py-2 grow-1 bg-white  font-bold text-green-600 ring-1 ring-green-600 transition-all duration-300 hover:bg-gradient-to-r hover:scale-110">
                Log In
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <AnimatePresence>
          <motion.div
            initial={{
              opacity: 0,
              y: -150,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            }}
            exit={{
              opacity: 0,
              y: 300,
            }}
            className="md:hidden overflow-hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-500 shadow-lg"
          >
            <div className="px-4 mx-3 py-3 space-y-2">
              {/* Only When Logged - In */}
              {/* <div className="flex justify-center my-3 items-center">
              <div className="size-15 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full overflow-hidden ring-2 ring-white shadow-lg hover:scale-105 transition-transform duration-200">
                <img
                  // src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5-0papwQrmLrhdypIS_bdOqEXSZ7-qljcpnEWE-HG1lpU1bmb106DVURRMF0VrVR06lTP_RMlj1qiCNdgxsQRLRz8nthUNwzx_eiJ2pnjXj0xLuWuYvQEVVMHKX1KEI4q-fY88Y3blxyAnlj9ttoGSFAFPDSYL2pPZNOMRrLnqNGqREUevT8a-9CsMVM_vTeVVDvSLpgM3Uj2yWCVf6D7z5VdXjxHAbAiRQ9JjdjOavP92WFrPdIG2TaQZC8uCFN7Kcj84CpG9IY"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div> */}
              {menuPagesMobile.map((item) => (
                <NavLink
                  to={`/${item.link}`}
                  key={item.title}
                  onClick={() => setIsMenuOpen(false)}
                  className="transition-colors duration-200 relative group block text-gray-700 dark:text-white dark:hover:text-green-600 hover:text-green-600 font-medium py-2"
                >
                  {item.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300" />
                </NavLink>
              ))}
            </div>

            {/* Sign Up / Log In */}
            <div className="flex flex-row my-1 gap-4 sm:gap-8 justify-center items-center md:justify-between px-7 mb-5 ">
              <button
                onClick={() => {
                  setIsMenuOpen(false), navigate("/sign_up");
                }}
                className={"w-full flex justify-center items-center"}
              >
                <motion.p
                  initial={{
                    opacity: 0,
                    x: -150,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.35 },
                  }}
                  exit={{
                    opacity: 0,
                    x: 150,
                  }}
                  className="px-2 text-center w-full border-b-0 rounded-md py-2 lg:py-2 bg-gradient-to-r from-green-400 to-green-600 grow-1 font-bold text-white transition-all duration-300 hover:bg-gradient-to-l hover:scale-110"
                >
                  Sign Up
                </motion.p>
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false), navigate("/login");
                }}
                className={"w-full flex justify-center items-center"}
              >
                <motion.p
                  initial={{
                    opacity: 0,
                    x: 150,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.35 },
                  }}
                  exit={{
                    opacity: 0,
                    x: -150,
                  }}
                  className="px-3 w-full rounded-md ring-1 ring-green-600 text-center bg-white py-2 lg:py-2 grow-1 font-bold text-green-600 transition-all duration-300 hover:bg-gradient-to-r hover:scale-110"
                >
                  Log In
                </motion.p>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </header>
  );
};

export default Navbar;
