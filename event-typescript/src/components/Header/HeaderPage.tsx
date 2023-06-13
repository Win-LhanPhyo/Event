import React, { CSSProperties, useState } from 'react';
function HeaderPage() {
  const [user, setUser] = useState({
    name: '',
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const loginName = localStorage.getItem('user');
    if (loginName) {
      setUser(JSON.parse(loginName));
    }
  }, []);

  const styles = {
    headerBox: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px 0',
      backgroundColor: '#b1b592'
    },
    header: {
      width: '90%',
    },
    headerText: {
      textDecoration: 'none',
      color: '#050202',
    },
    logoutStyle: {
      marginLeft: '20px',
      textDecoration: 'none',
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
        <div style={floatLeft}>
          <a href="/admin/events" style={styles.headerText}>Foundation</a>
        </div>
        { 
          user.name && 
          <div style={floatRight}>
            <span>{user.name}</span>
            <a href="/admin/users" style={styles.logoutStyle}>Users</a>
            <a href="/admin/events" style={styles.logoutStyle}>Events</a> 
            <a href="/admin/login" style={styles.logoutStyle} onClick={handleLogout}>Logout</a>
          </div>
        }
        {
          !user.name &&
          <div style={registerFloatRight}>
            <a href="/admin/login" style={styles.loginStyle}>Login</a>
            <a href="/admin/register" style={styles.registerStyle}>Register</a>
          </div>
        }
        <div style={{ clear: 'both' }}></div>
      </div>
    </div>
  );
}

export default HeaderPage;


