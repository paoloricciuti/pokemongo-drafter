import React from 'react';

const useApi = () => {
    const returnFunction = async (endpoint, method, body = null, isJson=true) => {
        const baseUrl = "/api/";
        let headers = new Headers();
        if(isJson){
            headers.append("Content-Type", "application/json");
        }
        let options = {
            method,
            body: body != null && method != "GET" ? JSON.stringify(body) : null,
            headers
        }
        if(body instanceof FormData){
            options.body=body;
        }
        let queryParameters = "";
        if (method == "GET" && body!=null) {
            let qp = new URLSearchParams();
            Object.entries(body).forEach((param) => {
                qp.append(param[0], param[1]);
            });
            queryParameters = `?${qp.toString()}`;
        }
        let res = await fetch(`${baseUrl}${endpoint}${queryParameters}`, options);
        let json;
        try {
            json = await res.json();
        }catch(e){
            json={
                ok: false
            }
        }
        return json;
    };
    return returnFunction;
};

export default useApi;