import React from "react";
import {createStore} from "redux";
import {usersReducer} from "./UserReducer";

const store = createStore(usersReducer);

export default store;
