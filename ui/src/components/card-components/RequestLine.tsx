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
      <b>{request.studentName}</b> a fost refuzat de <b>{request.attempt}</b>{' '}
      ori! Aprobi?
      <span>
        Da <CheckIcon onClick={() => alert('Yay!')} />
      </span>
      <span>
        Nu <RemoveCircleOutlineIcon onClick={() => alert('Nay!')} />
      </span>
    </div>
  );
};

export default RequestLine;
