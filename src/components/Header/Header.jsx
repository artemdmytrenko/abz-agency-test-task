import { useRef } from "react";
import logo from "../../assets/Logo.svg";
import "./Header.css";

const Header = ({ scroll }) => {
  return (
    <header>
      <div className="headline">
        <img src={logo} alt="logo" />
        <div>
          <button
            onClick={() =>
              scroll[0].current.scrollIntoView({ behavior: "smooth" })
            }
          >
            Users
          </button>
          <button
            onClick={() =>
              scroll[1].current.scrollIntoView({ behavior: "smooth" })
            }
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="banner">
        <div>
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
        </div>
        <button
          onClick={() =>
            scroll[1].current.scrollIntoView({ behavior: "smooth" })
          }
        >
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
