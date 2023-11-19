
import { useEffect, useState } from 'react';
import Layout from './../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../store/slices/alertSlice';
import bookImg from '../images/doctor.gif'

const BookingPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [isAppointmentAvailable, setIsAppointmentAvailable] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)

    //fetch single doctor data
    const getDoctorById = async () => {
        try {
            const res = await axios.post('https://project1-devathon.vercel.app/api/v1/doctor/getDoctorById',
                {
                    doctorId: params.doctorId
                }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctorById();
    }, []);


    // CHECK APPOINTMENT AVAILABILITY

    const handleAvailability = async () => {
        try {
           
            if (!date || !time) {
                alert('Date & Time Required');
                setIsAppointmentAvailable(true);
            }

            // Convert moment objects to JavaScript Date objects
            const dateAsDate = date.toDate();
            const timeAsDate = time.toDate();
            const formattedDate = moment(dateAsDate).format('DD-MM-YYYY');
            const formattedTime = moment(timeAsDate).format('HH:mm');

            const res = await axios.post('https://project1-devathon.vercel.app/api/v1/user/booking-availability', {
                doctorId: params.doctorId,
                date: formattedDate,
                time: formattedTime,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });


            if (res.data.success) {
                message.success(res.data.message);
                setIsAppointmentAvailable(true);
            } else {
                message.error(res.data.message);
                setIsAppointmentAvailable(false);
            }
        } catch (error) {
            console.log(error);
            setIsAppointmentAvailable(false);
        }

    };


    // Book Appointment Function
    const handleBooking = async () => {
        try {
            if (!date || !time) {
                return alert('Date & Time Required');
            }
            // Convert moment objects to JavaScript Date objects
            const dateAsDate = date.toDate();
            const timeAsDate = time.toDate();
            const formattedDate = moment(dateAsDate).format('DD-MM-YYYY');
            const formattedTime = moment(timeAsDate).format('HH:mm');

            // console.log('Selected Date:', formattedDate);
            // console.log('Selected Time:', formattedTime);

            dispatch(showLoading());
            const res = await axios.post(
                'https://project1-devathon.vercel.app/api/v1/user/book-appointment',
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctors,
                    date: formattedDate,
                    userInfo: user,
                    time: formattedTime,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);

            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };


    return (
        <Layout>
            <h3 className="heading">Booking <span>Page</span></h3>
            <div className="book">
                <div className="image">
                    <img src={bookImg} />
                    {/* <img src={bookImg} /> */}
                </div>
                <div className="content " style={{ boxShadow: '0 0 2px gray' }}>
                    <h1>
                        <span>BOOK</span> NOW
                    </h1>
                    {doctors && (
                        <div>
                            <h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
                            <h4>Fees : {doctors.feesPerConsultation}</h4>
                            <h4>Timings : {doctors && doctors.timings && doctors.timings.length >= 2 ? `${doctors.timings[0]} - ${doctors.timings[1]}` : 'Not available'}</h4>

                            <div className="d-flex flex-column ">
                                <DatePicker
                                    className='m-2 p-2'
                                    format='DD-MM-YYYY'
                                    onChange={(value) => {

                                        setDate(value);
                                        // setDate(moment(value).format('DD-MM-YYYY'));
                                    }}
                                />

                                <TimePicker
                                    className='m-2 p-2'
                                    format='HH:mm'
                                    onChange={(value) => {

                                        setTime(value);
                                        // setTime(moment(value).format('HH:mm')); 
                                    }}
                                />
                                {/* {console.log(isAppointmentAvailable)} */}
                                <button className='btn btn-primary mt-2 p-3' onClick={handleAvailability}>
                                    Check Availability
                                </button>

                                {isAppointmentAvailable && (
                                    <button className='btn btn-dark mt-2 p-3' onClick={handleBooking}>
                                        Book Now
                                    </button>
                                )}


                            </div>
                        </div>
                    )}
                </div>


                {/* <h4>Timings : {doctors.timings[0]} - {doctors.timings[1]}</h4> */}

            </div>
        </Layout>
    )
}

export default BookingPage
