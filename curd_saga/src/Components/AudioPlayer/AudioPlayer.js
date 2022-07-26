import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import songActions from '../../Redux/Song/actions';
import Chords from './Chords';
import { interval } from 'rxjs';

const AudioPlayer = ({ songResponse }) => {
  const dispatch = useDispatch();
  const myAudio = useRef();
  const [playing, setPlaying] = useState(false);
  const [muteAudio, setMuteAudio] = useState(true);
  const [playChord, setPlayChord] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  let [currentTime, setCurrentTimes] = useState(0);
  const [originalTotalSeconds, setOriginalTotalSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  let perSecond = +(60 / songResponse?.bpm).toFixed(4);
  const [subscription, setSubscription] = useState(null);
  const track = useRef();

  // Audio player play/pause
  const playPauseToggle = () => {
    setPlaying((playing) => !playing);
    if (playing) {
      myAudio.current.pause();
      pauseAudio();
    } else {
      myAudio.current.play();
      playAudio();
    }
    myAudio.current.addEventListener('ended', () => setPlaying(false));
  };

  const muteUnmuteToggle = () => setMuteAudio((muteAudio) => !muteAudio);

  const playPauseChordToggle = () => setPlayChord((playChord) => !playChord);

  const onMetadata = (event) => {
    setOriginalTotalSeconds(event.target.duration);
    const duration = event.target.duration / perSecond;
    let seconds = Math.floor(duration);
    if (duration % 1 !== 0) seconds += 1;
    setTotalSeconds(seconds);
    const totalTime = formatSecondsAsTime(event.target.duration);
    setTotalTime(totalTime);
  };

  const formatSecondsAsTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (secs < 10) {
      secs = '0' + secs;
    }
    return minutes + ':' + secs;
  }

  const resetBoxValue = () => {
    setPlaying(false);
    subscription.unsubscribe();
    myAudio.current.pause();
    perSecond = +(60 / songResponse?.bpm).toFixed(4);
    const duration = originalTotalSeconds / perSecond;
    let seconds = Math.floor(duration);
    if (duration % 1 !== 0) seconds += 1;
    setTotalSeconds(seconds);
    setCurrentTimes(0);
    const audio = document.querySelector('audio');
    audio.currentTime = 0;
    const currentTrack = track.current;
    currentTrack.scrollLeft = 0;
  };

  // To open modal popup to add/update chord in audio player
  const addUpdateChordModalPopup = (index, selectedChord, songId) => {
    let data = {
      isSongModalVisible: true,
      index: index,
      chordData: selectedChord,
      song_id: songId
    };
    dispatch(songActions.changeUpdateModalState(data));
  };

  const playAudio = (index) => {
    const source = interval(perSecond * 1000);
    if (index) {
      currentTime = index;
      setCurrentTimes(currentTime = index);
    }
    const subscription = source.subscribe(val => {
      setCurrentTimes(currentTime += 1);
      if (currentTime && currentTime % 8 === 0) {
        const currentTrack = track.current;
        currentTrack.scrollLeft += (currentTrack.scrollWidth / totalSeconds) * 8;
      }
    });

    setSubscription(subscription)
  }

  const pauseAudio = () => {
    subscription.unsubscribe();
  }

  const onEnded = () => {
    setCurrentTimes(0);
    subscription.unsubscribe();
    const audio = document.querySelector('audio');
    audio.currentTime = 0;
    const currentTrack = track.current;
    currentTrack.scrollLeft = 0;
    myAudio.current.pause();
  }

  const goToSeconds = (index) => {
    subscription.unsubscribe();
    const audio = document.querySelector('audio');
    audio.currentTime = index;
    playAudio(index);
  }

  const clickHandler = (event, index, selectedChord) => {
    var timer;
    clearTimeout(timer);
    if (event.detail === 1) {
      timer = setTimeout(() => {
        if (playing) {
          goToSeconds(index)
        }
      }, 200)
    } else if (event.detail === 2) {
      addUpdateChordModalPopup(index, selectedChord, songResponse?.id)
    }
  }

  return (
    <section className="SongDetailSection">
      <audio
        ref={myAudio}
        src={songResponse?.audio_url}
        type="audio/mp4"
        muted={!muteAudio}
        onLoadedMetadata={(e) => onMetadata(e)}
        onEnded={(e) => onEnded(e)}
        controls
      />
      <div className="container">
        <div className="SongDetailMain">
          <div className="TrackPlayDiv">
            <ul>
              <li>
                <div className="SongDetail">
                  <div className="SongImg">
                    <img src={songResponse?.image_url} alt="song logo" />
                  </div>
                  <div className="text-left">
                    <h6>{songResponse?.title}</h6>
                    <p>{songResponse?.artist?.name}</p>
                    <p>{totalTime}</p>
                  </div>
                </div>
              </li>
              <li onClick={playPauseToggle}>
                <div className="d-flex align-items-center PlayIconMain">
                  {playing ? (
                    <i className="Pause"></i>
                  ) : (
                      <i className="Play" ></i>
                    )}
                </div>
              </li>
              <li onClick={muteUnmuteToggle}>
                {muteAudio ? (
                  <>
                    <i className="Sound"></i>
                    <span>Song</span>
                  </>
                ) : (
                    <>
                      <i className="SoundOff"></i>
                      <span className="Gray">Song</span>
                    </>
                  )}
              </li>
              <li onClick={playPauseChordToggle}>
                {playChord ? (
                  <>
                    <i className="Sound"></i>
                    <span>Chords</span>
                  </>
                ) : (
                    <>
                      <i className="SoundOff"></i>
                      <span className="Gray">Chords</span>
                    </>
                  )}
              </li>
              <li onClick={resetBoxValue}>
                <i className="Reset"></i>
                <span>Reset</span>
              </li>
            </ul>
          </div>
          <div className="TrackMain" ref={track}>
            {[...Array(totalSeconds).keys()].map((value, index) => {
              const selectedChord = (songResponse?.chords || []).find(
                (chrd) => chrd.index === index
              );
              return (
                <div
                  className={
                    index === currentTime && index >= 0
                      ? 'Track TrackActive'
                      : 'Track'
                  }
                  key={index}
                  onClick={(e) => clickHandler(e, index, selectedChord)}
                >
                  <div className="LabelWrapper">
                    {selectedChord && (
                      <Chords
                        selectedChord={selectedChord}
                        isActive={index === currentTime && index >= 0}
                        playChord={playChord}
                      />
                    )}
                    <span className="bass-label"></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;
