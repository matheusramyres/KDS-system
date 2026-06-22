const activeSounds = new Map<number, HTMLAudioElement>();

export function playSound(orderId: number, type: "alert" | "late") {
  stopSound(orderId);

  const audio = new Audio(
    type === "alert" ? "/sounds/alert.mp3" : "/sounds/late.mp3",
  );

  audio.volume = 0.7;
  audio.loop = true;

  activeSounds.set(orderId, audio);

  audio.play();
}

export function stopSound(orderId: number) {
  const audio = activeSounds.get(orderId);

  if (audio) {
    audio.pause();
    audio.currentTime = 0;

    activeSounds.delete(orderId);
  }
}

export function stopAllSounds() {
  activeSounds.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });

  activeSounds.clear();
}
