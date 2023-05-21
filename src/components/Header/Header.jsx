import logo from "../../assets/Logo.svg";
import bannerWEBP from "../../assets/banner_1170x800.webp";
import bannerAVIF from "../../assets/banner.avif";
import { useContext } from "react";
import { AppContext } from "../../App";

const Header = () => {
  const { getRef, postRef } = useContext(AppContext);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header>
      <div className="headline">
        <img src={logo} alt="logo" width="104px" height="26px" />
        <div>
          <button onClick={() => scrollTo(getRef)}>Users</button>
          <button onClick={() => scrollTo(postRef)}>Sign up</button>
        </div>
      </div>
      <div className="banner">
        <picture>
          <source
            srcSet={`${bannerWEBP}`}
            type="image/webp"
            width="1170"
            height="800"
          />
          <img
            src={bannerAVIF}
            type="image/avif"
            alt="Banner"
            height="1500"
            width="2254"
            loading="eager"
          />
        </picture>
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
        <button onClick={() => scrollTo(postRef)}>Sign up</button>
      </div>
    </header>
  );
};

export default Header;
