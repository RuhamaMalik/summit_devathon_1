import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { Tabs, message } from 'antd';
import { hideLoading, showLoading } from '../store/slices/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';

const Notifications = () => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // read all notifications
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('api/v1/user/all-notifications',
                { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            dispatch(hideLoading());

            if (res.data.success) {
                message.success(res.data.message);
                // console.log(res.data.data.updatedUser)
                const updatedUser = res.data.data.updatedUser;
                dispatch(setUser(updatedUser))
                
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    }

    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/delete-notifications', {
                userId: user._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());

            if (res.data.success) {
                message.success(res.data.message);
                const updatedUser = res.data.data.updatedUser;
                dispatch(setUser(updatedUser))

            } else {
                message.error(res.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong in delete Notifications");
        }
    }

    return (
        <Layout>
            <h4 className='heading'>Notifications <i className='fa-solid fa-bell'></i></h4>
            <Tabs>
                <Tabs.TabPane key="unread" tab="unread">
                    <div className="d-flex justify-content-end">
                        <h4 className='p-2 text-primary' style={{ cursor: 'pointer' }} onClick={handleMarkAllRead}>
                            Mark All Read
                        </h4>
                    </div>
                    {
                        user?.notification.map((notificationMsg, index) => (
                            <div key={index} className="card m-2" style={{ cursor: 'pointer' }} onClick={() => navigate(notificationMsg.onClickPath)}>
                                <div className="card-text p-4">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>

                <Tabs.TabPane key="read" tab="Read">
                    <div className="d-flex justify-content-end">
                        <h4 className='p-2 text-primary' style={{ cursor: 'pointer' }} onClick={handleDeleteAllRead}>
                            Delete All Read
                        </h4>
                    </div>
                    {
                        user?.seennotification.map((notificationMsg, index) => (
                            <div key={index} className="card m-2" style={{ cursor: 'pointer' }} onClick={() => navigate(notificationMsg.onClickPath)}>
                                <div className="card-text p-4">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
}

export default Notifications;
