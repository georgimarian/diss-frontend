import { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type Request = {
  studentName: string;
  attempt: number;
  status: string;
};
type RequestProps = {
  request: Request;
};

const RequestLine: FC<RequestProps> = ({ request }) => {
  return (
    <div>
      <b>{request.studentName}</b> has been denied <b>{request.attempt}</b>{' '}
      times! Approve?
      <span>
        Yes <CheckIcon onClick={() => alert('Yay!')} />
      </span>
      <span>
        No <RemoveCircleOutlineIcon onClick={() => alert('Nay!')} />
      </span>
    </div>
  );
};

export default RequestLine;
