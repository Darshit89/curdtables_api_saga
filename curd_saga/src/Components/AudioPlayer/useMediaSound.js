import { useCallback, useEffect, useState } from 'react';

const useModalSound = (audioUrl) => {
  const [audio, setAudio] = useState(null);
  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      setAudio(new Audio(audioUrl));
    }
  }, [setAudio, audioUrl]);

  const play = useCallback(() => {
    audio.play();
  }, [audio]);
  const pause = useCallback(() => {
    audio.pause();
  }, [audio]);
  return { play, pause };
};

export default useModalSound;
