import React from "react";

const Introduction = (data) => {
  // const { name, age, occupation } = props.props;
  const name=data.props.name;
  const age=data.props.age;
  const occupation=data.props.occupation;

  return (
    <>
      <div className="h-screen">
        <h1>my introduction</h1>
        <p>Hi, I'm {name}!</p>
        <p>I'm {age} years old.</p>
        <p>I'm a {occupation}.</p>
      </div>
    </>
  );
};

export default Introduction;
