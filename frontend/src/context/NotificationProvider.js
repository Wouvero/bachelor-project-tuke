import React, { createContext, useContext, useReducer } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_NOTIFICATION":
                return [...state, action.payload];
            case "REMOVE_NOTIFICATION":
                return state.filter((item) => item.id === state.id);
            default:
                return state;
        }
    }, []);

    return (
        <NotificationContext.Provider value={{ dispatch }}>
            <div className="fixed z-50 w-[300px] right-4 top-[100px]">
                {state.map((notification) => {
                    return (
                        <Notification
                            dispatch={dispatch}
                            key={notification.id}
                            {...notification}
                        />
                    );
                })}
            </div>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
