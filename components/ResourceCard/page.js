export function ResourceCard({ img, info, subinfo }) {
  return (
    <button className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition text-left">
      <div className="p-4">
        <img src={img} alt="" />
        <p className="text-xs text-gray-400">VIDEO GUIDE</p>
        <h4 className="font-semibold mt-1 text-lg">{info}</h4>
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

export function ToolCard({ title, sub, button, img }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-gray-800 text-2xl">{title}</h3>
        <img src={img} alt="" />
        <p className="text-lg mt-2 text-gray-500">{sub}</p>
      </div>

      <button className="mt-4 rounded-md py-2 text-lg bg-amber-400 hover:bg-blue-500 hover:text-white font-semibold">
        {button}
      </button>
    </div>
  );
}
