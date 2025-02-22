import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/dropshipping.png";
import { IoNotifications } from "react-icons/io5";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link className="flex items-center" to="/">
              <img
                src={logo}
                alt="logo"
                className="h-14 w-14 rounded-md"
                width="100"
                height="100"
              />
              <p className="text-xl">
                <span className="font-bold text-blue-500">Drop</span>
                <span className="text-green-300">Desk</span>
              </p>
            </Link>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* home route */}
                <div>
                <Link
                      to="/"
                      className="block px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Home
                    </Link>
                </div>
                {/*notification btn */}
                <div>
                  <IoNotifications className="text-2xl" />
                </div>
                {/* Dropdown btn */}
                {user ? (
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                  >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                      {/* Avatar */}
                      <img
                        className="rounded-full"
                        referrerPolicy="no-referrer"
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt="profile"
                        height="30"
                        width="30"
                      />
                    </div> 
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">

                    {user ? (
                      <>
                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                          Name: {user?.displayName}
                        </div>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
