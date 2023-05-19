import Header from "./components/Header";
import Form from "./components/Form";
import successPic from "./assets/success-image.svg";
import "./Main.css";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useEffect, useRef, useState, createContext } from "react";
import axios from "axios";

export const AppContext = createContext();

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{
      tooltip: className,
    }}
    followCursor={true}
    enterNextDelay={800}
  />
))(({ theme }) => ({
  padding: "3px 16px",
  fontFamily: "Nunito",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "26px",
  backgroundColor: "#000000DE",
}));

const App = () => {
  const users = useRef([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(true);

  const getRef = useRef();
  const postRef = useRef();
  const [success, setSuccess] = useState(false);

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
  }, [page]);

  return (
    <AppContext.Provider value={{ success, setSuccess }}>
      <Header scroll={[getRef, postRef]} />
      <main ref={getRef}>
        <section className="get-section">
          <h2>Working with GET request</h2>
          <div className="users-container">
            {data
              .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
              .map(({ id, photo, name, email, position, phone }) => (
                <article key={id} className="user-card">
                  <img src={photo} alt={name} width={70} height={70} />
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
          {success ? (
            <>
              <h2>User successfully registered</h2>
              <img src={successPic} alt="User registered!" />
            </>
          ) : (
            <Form />
          )}
        </section>
      </main>
    </AppContext.Provider>
  );
};

export default App;
