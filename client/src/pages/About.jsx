import { NavLink } from "react-router-dom"
import Layout from "../components/Layout"
import about from '../images/book.gif'
import blog1 from '../images/blog1.jpg'
import blog2 from '../images/blog2.jpg'

const About = () => {
    return (
        <>
            <Layout>
                <h4 className='heading'><span className='fa fa-info-circle'></span> About </h4>

                <section className="home" id="home">
                    <div className="image">
                        <img src={about} />
                    </div>
                    <div className="content">
                        <h3>we take care of your healthy life.</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium magnam pariatur dicta
                            voluptate! Obcaecati labore eos molestias voluptate quo animi autem, sequi dolorum pariatur
                            minima modi beatae itaque accusantium eaque!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt incidunt, suscipit atque a,
                            quaerat quos minus aperiam! Odit, voluptates, nisi.
                        </p>
                        <NavLink to="/user/doctors" className="mybtn">
                            Book Now <span className="fas fa-chevron-right"></span>
                        </NavLink>
                    </div>


                </section>

                <section className="home" id="home">
                    <div className="content">
                        <h3>we take care of your healthy life.</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium magnam pariatur dicta
                            voluptate! Obcaecati labore eos molestias voluptate quo animi autem, sequi dolorum pariatur
                            minima modi beatae itaque accusantium eaque!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt incidunt, suscipit atque a,
                            quaerat quos minus aperiam! Odit, voluptates, nisi.
                        </p>
                    </div>
                    <div className="image">
                        <img src={blog1} />
                    </div>

                </section>
                <section className="home" id="home">
                    <div className="image">
                        <img src={blog2} />
                    </div>
                    <div className="content">
                        <h3>we take care of your healthy life.</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium magnam pariatur dicta
                            voluptate! Obcaecati labore eos molestias voluptate quo animi autem, sequi dolorum pariatur
                            minima modi beatae itaque accusantium eaque!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt incidunt, suscipit atque a,
                            quaerat quos minus aperiam! Odit, voluptates, nisi.
                        </p>
                        
                    </div>


                </section>


            </Layout>
        </>
    )
}

export default About
