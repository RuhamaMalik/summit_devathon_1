import { useEffect, useState } from 'react'
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';


const AllDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    //login user data
    const getUserData = async () => {
        try {
            const res = await axios.get('/api/v1/user/getAllDoctors', {
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
        getUserData();
    }, []);

    return (
        <Layout>
            <h1 className='heading' style={{paddingTop:'20px'}}>Doctors<span className='fa-solid fa-stethoscope'></span></h1>
            <Row className='docCards'>
                {doctors && doctors.map((doctor) => (
                    <DoctorList doctor={doctor}  key={doctor._id}/>
                ))}
            </Row>
        </Layout>
    )
}

export default AllDoctors
