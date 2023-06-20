import { AiFillFacebook } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[#b7a58d] flex flex-col sm:flex-row px-8 py-4 justify-between">
      <span className="font-bold mb-4 sm:mb-0">Polaria Photo - 2023</span>
      <div className="flex justify-center sm:justify-end gap-4">
        <a href="">
          <FaInstagramSquare size={30} />
        </a>
        <a href="">
          <AiFillFacebook size={30} />
        </a>
        <a href="">
          <BsTwitter size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
