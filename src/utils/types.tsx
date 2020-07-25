export type TransitionStatus =
  | 'exiting'
  | 'exited'
  | 'entering'
  | 'entered'
  | 'unmounted'

export type Timeline = gsap.core.Timeline

export interface Point {
  x: number
  y: number
}
