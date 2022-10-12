import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      awaiting: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const value = match.params.id;
    const musicAlbum = await getMusics(value);
    console.log(musicAlbum);
    const musicList = musicAlbum.filter((music, index) => index !== 0);
    this.setState({
      musicList,
      artist: musicAlbum[0].artistName,
      album: musicAlbum[0].collectionName,
      awaiting: true,
    });
  }

  render() {
    const { musicList, artist, album, awaiting } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">Album</div>
        {awaiting
        && (
          <div>
            <h2 data-testid="artist-name">{artist}</h2>
            <h3 data-testid="album-name">{album}</h3>
            { musicList.map((music) => (<MusicCard
              key={ music.trackI }
              music={ music.trackName }
              preview={ music.previewUrl }
            />))}
          </div>
        )}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
