import React, { CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function HeaderPage() {
  const [user, setUser] = useState({
    name: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  React.useEffect(() => {
    const loginUser = localStorage.getItem('user');   
    if (loginUser) {
      setUser(JSON.parse(loginUser));
    }
  }, []);

  const styles = {
    headerBox: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px 0',
      backgroundColor: '#4da6ff',
      borderBottom: '2px solid #a5aaaf69',
    },
    header: {
      width: '90%',
    },
    headerText: {
      textDecoration: 'none',
      color: '#050202',
      cursor: 'pointer',
    },
    logoutStyle: {
      marginLeft: '20px',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    registerStyle: {
      textDecoration: 'none',
    },
    loginStyle: {
      textDecoration: 'none',
      marginRight: '20px',
    }
  };
  const floatLeft: CSSProperties = {
    display: 'inline-block',
    width: '50%',
    float: 'left',
    fontSize: '24px',
    margin: '0',
  };
  const floatRight: CSSProperties = {
    width: '50%',
    float: 'right',
    display: 'flex',
    justifyContent: 'flex-end',
  };
  const registerFloatRight: CSSProperties = {
    width: '7%',
    float: 'right',
    display: 'flex',
  };

  return (
    <div style={styles.headerBox}>
      <div style={styles.header}>
        <h1 style={floatLeft}>
          <a  onClick={() => navigate("/admin/events")} style={styles.headerText}>Foundation</a>
        </h1>
        { 
          user.name && 
          <div style={floatRight}>
            <span>{user.name}</span>
            {
              user.role.toString() === '1' && 
              <a onClick={() => navigate("/admin/users")} style={styles.logoutStyle}>Users</a>
            }
            <a onClick={() => navigate("/admin/events")} style={styles.logoutStyle}>Events</a> 
            <a style={styles.logoutStyle} onClick={handleLogout}>Logout</a>
          </div>
        }
        {
          !user.name &&
          <div style={registerFloatRight}>
            <a onClick={() => navigate("/admin/login")} style={styles.loginStyle}>Login</a>
            <a onClick={() => navigate("/admin/register")} style={styles.registerStyle}>Register</a>
          </div>
        }
        <div style={{ clear: 'both' }}></div>
      </div>
    </div>
  );
}

export default HeaderPage;


