import React, {FC} from 'react'
import {range} from 'lodash'
import {flowMax, addDisplayName, addProps} from 'ad-hok'

import {rotateVector, Angle} from 'utils/angles'
import {addRefsContext} from 'utils/refsContext'
import {ElementRef, Refs} from 'utils/refs'
import {Timeline, Point} from 'utils/types'
import getContextHelpers from 'utils/getContextHelpers'
import {toObjectKeys} from 'utils/fp'

const [
  addHideClipPathContextProvider,
  addHideClipPathContext,
] = getContextHelpers<{
  hideRectangleWidth: number
  hideRectangleHeight: number
  hideRectangleTopCorner: Point
  hideRectangleRotationAngle: Angle
}>(
  toObjectKeys([
    'hideRectangleWidth',
    'hideRectangleHeight',
    'hideRectangleTopCorner',
    'hideRectangleRotationAngle',
  ]),
)

export {addHideClipPathContextProvider, addHideClipPathContext}

export const HIDE_CLIP_PATH_ID = 'shapes-hide-clip-path'
const NUM_STRIPS = 10
const SLIDE_DURATION = 0.3
export const HIDE_DURATION = SLIDE_DURATION * NUM_STRIPS

export const initializeExitTimelineHideStripsAnimation = ({
  refs,
  exitTimeline,
  hideRectangleWidth,
  hideRectangleRotationAngle,
}: {
  refs: Refs
  exitTimeline: Timeline
  hideRectangleWidth: number
  hideRectangleRotationAngle: Angle
}) => {
  const slideRightUnrotatedVector = {
    x: hideRectangleWidth,
    y: 0,
  }
  const slideLeftUnrotatedVector = {
    x: -hideRectangleWidth,
    y: 0,
  }
  const slideRightRotatedVector = rotateVector(hideRectangleRotationAngle)(
    slideRightUnrotatedVector,
  )
  const slideLeftRotatedVector = rotateVector(hideRectangleRotationAngle)(
    slideLeftUnrotatedVector,
  )
  const hideStrips = (refs.hideStrips as unknown) as ElementRef[]
  hideStrips.forEach((strip, stripIndex) => {
    exitTimeline.to(strip, {
      x:
        stripIndex % 2 === 0
          ? slideRightRotatedVector.x
          : slideLeftRotatedVector.x,
      y:
        stripIndex % 2 === 0
          ? slideRightRotatedVector.y
          : slideLeftRotatedVector.y,
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
  addHideClipPathContext,
  addProps(
    ({number, hideRectangleHeight}) => ({
      startPointTopCornerDistance: (number / NUM_STRIPS) * hideRectangleHeight,
    }),
    ['number', 'hideRectangleHeight'],
  ),
  addProps(({hideRectangleRotationAngle: rotationAngle}) => ({
    rotationAngle,
  })),
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
  addProps(
    ({
      startPointTopCornerRotatedVector,
      hideRectangleTopCorner: topCorner,
    }) => ({
      startPoint: {
        x: topCorner.x + startPointTopCornerRotatedVector.x,
        y: topCorner.y + startPointTopCornerRotatedVector.y,
      },
    }),
    ['startPointTopCornerRotatedVector', 'hideRectangleTopCorner'],
  ),
  addProps(
    ({rotationAngle, hideRectangleWidth, hideRectangleHeight}) => ({
      topEdgeRotatedVector: rotateVector(rotationAngle)({
        x: hideRectangleWidth,
        y: 0,
      }),
      rightEdgeRotatedVector: rotateVector(rotationAngle)({
        x: 0,
        y: (hideRectangleHeight / NUM_STRIPS) * 1.1,
      }),
      bottomEdgeRotatedVector: rotateVector(rotationAngle)({
        x: -hideRectangleWidth,
        y: 0,
      }),
    }),
    ['rotationAngle', 'hideRectangleWidth', 'hideRectangleHeight'],
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

export const Strips: FC = flowMax(addDisplayName('Strips'), () => (
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
