import { Box, Button, TextField, useTheme } from '@mui/material';

const SearchBar = ({
  searchValue,
  onSearch,
}: {
  searchValue: string;
  onSearch: any;
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
        onChange={(e) => onSearch(e.target.value)}
        sx={{width: '100%'}}
      />
    </Box>
  );
};

export default SearchBar;
