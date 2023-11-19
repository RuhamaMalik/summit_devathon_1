import { useEffect, useState } from 'react';
import Layout from './../components/Layout';
import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';


const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const getAppointments = async () => {
        try {
            const res = await axios.get('https://project1-devathon.vercel.app/api/v1/user/user-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAppointments();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        // {
        //     title: 'Name',
        //     dataIndex: 'name',
        //     render: (text, record) => (
        //         <span>{record.doctorId.firstName} {record.doctorId.firstName}</span>
        //     )
        // },
        // {
        //     title: 'Phone',
        //     dataIndex: 'phone',
        //     render: (text, record) => (
        //         <span>{record.doctorId.phone}</span>
        //     )
        // },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} &nbsp;
                    {moment(record.time).format('HH:mm')}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status'
        }
    ]

    return (
        <Layout>
            <h1 className='heading'>Appointments</h1>
            <Table columns={columns} dataSource={appointments}>

            </Table>
        </Layout>
    )
}

export default Appointments
