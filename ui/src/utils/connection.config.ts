import React from "react";
import {Credentials, Criterion, Student, Teacher, ThesisRequest, User} from "./models/common";

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
    getCriterias: "get_criterias",
    setCriterias: "set_criterias",
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
    static async getCriterias(): Promise<Criterion[]> {
        try {
            const response = await fetch(props.host + props.getCriterias);
            return await response.json();
        } catch (error) {
            return [];
        }
    }

    static async setCriterias(criterias: Criterion[]): Promise<Criterion[]> {
        try {
            const response = await fetch(props.host + props.setCriterias, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(criterias)
            });
            console.log("data")
            return response.json();
        } catch (error) {
            console.log("error")
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
    static async Register(user: User): Promise<User | Student | Teacher | undefined> {
        try {
            const response = await fetch(props.host + props.register, {
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

    static async Update(user: User | Student | Teacher): Promise<User | Student | Teacher | undefined> {
        try {
            const response = await fetch(props.host + props.update, {
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

    static async Add(user: User | Student | Teacher): Promise<User | Student | Teacher | undefined> {
        try {
            const response = await fetch(props.host + props.add, {
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
    static async Request(request: ThesisRequest): Promise<ThesisRequest | undefined> {
        try {
            const response = await fetch(props.host + props.request, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(request)
            });
            console.log("data")
            return response.json();
        } catch (error) {
            console.log("error")
            return undefined;
        }
    }
    static async Delete(user: User | Student | Teacher): Promise<User | Student | Teacher | undefined> {
        try {
            const response = await fetch(props.host + props.delete(user.id), {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            });
            console.log("data")
            return response.json();
        } catch (error) {
            console.log("error")
            return undefined;
        }
    }
}