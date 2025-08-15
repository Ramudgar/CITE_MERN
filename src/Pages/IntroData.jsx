import React from 'react'
import Introduction from './Introduction'

const IntroData = () => {
    const data = {
        name: "John Doe",
        age: 30,
        occupation: "Software Engineer",
    };
  return (
    <Introduction  props={data} />
  )
}

export default IntroData