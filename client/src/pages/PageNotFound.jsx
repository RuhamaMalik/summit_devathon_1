import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout';

const PageNotFound = () => {
  return (
    <Layout >
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <NavLink to="/" className="pnf-btn">
          Go Back
        </NavLink>
      </div>
    </Layout>
  )
}

export default PageNotFound
