import Header from "./components/Header";
import StyledTooltip from "./components/StyledTooltip";
import successPic from "./assets/success-image.svg";
import "./Main.css";
import {
  useEffect,
  useRef,
  useState,
  createContext,
  lazy,
  Suspense,
} from "react";
import axios from "axios";

const Form = lazy(() => import("./components/Form"));

export const AppContext = createContext();

const App = () => {
  const users = useRef([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(true);
  const [loadingState, setLoadingState] = useState("loading"); // loading, success

  const getRef = useRef();
  const postRef = useRef();

  useEffect(() => {
    axios
      .get(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
      )
      .then(({ data }) => {
        if (users.current.length <= data["total_users"]) {
          users.current = data.users;
          setData((n) => [...n, ...users.current]);
        } else {
          setVisible(false);
        }
      });
    setLoadingState("");
  }, [page]);

  return (
    <AppContext.Provider value={{ loadingState, setLoadingState }}>
      <Header scrollToSection={[getRef, postRef]} />
      <main>
        <section className="get-section" ref={getRef}>
          <h2>Working with GET request</h2>
          <div className="users-container">
            {data
              .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
              .map(({ id, photo, name, email, position, phone }) => (
                <article key={id} className="user-card">
                  <img
                    src={photo}
                    alt={name}
                    width={70}
                    height={70}
                    loading="lazy"
                  />
                  <StyledTooltip title={name}>
                    <p>{name}</p>
                  </StyledTooltip>
                  <div>
                    <StyledTooltip title={position}>
                      <p>{position}</p>
                    </StyledTooltip>
                    <StyledTooltip title={email}>
                      <p>{email}</p>
                    </StyledTooltip>
                    <StyledTooltip title={phone}>
                      <p>{phone}</p>
                    </StyledTooltip>
                  </div>
                </article>
              ))}
          </div>
          {visible && (
            <button
              onClick={() => {
                setPage((n) => n + 1);
              }}
            >
              Show more
            </button>
          )}
        </section>
        <section className="post-section" ref={postRef}>
          {(() => {
            switch (loadingState) {
              case "loading":
                return <div className="preloader"></div>;
              case "success":
                return (
                  <>
                    <h2>User successfully registered</h2>
                    <img src={successPic} alt="User registered!" />
                  </>
                );
              default:
                return <Form />;
            }
          })()}
        </section>
      </main>
    </AppContext.Provider>
  );
};

export default App;
