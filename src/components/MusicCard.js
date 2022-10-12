import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, preview } = this.props;
    return (
      <>
        <h3>{music}</h3>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export default MusicCard;
