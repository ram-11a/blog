import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ThemeToggle from "./DarkthemeToggle";
import DarkModeToggle from "./DarkthemeToggle";
import "./Navbar.css"; // Import custom CSS

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-4 text-2xl font-semibold font-sans"
      >
        <img src="sr_logo.png" className="w-12 h-12" alt="" />
        <span>SR Blog</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-3xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "="}
        </div>
        {/* MOBILE MENU LIST */}
        <div
          className={`w-full h-screen bg-[#ffebcd] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${
            open ? "right-0" : "-right-[100%]"
          }`}
        >
          <a href="/">Home</a>
          <a href="">
            <button className="py-2 px-4 rounded-3xl bg-orange-800 text-white">
              Login
            </button>
          </a>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 font-medium  transition-colors hover:text-black">
        <a href="/" className="hover:text-orange-800">
          Home
        </a>

        <SignedOut>
          <Link to="/login">
            <Button title="login" containerClass="cursor-pointer" />
          </Link>
        </SignedOut>
        <SignedIn>
          <Link to="/submit">
            <Button title="Submit" containerClass="cursor-pointer" />
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
