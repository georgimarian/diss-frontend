import React from "react";
import {Credentials, Student, Teacher, User} from "./models/common";

let props = {
    host: "https://feec-188-27-130-36.eu.ngrok.io/",
    getStudents: "get_students",
    getTeachers: "get_teachers",
    login: "login",
    request: "request_thesis",
    delete: (id: number) => "delete/" + id,
    register: "register",
    update: "update",
    add: "add",
}

export class RequestAPI extends React.Component {
    static async getStudents(): Promise<Student[]> {
        try {
            const response = await fetch(props.host + props.getStudents);
            return await response.json();
        } catch (error) {
            return [];
        }
    }

    static async getTeachers(): Promise<Teacher[]> {
        try {
            const response = await fetch(props.host + props.getTeachers);
            return await response.json();
        } catch (error) {
            return [];
        }
    }

    static async Login(user: Credentials): Promise<User | Student | Teacher | undefined> {
        try {
            const response = await fetch(props.host + props.login, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            });
            console.log("data")
            return response.json();
        } catch (error) {
            console.log("error")
            return undefined;
        }
    }
}