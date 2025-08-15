import React from "react";

const Services = () => {
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

      {/* srevices list */}
      <div className="flex p-12  flex-wrap justify-center bg-gray-100 gap-2">
        {services.map((service, index) => {
          return (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg h-[250px] w-full object-cover"
                  src={service.image}
                  alt={service.title}
                />
              </a>
              <div className="p-5">
                <a href={service.link}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {service.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {service.description}
                </p>
                <a
                  href={`services/${index}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {service.buttonText}
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
