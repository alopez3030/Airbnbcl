import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";


export default function BookingPage(){
  const {id} = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if(id){
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking){
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking){
    return '';
  }
  return(
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
        <h2 className="text-xl mb-4">Your Booking Information:</h2>
       <BookingDates booking={booking} />
      </div>
      <div className="bg-primary p-6 text-white rounded-2xl">
       <div>Total price:</div>
        <div className="text-3xl">${booking.price}</div>
      </div>
      </div>
      <PlaceGallery place={booking.place} />
      <div className="my-6 bg-gray-100 rounded-2xl -mx-2 px-8 pt-8">
      <h2 className="font-semibold text-2xl">Description</h2>
        {booking.place.description}
        <div>
          Check-in: {booking.place.checkIn}<br />
          Check-out: {booking.place.checkOut}<br />
          Max number of guests: {booking.place.maxGuests}
        </div>
          </div>
          </div>
  );
}
