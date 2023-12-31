import { useState } from "react";

export default function PlaceGallery({place}){

const[showAllPhotos,setShowAllPhotos] = useState(false);

if(showAllPhotos){
    return (
<div className="absolute inset-0 bg-black text-white min-h-screen">
  <div className="flex bg-black p-8 grid gap-4">
  <div>
  <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
    <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clipRule="evenodd" />
    </svg>
    Close photos</button>
  </div>
  {place?.photos?.length > 0 && place.photos.map(photo => (
    <div>
      <img src={'http://localhost:4000/uploads/'+photo} alt="" />
    </div>
  ))}
</div>
</div>
  );
  }
  return(
    <div className="relative">
    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
    <div>
      {place.photos?.[0] && (
      <div>
        <img onClick={()=> setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[0]} alt=""/>
      </div>
      )}
    </div>
    <div className="grid ">
    {place.photos?.[1] && (
        <img onClick={()=>setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[1]} alt=""/>
      )}
       <div className="overflow-hidden">
       {place.photos?.[2] && (
       <img onClick={()=>setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]} alt=""/>
      )}
    </div>
    </div>
   </div>
   <button onClick={()=> setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-8 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
  </svg>
  Show more photos</button>
  </div>
  );
}
