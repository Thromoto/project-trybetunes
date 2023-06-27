import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <p style={ { color: '#000', fontWeight: 'bold' } }>Carregando...</p>
    );
  }
}

export default Loading;
