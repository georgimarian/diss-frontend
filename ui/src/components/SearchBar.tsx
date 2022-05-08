import { Box, Button, TextField, useTheme } from '@mui/material';

const SearchBar = ({
  searchValue,
  search,
}: {
  searchValue: string;
  search: any;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pt: 4,
        pb: 2,
        px: 4,
      }}
    >
      <TextField
        label='Search'
        variant='outlined'
        value={searchValue}
        onChange={(e) => search(e.target.value)}
        sx={{
          width: '70%',
          borderRadius: 25,
        }}
      />
      <Button
        onClick={() => {
          searchValue.length && console.log(searchValue);
        }}
        sx={{
          width: '10%',
          borderRadius: 10,
          color: theme.palette.secondary.main,
          bgcolor: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.secondary.main,
            background: theme.palette.primary.dark,
          },
        }}
      >
        Caută
      </Button>
    </Box>
  );
};

export default SearchBar;
