import React, { useState, useEffect } from "react";

const CountryCard = ({ country }) => {
  return (
    <div
      className="countryCard"
      //   style={{
      //     display: "flex",
      //     flexDirection: "column",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     border: "1px solid black",
      //     borderRadius: "5px",
      //     margin: "10px",
      //     height: "200px",
      //     width: "200px",
      //   }}
    >
      <img
        src={country.png}
        alt={country.common}
        style={{
          paddingTop: 20,
          width: "120px",
          height: "320px",
        }}
      />
      <h3>{country.common}</h3>
    </div>
  );
};
const API_ENDPOINT =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

const Countries = () => {
  const [flagData, setFlagData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetch(API_ENDPOINT);
      const jsonData = await data.json();
      setFlagData(jsonData);
    } catch (error) {
      console.error("Error fetching data:,error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          value={search}
          placeholder="Search for countries"
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value === "") {
              fetchData();
            } else {
              const results = [...flagData].filter((f) =>
                f.common.toLowerCase().includes(e.target.value.toLowerCase())
              );
              setFlagData(results);
            }
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {flagData.map((country) => (
          <CountryCard key={country.common} country={country} />
        ))}
      </div>
    </>
  );
};
export default Countries;
