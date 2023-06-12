import axios from 'axios';
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
      width: '80%',
    },
    logoutStyle: {
      marginLeft: '20px',
      textDecoration: 'none',
    }
  };
  const floatLeft: CSSProperties = {
    display: 'inline-block',
    width: '50%',
    float: 'left',
  };
  const floatRight: CSSProperties = {
    width: '10%',
    float: 'right',
    display: 'flex',
  };

  return (
    <div style={styles.headerBox}>
      <div style={styles.header}>
        <div style={floatLeft}>
          Foundation
        </div>
        { 
          user.name && 
          <div style={floatRight}>
            <span>{user.name}</span>
            <a href="/admin/login" style={styles.logoutStyle} onClick={handleLogout}>Logout</a>
          </div>
        }
        <div style={{ clear: 'both' }}></div>
      </div>
    </div>
  );
}

export default HeaderPage;


