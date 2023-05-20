import { useContext, useState, useEffect } from "react";
import { FormContext } from "../Form";
import axios from "axios";
const RadioButtons = () => {
  const { register } = useContext(FormContext);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios
      .get("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
      .then(({ data }) => setPositions(data.positions));
  }, []);

  return (
    <fieldset>
      <legend>Select your position</legend>
      {positions.map(({ id, name }) => (
        <div key={id}>
          <input type="radio" id={id} value={id} {...register("position_id")} />
          <label htmlFor={id}>{name}</label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioButtons;
