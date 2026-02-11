
import Image from "next/image";
import Link from "next/link";

export function ResourceCard({ img, info, subinfo }) {
  return (
    <button className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-amber-600 transition text-left w-80 h-[420px]">
      <div className="p-4">
        <img
          src={img}
          alt="resource image"
          width={320}
          height={180}
          className="rounded-md"
        />

        <p className="text-xs text-gray-400 mt-3">VIDEO GUIDE</p>

        <h4 className="font-semibold mt-1 text-lg">
          {info}
        </h4>

        <h4 className="font-medium mt-1 text-sm text-gray-500">
          {subinfo}
        </h4>

        <span className="text-blue-600 text-sm mt-2 inline-block">
          Read More →
        </span>
      </div>
    </button>
  );
}

export function ToolCard({ title, sub, button, img ,href}) {
  return (
    <Link href={href}>
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-[520px]">
      <div>
        <h3 className="font-semibold text-gray-800 text-2xl">
          {title}
        </h3>

        <img
          src={img}
          alt="tool image"
          width={230}
          height={200}
          className="rounded-md mt-4 ml-12"
        />

        <p className="text-xl mt-4 text-gray-500">
          {sub}
        </p>
      </div>

      <button className="mt-4 rounded-md py-2 text-lg font-semibold bg-amber-400 hover:bg-blue-500 hover:text-amber-100 transition">
        {button}
      </button>
    </div>
    </Link>
  );
}

