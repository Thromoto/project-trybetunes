import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  handleChange = async ({ target }) => {
    const { musicList } = this.props;
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(musicList);
      this.setState({ loading: false });
    }
  };

  render() {
    const { music, preview, trackId } = this.props;
    const { loading } = this.state;
    return (
      <>
        { loading && <Loading /> }
        <h3>{music}</h3>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="fav">
          Favorita
          <input
            type="checkbox"
            id="fav"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  musicList: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
