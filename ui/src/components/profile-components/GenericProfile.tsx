import { Box, Link, Typography, useTheme } from '@mui/material';
import ProfileIcon from './ProfileIcon';
import { useEffect, useState } from 'react';
import { aboutMe } from '../../mock_data/users';
import { Colors } from '../../mock_data/theme';
import PublishedPapersList from './PublishedPapersList';
import ProfileCompletion from './ProfileCompletion';
import {Roles} from "../../utils/models/common.enums";
import {parseUser} from "../../utils/models/common";

type GenericProfileProps = {
  user: any; //TODO
};

const GenericProfile = ({ user }: GenericProfileProps) => {
  const theme = useTheme();
  const _user = parseUser();
  const hasProfessor = false;

  const [customProfileFunctionality, setCustomProfileFunctionality] =
    useState<JSX.Element>();
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    switch (_user.type) {
      case Roles.STUDENT:
        const teachersList = (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant={'h6'} sx={{ textTransform: 'uppercase' }}>
              Profesorul tau
            </Typography>
            {hasProfessor ? (
              <Typography variant={'body1'}>Dr. English Doe (todo)</Typography>
            ) : (
              <Typography variant={'body2'}>
                <Link
                  variant={'body2'}
                  href={'/teachers'}
                  sx={{
                    textTransform: 'uppercase',
                    color: Colors.WARNING,
                  }}
                >
                  nu ai ales inca un profesor!
                </Link>
              </Typography>
            )}
          </Box>
        );
        setCustomProfileFunctionality(teachersList);
        break;
      case Roles.TEACHER:
        const studentsList = (
          <Typography variant={'body2'}>
            <Link
              variant={'body2'}
              href={'/students'}
              sx={{
                textTransform: 'uppercase',
                color: Colors.WARNING,
              }}
            >
              Lista dvs de studenti
            </Link>
          </Typography>
        );
        setCustomProfileFunctionality(studentsList);
        break;
      case Roles.ADMIN:
        setCustomProfileFunctionality(<div />);
        break;
      default:
        return;
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.secondary.dark,
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          px: 5,
          borderRadius: 10,
        }}
      >
        <ProfileIcon
          firstName={user.firstName || 'John'}
          lastName={user.lastName || 'Doe'}
          iconSize={'15rem'}
          variant={'h1'}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pl: 5,
            py: 5,
            width: '70%',
          }}
        >
          <div>
            <Typography variant={'h4'}>
              {user.firstName} {user.lastName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 0.5,
              }}
            >
              <Typography variant={'body1'}>{_user.type}</Typography>
              <Typography variant={'body1'} sx={{ px: 2 }}>
                |
              </Typography>
              <Typography variant={'body1'}>Psychologist (todo)</Typography>
              <Typography variant={'body1'} sx={{ px: 2 }}>
                |
              </Typography>
              <Typography variant={'body1'}>{user.email}</Typography>
            </Box>
          </div>

          <Box sx={{ pt: 2 }}>{customProfileFunctionality}</Box>

          <Box>
            <Typography variant={'body1'} sx={{ fontWeight: '700', pt: 3 }}>
              About me
            </Typography>
            {aboutMe.length < 300 ? (
              <Typography variant={'body1'}>{aboutMe}</Typography>
            ) : (
              <>
                <Typography variant={'body1'}>
                  {aboutMe.substring(0, 300) +
                    (seeMore ? aboutMe.substring(300) : '')}
                </Typography>
                <Box
                  onClick={() => setSeeMore(!seeMore)}
                  sx={{ pt: 1, width: 'fit-content', cursor: 'pointer' }}
                >
                  <Typography fontWeight={'700'}>
                    {!seeMore ? '...vezi mai mult' : 'vezi mai putin'}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {_user.type === Roles.TEACHER ? (
        <PublishedPapersList />
      ) : _user.type === Roles.STUDENT ? (
        <ProfileCompletion />
      ) : (
        <div />
      )}
    </Box>
  );
};

export default GenericProfile;
