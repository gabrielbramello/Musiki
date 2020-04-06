import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

class HelloWorld extends React.Component {
    render() {
      return (
        <Button variant="contained" color="primary">
            Olá Mundo
        </Button>
      );
  
    }
  }
export default HelloWorld;