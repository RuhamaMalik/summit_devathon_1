import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Home.css';
import homeImg from '../images/home.gif'
const Home = () => {
  return (
    <>
      <Layout>
      <h4 className='heading'><span className='fas fa-heartbeat'></span> Carezone </h4>

        <section className="home" id="home">
          <div className="image">
            <img src={homeImg} alt='home image' />
            {/* <img src="https://i.pinimg.com/originals/b8/23/e3/b823e38cc01fdb9278b6f7faa2feda6d.gif" alt='home image' /> */}
          </div>
          <div className="content">
            <h3>stay safe, stay healthy</h3>
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. rern sed autrn vero? magnam est </p>
            <NavLink to="/user/doctors" className="mybtn">Book now<span className="fas fa-chevron-right" ></span></NavLink>
          </div>
        </section>


        {/* ////////icons  */}
        <section className="icons-container">

          <div className="icons">
            <i className="fas fa-user-md"></i>
            <h3>140+</h3>
            <p>doctors at work</p>
          </div>

          <div className="icons">
            <i className="fas fa-users"></i>
            <h3>1040+</h3>
            <p>satisfied patients</p>
          </div>

          <div className="icons">
            <i className="fas fa-procedures"></i>
            <h3>500+</h3>
            <p>bad facility</p>
          </div>

          <div className="icons">
            <i className="fas fa-hospital"></i>
            <h3>80+</h3>
            <p>available hospitals</p>
          </div>

        </section>
      </Layout>
    </>
  )
}

export default Home
