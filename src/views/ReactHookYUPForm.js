import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullname: yup.string().required().min(2),
  gender: yup.string().required().oneOf(["male", "female", "other"]),
  email: yup.string().required().email(),
  checkbox: yup.boolean().oneOf([true], 'Must Check the box'),
  radio: yup.string().required(),
});

export default () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = handleSubmit((data) => {
    console.log(`on submit data ${JSON.stringify(data)}`);
  });

  console.log('errors', errors)

  return (
    <>
      <h2>React Hook Form using YUP</h2>
      <form {...{ onSubmit, name: "signin-form" }}>
        <label for="fullname">Full Name: </label>
        <input
          name="fullname"
          placeholder="fullname here"
          // defaultValue="Joe Sm"
          ref={register}
        />
        <br />
        {errors.fullname && (
          <>
            {errors.fullname.message}
            <br />
          </>
        )}
        <br />

        <label for="email">Email: </label>
        <input name="email" type="email" ref={register} />
        <br />
        {errors.email && (
          <>
            {errors.email.message}
            <br />
          </>
        )}
        <br />

        <label for="gender">Gender: </label>
        <select name="gender" ref={register}>
          {["", "male", "female", "other"].map((val, idx) => {
            return (
              <option key={idx} value={val}>
                {val}
              </option>
            );
          })}
        </select>
        <br />
        {errors.gender && (
          <>
            {errors.gender.message}
            <br />
          </>
        )}
        <br />

        <label for="isChecked">Checkbox: </label>
        <input id="isChecked" name="checkbox" type="checkbox" ref={register} />
        <br />
        {errors.checkbox && (
          <>
            {errors.checkbox.message}
            <br />
          </>
        )}
        <br />

        <fieldset>
          <legend>Is it True?</legend>
          <input type="radio" id="isTrue" name="radio" value="isTrue" ref={register} />
          <label for="isTrue">True</label>
          <br /><br />
          <input type="radio" id="isFalse" name="radio" value="isFalse" ref={register} />
          <label for="isFalse">False</label>
          <br />
        </fieldset>
        {errors.radio && (
          <>
            {errors.radio.message}
            <br />
          </>
        )}
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
