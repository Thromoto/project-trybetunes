import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: '',
    };
  }

  async componentDidMount() {
    const usuario = await getUser();
    // console.log(usuario);
    this.setState({ usuario });
  }

  render() {
    const { usuario } = this.state;
    return (
      <header data-testid="header-component">
        { usuario ? (
          <div data-testid="header-user-name">
            { usuario.name }
          </div>)
          : <Loading /> }
      </header>
    );
  }
}

export default Header;
