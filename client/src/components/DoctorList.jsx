import { useNavigate } from 'react-router-dom';
import maleDoc from '../images/man-doc.png';
import feMaleDoc from '../images/female-doc.png';
const DoctorList = ({ doctor}) => {
    const navigate = useNavigate();
    return (
        <>

            <div className="card myCard"  onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`)}>
                <div className="imgHead">
                    <div className="img">
                        <img className='doctorLogo' src={doctor.gender === 'male' ? maleDoc : feMaleDoc} alt="doctor logo" />
                    </div>
                </div>
                <div className="card-body">
                <h4> Dr. {doctor.firstName} {doctor.lastName}</h4>

                    <p>
                        <b>Specialization</b> {doctor.specialization}
                    </p>
                    <p>
                        <b>Experience</b> {doctor.experience}
                    </p>
                    <p>
                        <b>Fees Per Consultation</b> {doctor.feesPerConsultation}
                    </p>
                    <p>
                        <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
                    </p>
                </div>
            </div>

        </>
    )
}

export default DoctorList
