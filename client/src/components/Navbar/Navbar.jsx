import { useState } from "react";
import {
  Menu,
  X,
  Sun,
  Compass,
  MapPin,
  Book,
  BookOpen,
  Bookmark,
  Users,
  Calendar,
  Twitter,
  Instagram,
  Facebook,
  Star,
  Stars,
  StarHalf,
  StarHalfIcon,
  StarIcon,
  StarsIcon,
  Moon,
  MoonStar,
  SunMedium,
  SunDim,
  SunMoon,
  ArrowDown,
  ArrowRight,
  ChevronRightIcon,
  HeartHandshake,
  Globe,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkTheme, toggleDarkTheme] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);
  const [morePagesDropDown, setMorePagesDropDown] = useState(false);

  const menuPagesDesktop = [
    "Prayer Times",
    "Resources",
    "Community",
    "Donate",
    "More",
    // "Blog",
    // "About Us",
    // "Contact Us",
    // "Events",
  ];
  const menuPagesMobile = [
    "Prayer Times",
    "Resources",
    "Community",
    "Donate",
    "Events",
    "Blog",
    "About Us",
    "Contact Us",
  ];

  return (
    <header className="shadow-sm sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between  min-h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
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
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ">
            <nav className="flex gap-3 lg:gap-5 xl:gap-12">
              {menuPagesDesktop.map((item, index) =>
                menuPagesDesktop.length - 1 === index ? (
                  <div
                    onMouseEnter={() => setMorePagesDropDown(true)}
                    onMouseLeave={() => setMorePagesDropDown(false)}
                  >
                    <a
                      key={item}
                      href="#"
                      className="text-gray-700 flex justify-between items-center text-sm lg:text-lg hover:text-green-600 font-medium transition-colors duration-200 relative group"
                    >
                      {item}{" "}
                      <ChevronRightIcon
                        className={`transition-all duration-300   ${
                          morePagesDropDown ? "rotate-0" : "rotate-90"
                        }`}
                      />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300" />
                    </a>
                    {
                      <div
                        className={`transition-all duration-300 bg-white border rounded-lg shadow-sm border-gray-300 z-900 absolute ${
                          morePagesDropDown !== true && "hidden"
                        }`}
                      >
                        <div className="py-2 px-3 flex flex-col gap-2">
                          {["Blog", "About Us", "Contact Us", "Events"].map(
                            (item) => (
                              <a
                                key={item}
                                href="#"
                                className="text-gray-700 flex justify-between items-center text-sm lg:text-lg hover:text-green-600 font-medium transition-colors duration-200 relative group"
                              >
                                {" "}
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300" />
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    }
                  </div>
                ) : (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-700 text-sm lg:text-lg hover:text-green-600 font-medium transition-colors duration-200 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300" />
                  </a>
                )
              )}
            </nav>
          </div>

          <div className="flex gap-7 sm:gap-14 md:gap-2 lg:gap-7 justify-center items-center">
            {/*  Change Language - Mobile/Tablet version  */}
            <div className="hidden md:flex md:scale-90 lg:scale-100 lg:hidden">
              <div className="bg-gray-100 flex  border border-gray-200 rounded-full items-center relative">
                <button
                  onClick={() => setIsEnglish(!isEnglish)}
                  className={`font-bold px-2 py-1 rounded-full z-2 
                   
                `}
                >
                  EN
                  {/* ${isEnglish && "bg-gray-400"} */}
                </button>{" "}
                <button
                  onClick={() => setIsEnglish(!isEnglish)}
                  className={`font-bold px-2 py-1 rounded-full z-2 
                    `}
                >
                  AR
                  {/* ${isEnglish !== true && "bg-gray-400"} */}
                </button>
                <div
                  className={`px-1 py-1 absolute transition-all duration-300 ${
                    isEnglish !== true && "translate-x-9.5"
                  }`}
                >
                  <div className=" rounded-full bg-gray-400 size-7"></div>
                </div>
              </div>
            </div>

            {/* Change Language - Desktop version  */}
            <div className="items-center md:hidden lg:flex">
              <button
                type="button"
                onClick={() => setIsEnglish(!isEnglish)}
                className="inline-flex items-center gap-2 transition-all duration-300 hover:scale-110 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/60"
              >
                <Globe className="size-4" aria-hidden />
                <span className="truncate">English/العربية</span>
              </button>
            </div>

            {/* Change Theme Background */}
            <div className="md:scale-90 lg:scale-100">
              {darkTheme ? (
                <button
                  onClick={() => toggleDarkTheme(!darkTheme)}
                  className="bg-gray-200 p-2 rounded-full transition-all duration-300 hover:rotate-360"
                >
                  <MoonStar size={"1.5em"} fill="grey" />
                </button>
              ) : (
                <button
                  onClick={() => toggleDarkTheme(!darkTheme)}
                  className="bg-gray-200 p-2 rounded-full transition-all duration-300 hover:rotate-360"
                >
                  <Sun size={"1.5em"} fill="yellow" color="#d89c2c" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-4 text-gray-600 hover:text-green-600 rounded-lg"
          >
            {isMenuOpen ? (
              <X className="w-6 scale-125 hover:scale-145 transition-all duration-300 h-6" />
            ) : (
              <Menu className="w-6 scale-125 hover:scale-145 transition-all duration-300 h-6" />
            )}
          </button>

          {/* Only When Logged - In */}
          <div className="hidden md:flex items-center ml-4">
            <div className="size-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full overflow-hidden ring-2 ring-white shadow-lg hover:scale-105 transition-transform duration-200">
              <img
                // src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5-0papwQrmLrhdypIS_bdOqEXSZ7-qljcpnEWE-HG1lpU1bmb106DVURRMF0VrVR06lTP_RMlj1qiCNdgxsQRLRz8nthUNwzx_eiJ2pnjXj0xLuWuYvQEVVMHKX1KEI4q-fY88Y3blxyAnlj9ttoGSFAFPDSYL2pPZNOMRrLnqNGqREUevT8a-9CsMVM_vTeVVDvSLpgM3Uj2yWCVf6D7z5VdXjxHAbAiRQ9JjdjOavP92WFrPdIG2TaQZC8uCFN7Kcj84CpG9IY"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sign Up / Log In */}
          {/* <div className="hidden md:flex flex-col my-1 gap-1 justify-center items-center lg:flex-row lg:gap-4 md:justify-between ">
            <button className="px-2  rounded-md py-1 lg:py-2 bg-gradient-to-r from-green-200 to-green-600 grow-1 font-bold text-white transition-all duration-300 hover:bg-gradient-to-l hover:scale-110">
              Sign Up
            </button>
            <button className="px-3  rounded-md py-1 lg:py-2 grow-1 bg-gradient-to-l from-green-200 to-blue-600 font-bold text-white transition-all duration-300 hover:bg-gradient-to-r hover:scale-110">
              Log In
            </button>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg">
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
              <a
                key={item}
                href="#"
                className="transition-colors duration-200 relative group block text-gray-700 hover:text-green-600 font-medium py-2"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Sign Up / Log In */}
          <div className="flex flex-row my-1 gap-4 sm:gap-8 justify-center items-center md:justify-between px-7 mb-5 ">
            <button className="px-2  rounded-md py-2 lg:py-2 bg-gradient-to-r from-green-200 to-green-600 grow-1 font-bold text-white transition-all duration-300 hover:bg-gradient-to-l hover:scale-110">
              Sign Up
            </button>
            <button className="px-3  rounded-md py-2 lg:py-2 grow-1 bg-gradient-to-l from-green-200 to-blue-600 font-bold text-white transition-all duration-300 hover:bg-gradient-to-r hover:scale-110">
              Log In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
