import React, { createContext, useContext, useState, useEffect } from "react";
import ENV from "../config.js";
const API_HOST = ENV.api_host;

export const fetch_project = async () => {
	const res = await fetch(`${API_HOST}/api/projects`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
    });
    return res.json();
};

export const create_project = async project => {
    console.log(JSON.stringify(project))
    return fetch(`${API_HOST}/api/project`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
        },
        body: JSON.stringify(project)
        // body: project
    });
};

export const delete_project = async project_id => {
    return fetch(`${API_HOST}/api/project/${project_id}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
        },
    });
};
