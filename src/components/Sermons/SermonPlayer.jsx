"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, SkipForward, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAudioTime } from "@/lib/sermonData";

export default function SermonPlayer({
  sermon,
  playRequest,
  onPlaybackChange,
  onClose,
}) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const previousId = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    let active = true;
    const changed = previousId.current !== sermon.id;
    previousId.current = sermon.id;
    if (changed) {
      setPosition(0);
      setDuration(0);
      setError("");
    }
    if (!changed && !audio.paused) {
      audio.pause();
      return;
    }
    setLoading(true);
    audio.play().catch((cause) => {
      if (!active || cause.name === "AbortError") return;
      setLoading(false);
      setError(
        cause.name === "NotAllowedError"
          ? "Press play below to start listening."
          : "This recording couldn't play. Try again or open the audio file.",
      );
    });
    return () => {
      active = false;
    };
  }, [sermon.id, playRequest]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
    };
  }, []);

  const updatePlaying = (value) => {
    setPlaying(value);
    onPlaybackChange(value);
  };
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio.paused) return audio.pause();
    setError("");
    setLoading(true);
    audio.play().catch(() => {
      setLoading(false);
      setError(
        "This recording couldn't play. Try again or open the audio file.",
      );
    });
  };
  const seek = (seconds) => {
    if (!duration) return;
    const next = Math.max(0, Math.min(duration, seconds));
    audioRef.current.currentTime = next;
    setPosition(next);
  };

  return (
    <section
      aria-label="Sermon audio player"
      className="rounded-3xl border border-primary/20 bg-secondary/60 p-5 md:p-6"
    >
      <audio
        ref={audioRef}
        src={sermon.audioUrl}
        preload="none"
        onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) =>
          setDuration(
            Number.isFinite(event.currentTarget.duration)
              ? event.currentTarget.duration
              : 0,
          )
        }
        onPlay={() => updatePlaying(true)}
        onPause={() => {
          updatePlaying(false);
          setLoading(false);
        }}
        onPlaying={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onEnded={() => {
          updatePlaying(false);
          setLoading(false);
        }}
        onError={() => {
          updatePlaying(false);
          setLoading(false);
          setError(
            "This recording couldn't play. Try again or open the audio file.",
          );
        }}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow">
            {loading
              ? "Loading audio"
              : playing
                ? "Now playing"
                : "Ready to listen"}
          </p>
          <h2 className="mt-2 break-words text-lg font-semibold">
            {sermon.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{sermon.pastor}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close audio player"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Button
          onClick={toggle}
          size="icon"
          aria-label={playing ? "Pause sermon" : "Play sermon"}
        >
          {playing ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
        <div className="min-w-0 flex-1">
          <label htmlFor="sermon-progress" className="sr-only">
            Seek within sermon
          </label>
          <input
            id="sermon-progress"
            type="range"
            min="0"
            max={duration || 1}
            step="1"
            value={Math.min(position, duration || 1)}
            onChange={(event) => seek(Number(event.target.value))}
            disabled={!duration}
            aria-valuetext={`${formatAudioTime(position)} of ${formatAudioTime(duration)}`}
            className="h-8 w-full cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default"
          />
          <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{formatAudioTime(position)}</span>
            <span>{formatAudioTime(duration)}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => seek(position - 15)}
          disabled={!duration}
          aria-label="Rewind 15 seconds"
        >
          <RotateCcw className="mr-1.5 h-4 w-4" aria-hidden="true" />
          15 seconds
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => seek(position + 15)}
          disabled={!duration}
          aria-label="Forward 15 seconds"
        >
          <SkipForward className="mr-1.5 h-4 w-4" aria-hidden="true" />
          15 seconds
        </Button>
        <label className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          Speed
          <select
            aria-label="Playback speed"
            defaultValue="1"
            onChange={(event) => {
              audioRef.current.playbackRate = Number(event.target.value);
            }}
            className="min-h-10 rounded-lg border border-border bg-background px-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
              <option key={rate} value={rate}>
                {rate}x
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="mt-2 text-sm text-muted-foreground">
        {error && (
          <>
            {error}{" "}
            <a
              href={sermon.audioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4"
            >
              Open audio
            </a>
          </>
        )}
      </p>
    </section>
  );
}
