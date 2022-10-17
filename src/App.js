import { useEffect, useRef, useState } from "react";
import axios from "./axios";
import "./App.css";

const App = () => {
  // useState use to fetch city data and store
  const [data, setData] = useState([]);

  // instead of useState use useRef
  const nameRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();

  useEffect(() => {
    axios
      .get("/user/senzmate/city")
      .then((res) => {
        console.log(res.data.content);
        // setData use to render in web page as a result
        setData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Add city function
  const addCity = (e) => {
    try {
      //Prevet by reloading task
      e.preventDefault();
      axios
        .post("/user/senzmate/city", {
          name: nameRef.current.value,
          coordinate: {
            lat: latRef.current.value,
            lng: lngRef.current.value,
          },
        })
        .then((res) => {
          // Relode the page the function execute
          window.location.reload(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Calling city data from map function and assign city in city variable
  const city = data.map((data, index) => {
    return (
      // index for unique key for data
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.cityId}</td>
        <td>{data.name}</td>
        <td>{data.coordinate.lat}</td>
        <td>{data.coordinate.lng}</td>
        <td>
          <button
            onClick={(e) => {
              //Prevet by reloading task
              e.preventDefault();
              axios
                .delete(`/user/senzmate/city/name/${data.name}`)
                .then((res) => {
                  // Relode the page the function execute
                  window.location.reload(true);
                  console.log(res, "sucess");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <form>
        <h3>Add city</h3>
        <label htmlFor="name">City Name</label>
        <input type="text" ref={nameRef} id="name" />
        <br />
        <label htmlFor="lat">Coordinate(Lan)</label>
        <input type="text" ref={latRef} id="lat" />
        <label htmlFor="lng">Coordinate(Lng)</label>
        <input type="text" ref={lngRef} id="lng" />
        <br />
        <button className="btn" onClick={addCity}>
          Add city
        </button>
      </form>
      <br />
      <table>
        <tr>
          <td>Number</td>
          <td>City Id</td>
          <td>City</td>
          <td>Coordinates (Lat)</td>
          <td>Coordinates (Lng)</td>
          <td>Action</td>
        </tr>
        {/* Call city variable as object for assign each table row */}
        {city}
      </table>
    </div>
  );
};

export default App;
