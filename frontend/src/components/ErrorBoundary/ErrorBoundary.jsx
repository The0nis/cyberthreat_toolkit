import React, { Component } from 'react';
const errorPageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f8f8', // Background color
  };
  
  const buttonStyles = {
    padding: '10px 20px',
    backgroundColor: '#007bff', // Button background color
    color: '#fff', // Button text color
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console or send it to a logging service
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  
  render() {
    if (this.state.hasError) {
      // You can customize the error page here
      return (
        <div style={errorPageStyles}>
        <h1 style={{ fontSize: '2rem', color: 'red' }}>Something went wrong!</h1>
        <p style={{ fontSize: '1rem', marginBottom: '20px' }}>
          Please click the button to go back to the home page.
        </p>
        <button
          style={buttonStyles}
          onClick={() => window.location.reload()}
        >
          Go Back to Home
        </button>
      </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
