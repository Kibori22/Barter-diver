// BeatGenerator.js
import * as Tone from 'tone';

export const startBeat = (tempo = 90) => {
  Tone.Transport.bpm.value = tempo;

  // Simple Kick-Snare loop
  const drumKit = new Tone.MembraneSynth().toDestination();
  const snare = new Tone.NoiseSynth().toDestination();

  const loop = new Tone.Loop((time) => {
    drumKit.triggerAttackRelease("C1", "8n", time); // Kick on every beat
    if (Math.random() > 0.5) {
      snare.triggerAttackRelease("8n", time + 0.5); // Random Snare
    }
  }, "4n").start(0);

  Tone.Transport.start();
};
