import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import StyledTooltip from "../StyledTooltip";
import axios from "axios";

const Users = ({ className, ref }) => {
  const [userData, setUserData] = useState({ users: [], page: 1 });
  const { getRef } = useContext(AppContext);
  const showMore = useRef();

  useEffect(() => {
    let total_pages;
    axios
      .get(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${userData?.page}&count=6`
      )
      .then(({ data }) => {
        total_pages = data["total_pages"];
        data.success
          ? setUserData((prev) => {
              return { ...prev, users: [...prev.users, ...data.users] };
            })
          : console.log(data.message?.fails);
      });
    return () => userData.page === total_pages - 1 && showMore.current.remove();
  }, [userData.page]);

  return (
    <section className={className} ref={getRef}>
      <h2>Working with GET request</h2>
      <div className="users-container">
        {userData.users
          .sort((a, b) => (Date(a.timestamp) < Date(b.timestamp) ? -1 : 1))
          .map(({ id, photo, name, email, position, phone }) => (
            <article key={id} className="user-card">
              <img
                src={photo || photoCover}
                alt={`${name} | ${email}`}
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
      <button
        ref={showMore}
        onClick={() => {
          setUserData({ ...userData, page: userData.page + 1 });
        }}
      >
        Show more
      </button>
    </section>
  );
};

export default Users;
