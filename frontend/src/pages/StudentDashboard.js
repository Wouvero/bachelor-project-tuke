import React from "react";
import CarouselBlock from "../components/CarouselBlock";
import SelectList from "../components/SelectList";
import { SemesterProvider } from "../context/SemesterProvider";

const StudentDashboard = () => {
    return (
        <SemesterProvider>
            <main className="">
                <section className="w-full">
                    <div className="max-w-7xl h-full mx-auto py-20 px-12">
                        <div className="w-full flex items-center pb-16 grid-start-1 grid-end-12">
                            <h1 className="text-gray-900 text-4xl mr-5 font-medium">
                                Zadania
                            </h1>
                            <SelectList />
                        </div>
                        <div className="max-w-7xl h-full mx-auto ">
                            <CarouselBlock />
                        </div>
                    </div>
                </section>
                {/* <section className="w-full">
                    <div className="max-w-7xl h-full mx-auto py-20 px-12">
                        <h1 className="text-4xl mr-5 font-medium pb-16">
                            Články
                        </h1>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="">
                                <div className="h-64 rounded-t-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                                <div className="h-48 px-7 py-6 rounded-b-xl border">
                                    <h1 className="text-gray-900 text-2xl font-semibold mb-4">
                                        Ako funguju polia
                                    </h1>
                                    <p className="text-gray-600">
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s...
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <div className="h-64 rounded-t-xl bg-gradient-to-r from-blue-500 to-green-500"></div>
                                <div className="h-48 px-7 py-6 rounded-b-xl border">
                                    <h1 className="text-2xl font-semibold mb-4">
                                        Stringy a ich význam
                                    </h1>
                                    <p className="text-gray-600">
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </main>
        </SemesterProvider>
    );
};

export default StudentDashboard;
