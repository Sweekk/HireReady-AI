import React from "react";

const ArticleCard = ({ imageSrc, imageAlt, title, description }) => {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <div className="w-full">
        <img
          src={imageSrc}
          alt={imageAlt || title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="mt-2 text-xl font-semibold text-gray-900 leading-snug">
          {title}
        </h3>

        <p className="mt-2 text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
