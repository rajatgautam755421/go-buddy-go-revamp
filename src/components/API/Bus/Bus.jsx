import { useNavigate } from 'react-router-dom';
import './bus.scss';

import { BsCircleFill } from "react-icons/bs";

//Data for bus

const BusData = [
  {
    id: 1,
    busName: "Metro Deluxe",
    busType: "Deluxe",
    from: "jhapa",
    to: "Kathmandu",
    seatAvailable: 18,
    totalSeat: 37,
    leavingTime: "3:30 PM",
    duration: "10 hr",
    shift: "Night",
    cash: "Non- Refundable",
    price: 1555,
  },
  {
    id: 2,
    busName: "Bullet Deluxe",
    busType: "Deluxe",
    from: "jhapa",
    to: "Kathmandu",
    seatAvailable: 25,
    totalSeat: 37,
    leavingTime: "5:30 PM",
    duration: "12 hr",
    shift: "Day",
    cash: "Refundable",
    price: 1765,
  },

  {
    id: 3,
    busName: "Danfe Deluxe",
    busType: "AC",
    from: "jhapa",
    to: "Kathmandu",
    seatAvailable: 22,
    totalSeat: 37,
    leavingTime: "5:30 PM",
    duration: "10 hr",
    shift: "Night",
    cash: "Refundable",
    price: 1835,
  },

  {
    id: 4,
    busName: "Vikings 222",
    busType: "Deluxe",
    from: "jhapa",
    to: "Kathmandu",
    seatAvailable: 10,
    totalSeat: 40,
    leavingTime: "6:30 AM",
    duration: "12 hr",
    shift: "Day",
    cash: "Non- Refundable",
    price: 1500,
  },

  {
    id: 5,
    busName: "Metro Deluxe",
    busType: "Deluxe",
    from: "kathmandu",
    to: "Kathmandu",
    seatAvailable: 18,
    totalSeat: 37,
    leavingTime: "3:30 PM",
    duration: "10 hr",
    shift: "Night",
    cash: "Non- Refundable",
    price: 1555,
  },

  {
    id: 6,
    busName: "Metro Deluxe",
    busType: "Deluxe",
    from: "kathmandu",
    to: "Kathmandu",
    seatAvailable: 18,
    totalSeat: 37,
    leavingTime: "3:30 PM",
    duration: "10 hr",
    shift: "Night",
    cash: "Non- Refundable",
    price: 1555,
  },

  {
    id: 7,
    busName: "Metro Deluxe",
    busType: "Deluxe",
    from: "kathmandu",
    to: "Kathmandu",
    seatAvailable: 18,
    totalSeat: 37,
    leavingTime: "3:30 PM",
    duration: "10 hr",
    shift: "Night",
    cash: "Non- Refundable",
    price: 1555,
  },
];

const Bus = () => {
  const navigate= useNavigate();

  function handleBooking (){
    navigate("/busbooking")
  }
  return (
    <div className="bus">
      {
        BusData.map((item)=>{
          return (
            <>
              <div className="bus-details-card" id="item.id">
                <div className="first-details">
                  <div className="bus-name">
                    <h3>{item.busName}</h3>
                    <p>{item.cash}</p>
                  </div>
                  <div className="passenger-details">
                    <p className="passenger">Passenger Details</p>
                    <p className="deluxe">{item.busType}</p>
                  </div>
                  <div className="seat-details">
                    <div className="icon-text">
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                      />
                      <p>
                        {item.from} <p>{item.to}</p>
                      </p>
                    </div>
                    <div className="seat-num">
                      <p>{item.seatAvailable} seat available</p>
                      <div className="progress">
                        <div className="progress-bar"></div>
                      </div>
                      <p>{item.totalSeat} Total Seat</p>
                    </div>
                  </div>
                </div>
                <div className="second-details">
                  <div className="left-details">
                    <div className="top-div">
                      <div className="time-div">
                        <p>Time:</p>
                        <p>{item.leavingTime}</p>
                      </div>
                      <div className="journey-div">
                        <p>Journey hour:</p>
                        <p>{item.duration}</p>
                      </div>
                      <div className="shift-div">
                        <p>Shift:</p>
                        <p>{item.shift}</p>
                      </div>
                    </div>
                    <div className="bottom-div">
                      <p>Amenities</p>
                      <div className="icon-amenities">
                        <p>
                          <BsCircleFill className="icon" />
                          Water
                        </p>
                        <p>
                          <BsCircleFill className="icon" />
                          Music
                        </p>
                        <p>
                          <BsCircleFill className="icon" />
                          Fan
                        </p>
                        <p>
                          <BsCircleFill className="icon" />
                          AC
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="right-details">
                    <h3>NPR {item.price}</h3>
                    <button onClick={handleBooking}>Book</button>
                  </div>
                </div>
              </div>
            </>
          );
        })
      }
      
    </div>
  );
};

export default Bus;
