import { useState, useEffect, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../App";
import { createContext } from "react";
import FileUpload from "./components/FileUpload";
import RadioButtons from "./components/RadioButtons";
import TextField from "./components/TextField";
import axios from "axios";

export const FormContext = createContext();

const Form = () => {
  const { setSuccess } = useContext(AppContext);
  const {
    register,
    trigger,
    clearErrors,
    setError,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position_id: "1",
      photo: "",
    },
  });

  const photoRef = useRef();
  const [token, setToken] = useState(null);
  const [photoName, setPhotoName] = useState();

  useEffect(() => {
    axios
      .get("https://frontend-test-assignment-api.abz.agency/api/v1/token")
      .then(({ data: { token } }) => setToken(token));
  }, []);

  const onSubmit = (data) => {
    data.photo = data.photo[0];
    axios
      .post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        { ...data },
        { headers: { Token: token, "Content-Type": "multipart/form-data" } }
      )
      .catch((error) => {
        console.log(error);
        if (error.response.status === 409) {
          const message = error.response.data.message;
          setError("email", { message });
          setError("phone", { message });
        } else if (error.response.status === 422) {
          setError("photo", {
            message: error.response.data.fails.photo[0],
          });
          photoRef.current.classList.add("error");
        }
      })
      .then(({ data }) => {
        data.success && setSuccess(true);
      });
  };

  return (
    <FormContext.Provider
      value={{
        register,
        trigger,
        errors,
        photoName,
        setPhotoName,
        clearErrors,
        photoRef,
      }}
    >
      <h2>Working with POST request</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="text-fields">
          <TextField
            id="name"
            minLength={{
              value: 2,
              message: "The name must be at least 2 characters.",
            }}
            maxLength={{
              value: 60,
              message: "The name can't be longer than 60 characters.",
            }}
          >
            <label htmlFor="name">Your name</label>
            <p className="error">{errors.name?.message}</p>
          </TextField>
          <TextField
            type="email"
            id="email"
            pattern={{
              value: emailPattern,
              message: "The email must be a valid email address.",
            }}
            minLength={{
              value: 2,
              message: "The email must be at least 2 characters.",
            }}
            maxLength={{
              value: 100,
              message: "The email can't be longer than 100 characters.",
            }}
          >
            <label htmlFor="email">Email</label>
            <p className="error">{errors.email?.message}</p>
          </TextField>
          <TextField
            type="tel"
            id="phone"
            desc="tel-pattern"
            pattern={{
              value: phonePattern,
              message: "Please provide a valid phone number",
            }}
          >
            {errors.phone?.message ? (
              <p className="error">{errors.phone?.message}</p>
            ) : (
              <p id="tel-pattern">+ 38 (XXX) XXX - XX - XX</p>
            )}
            <label htmlFor="phone">Phone</label>
          </TextField>
        </div>
        <RadioButtons />
        <FileUpload />
        <button disabled={!isValid || !isDirty}>Sign up</button>
      </form>
    </FormContext.Provider>
  );
};

export default Form;

const phonePattern = /^[\+]{0,1}380([0-9]{9})$/;
const emailPattern =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
