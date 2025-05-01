const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <h3>{doctor.name}</h3>
      <p>Specialty: {doctor.specialty}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>City: {doctor.city}</p>
      <p>Consultation Fees: ₹{doctor.fees}</p>
    </div>
  );
};

export default DoctorCard;
