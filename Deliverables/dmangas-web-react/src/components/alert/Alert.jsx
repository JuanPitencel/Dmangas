const Alert = ({ alert }) => {
    const alertStyle = {
      background: alert.error ? 'linear-gradient(to bottom right, #e53e3e, #c53030)' : 'linear-gradient(to bottom right, #63b3ed, #3182ce)',
      textAlign: 'center',
      padding: '1rem',
      borderRadius: '0.75rem',
      textTransform: 'uppercase',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.875rem',
      marginTop: '1rem',
    };

    return (
      <div style={alertStyle}>
        {alert.msg}
      </div>
    );
  };

  export default Alert;
