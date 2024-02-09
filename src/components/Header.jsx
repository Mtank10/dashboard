import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, logout } from '../AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    logout(setUser);
  };

  return (
    <AppBar position="static" sx={{marginLeft: '84px'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        </Typography>
        {user ? (
          <>
            <Typography variant="h6" component="div" sx={{ marginRight: '10px' }}>
              Welcome, {user.name}
            </Typography>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button variant="contained" component={Link} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
