import { useRef, useState, createContext, Suspense } from "react";
import successPic from "./assets/success-image.svg";
import Header from "./components/Header";
import Users from "./components/Users";
import Form from "./components/Form";

export const AppContext = createContext();

const App = () => {
  const [success, setSuccess] = useState(false); // true on form validation and consequential POST
  const getRef = useRef();
  const postRef = useRef();

  return (
    <AppContext.Provider value={{ success, setSuccess, postRef, getRef }}>
      <Header />
      <main>
        <Users className="get-section" />
        <section className="post-section" ref={postRef}>
          <Suspense fallback={<div className="preloader"></div>}>
            {success ? (
              <>
                <h2>User successfully registered</h2>
                <img src={successPic} alt="User successfully registered" />
              </>
            ) : (
              <Form />
            )}
          </Suspense>
        </section>
      </main>
    </AppContext.Provider>
  );
};

export default App;
