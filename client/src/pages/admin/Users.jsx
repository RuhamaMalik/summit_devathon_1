import { useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import axios from 'axios';
import { Table, message } from 'antd';

const Users = () => {
    const [users, setUsers] = useState([]);

    // get all users
    const getUsersList = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle account  approved
    const handleUserAccountStatus = async (record) => {

        try {
            const res = await axios.post('/api/v1/admin/changeUserAccountStatus', {
                record
                // userId: record._id , isActivate: record.isActivate
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(`token`)}`
                }
            });

            if (res.data.success) {
                message.success(res.data.message);
                getUsersList();
            }
        } catch (error) {
            message.error('Something wen wrong');
        }
    }

    useEffect(() => {
        getUsersList();
    }, []);


    // antd table columns
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Doctor',
            dataIndex: 'isDoctor',
            render: (text, record) => (
                <span>{record.isDoctor ? "Yes " : "No"}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'isActivate',
            render: (text, record) => (
                <span>{record.isActivate === 'activate' ? "Active " : "Block"}</span>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.isActivate === 'block'?
                        <button className='btn btn-success btns' onClick={() => handleUserAccountStatus(record)}>Activate</button>
                        :
                        <button className='btn btn-danger btns' onClick={() => handleUserAccountStatus(record)}>Block</button>}
                </div>
            )
        }
    ]

    return (
        <Layout>
            <h1>Users List</h1>
            <Table columns={columns} dataSource={users.map(user => ({ ...user, key: user._id }))} />
        </Layout>
    )
}

export default Users
