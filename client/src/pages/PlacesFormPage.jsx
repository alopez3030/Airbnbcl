import axios from "axios";
import PhotosUploader from "../PhotosUploader"
import Perks from "../Perks"
import { useState } from "react";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function PlacesFormPage(){
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress]= useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks]= useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckInTime]= useState('');
  const [checkOut, setCheckOutTime]= useState('');
  const [maxGuests, setMaxGuests]= useState(1);
  const [price,setPrice]= useState(100);
  const [redirect, setRedirect]= useState(false);
  useEffect(()=> {
    if(!id){
      return;
  }
  axios.get('/places/'+id).then(response => {
    const {data} = response;
    setTitle(data.title);
    setAddress(data.address);
    setAddedPhotos(data.photos);
    setDescription(data.description);
    setPerks(data.perks);
    setExtraInfo(data.extraInfo);
    setCheckInTime(data.checkIn);
    setCheckOutTime(data.checkOut);
    setMaxGuests(data.maxGuests);
    setPrice(data.price);
  })
  }, [id]);
function inputHeader(text){
    return(
      <h2 className="text-2xl mt-4">{text}</h2>
    );
   }
   function inputDescription(text){
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
   }
   function preInput(header,description){
  return(
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>

  );
  }
  async function savePlace(ev){
    const placeData = {title, address, addedPhotos,
    description, perks, extraInfo,
    checkIn, checkOut, maxGuests, price
  };
    ev.preventDefault();
    if (id){
      //update
    await axios.put('/places',{
        id, ...placeData
      });
      setRedirect(true);
    } else{
      //newplace
      await axios.post('/places', placeData);
      setRedirect(true);
    }
    }

  if (redirect){
  return <Navigate to={'/account/places'}/>
}

return(
<div>
  <AccountNav/>
    <form onSubmit={savePlace}>
    {preInput('Title', 'Title for your place should be short and direct')}
      <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, Example: My Appartment"></input>
      {preInput('Address', 'Address to property')}
      <input type="text" value={address}
      onChange={ev => setAddress(ev.target.value)}
      placeholder="address" />
      {preInput('Photos', 'More the better')}
    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
     {preInput('Description', 'Property description')}
    <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
    {preInput('Perks', 'Select perks')}
      <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
   <Perks selected={perks} onChange={setPerks} />
      </div>
      {preInput('Additional info', 'add check in and check out times, remember to leave enough time for room cleaning')}
      <textarea value={extraInfo}
      onChange={ev => setExtraInfo(ev.target.value)}/>
      {preInput('Check in & Check out', 'house rules, etc')}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="mt-2 -mb-1">Check-in time</h3>
          <input type="text" value={checkIn}
             onChange={ev => setCheckInTime(ev.target.value)}
             placeholder="2"/>
        </div>
        <div>
        <h3 className="mt-2 -mb-1"> Check-out time</h3>
          <input type="text" value={checkOut}
              onChange={ev => setCheckOutTime(ev.target.value)}
              placeholder="11"/>
          </div>
        <div>
        <h3 className="mt-2 -mb-1">Max number of guests</h3>
          <input type="number" value={maxGuests}
              onChange={ev => setMaxGuests(ev.target.value)}/>
          </div>
          <div>
        <h3 className="mt-2 -mb-1">Price per night</h3>
          <input type="number" value={price}
              onChange={ev => setPrice(ev.target.value)}/>
          </div>
      </div>
      <div>
       <button className="primary my-4">Save</button>
      </div>
      </form>
   </div>
)};
