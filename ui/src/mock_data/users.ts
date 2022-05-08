import {AreaOfInterest, RequestStatus} from "../models/common.enums"
import {Student, Teacher} from "../models/common";
import { Roles } from "utils/roles";


export const aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Pellentesque pulvinar a turpis sit amet hendrerit. Vestibulum nec justo tempor," +
    "vulputate turpis non, tincidunt neque. Fusce nec odio sed ante elementum ultrices." +
    "Nullam eget ultricies mauris, id tempor erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
    "Pellentesque pulvinar a turpis sit amet hendrerit. Vestibulum nec justo tempor," +
    "vulputate turpis non, tincidunt neque. Fusce nec odio sed ante elementum ultrices." +
    "Nullam eget ultricies mauris, id tempor erat."

export let teacherList : Teacher[] =
    [{
        id: 1,
        username: "Pop Popescu",
        firstName: "Pop Popescu",
        lastName: "Pop Popescu",
        type: Roles.Teacher,
        areaOfInterest: AreaOfInterest.PSYCHOLOGY,
        email: "popescu@yahoo.com",
        enrolledStudents: [
            {
                id: 2,
                password: "lorena",
                type: Roles.Student,
                username: "denis2",
                firstName: "denis2",
                areaOfInterest: AreaOfInterest.PSYCHOLOGY,
                lastName: "denis2",
                grades: [{criteria: "criteria 1", value: 10}],
                email: "criste.denis15@yahoo.com2",
                thesisDescription: "muhaha",
                requests: [
                    {
                        id: 3,
                        status: RequestStatus.DENIED,
                        description: "muhaha",
                        studentId: 2,
                        teacherId: 3
                    },
                    {
                        id: 4,
                        status: RequestStatus.APPROVED,
                        description: "muhaha",
                        studentId: 2,
                        teacherId: 1
                    }
                ],
                description: "i am a mothefucker",
                requestsLeft: 1
            }
        ],
        totalPlaces: 15,
        password: "pass",
        requests: [
            {
                id: 1,
                status: RequestStatus.DENIED,
                description: "muhaha",
                studentId: 1,
                teacherId: 1
            },
        ]
    },
    {
        id: 2,
        username: "Ion Ionescu",
        firstName: "Ion",
        lastName: "Ionescu",
        type: Roles.Teacher,
        areaOfInterest: AreaOfInterest.PSYCHOLOGY,
        email: "ionescu@yahoo.com",
        enrolledStudents: [],
        totalPlaces: 15,
        password: "pass",
        requests: []
    },
    {
        id: 3,
        username: "George Georgescu",
        firstName: "George",
        lastName: "Georgescu",
        type: Roles.Teacher,
        areaOfInterest: AreaOfInterest.APPLIED_PSYCHOLOGY,
        email: "popescu@yahoo.com",
        enrolledStudents: [],
        totalPlaces: 15,
        password: "pass",
        requests: []
    },
    {
        id: 4,
        username: "Alin Alinescu",
        firstName: "Alin",
        lastName: "Alinescu",
        type: Roles.Teacher,
        areaOfInterest: AreaOfInterest.APPLIED_PSYCHOLOGY,
        email: "alinescu@yahoo.com",
        enrolledStudents: [],
        totalPlaces: 15,
        password: "pass",
        requests: []
    },
    {
        id: 5,
        username: "Florin Florinescu",
        firstName: "Florin",
        lastName: "Florinescu",
        type: Roles.Teacher,
        areaOfInterest: AreaOfInterest.PSYCHOLOGY,
        email: "florinescu@yahoo.com",
        enrolledStudents: [],
        totalPlaces: 15,
        password: "pass",
        requests: [
            {
                id: 2,
                status: RequestStatus.DENIED,
                description: "muhaha",
                studentId: 1,
                teacherId: 5
            },
        ]
    },
    ];
