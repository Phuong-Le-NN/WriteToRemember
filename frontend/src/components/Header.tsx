import {useState} from "react";
import bgVid from "../../images/4410402-hd_1920_1080_30fps.mp4";
import {Link} from "react-router-dom";
import {useAppContext} from '../contexts/AppContext';
import SignOutButton from "../components/SignOutButton";
import { useEffect, useRef } from "react";


const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  // Create a ref to attach to the menu element
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only add the event listener if the menu is active
    if (!menuActive) return;

    // Handler to detect clicks outside the menu
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the menu, close the menu
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuActive(false);
      }
    };

    // Add event listener for mouse down events
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount or when menuActive changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuActive]);

  const handleToggle = () => {
    console.log("toggle clicked")
    setMenuActive(!menuActive);
  };

  const { isLoggedIn } = useAppContext();

  return (
    <div>
      <video autoPlay loop muted className={`w-full absolute top-0 -z-50 left-0 h-full object-cover opacity-80`} src={bgVid}/>
      <div className="flex flex-row items-end z-0"> 
        <div className={`${menuActive? 'w-auto':'w-full'} flex justify-between bg-transparent`}>
          <div className="absolute top-0 left-0 w-full p-10 flex flex-row justify-between py-10 px-10 h-[20px]">
            <h2 className="flex text-white text-2xl uppercase ">Write to Remember</h2>
            <button 
              className={`${menuActive? 'opacity-0':'flex'} font-bold text-white text-xl hover:underline`}
              id="MenuButton"
              onClick={handleToggle} 
            >Menu</button>
          </div>            
        </div>
        <div ref={menuRef} className={`${menuActive? 'flex':'hidden'} z-10 w-36 h-full fixed top-0 right-0 flex flex-col bg-stone-500 bg-opacity-35 backdrop-blur-sm border-l border-stone-500`}>
            <button
            className="py-10 px-10 w-30 h-16 bg-center bg-no-repeat font-bold text-white text-xl hover:underline"
            onClick={handleToggle}
            >
            Close
            </button>
          <div className="flex justify-center my-auto">
            <ul className="space-y-4">
              <li className="list-none">
                <Link to="/" className=" text-white text-xl hover:underline">
                  Home
                </Link>
              </li>
              <li className="list-none">
                <Link to="/allNotes" className=" text-white text-xl hover:underline">
                  Library
                </Link>
              </li>
              <li className="list-none">
                <Link to="/createNote" className=" text-white text-xl hover:underline">
                  New Note
                </Link>
              </li>
              <li className="list-none">
                <Link to="/contact" className=" text-white text-xl hover:underline">
                  Contact
                </Link>
              </li>
                            <li className="list-none">
                {isLoggedIn ? <>
                    <SignOutButton className=" text-white text-xl hover:underline"/>
                    </>:                     
                    <Link to="/sign-in" className="flex items-center  text-white text-xl hover:underline">Log In</Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
