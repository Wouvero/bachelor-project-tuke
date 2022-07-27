import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import PrivateLayout from "../Layouts/PrivateLayout";

const RequireAuth = ({ status }) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log(location);

    const changeLocation = (status) => {
        switch (status) {
            case "STUDENT":
                return <Navigate to="/" state={{ from: location }} replace />;

            case "PROFESOR":
                return (
                    <Navigate
                        to="/profesorPage"
                        state={{ from: location }}
                        replace
                    />
                );

            case "ADMIN":
                return (
                    <Navigate
                        to="/adminPage"
                        state={{ from: location }}
                        replace
                    />
                );
            default:
                break;
        }
    };

    return (
        <PrivateLayout>
            <Outlet />
        </PrivateLayout>
    ); /* auth?.userStatus === status ? (
        <PrivateLayout>
            <Outlet />
        </PrivateLayout>
    ) : auth?.userLogin ? (
        changeLocation(auth?.userStatus)
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    ); */
};

export default RequireAuth;
