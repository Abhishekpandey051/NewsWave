import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard';
import './style.css'
function Body() {
  const [newsData,setNewsData] = useState([]);
  const[filter,setFilter] = useState("")
  useEffect(()=>{
    fetchData()
  },[filter])
  const fetchData = async() =>{
    try{
      const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${filter}&category=business&apiKey=98bc04c221544296a772c02a9ebb1213`);
      const response = await data.json();
      console.log(response);
      setNewsData(response.articles)
    }catch(err){
      console.log("error found");
    }
  }
  return (
    <>
    <div className='flex mt-8'>
    <button onClick={()=>{setFilter("in")}} className='bg-gray-300 p-2 ml-8  border mr-2 w-full'>India</button>
    <button onClick={()=>{setFilter("us")}} className='bg-gray-300 p-2   border w-full mr-2'>US</button>
    <button onClick={()=>{setFilter("gb")}} className='bg-gray-300 p-2  border mr-2 w-full'>United Kingdom</button>
    <button onClick={()=>{setFilter("au")}} className='bg-gray-300 p-2  border w-full'>Australia</button>
    <button onClick={()=>{setFilter("ca")}} className='bg-gray-300 p-2 border mr-2 w-full'>Canada</button>
    <button onClick={()=>{setFilter("cn")}} className='bg-gray-300 p-2  border w-full mr-2'>China</button>
    <button onClick={()=>{setFilter("rs")}} className='bg-gray-300 p-2  border w-full mr-2'>Rusia</button>
    </div>
    <div className='card'>
    
   {
    newsData.map((val,id)=>
      (
        <NewsCard key={id} val = {val}/>
      )
    )
   
   }
   
    </div>
    </>
  )
}

export default Body
