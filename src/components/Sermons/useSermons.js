"use client";

import { useCallback, useEffect, useState } from "react";
import { createSermonCache } from "@/lib/sermonCache";

const repository = createSermonCache(async (scope) => {
  const { readSermons } = await import("@/firebase/sermon-store");
  return readSermons(scope);
});

export default function useSermons(scope) {
  const [state, setState] = useState({ sermons: [], loading: true, error: "" });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    let active = true;
    setState((state) => ({ ...state, loading: true, error: "" }));
    repository
      .load(scope, { force: attempt > 0 })
      .then((sermons) => {
        if (active) setState({ sermons, loading: false, error: "" });
      })
      .catch(() => {
        if (active)
          setState({
            sermons: [],
            loading: false,
            error: "We couldn't load the sermons. Please try again.",
          });
      });
    return () => {
      active = false;
    };
  }, [scope, attempt]);
  return { ...state, retry };
}