export let studentList : Student[] = [{
    id: 1,
    password: "lorena",
    type: Roles.Student,
    username: "denis",
    lastName: "denis",
    firstName: "denis",
    areaOfInterest: AreaOfInterest.PSYCHOLOGY,
    email: "criste.denis15@yahoo.com",
    thesisDescription: "muhaha",
    grades: [],
    requests: [
        {
            id: 1,
            status: RequestStatus.DENIED,
            description: "muhaha",
            studentId: 1,
            teacherId: 5
        },
        {
            id: 2,
            status: RequestStatus.DENIED,
            description: "muhaha",
            studentId: 1,
            teacherId: 1
        }
    ],
    description: "i am a mothefucker",
    requestsLeft: 1
},
    {
        id: 2,
        password: "lorena",
        type: Roles.Student,
        username: "denis2",
        firstName: "denis2",
        lastName: "denis2",
        areaOfInterest: AreaOfInterest.PSYCHOLOGY,
        grades: [{criteria: "criteria 1", value: 10}],
        email: "criste.denis15@yahoo.com2",
        thesisDescription: "muhaha",
        requests: [
            {
                id: 3,
                status: RequestStatus.DENIED,
                description: "muhaha",
                studentId: 2,
                teacherId: 1
            },
            {
                id: 4,
                status: RequestStatus.APPROVED,
                description: "muhaha",
                studentId: 2,
                teacherId: 5
            }
        ],
        description: "i am a mothefucker",
        requestsLeft: 1
    },

    {
        email: "email1",
        username: "username1",
        password: "password1",
        firstName: "john",
        lastName: "doe",
        areaOfInterest: AreaOfInterest.PSYCHOLOGY,
        id: 10,
        grades:[],
        description:"",
        requests:[],
        requestsLeft:3,
        type:Roles.Student,
        thesisDescription:""

    },
    {
        email: "email2",
        username: "username2",
        password: "password2",
        firstName: "marco",
        lastName: "pollo",
        areaOfInterest: AreaOfInterest.PSYCHOLOGY,
        id: 11,
        grades:[],
        description:"",
        requests:[],
        requestsLeft:3,
        type:Roles.Student,
        thesisDescription:""
    },
    {
        email: "email3",
        username: "username3",
        password: "password3",
        firstName: "phoebe",
        lastName: "buffay",
        areaOfInterest: AreaOfInterest.APPLIED_PSYCHOLOGY,
        id: 12,
        grades:[],
        description:"",
        requests:[],
        requestsLeft:3,
        type:Roles.Student,
        thesisDescription:""
    }
];

export const publishedPapers = [
    {
        year: 2021,
        titles: [
            "A study into Behavioral Psychology for children” - John Doe, Jane Doe, Janette Doette, Meriam Webster Press 1",
            "A study into Behavioral Psychology for children” - John Doe, Jane Doe, Janette Doette, Meriam Webster Press 2",
            "A study into Behavioral Psychology for children” - John Doe, Jane Doe, Janette Doette, Meriam Webster Press 3"]
    },
    {
        year: 2019,
        titles: [
            "A study into Behavioral Psychology for children” - John Doe, Jane Doe, Janette Doette, Meriam Webster Press 1",
            "A study into Behavioral Psychology for children” - John Doe, Jane Doe, Janette Doette, Meriam Webster Press 2",
            "A study into Behavioral Psychology for children” - John Doe, Jane Doe, Janette Doette, Meriam Webster Press 3"]
    },
    {
        year: 2020,
        titles: [
            "A study into Behavioral Psychology for children” - John Doe, Jane Doe, Janette Doette, Meriam Webster Press 1",
            "A study into Behavioral Psychology for children” - John Doe, Jane Doe, Janette Doette, Meriam Webster Press 2",
            "A study into Behavioral Psychology for children” - John Doe, Jane Doe, Janette Doette, Meriam Webster Press 3"]
    },
]

export const initializedStudent: Student = {
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    areaOfInterest: AreaOfInterest.PSYCHOLOGY,
    id:-1,
    grades:[],
    requests:[],
    description:"",
    thesisDescription:'',
    requestsLeft:0,
    type:Roles.Student
}

export enum Actions {
    ADD,
    EDIT
}
