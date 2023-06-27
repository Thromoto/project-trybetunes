import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: '',
    };
  }

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({ usuario });
  }

  render() {
    const { usuario } = this.state;
    return (
      <>
        <header className="header" data-testid="header-component">
          <h1 className="h1">TrybeTunes</h1>
          {usuario ? (
            <div className="user-name" data-testid="header-user-name">
              {usuario.name}
            </div>
          ) : (
            <Loading />
          )}
        </header>
        <nav className="navigation">
          <Link
            to="/search"
            className="navigation-link"
            data-testid="link-to-search"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            className="navigation-link"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            className="navigation-link"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </nav>
      </>
    );
  }
}

export default Header;
