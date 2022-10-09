import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      btnSaveDisable: true,
      name: '',
      artistName: '',
      artistList: [],
      loading: false,
      api: false,
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

  btnSave = async () => {
    const { name } = this.state;
    this.setState({
      artistName: name,
      loading: true,
      api: false });
    const result = await searchAlbumsAPI(name);
    this.setState({
      loading: false,
      artistList: result,
      name: '',
      api: true });
  };

  render() {
    const { name, btnSaveDisable, artistName, artistList, loading, api } = this.state;
    return (
      <>
        <div data-testid="page-search" />
        <Header />
        { loading ? <Loading />
          : (
            <>
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
          )}
        <div>
          Resultado de álbuns de:
          {' '}
          { artistName }
        </div>
        {artistList.map((album, index) => (
          <div key={ index }>
            <h3>{album.collectionName}</h3>
            <h3>{album.artistName}</h3>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <br />
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              Acessar o álbum dos
              {' '}
              {artistName}
            </Link>
          </div>))}
        { api && artistList.length > 0 ? ''
          : <p>Nenhum álbum foi encontrado</p> }
      </>
    );
  }
}

export default Search;
