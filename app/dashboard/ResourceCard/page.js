import Link from "next/link";
export function ResourceCard(props) {
  return (
    <button className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md w-85 hover:border-amber-600 h-xl transition text-left">
      <div  />
      <div className="p-4">
        <img src={props.img}></img>
        <p className="text-xs text-gray-400">VIDEO GUIDE</p>
        <h4 className="font-semibold mt-1 text-lg ">
         {props.info}
        </h4>
        <h4 className="font-medium mt-1 text-sm text-gray-500">
         {props.subinfo}
        </h4>
        <span className="text-blue-600 text-sm mt-2 inline-block">
          Read More →
        </span>
      </div>
    </button>
  );
}

export function ToolCard({ title,sub,button,img}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-xl">
      <div>
        <h3 className="font-semibold text-gray-800 text-2xl ">{title}</h3>
        <img src={img}></img>
        <p className="text-xl mt-8 text-gray-500 mt-2">
        {sub}
        </p>
      </div>

      <button className="mt-4 rounded-md py-2 text-lg hover:bg-blue-500 hover:text-amber-100 font-semibold bg-amber-400">
       {button}
      </button>
    </div>
  );
}
