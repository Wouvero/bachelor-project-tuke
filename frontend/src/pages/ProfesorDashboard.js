import React from "react";

const ProfesorDashboard = () => {
    return (
        <main>
            <section className="w-full">
                <div className="max-w-7xl h-full mx-auto py-20 px-12 ">
                    <a
                        href="/semestersPage"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3"
                    >
                        Semestre
                    </a>
                    <a
                        href="/usersPage"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Uživatelia
                    </a>
                </div>
            </section>
        </main>
    );
};

export default ProfesorDashboard;
