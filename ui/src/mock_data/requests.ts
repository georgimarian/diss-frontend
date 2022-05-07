type Request = {
  studentName: string,
  attempt: number,
  status: string,
};

const MOCK_REQUESTS: Array<Request> = [
  {
    studentName: 'Ion Pop',
    attempt: 2,
    status: 'Pending',
  },
  {
    studentName: 'Dan Pop',
    attempt: 2,
    status: 'Pending',
  },
  {
    studentName: 'Mihai Pop',
    attempt: 2,
    status: 'Pending',
  },
];

export { MOCK_REQUESTS };
