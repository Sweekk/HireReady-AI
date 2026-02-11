import Image from "next/image";
import Link from "next/link";

/* ================= RESOURCE CARD ================= */

export function ResourceCard({ img, info, subinfo, href }) {
  const content = (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-amber-600 transition text-left w-80 h-[420px] p-4">
      <Image
        src={img}
        alt={info || "resource image"}
        width={320}
        height={180}
        className="rounded-md"
      />

      <p className="text-xs text-gray-400 mt-3">VIDEO GUIDE</p>

      <h4 className="font-semibold mt-1 text-lg">{info}</h4>

      <p className="font-medium mt-1 text-sm text-gray-500">
        {subinfo}
      </p>

      <span className="text-blue-600 text-sm mt-2 inline-block">
        Read More →
      </span>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

/* ================= TOOL CARD ================= */

export function ToolCard({ title, sub, button, img, href }) {
  const cardContent = (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-[520px] hover:shadow-md transition">
      <div>
        <h3 className="font-semibold text-gray-800 text-2xl">
          {title}
        </h3>

        <Image
          src={img}
          alt={title || "tool image"}
          width={230}
          height={200}
          className="rounded-md mt-4 mx-auto"
        />

        {sub && (
          <p className="text-xl mt-4 text-gray-500">
            {sub}
          </p>
        )}
      </div>

      {button && (
        <button className="mt-4 rounded-md py-2 text-lg font-semibold bg-amber-400 hover:bg-blue-500 hover:text-amber-100 transition">
          {button}
        </button>
      )}
    </div>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
}
