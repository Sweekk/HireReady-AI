import React from "react";

const ResumeCompLRight = ({
  title,
  subtitle,
  description,
  features = [],
  buttonText,
  imageSrc,
  imageAlt
}) => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       

        <div>
          <p className="text-sm italic text-gray-500 mb-2">
            {subtitle}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            {title}
          </h1>

          <p className="mt-4 text-gray-600">
            {description}
          </p>

          <div className="mt-6 space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-green-600">✔</span>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>

          <button className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition">
            {buttonText}
          </button>
        </div>

        
         <div className="flex justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default ResumeCompLRight;
