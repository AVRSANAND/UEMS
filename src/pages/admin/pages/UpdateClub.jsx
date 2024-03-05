import React , { useContext } from "react";
import myContext from "../../../context/data/myContext";

function UpdateClub() {

  const context = useContext(myContext);
  const {clubs, setClubs, addClub} = context;

  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Update Event
            </h1>
          </div>
          <div>
            <input
              type="text"
              value={clubs.title}
              onChange={(e)=>setClubs({...clubs, title: e.target.value})}
              name="title"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Club title"
            />
          </div>
          
          <div>
            <input
              type="text"
              value={clubs.imageUrl}
              onChange={(e)=>setClubs({...clubs, imageUrl: e.target.value})}
              name="imageUrl"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Club imageUrl"
            />
          </div>
          <div>
            <input
              type="text"
              value={clubs.category}
              onChange={(e)=>setClubs({...clubs, category: e.target.value})}
              name="category"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Club category"
            />
          </div>
  
          <div>
            <textarea
              cols="30"
              rows="10"
              value={clubs.description}
              onChange={(e)=>setClubs({...clubs, description: e.target.value})}
              name="description"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Club Description"
            ></textarea>
          </div>
          <div className=" flex justify-center mb-3">
            <button 
            onClick={addClub}
            className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg">
              Update Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateClub;
