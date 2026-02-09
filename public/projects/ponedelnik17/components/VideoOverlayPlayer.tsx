
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface VideoOverlayPlayerProps {
  src: string;
  title: string;
  onClose: () => void;
}

const formatTime = (sec: number) => {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const s = Math.floor(sec);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
};

const VideoOverlayPlayer: React.FC<VideoOverlayPlayerProps> = ({ src, title, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [loadError, setLoadError] = useState<string>('');

  const progressPct = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (current / duration) * 100));
  }, [current, duration]);

  const stopRaf = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const v = videoRef.current;
    if (v && !isSeeking) setCurrent(v.currentTime || 0);
    rafRef.current = requestAnimationFrame(tick);
  }, [isSeeking]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => stopRaf();
  }, [stopRaf, tick]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoaded = () => setDuration(v.duration || 0);
    const onDurationChange = () => setDuration(v.duration || 0);

    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('durationchange', onDurationChange);

    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('durationchange', onDurationChange);
    };
  }, [src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
    v.muted = isMuted;
  }, [isMuted, volume]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    setLoadError('');

    const attempt = async () => {
      try {
        v.muted = false;
        setIsMuted(false);
        await v.play();
      } catch {
        try {
          v.muted = true;
          setIsMuted(true);
          await v.play();
        } catch {
          // Ignore: user gesture may be required.
        }
      }
    };

    void attempt();
  }, [src]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play();
        else v.pause();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;

    if (!v.paused) {
      v.pause();
      return;
    }

    try {
      await v.play();
    } catch {
      try {
        v.muted = true;
        setIsMuted(true);
        await v.play();
      } catch {
        // Ignore.
      }
    }
  }, []);

  const seekTo = useCallback((pct: number) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    v.currentTime = (pct / 100) * duration;
  }, [duration]);

  const requestFullscreen = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    const el: any = v.parentElement;
    if (!el) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (el.requestFullscreen) {
      await el.requestFullscreen();
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex items-center justify-between gap-4">
        <div className="text-[9px] md:text-[10px] font-unbounded tracking-[0.25em] md:tracking-[0.3em] text-white/40 uppercase">
          {title}
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 md:px-6 md:py-3 border border-white/20 hover:border-white text-[10px] font-unbounded tracking-[0.25em] md:tracking-[0.3em] uppercase transition-all"
        >
          ЗАКРЫТЬ
        </button>
      </div>

      <div
        className="absolute inset-0 pt-16 md:pt-24 pb-6 md:pb-10 px-3 md:px-6 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-6xl">
          <div className="w-full aspect-video bg-black border border-white/10 overflow-hidden relative">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={src}
              autoPlay
              playsInline
              muted={isMuted}
              preload="metadata"
              controls={false}
              onClick={togglePlay}
              onError={() => setLoadError('VIDEO LOAD ERROR')}
            />

            {loadError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="max-w-[90%] text-center">
                  <div className="text-[10px] font-unbounded tracking-[0.3em] text-white/60 uppercase">
                    {loadError}
                  </div>
                  <div className="mt-3 text-[10px] font-unbounded tracking-[0.2em] text-white/30 break-all">
                    {src}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="absolute left-0 right-0 bottom-0 p-2 md:p-4">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10">
                <div className="px-3 md:px-4 pt-3 md:pt-4">
                  <div className="h-[2px] bg-white/10 relative">
                    <div className="absolute left-0 top-0 h-full bg-white/60" style={{ width: `${progressPct}%` }} />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.1}
                      value={progressPct}
                      onMouseDown={() => setIsSeeking(true)}
                      onMouseUp={() => setIsSeeking(false)}
                      onTouchStart={() => setIsSeeking(true)}
                      onTouchEnd={() => setIsSeeking(false)}
                      onChange={(e) => seekTo(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                      aria-label="Seek"
                    />
                  </div>
                </div>

                <div className="px-3 md:px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <button
                      onClick={togglePlay}
                      className="px-4 py-3 sm:py-2 border border-white/20 hover:border-white text-[10px] font-unbounded tracking-[0.25em] md:tracking-[0.3em] uppercase transition-all"
                    >
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>

                    <div className="text-[10px] font-unbounded tracking-[0.2em] md:tracking-[0.25em] text-white/40 uppercase whitespace-nowrap">
                      {formatTime(current)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <button
                      onClick={() => setIsMuted((v) => !v)}
                      className="px-4 py-3 sm:py-2 border border-white/20 hover:border-white text-[10px] font-unbounded tracking-[0.25em] md:tracking-[0.3em] uppercase transition-all"
                    >
                      {isMuted ? 'UNMUTE' : 'MUTE'}
                    </button>

                    <div className="w-24 sm:w-28 h-[1px] bg-white/10 relative">
                      <div className="absolute left-0 top-0 h-full bg-white/60" style={{ width: `${Math.round(volume * 100)}%` }} />
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer"
                        aria-label="Volume"
                      />
                    </div>

                    <button
                      onClick={requestFullscreen}
                      className="px-4 py-3 sm:py-2 border border-white/20 hover:border-white text-[10px] font-unbounded tracking-[0.25em] md:tracking-[0.3em] uppercase transition-all"
                    >
                      FULL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[9px] md:text-[10px] font-unbounded tracking-[0.25em] md:tracking-[0.3em] text-white/20 uppercase">
            SPACE — play/pause · ESC — закрыть
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlayPlayer;
