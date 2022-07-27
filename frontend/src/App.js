import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layouts/Layout";
import RequireAuth from "./components/Auth/RequireAuth";
import PersistLogin from "./components//Auth/PersistLogin";

import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import ProfesorDashboard from "./pages/ProfesorDashboard";

import UserForm from "./components/Forms/UserForm";
import SemesterForm from "./components/Forms/SemesterForm";
import TaskForm from "./components/Forms/TaskForm";
import SolutionForm from "./components/Forms/SolutionForm";

import SemestersPage from "./pages/SemestersPage";
import SemesterPage from "./pages/SemesterPage";
import TaskPage from "./pages/TaskPage";
import SolutionPage from "./pages/SolutionPage";

import UsersPage from "./pages/UsersPage";
import UserInfo from "./pages/UserInfo";
import TaskDetails from "./pages/TaskDetails";
import TableTest from "./pages/TableTest";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route element={<PersistLogin />}>
                    <Route path="/" element={<LoginPage />} />

                    <Route element={<RequireAuth status={"STUDENT"} />}>
                        <Route
                            path="/dashboard"
                            element={<StudentDashboard />}
                        />

                        <Route path="/task/:taskID" element={<TaskDetails />} />

                        <Route
                            path="/studentDetail/:userID"
                            element={<UserInfo />}
                        />
                    </Route>

                    <Route element={<RequireAuth status={"PROFESOR"} />}>
                        <Route
                            path="/profesorPage"
                            element={<ProfesorDashboard />}
                        />

                        <Route path="/tableTest" element={<TableTest />} />

                        <Route
                            path="/semestersPage"
                            element={<SemestersPage />}
                        />
                        <Route
                            path="/semesterPage/:semesterID"
                            element={<SemesterPage />}
                        />
                        <Route
                            path="/createSemester"
                            element={<SemesterForm />}
                        />
                        <Route
                            path="/updateSemester/:semesterID"
                            element={<SemesterForm />}
                        />

                        <Route
                            path="/tasks/:taskID/solutionPage/:solutionID"
                            element={<SolutionPage />}
                        />

                        <Route
                            path="/taskPage/:taskID"
                            element={<TaskPage />}
                        />
                        <Route
                            path="/createTask/:semesterID"
                            element={<TaskForm />}
                        />
                        <Route
                            path="/updateTask/:taskID"
                            element={<TaskForm />}
                        />

                        <Route
                            path="/createSolution/:taskID"
                            element={<SolutionForm />}
                        />

                        <Route path="/createUser" element={<UserForm />} />
                        <Route
                            path="/updateUser/:userID"
                            element={<UserForm />}
                        />
                        <Route path="/usersPage" element={<UsersPage />} />

                        <Route
                            path="/userInformation/:userID"
                            element={<UserInfo />}
                        />

                        <Route
                            path="/profesorDetail/:userID"
                            element={<UserInfo />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
