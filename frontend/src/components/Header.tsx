import {useState} from "react";
import bgVid from "../../images/4410402-hd_1920_1080_30fps.mp4";
import {Link} from "react-router-dom";
import {useAppContext} from '../contexts/AppContext';
import SignOutButton from "../components/SignOutButton";


const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

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
          <div className="absolute top-0 left-0 w-full p-10 flex flex-row justify-between py-10 px-10">
            <h2 className="flex text-white text-2xl uppercase ">Write to remember</h2>
            <button 
              className={`${menuActive? 'hidden':'flex'} font-bold text-white text-xl hover:underline`}
              id="hidden"
              onClick={handleToggle} 
            >Menu</button>
          </div>            
        </div>
        <div className={`${menuActive? 'flex':'hidden'} z-10 w-36 h-full fixed top-0 right-0 flex flex-col bg-slate-200`}>
          <button
            className=" py-10 px-10 w-30 h-16 bg-center bg-no-repeat font-bold bg-opacity-50 text-stone-500 text-xl hover:underline"
            onClick={handleToggle}
          >
            Close
          </button>
          <div className="flex justify-center my-auto">
            <ul className="space-y-4">
              <li className="list-none">
                <Link to="/" className=" text-stone-500 text-xl hover:underline">
                  Home
                </Link>
              </li>
              <li className="list-none">
                {isLoggedIn ? <>
                    <SignOutButton />
                    </>:                     
                    <Link to="/sign-in" className="flex items-center  text-stone-500 text-xl hover:underline">Log In</Link>
                }
              </li>
              <li className="list-none">
                <Link to="/sign-in" className=" text-stone-500 text-xl hover:underline">
                  Library
                </Link>
              </li>
              <li className="list-none">
                <Link to="/contact" className=" text-stone-500 text-xl hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
