import React, {FC} from 'react'
import {range} from 'lodash'
import {flowMax, addDisplayName, addProps} from 'ad-hok'

import {PI, rotateVector} from 'utils/angles'
import {addRefsContext} from 'utils/refsContext'
import {addSizeContext} from 'utils/sizeContext'
import {ElementRef, Refs} from 'utils/refs'
import {Timeline} from 'utils/types'

export const HIDE_CLIP_PATH_ID = 'shapes-hide-clip-path'
const NUM_STRIPS = 10
const RECT_WIDTH = 250
const RECT_HEIGHT = 230
const SLIDE_RIGHT_UNROTATED_VECTOR = {
  x: RECT_WIDTH,
  y: 0,
}
const SLIDE_LEFT_UNROTATED_VECTOR = {
  x: -RECT_WIDTH,
  y: 0,
}
const ROTATION_ANGLE = PI / 4
const SLIDE_RIGHT_ROTATED_VECTOR = rotateVector(ROTATION_ANGLE)(
  SLIDE_RIGHT_UNROTATED_VECTOR,
)
const SLIDE_LEFT_ROTATED_VECTOR = rotateVector(ROTATION_ANGLE)(
  SLIDE_LEFT_UNROTATED_VECTOR,
)
const SLIDE_DURATION = 0.3
export const HIDE_DURATION = SLIDE_DURATION * NUM_STRIPS

export const initializeExitTimelineHideStripsAnimation = ({
  refs,
  exitTimeline,
}: {
  refs: Refs
  exitTimeline: Timeline
}) => {
  const hideStrips = (refs.hideStrips as unknown) as ElementRef[]
  hideStrips.forEach((strip, stripIndex) => {
    exitTimeline.to(strip, {
      x:
        stripIndex % 2 === 0
          ? SLIDE_RIGHT_ROTATED_VECTOR.x
          : SLIDE_LEFT_ROTATED_VECTOR.x,
      y:
        stripIndex % 2 === 0
          ? SLIDE_RIGHT_ROTATED_VECTOR.y
          : SLIDE_LEFT_ROTATED_VECTOR.y,
      duration: SLIDE_DURATION,
      ease: 'linear',
    })
  })
}

interface StripProps {
  number: number
}

const Strip: FC<StripProps> = flowMax(
  addDisplayName('Strip'),
  addProps(
    ({number}) => ({
      startPointTopCornerDistance: (number / NUM_STRIPS) * RECT_HEIGHT,
    }),
    ['number'],
  ),
  addProps({
    rotationAngle: ROTATION_ANGLE,
  }),
  addProps(
    ({startPointTopCornerDistance}) => ({
      startPointTopCornerUnrotatedVector: {
        x: 0,
        y: startPointTopCornerDistance,
      },
    }),
    ['startPointTopCornerDistance'],
  ),
  addProps(
    ({startPointTopCornerUnrotatedVector, rotationAngle}) => ({
      startPointTopCornerRotatedVector: rotateVector(rotationAngle)(
        startPointTopCornerUnrotatedVector,
      ),
    }),
    ['startPointTopCornerUnrotatedVector', 'rotationAngle'],
  ),
  addSizeContext,
  addProps(
    ({width, height}) => ({
      topCorner: {
        x: width * 0.35,
        y: -height * 0.22,
      },
    }),
    ['width', 'height'],
  ),
  addProps(
    ({startPointTopCornerRotatedVector, topCorner}) => ({
      startPoint: {
        x: topCorner.x + startPointTopCornerRotatedVector.x,
        y: topCorner.y + startPointTopCornerRotatedVector.y,
      },
    }),
    ['startPointTopCornerRotatedVector', 'topCorner'],
  ),
  addProps(
    ({rotationAngle}) => ({
      topEdgeRotatedVector: rotateVector(rotationAngle)({
        x: RECT_WIDTH,
        y: 0,
      }),
      rightEdgeRotatedVector: rotateVector(rotationAngle)({
        x: 0,
        y: (RECT_HEIGHT / NUM_STRIPS) * 1.1,
      }),
      bottomEdgeRotatedVector: rotateVector(rotationAngle)({
        x: -RECT_WIDTH,
        y: 0,
      }),
    }),
    ['rotationAngle'],
  ),
  addRefsContext,
  ({
    startPoint,
    topEdgeRotatedVector,
    rightEdgeRotatedVector,
    bottomEdgeRotatedVector,
    setRef,
    number,
  }) => (
    <path
      ref={setRef(`hideStrips.${number}`)}
      d={`
            M ${startPoint.x} ${startPoint.y}
            l ${topEdgeRotatedVector.x} ${topEdgeRotatedVector.y}
            l ${rightEdgeRotatedVector.x} ${rightEdgeRotatedVector.y}
            l ${bottomEdgeRotatedVector.x} ${bottomEdgeRotatedVector.y}
            Z
          `}
      fill="none"
      stroke="pink"
      strokeWidth={2}
    />
  ),
)

const Strips: FC = flowMax(addDisplayName('Strips'), () => (
  <>
    {range(NUM_STRIPS).map((stripNum) => (
      <Strip number={stripNum} key={stripNum} />
    ))}
  </>
))

const HideClipPath: FC = flowMax(addDisplayName('HideClipPath'), () => (
  <clipPath id={HIDE_CLIP_PATH_ID}>
    <Strips />
  </clipPath>
))

export default HideClipPath
