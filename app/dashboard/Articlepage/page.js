import ArticleCard from "./Article";
import { articleData } from "../data/articledata";

export default function ArticleSection() {
  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          The Inside Track: Career Tips & Trends
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articleData.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>

      </div>
    </section>
  );
}

