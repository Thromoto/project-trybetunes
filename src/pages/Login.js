import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      btnSaveDisable: true,
      loading: false,
    };
  }

  enableBtn = () => {
    const { name } = this.state;
    const numero = 3;
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
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    history.push('/search');
  };

  render() {
    const { name, btnSaveDisable, loading } = this.state;
    return (
      <div className="container">
        <h1>TrybeTunes</h1>
        {loading ? (
          <div className="loading">
            <Loading />
          </div>
        ) : (
          <div className="login-form" data-testid="page-login">
            <p className="login-title">Login</p>
            <label htmlFor="name" className="login-label">
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                className="login-input"
                data-testid="login-name-input"
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ btnSaveDisable }
              onClick={ this.btnSave }
              className="login-button"
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default Login;
