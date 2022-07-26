import React, { useEffect } from 'react';
import useMediaSound from './useMediaSound';

const Chords = ({ selectedChord, isActive, playChord }) => {
  const { play } = useMediaSound(selectedChord.audio_url);

  useEffect(() => {
    if (!isActive || !playChord) {
      return;
    }
    play();
  }, [isActive, play, playChord]);

  return (<span className="chord-label icon-rest">{selectedChord.name}</span>
  );
};
export default Chords;
