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
  const [error, setError] = useState("");

  const fetchDoctors = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/doctors/list-doctor-with-filter`,
        {
          params: filters,
        }
      );
      setDoctors(response.data.doctors);
      setTotalDoctors(response.data.total);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctor data. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      page: newFilters.page ?? 1,
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
      </Head>

      <header>
        <h1>Find a General Physician</h1>
      </header>

      <Filters onChange={handleFiltersChange} filters={filters} />

      <div className="doctor-list">
        {loading ? (
          <p>Loading doctors...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : doctors.length === 0 ? (
          <p>No doctors found matching your filters.</p>
        ) : (
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        )}
      </div>

      {doctors.length > 0 && (
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
            Page {filters.page} of{" "}
            {Math.ceil(totalDoctors / filters.limit) || 1}
          </span>
          <button
            onClick={() => handleFiltersChange({ page: filters.page + 1 })}
            disabled={filters.page * filters.limit >= totalDoctors}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationPage;
