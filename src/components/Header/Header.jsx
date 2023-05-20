import logo from "../../assets/Logo.svg";
import "./Header.css";

const Header = ({ scrollToSection }) => {
  const scrollTo = (index) => {
    scrollToSection[index].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header>
      <div className="headline">
        <img src={logo} alt="logo" width="104px" height="26px" />
        <div>
          <button onClick={() => scrollTo(0)}>Users</button>
          <button onClick={() => scrollTo(1)}>Sign up</button>
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
        <button onClick={() => scrollTo(1)}>Sign up</button>
      </div>
    </header>
  );
};

export default Header;
