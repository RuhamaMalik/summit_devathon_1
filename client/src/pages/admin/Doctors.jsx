import { useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import axios from 'axios';
import { Table, message } from 'antd';


const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  // get all doctors
  const getDoctorsList = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setDoctors(res.data.data);

      }
    } catch (error) {
      console.log(error)
    }
  }

  // handle account  approved
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post('/api/v1/admin/changeAccountStatus', {
        doctorId: record._id, userId: record.userId, status: status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`
        }
      });

      if (res.data.success) {
        message.success(res.data.message);
        getDoctorsList()
      }
    } catch (error) {
      message.error('Something wen wrong');
    }
  }
  useEffect(() => {
    getDoctorsList();
  }, []);


  // antd table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },

    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' || record.status === 'reject' ?
            <button className='btn btn-success btns' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button>
            :
            <button className='btn btn-danger btns' onClick={() => handleAccountStatus(record, 'reject')}>Reject</button>}
        </div>)
    },
  ]

  return (
    <Layout>
      <h1>Doctors List</h1>
      <Table columns={columns} dataSource={doctors.map(doctor => ({ ...doctor, key: doctor._id }))} />
    </Layout>
  )
}

export default Doctors
