import React from "react";
import { useForm } from "react-hook-form";

export default () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(`on submit data ${JSON.stringify(data)}`);
  });
  const isRequired = { required: true };

  return (
    <>
      <h2>React Hook Form</h2>
      <form {...{ onSubmit, name: "signin-form" }}>
        <label htmlFor="fullname">Full Name: </label>
        <input
          name="fullname"
          placeholder="fullname here"
          // defaultValue="Joe Sm"
          ref={register(isRequired)}
        />
        <br />
        {errors.fullname && <>fullname is required<br /></>}
        <br />
        
        <label htmlFor="password">Password: </label>
        <input name="password" type="password" ref={register} />
        <br /><br />
        
        <label htmlFor="gender">Gender: </label>
        <select name="gender" ref={register(isRequired)}>
          {["", "male", "female", "other"].map((val, idx) => {
            return (
              <option key={idx} value={val}>
                {val}
              </option>
            );
          })}
        </select>
        <br />
        {errors.gender && <>gender is required<br /></>}
        <br />
        
        <label htmlFor="checkbox">Checkbox: </label>
        <input name="checkbox" type="checkbox" ref={register(isRequired)} />
        <br />
        {errors.checkbox && <>checkbox is required<br /></>}
        <br />
        
        <fieldset>
          <legend>Is it True?</legend>
          <input type="radio" id="isTrue" name="radio" ref={register(isRequired)} />
          <label htmlFor="isTrue">True</label>
          <br /><br />
          <input type="radio" id="isFalse" name="radio" ref={register(isRequired)} />
          <label htmlFor="isFalse">False</label>
        </fieldset>
        {errors.radio && <>radio is required<br /></>}
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
