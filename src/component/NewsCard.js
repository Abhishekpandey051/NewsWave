import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({val}) =>{
return(
    <>
    <div className="bg-white ">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div className="mb-10 md:mb-16">
         </div>

    <div className="">
      <a href="k" className="group relative flex h-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 xl:h-96">
        <img src={val.urlToImage} alt="pic" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent md:via-transparent text-red-900">{val.source.name}</div>

        <div className="relative mt-auto p-4">
          <span className="block text-sm text-gray-200">July 19, 2021</span>
          <h2 className="mb-2 text-xl font-semibold text-white transition duration-100">{val.title}</h2>

          <Link to={val.url} target="/"> <span className="font-semibold text-indigo-300">Read more</span></Link>
        </div>
      </a>
     
    </div>
  </div>
</div>
    </>
)
}

export default NewsCard