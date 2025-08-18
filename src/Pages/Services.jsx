import React from "react";
import CardComponent from "../Components/CardComponent";
// import {servicesData} from "../Data/serviceData";
const Services = () => {
  // const services= servicesData;
  const services = [
    {
      title: "Product Design",
      description: "Welcome to the Services page of Nexpioneer.",
      image: "https://flowbite.com/docs/images/blog/image-1.jpg",

      buttonText: "Read more",
    },
    {
      title: "Web Development",
      description: "We create stunning and functional websites.",
      image: "https://flowbite.com/docs/images/blog/image-2.jpg",

      buttonText: "Read more",
    },
    {
      title: "Mobile App Development",
      description: "Building mobile applications for all platforms.",
      image: "https://flowbite.com/docs/images/blog/image-3.jpg",

      buttonText: "Read more",
    },
    {
      title: "Digital Marketing",
      description: "Helping you reach your audience effectively.",
      image: "https://flowbite.com/docs/images/blog/image-4.jpg",

      buttonText: "Read more",
    },
    {
      title: "SEO Services",
      description: "Optimizing your website for search engines.",
      image: "https://flowbite.com/docs/images/blog/image-5.jpg",

      buttonText: "Read more",
    },
    {
      title: "Content Creation",
      description: "Creating engaging content for your brand.",
      image: "https://flowbite.com/docs/images/blog/image-6.jpg",

      buttonText: "Read more",
    },
  ];

  return (
    <div className=" p-12  min-h-screen bg-gray-100">
      <h1>Our Services</h1>
      <p>Welcome to the Services page of Nexpioneer.</p>
      {/* card component */}
      <CardComponent services={services} />
    </div>
  );
};

export default Services;
