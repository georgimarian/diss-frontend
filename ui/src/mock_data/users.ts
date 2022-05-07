import {RequestStatus} from "../components/Models"

export const aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Pellentesque pulvinar a turpis sit amet hendrerit. Vestibulum nec justo tempor," +
    "vulputate turpis non, tincidunt neque. Fusce nec odio sed ante elementum ultrices." +
    "Nullam eget ultricies mauris, id tempor erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
    "Pellentesque pulvinar a turpis sit amet hendrerit. Vestibulum nec justo tempor," +
    "vulputate turpis non, tincidunt neque. Fusce nec odio sed ante elementum ultrices." +
    "Nullam eget ultricies mauris, id tempor erat."

export let teacherList =
    [{
        id: 2,
        name: "Pop Popescu",
        type: "teacher",
        interest: "Behavioral therapy",
        email: "popescu@yahoo.com",
        enrolledStudents: [
            {
                id: 2,
                password: "lorena",
                type: "student",
                name: "denis2",
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
                        teacherId: 2
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
                teacherId: 2
            },
        ]
    },
        {
            id: 12,
            name: "Pop Popescu2",
            type: "teacher",
            interest: "Behavioral therapy",
            email: "popescu@yahoo.com",
            enrolledStudents: [],
            totalPlaces: 15,
            password: "pass",
            requests: []
        },
        {
            id: 112,
            name: "Pop Popescu3",
            type: "teacher",
            interest: "Behavioral therapy",
            email: "popescu@yahoo.com",
            enrolledStudents: [],
            totalPlaces: 15,
            password: "pass",
            requests: []
        },
        {
            id: 1112,
            name: "Pop Popescu3",
            type: "teacher",
            interest: "Behavioral therapy",
            email: "popescu@yahoo.com",
            enrolledStudents: [],
            totalPlaces: 15,
            password: "pass",
            requests: []
        },
        {
            id: 3,
            name: "Pop Popescu3",
            type: "teacher",
            interest: "Behavioral therapy",
            email: "popescu@yahoo.com",
            enrolledStudents: [],
            totalPlaces: 15,
            password: "pass",
            requests: [
                {
                    id: 2,
                    status: RequestStatus.DENIED,
                    description: "muhaha",
                    studentId: 1,
                    teacherId: 3
                },
            ]
        },

    ]
export let studentList = [{
    id: 1,
    password: "lorena",
    type: "student",
    name: "denis",
    email: "criste.denis15@yahoo.com",
    thesisDescription: "muhaha",
    requests: [
        {
            id: 1,
            status: RequestStatus.DENIED,
            description: "muhaha",
            studentId: 1,
            teacherId: 3
        },
        {
            id: 2,
            status: RequestStatus.DENIED,
            description: "muhaha",
            studentId: 1,
            teacherId: 2
        }
    ],
    description: "i am a mothefucker",
    requestsLeft: 1
},
    {
        id: 2,
        password: "lorena",
        type: "student",
        name: "denis2",
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
                teacherId: 2
            }
        ],
        description: "i am a mothefucker",
        requestsLeft: 1
    }]

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