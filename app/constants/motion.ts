// The site's shared animation pace. Mirrors the --motion-* variables in globals.css; keep the two in sync.
// FAST: hover feedback, and exits that clear the stage before a move.
// BASE: reveals and small moves.
// MOVE: anything that travels across the screen (fills, shrinks, sweeps, the nav opening).
// HOLD: the beat between two steps of a sequence.
export const FAST_S = 0.18;
export const BASE_S = 0.26;
export const MOVE_S = 0.44;
export const HOLD_S = 0.08;

export const EASE: [number, number, number, number] = [0.45, 0, 0.55, 1];
