import Header from "./components/Header";
import successPic from "./assets/success-image.svg";
import { useRef, useState, createContext, lazy, Suspense } from "react";
import Users from "./components/Users";
import Form from "./components/Form";
export const AppContext = createContext();

const App = () => {
  const [success, setSuccess] = useState(false); // loading, success
  const getRef = useRef();
  const postRef = useRef();

  return (
    <AppContext.Provider value={{ success, setSuccess, postRef, getRef }}>
      <Header />
      <main>
        <Users className="get-section" ref={getRef} />
        <section className="post-section" ref={postRef}>
          <Suspense fallback={<div className="preloader"></div>}>
            {success ? (
              <>
                <h2>User successfully registered</h2>
                <img src={successPic} alt="User successfully registered" />
              </>
            ) : (
              <Form ref={postRef} />
            )}
          </Suspense>
        </section>
      </main>
    </AppContext.Provider>
  );
};

export default App;
