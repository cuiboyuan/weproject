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

export const create_project = async (project) => {
    return fetch(`${API_HOST}/api/project`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });
};

export const delete_project = async (project_id) => {
    return fetch(`${API_HOST}/api/project/${project_id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
};

export const update_project = async (project) => {
    return fetch(`${API_HOST}/api/project/${project._id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });
};

export const update_project_image = async (project, form) => {
    const formData = new FormData();
    formData.append("file", form);
    return fetch(`${API_HOST}/api/project/${project._id}/images`, {
        method: "POST",
        body: formData,
    });
};

export const get_project_images = async (project) => {
    const res = await fetch(`${API_HOST}/api/project/${project._id}/images`, {
        method: "GET",
    });
    return res.json();
};

export const requestTopProject = async (projectID) => {
    const url = `${API_HOST}/api/project/top/${projectID}`;
    try {
        const res = await fetch(url);
        if (res.status === 200) {
            return res;
        }
    } catch (err) {
        console.log(err);
    }
};

export const requestThumUp = async (project_ID, userName) => {
    const url = `${API_HOST}/api/project/like`;
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
            userName: userName,
            project_ID: project_ID,
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    try {
        const res = await fetch(request);
        if (res.status === 200) {
            return res;
        }
    } catch (err) {
        console.log(err);
    }
};
