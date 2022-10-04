import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      btnSaveDisable: true,
      name: '',
    };
  }

  enableBtn = () => {
    const { name } = this.state;
    const numero = 2;
    const typedName = name.length >= numero;
    this.setState({ btnSaveDisable: typedName === false });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.enableBtn());
  };

  render() {
    const { name, btnSaveDisable } = this.state;
    return (
      <>
        <div data-testid="page-search">Search</div>
        <Header />
        <input
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          disabled={ btnSaveDisable }
          onClick={ this.btnSave }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </>
    );
  }
}

export default Search;
