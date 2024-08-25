const Footer = () => {
    return (
        <ul className="social absolute bottom-5 flex justify-center items-center z-10">
            <li className="list-none"><a href="#" className="block mr-5 transform scale-50 transition-transform duration-500 hover:translate-y-[-15px]"><img src="https://i.ibb.co/x7P24fL/facebook.png" alt="Facebook" className="invert" /></a></li>
            <li className="list-none"><a href="#" className="block mr-5 transform scale-50 transition-transform duration-500 hover:translate-y-[-15px]"><img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="Twitter" className="invert" /></a></li>
            <li className="list-none"><a href="#" className="block transform scale-50 transition-transform duration-500 hover:translate-y-[-15px]"><img src="https://i.ibb.co/ySwtH4B/instagram.png" alt="Instagram" className="invert" /></a></li>
        </ul>
    )}

export default Footer;