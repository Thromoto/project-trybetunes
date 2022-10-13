import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favoritos: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    this.setState({ loading: true });
    const favs = await getFavoriteSongs();
    this.setState({
      favoritos: favs.some((fav) => fav.trackId === trackId),
      loading: false,
    });
  }

  handleChange = async ({ target }) => {
    const { musicList } = this.props;
    this.setState({ favoritos: target.checked });
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(musicList);
      this.setState({ loading: false });
    }
  };

  render() {
    const { music, preview, trackId } = this.props;
    const { loading, favoritos } = this.state;
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
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
            checked={ favoritos }
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
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
