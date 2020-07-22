import {random} from 'lodash/fp'

export type Angle = number

const {PI, sin, cos} = Math

export {PI, sin, cos}

export const getAngleFromVertical = (radians: Angle) =>
  radians > PI ? PI * 2 - radians : radians

export const getAngleDifference = (firstAngle: Angle, secondAngle: Angle) => {
  const difference = Math.abs(firstAngle - secondAngle)
  return difference > PI ? 2 * PI - difference : difference
}

export const getRandomAngle = ({
  startPosition,
}: {
  startPosition: Angle
}): Angle => {
  while (true) {
    const angle = random(2 * PI, true)
    if (getAngleDifference(angle, startPosition) > PI * 0.5) return angle
  }
}

export interface Vector {
  x: number
  y: number
}

export const rotateVector = (radians: Angle) => ({x, y}: Vector): Vector => ({
  x: x * cos(radians) - y * sin(radians),
  y: x * sin(radians) + y * cos(radians),
})
