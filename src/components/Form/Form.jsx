import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Form.css";
import { AppContext } from "../../App";

const Form = () => {
  const { success, setSuccess } = useContext(AppContext);
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position_id: "1",
      photo: "",
    },
  });
  const { errors, isValid, isDirty } = formState;
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState(null);
  const [photoName, setPhotoName] = useState();

  useEffect(() => {
    axios
      .get("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
      .then(({ data }) => setPositions(data.positions));
  }, []);

  useEffect(() => {
    axios
      .get("https://frontend-test-assignment-api.abz.agency/api/v1/token")
      .then(({ data: { token } }) => setToken(token));
  }, []);

  const onSubmit = (data) => {
    data.photo = data.photo[0];
    console.log(data.photo);
    // axios
    //   .post(
    //     "https://frontend-test-assignment-api.abz.agency/api/v1/users",
    //     {
    //       ...data,
    //     },
    //     { headers: { Token: token, "Content-Type": "multipart/form-data" } }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data.success) {
    //       success = true;
    //     }
    //   });
    setSuccess(true);
  };

  return (
    <>
      {" "}
      <h2>Working with a POST request</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="text-fields">
          <div className="text-field">
            <input
              type="text"
              id="name"
              onFocus={(e) => {
                e.currentTarget.classList.add("touched");
              }}
              {...register("name", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
            />
            <label htmlFor="name">Your name</label>
            <p className="error">{errors.name?.message}</p>
          </div>
          <div className="text-field">
            <input
              type="email"
              id="email"
              onFocus={(e) => {
                e.currentTarget.classList.add("touched");
              }}
              {...register("email", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                pattern: {
                  value:
                    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                  message: "Please provide a valid email",
                },
              })}
            />
            <label htmlFor="email">Email</label>
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="text-field ">
            <input
              type="tel"
              id="phone"
              aria-describedby="tel-pattern"
              onFocus={(e) => {
                e.currentTarget.classList.add("touched");
              }}
              onBlur={(e) => {
                e.target.classList.add("blurred");
              }}
              {...register("phone", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                pattern: {
                  value: /^[\+]{0,1}380([0-9]{9})$/,
                  message: "Please provide a valid phone number",
                },
              })}
            />
            {errors.phone?.message ? (
              <p className="error">{errors.phone?.message}</p>
            ) : (
              <p id="tel-pattern">+ 38 (XXX) XXX - XX - XX</p>
            )}
            <label htmlFor="phone">Phone</label>
          </div>
        </div>
        <fieldset>
          <legend>Select your position</legend>
          {positions.map(({ id, name }) => (
            <div key={id}>
              <input
                type="radio"
                id={id}
                value={id}
                {...register("position_id")}
              />
              <label htmlFor={id}>{name}</label>
            </div>
          ))}
        </fieldset>
        <div className={`file-upload ${errors.photo?.message && "error"}`}>
          <div
            tabIndex={0}
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Upload
          </div>
          {photoName ? (
            <div className="uploaded">{photoName}</div>
          ) : (
            <div>Upload your photo</div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/jpg"
            id="photo"
            {...register("photo", {
              required: {
                value: true,
                message: "Please provide a photo",
              },
              onChange: ({ target: { files } }) => {
                if (files && files[0]?.type === "image/jpeg") {
                  setPhotoName(files[0].name);
                }
              },
              validate: {
                typeError: (fileList) => {
                  return (
                    fileList[0].type === "image/jpeg" ||
                    "The photo should be in JPEG/JPG format"
                  );
                },
                fileSizeError: (fileList) => {
                  return (
                    fileList[0].size < 5e6 ||
                    "The selected photo's file size should be less than 5 MB"
                  );
                },
              },
            })}
            hidden
          />
          <p>{errors.photo?.message}</p>
        </div>
        <button disabled={!isValid || !isDirty}>Sign up</button>
      </form>
    </>
  );
};

export default Form;
