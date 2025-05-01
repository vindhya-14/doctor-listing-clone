import React from "react";

const Filters = ({ onChange, filters }) => {
  const handleCityChange = (e) => {
    onChange({ city: e.target.value });
  };

  const handleFeesChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="filters">
      <label>City</label>
      <input
        type="text"
        value={filters.city}
        onChange={handleCityChange}
        placeholder="Enter city"
      />

      <label>Min Fees</label>
      <input
        type="number"
        name="feesMin"
        value={filters.feesMin}
        onChange={handleFeesChange}
        placeholder="Min Fees"
      />

      <label>Max Fees</label>
      <input
        type="number"
        name="feesMax"
        value={filters.feesMax}
        onChange={handleFeesChange}
        placeholder="Max Fees"
      />
    </div>
  );
};

export default Filters;
