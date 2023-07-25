import { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import "./flights.scss";

//importing icons
import { BiSolidBusSchool, BiSolidPlaneTakeOff } from "react-icons/bi";
import { MdHotel } from "react-icons/md";
import { FlightContext } from "../../context/FormContext";

const optionList = [
  { value: "Kathmandu", label: "kathmandu" },
  { value: "Pokhara", label: "Pokhara" },
  { value: "Bhadrapur", label: "Bhadrapur" },
  { value: "Chitwan", label: "Chitwan" },
  { value: "lukla", label: "lukla" },
];

const optionWayList = [
  {
    value: "One Way",
    label: "One Way",
  },

  {
    value: "Two Way",
    label: "Two Way",
  },
];

const Flight = () => {
  const passengerBoxRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        passengerBoxRef.current &&
        !passengerBoxRef.current.contains(event.target)
      ) {
        setShowPassengerBox(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [showPassengerBox, setShowPassengerBox] = useState(false);
  const [selectedOption, setSelectedOption] = useState("flight");
  const [formError, setFormError] = useState(false);

  // User this code to use forValues in each and every component of your app

  const { onFormValueChange, formValues, clearFormValues } =
    useContext(FlightContext);

  useEffect(() => {
    clearFormValues();
    setFormError(false);
  }, [selectedOption]);

  function handleIncrementAdultCount() {
    onFormValueChange("adultCount", formValues?.adultCount + 1);
  }

  function handleDecrementAdultCount() {
    if (formValues?.adultCount > 0) {
      onFormValueChange("adultCount", formValues?.adultCount - 1);
    }
  }

  function incrementChildCount() {
    onFormValueChange("childCount", formValues?.childCount + 1);
  }

  function decrementChildCount() {
    if (formValues?.childCount > 0) {
      onFormValueChange("childCount", formValues?.childCount - 1);
    }
  }

  function togglePassengerBox() {
    setShowPassengerBox((prevShow) => !prevShow);
  }

  function handleValidation() {
    if (
      !formValues?.fromOption ||
      !formValues?.toOption ||
      !formValues?.depatureDate ||
      !formValues?.tripOption
    ) {
      setFormError(true);
      return;
    } else if (
      formValues?.tripOption === "Two Way" &&
      !formValues?.returnDate
    ) {
      setFormError(true);
      return;
    } else {
      setFormError(false);
      navigate("/plane");
    }
  }

  function busHandleValidation() {
    if (
      !formValues?.fromOption ||
      !formValues?.toOption ||
      !formValues?.depatureDate
    ) {
      setFormError(true);
      return;
    } else {
      setFormError(false);
      navigate("/bus");
    }
  }

  const renderCard = () => {
    if (selectedOption === "flight") {
      return (
        <>
          <div className="flight-card " ref={passengerBoxRef}>
            <div className="main-textarea-div">
              <div className="second-textarea-div">
                <div className="textarea-div">
                  <label htmlFor="">From</label>
                  <Select
                    className={`inputs custom-select ${
                      formError && !formValues?.fromOption ? "error" : ""
                    }`}
                    options={optionList}
                    placeholder="Eg. Kathmandu"
                    onChange={(data) =>
                      onFormValueChange("fromOption", data?.value)
                    }
                    isSearchable={true}
                  />
                  {formError && !formValues?.fromOption && (
                    <p className="error-message">From is required</p>
                  )}
                </div>

                <div className="textarea-div">
                  <label htmlFor="">To</label>
                  <Select
                    className={`inputs custom-select ${
                      formError && !formValues?.toOption ? "error" : ""
                    }`}
                    options={optionList}
                    placeholder="Eg. Kathmandu"
                    onChange={(data) =>
                      onFormValueChange("toOption", data?.value)
                    }
                    isSearchable={true}
                  />{" "}
                  {formError && !formValues?.toOption && (
                    <p className="error-message">To is required</p>
                  )}
                </div>

                <div className="textarea-div">
                  <label htmlFor="">Trip</label>
                  <Select
                    className={`inputs custom-select ${
                      formError ? "error" : ""
                    }`}
                    options={optionWayList}
                    onChange={(data) =>
                      onFormValueChange("tripOption", data?.value)
                    }
                  ></Select>
                  {formError && !formValues?.tripOption && (
                    <p className="error-message">Trip is required</p>
                  )}
                </div>
              </div>
              <div className="second-textarea-div">
                <div className="textarea-div" onClick={togglePassengerBox}>
                  <label htmlFor="">Passenger</label>
                  <input
                    type="text"
                    className="input"
                    placeholder={`${
                      formValues?.adultCount + formValues?.childCount
                    } Passenger - ${formValues?.adultCount} Adult, ${
                      formValues?.childCount
                    } Child`}
                    readOnly
                  />
                  {showPassengerBox && (
                    <div className="passenger-box">
                      <div className="passenger-buttons">
                        <button onClick={handleDecrementAdultCount}>-</button>
                        <span>Adult</span>
                        <button onClick={handleIncrementAdultCount}>+</button>
                      </div>
                      <div className="passenger-buttons">
                        <button onClick={decrementChildCount}>-</button>
                        <span>Child</span>
                        <button onClick={incrementChildCount}>+</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="textarea-div">
                  <label htmlFor="">Depature date</label>
                  <DatePicker
                    className={`date-inputs ${
                      formError && !formValues?.departureDate ? "error" : ""
                    }`}
                    selected={formValues?.depatureDate}
                    value={formValues?.depatureDate}
                    onChange={(date) => onFormValueChange("depatureDate", date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    minDate={new Date()}
                  />
                  {formError && !formValues?.depatureDate && (
                    <p className="error-message">Departure date is required</p>
                  )}
                </div>

                <div className="textarea-div">
                  <label htmlFor="">Return Date</label>
                  <DatePicker
                    className="date-inputs"
                    selected={formValues?.returnDate}
                    value={formValues?.returnDate}
                    onChange={(date) => onFormValueChange("returnDate", date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    disabled={
                      !formValues?.depatureDate ||
                      formValues?.tripOption === "One Way"
                    }
                    minDate={formValues?.departureDate}
                  />
                  {formError &&
                    formValues?.selectTripOption === "Two Way" &&
                    !returnDate && (
                      <p className="error-message">Return date is required</p>
                    )}
                </div>
              </div>
            </div>
            <div className="btn">
              <button onClick={() => handleValidation()}>Search</button>
            </div>
          </div>
        </>
      );
    } else if (selectedOption === "bus") {
      return (
        <div className="bus-card">
          <div className="top-div">
            <div className="second-textarea-div">
              <div className="textarea-div">
                <label htmlFor="">From</label>
                <Select
                  className={`inputs custom-select ${
                    formError && !formValues?.fromOption ? "error" : ""
                  }`}
                  options={optionList}
                  placeholder="Eg. Kathmandu"
                  onChange={(data) =>
                    onFormValueChange("fromOption", data?.value)
                  }
                  isSearchable={true}
                />
                {formError && !formValues?.fromOption && (
                  <p className="error-message">From is required</p>
                )}
              </div>
            </div>
            <div className="second-textarea-div">
              <div className="textarea-div">
                <label htmlFor="">To</label>
                <Select
                  className="inputs"
                  options={optionList}
                  placeholder="Eg. Kathmandu"
                  onChange={(data) =>
                    onFormValueChange("toOption", data?.value)
                  }
                  isSearchable={true}
                />{" "}
                {formError && !formValues?.toOption && (
                  <p className="error-message">To is required</p>
                )}
              </div>
            </div>

            <div className="second-textarea-div">
              <div className="textarea-div">
                <label htmlFor="">Depature date</label>
                <DatePicker
                  className={`date-inputs ${
                    formError && !formValues?.depatureDate ? "error" : ""
                  }`}
                  selected={formValues?.depatureDate}
                  value={formValues?.depatureDate}
                  onChange={(date) => onFormValueChange("depatureDate", date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                  minDate={new Date()}
                />
                {formError && !formValues?.depatureDate && (
                  <p className="error-message">Departure date is required</p>
                )}
              </div>
            </div>
          </div>
          <div className="bus-btn">
            <button className="bus-button" onClick={busHandleValidation}>
              Search
            </button>
          </div>
        </div>
      );
    } else if (selectedOption === "hotel") {
      return (
        <div className="hotel-card">
          <a href="https://www.booking.com/index.html?aid=2305933">
            {" "}
            Click here to select Hotel
          </a>
        </div>
      );
    }
  };
  return (
    <div className="main-card container" style={{ marginTop: "200px" }}>
      <div className="Card">
        <div className="option-select">
          <p>
            <Link
              onClick={() => setSelectedOption("flight")}
              className={selectedOption === "flight" ? "active" : ""}
            >
              <BiSolidPlaneTakeOff className="icon" />
              Flight
              <div className="underline">
                <span></span>
              </div>
            </Link>
          </p>
          <hr />
          <p>
            <Link
              onClick={() => setSelectedOption("bus")}
              className={selectedOption === "bus" ? "active" : ""}
            >
              <BiSolidBusSchool className="icon" />
              Bus
              <div className="underline">
                <span></span>
              </div>
            </Link>
          </p>
          <hr />
          <p>
            <Link
              onClick={() => setSelectedOption("hotel")}
              className={selectedOption === "hotel" ? "active" : ""}
            >
              <MdHotel className="icon" />
              Hotel
              <div className="underline">
                <span></span>
              </div>
            </Link>
          </p>
        </div>
        {renderCard()}
      </div>
    </div>
  );
};

export default Flight;
