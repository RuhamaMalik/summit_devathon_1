import { useSelector } from "react-redux"
import Layout from "../components/Layout"

const UserProfile = () => {
    const { user } = useSelector(state => state.user);

    return (
        <Layout>
            <h1 className="heading"> User <span>Profile</span></h1>

            <div className="text-center">
                <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://toppng.com/public/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png" />
                <h4 className="heading" style={{ fontSize: '3em' }}>{user?.name}</h4>
                <h3 >{user?.email}</h3>
                {!user?.isDoctor && !user?.isAdmin && (<h5 className="text-success"> Doctor Account Request Pending</h5>) } 
            </div>
        </Layout>
    )
}

export default UserProfile
