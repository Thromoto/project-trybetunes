import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './search.css';

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
    this.setState(
      {
        [name]: value,
      },
      () => this.enableBtn(),
    );
  };

  btnSave = async () => {
    const { name } = this.state;
    this.setState({
      artistName: name,
      loading: true,
      api: false,
    });
    const result = await searchAlbumsAPI(name);
    this.setState({
      loading: false,
      artistList: result,
      name: '',
      api: true,
    });
  };

  render() {
    const { name, btnSaveDisable, artistName, artistList, loading, api } = this.state;
    return (
      <div className="page-search" data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                className="search-input custom-input"
                data-testid="search-artist-input"
              />
            </div>
            <button
              type="button"
              disabled={ btnSaveDisable }
              onClick={ this.btnSave }
              className="search-button"
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </div>
        )}
        <div>
          Resultado de álbuns de:
          {' '}
          {artistName}
        </div>
        {artistList.map((album, index) => (
          <div key={ index } className="album-result">
            <h3 className="album-title">{album.collectionName}</h3>
            <h3 className="album-artist">{album.artistName}</h3>
            <img
              src={ album.artworkUrl100 }
              alt={ album.collectionName }
              className="album-image"
            />
            <br />
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
              className="album-link"
            >
              Acessar o álbum dos
              {' '}
              {artistName}
            </Link>
          </div>
        ))}
        {api && artistList.length > 0 ? (
          ''
        ) : (
          <p>Nenhum álbum foi encontrado</p>
        )}
      </div>
    );
  }
}

export default Search;
