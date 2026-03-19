"use client"

import { useRef, useCallback, useEffect } from "react"
import type { Howl } from "howler"
import { useQuizStore } from "@/stores/quiz-store"

interface SoundMap {
  correct: Howl | null
  wrong: Howl | null
  submit: Howl | null
}

export function useQuizSounds() {
  const isMuted = useQuizStore((s) => s.isMuted)
  const soundsRef = useRef<SoundMap>({
    correct: null,
    wrong: null,
    submit: null,
  })
  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true

    import("howler").then(({ Howl }) => {
      soundsRef.current = {
        correct: new Howl({ src: ["/sounds/correct.mp3"], volume: 0.6 }),
        wrong: new Howl({ src: ["/sounds/wrong.mp3"], volume: 0.6 }),
        submit: new Howl({ src: ["/sounds/submit.mp3"], volume: 0.4 }),
      }
    })
  }, [])

  const playCorrect = useCallback(() => {
    if (!isMuted) soundsRef.current.correct?.play()
  }, [isMuted])

  const playWrong = useCallback(() => {
    if (!isMuted) soundsRef.current.wrong?.play()
  }, [isMuted])

  const playSubmit = useCallback(() => {
    if (!isMuted) soundsRef.current.submit?.play()
  }, [isMuted])

  return { playCorrect, playWrong, playSubmit }
}
