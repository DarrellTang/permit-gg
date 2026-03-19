"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"

interface QuitDialogProps {
  open: boolean
  onClose: () => void
  onQuit: () => Promise<void>
}

export function QuitDialog({ open, onClose, onQuit }: QuitDialogProps) {
  const [isSaving, setIsSaving] = useState(false)

  const handleQuit = async () => {
    setIsSaving(true)
    try {
      await onQuit()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mx-4 w-full max-w-sm rounded-2xl border border-border/60 bg-card p-6 shadow-xl"
          >
            <h2 className="font-display text-lg font-bold text-foreground">
              Quit quiz?
            </h2>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Your progress so far will be saved.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 font-ui text-sm"
                disabled={isSaving}
              >
                Keep Going
              </Button>
              <Button
                onClick={handleQuit}
                variant="destructive"
                className="flex-1 font-ui text-sm"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Quit"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
