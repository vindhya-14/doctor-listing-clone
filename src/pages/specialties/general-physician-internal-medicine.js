import { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "@/components/DoctorCard";
import Filters from "@/components/Filters";
import Head from "next/head";

const DestinationPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    feesMin: 0,
    feesMax: 1000,
    page: 1,
    limit: 10,
  });
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch doctor data from backend
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctors/list-doctor-with-filter`,
        {
          params: filters,
        }
      );
      setDoctors(response.data.doctors);
      setTotalDoctors(response.data.total);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
    setLoading(false);
  };

  // Effect to fetch doctors on page load and whenever filters change
  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  // Handle changes in filters
  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <div>
      <Head>
        <title>General Physician - Apollo247</title>
        <meta
          name="description"
          content="Find experienced general physicians in your city. Book appointments for internal medicine consultation."
        />
        <meta name="robots" content="index, follow" />
        {/* Add more SEO meta tags as needed */}
      </Head>

      <header>
        <h1>Find a General Physician</h1>
      </header>

      {/* Filters Section */}
      <Filters onChange={handleFiltersChange} filters={filters} />

      {/* Doctors List */}
      <div className="doctor-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() =>
            handleFiltersChange({ page: Math.max(filters.page - 1, 1) })
          }
          disabled={filters.page <= 1}
        >
          Previous
        </button>
        <span>
          Page {filters.page} of {Math.ceil(totalDoctors / filters.limit)}
        </span>
        <button
          onClick={() => handleFiltersChange({ page: filters.page + 1 })}
          disabled={filters.page * filters.limit >= totalDoctors}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DestinationPage;
