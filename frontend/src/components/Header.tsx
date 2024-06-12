import { Link } from 'react-router-dom';

const Header = () => {
    return (
        // container to add space around, justify between to add space between elements
        <div className=" bg-yellow-700 py-1 ">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-extralight tracking-tight">
                    <Link to="/">Space For Silence</Link>
                </span>
                <span className="flex space-x-2">
                    <Link to="/sign-in" className="flex items-center text-yellow-400 px-3 hover:underline">Sign Up/ Log In</Link>
                </span>
            </div>
        </div>
    )
}

export default Header;