import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatusBadge from "../components/statusBadge.js";
import useUserRequest from "../hooks/requests/useUserRequest";

const UserInfo = () => {
    const { userID } = useParams();
    const { getUserRequest } = useUserRequest();
    const [userDetail, setUserDetial] = useState(null);

    useEffect(() => {
        if (userID) {
            getUserRequest(userID).then((fetchedResponse) =>
                setUserDetial(fetchedResponse.user)
            );
        }
    }, [userID]);
    console.log(userDetail);
    if (userDetail) {
        return (
            <main className="w-full">
                <section className="max-w-7xl h-full mx-auto py-20 px-12">
                    <div className="bg-white  shadow rounded-lg ">
                        <div className="w-full h-[200px] rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                        <div className="px-10 py-20">
                            <div className="flex space-x-4 items-center pb-10">
                                <h2 className="font-bold text-4xl text-gray-700">
                                    {`${userDetail.user_detail.first_name} ${userDetail.user_detail.last_name}`}
                                </h2>
                                <StatusBadge status={userDetail.user_status} />
                            </div>

                            <div className="text-base text-gray-500 tracking-wider">
                                {userDetail.user_detail.email}
                            </div>

                            <div>{userDetail.user_detail.study_program}</div>
                            <div>{userDetail.user_detail.study_year}</div>
                        </div>
                    </div>
                </section>
            </main>
        );
    } else {
        return <></>;
    }
};

export default UserInfo;
