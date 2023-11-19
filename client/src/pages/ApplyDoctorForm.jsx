import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, Select, TimePicker, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from '../store/slices/alertSlice';
import axios from 'axios';
import moment from "moment";
import { Option } from "antd/es/mentions";

const ApplyDoctorForm = () => {
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handle form
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            // Extract and format the time values
            const formattedTimings = [
                values.timings[0].format('HH:mm'),
                values.timings[1].format('HH:mm')
            ];
            const res = await axios.post('https://project1-devathon.vercel.app/api/v1/user/apply-doctor', {
                ...values,
                userId: user._id,
                timings: formattedTimings
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            dispatch(hideLoading());

            if (res.data.success) {
                message.success(res.data.message)
                navigate('/');
            } else {
                message.error(res.data.message)

            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something Went Wrong');
        }
    }
    return (
        <Layout>
            <h1 className="heading">Apply Doctor</h1>

            <Form layout="vertical" onFinish={handleFinish} className="m-3">
                <h4 >Personal Details:</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                            <Input className="p-3" type="text" placeholder="Your name ..." />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                            <Input className="p-3" type="text" placeholder="Your last name ..." />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone No" name="phone" required rules={[{ required: true }]}>
                            <Input className="p-3" type="text" placeholder="Your contact no ..." />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                            <Input className="p-3" type="email" placeholder="Your email address ..." />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Gender" name="gender" required rules={[{ required: true }]}>
                            <Select placeholder="Select gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                               
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website" >
                            <Input className="p-3" type="text" placeholder="Your website" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                            <Input className="p-3" type="text" placeholder="Your clinic address" />
                        </Form.Item>
                    </Col>
                </Row>

                <h4 >Professional Details:</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                            <Input className="p-2" type="text" placeholder="Your specialization" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                            <Input className="p-2" type="text" placeholder="Your experience" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Fees Per Consultation" name="feesPerConsultation" required rules={[{ required: true }]}>
                            <Input className="p-2" type="number" placeholder="Your consultation fees" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Timings" name="timings" required>
                            <TimePicker.RangePicker format="HH:mm" className="p-2" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button type="submit" className="btn btn-primary form-btn ">Submit</button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}

export default ApplyDoctorForm
