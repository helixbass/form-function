import React, {FC} from 'react'
import {
  flowMax,
  addDisplayName,
  addProps,
  addEffect,
  addState,
  addStateHandlers,
} from 'ad-hok'
import {Link} from '@reach/router'
import gsap from 'gsap'
import {
  addLayoutEffectOnMount,
  suppressUnlessProp,
  addPropTrackingRef,
} from 'ad-hok-utils'
import {Transition} from 'react-transition-group'
import {range} from 'lodash'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'
import {DrawSVGPlugin} from 'utils/gsap/DrawSVGPlugin'
import {addRefs, RefsProps, ElementRef} from 'utils/refs'
import addLocation from 'utils/addLocation'
import typedAs from 'utils/typedAs'
import {PI, rotateVector} from 'utils/angles'
import getContextHelpers from 'utils/getContextHelpers'
import {toObjectKeys} from 'utils/fp'

gsap.registerPlugin(DrawSVGPlugin)

type TransitionStatus =
  | 'exiting'
  | 'exited'
  | 'entering'
  | 'entered'
  | 'unmounted'

const [addRefsContextProvider, addRefsContext] = getContextHelpers<RefsProps>(
  toObjectKeys(['refs', 'setRef']),
)

const SHAPES_WIDTH = 314
const SHAPES_HEIGHT = 234
const SHAPES_SCALE = 1.84

const SHAPES_HIDE_CLIP_PATH_ID = 'shapes-hide-clip-path'
const SHAPES_HIDE_TOP_CORNER = {
  x: SHAPES_WIDTH * 0.35,
  y: -SHAPES_HEIGHT * 0.22,
}
const SHAPES_HIDE_NUM_STRIPS = 10
const SHAPES_HIDE_RECT_WIDTH = 250
const SHAPES_HIDE_RECT_HEIGHT = 230
const SHAPES_HIDE_SLIDE_RIGHT_UNROTATED_VECTOR = {
  x: SHAPES_HIDE_RECT_WIDTH,
  y: 0,
}
const SHAPES_HIDE_SLIDE_LEFT_UNROTATED_VECTOR = {
  x: -SHAPES_HIDE_RECT_WIDTH,
  y: 0,
}
const SHAPES_HIDE_ROTATION_ANGLE = PI / 4
const SHAPES_HIDE_SLIDE_RIGHT_ROTATED_VECTOR = rotateVector(
  SHAPES_HIDE_ROTATION_ANGLE,
)(SHAPES_HIDE_SLIDE_RIGHT_UNROTATED_VECTOR)
const SHAPES_HIDE_SLIDE_LEFT_ROTATED_VECTOR = rotateVector(
  SHAPES_HIDE_ROTATION_ANGLE,
)(SHAPES_HIDE_SLIDE_LEFT_UNROTATED_VECTOR)
const SHAPES_HIDE_SLIDE_DURATION = 0.3
const SHAPES_HIDE_DURATION =
  SHAPES_HIDE_SLIDE_DURATION * SHAPES_HIDE_NUM_STRIPS * 1000

interface ShapesHideStripProps {
  number: number
}

const ShapesHideStrip: FC<ShapesHideStripProps> = flowMax(
  addDisplayName('ShapesHideStrip'),
  addProps(
    ({number}) => ({
      startPointTopCornerDistance:
        (number / SHAPES_HIDE_NUM_STRIPS) * SHAPES_HIDE_RECT_HEIGHT,
    }),
    ['number'],
  ),
  addProps({
    rotationAngle: SHAPES_HIDE_ROTATION_ANGLE,
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
  addProps(
    ({startPointTopCornerRotatedVector}) => ({
      startPoint: {
        x: SHAPES_HIDE_TOP_CORNER.x + startPointTopCornerRotatedVector.x,
        y: SHAPES_HIDE_TOP_CORNER.y + startPointTopCornerRotatedVector.y,
      },
    }),
    ['startPointTopCornerRotatedVector'],
  ),
  addProps(
    ({rotationAngle}) => ({
      topEdgeRotatedVector: rotateVector(rotationAngle)({
        x: SHAPES_HIDE_RECT_WIDTH,
        y: 0,
      }),
      rightEdgeRotatedVector: rotateVector(rotationAngle)({
        x: 0,
        y: (SHAPES_HIDE_RECT_HEIGHT / SHAPES_HIDE_NUM_STRIPS) * 1.1,
      }),
      bottomEdgeRotatedVector: rotateVector(rotationAngle)({
        x: -SHAPES_HIDE_RECT_WIDTH,
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
      ref={setRef(`shapesHideStrips.${number}`)}
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

const ShapesHideStrips: FC = flowMax(addDisplayName('ShapesHideStrips'), () => (
  <>
    {range(SHAPES_HIDE_NUM_STRIPS).map((stripNum) => (
      <ShapesHideStrip number={stripNum} key={stripNum} />
    ))}
  </>
))

const ShapesHideClipPath: FC = flowMax(
  addDisplayName('ShapesHideClipPath'),
  () => (
    <clipPath id={SHAPES_HIDE_CLIP_PATH_ID}>
      <ShapesHideStrips />
    </clipPath>
  ),
)

interface ShapesProps {
  hide: boolean
  transitionState: TransitionStatus
}

const Shapes: FC<ShapesProps> = flowMax(
  addDisplayName('Shapes'),
  addRefsContext,
  addState('enterTimeline', 'setEnterTimeline', () =>
    gsap.timeline({paused: true}),
  ),
  addPropTrackingRef('transitionState', 'transitionStateRef'),
  addState(
    'exitTimeline',
    'setExitTimeline',
    ({transitionStateRef, enterTimeline}) =>
      gsap.timeline({
        paused: true,
        onComplete: function () {
          const {current: transitionState} = transitionStateRef
          if (['exiting', 'exited'].includes(transitionState)) return

          this.progress(0).pause()
          enterTimeline.restart()
        },
      }),
  ),
  addLayoutEffectOnMount(({refs, enterTimeline, setEnterTimeline}) => () => {
    const {circleOutline, circleScribble} = refs
    setEnterTimeline(
      enterTimeline
        .from(circleOutline, {
          drawSVG: '0%',
          duration: 1,
        })
        .from(circleScribble, {
          drawSVG: '0%',
          duration: 6,
          ease: 'linear',
        })
        .play(),
    )
  }),
  // eslint-disable-next-line ad-hok/dependencies
  addEffect(
    ({hide, refs, enterTimeline, exitTimeline}) => () => {
      if (!hide) {
        if (exitTimeline.isActive()) return
        enterTimeline.play()
        return
      }
      const shapesHideStrips = (refs.shapesHideStrips as unknown) as ElementRef[]
      shapesHideStrips.forEach((strip, stripIndex) => {
        exitTimeline.to(strip, {
          x:
            stripIndex % 2 === 0
              ? SHAPES_HIDE_SLIDE_RIGHT_ROTATED_VECTOR.x
              : SHAPES_HIDE_SLIDE_LEFT_ROTATED_VECTOR.x,
          y:
            stripIndex % 2 === 0
              ? SHAPES_HIDE_SLIDE_RIGHT_ROTATED_VECTOR.y
              : SHAPES_HIDE_SLIDE_LEFT_ROTATED_VECTOR.y,
          duration: SHAPES_HIDE_SLIDE_DURATION,
          ease: 'linear',
        })
      })
      exitTimeline.play()
      enterTimeline.pause()
    },
    ['hide'],
  ),
  ({setRef}) => (
    <div css={styles.shapesContainer}>
      <svg
        viewBox={`0 0 ${SHAPES_WIDTH} ${SHAPES_HEIGHT}`}
        height={SHAPES_HEIGHT * SHAPES_SCALE}
        width={SHAPES_WIDTH * SHAPES_SCALE}
      >
        <defs>
          <ShapesHideClipPath />
        </defs>
        <g
          ref={setRef('container')}
          clipPath={`url(#${SHAPES_HIDE_CLIP_PATH_ID})`}
          fill="black"
        >
          <circle
            ref={setRef('circleOutline')}
            cx="113.2"
            cy="113.2"
            r="111.2"
            css={styles.circleOutline}
          />
          <path
            ref={setRef('circleScribble')}
            d="M27.1,44.5c0.5,0.6,18.2-17.3,18.7-16.8c0.8,0.8-33.6,40.4-32.9,41.2c1.4,1.5,65.9-62.5,67.5-60.7 c2,2.2-68.8,70.4-67.3,72.1C15.4,82.8,93.6,3.9,95.5,6c2.6,2.8-96,93.3-93.4,96.2C4.7,105.1,108.2,0.9,111,4.1 c2.8,3.2-107.6,104.6-105.5,107C8.1,114,124-0.9,126.6,2.1c2.9,3.2-123.6,118.5-121,121.4C8.4,126.5,126,8.3,129.3,12.1 c3,3.3-119.6,114.2-117.1,117c3.1,3.4,125.2-119,128.3-115.5C144,17.3,3,143.5,5.7,146.6C8.7,149.9,148,12.5,151,15.8 c2.9,3.2-141,132.6-138.1,135.8c3,3.3,149.7-142,153.3-138c4,4.4-151,141.3-147.4,145.2c3.5,3.9,147.7-139,150.7-135.7 c3.3,3.7-154.4,143-150.6,147.2C22.8,174.7,179.1,19,182.6,22.9c3.5,3.9-158.2,145.9-154.2,150.4c3,3.3,155.4-148.7,159.8-143.8 c3.2,3.6-160.4,150.9-157.4,154.2C34.9,188.3,188,35.2,191.5,39.1c3.8,4.2-152.7,144-149.8,147.2c4.4,4.9,153-144.2,156.2-140.6 c4.3,4.7-161.9,151-158.5,154.7c3.6,4,165.2-155.4,168.5-151.7c3.4,3.7-165.4,153.9-161.8,158c3.3,3.6,163.4-154.6,167.1-150.5 c3.2,3.5-159,148.3-155.6,152.1c4.2,4.7,156.3-147,159.4-143.5C221,69.3,65.4,206.4,69,210.4C73.1,215,215.2,72.5,218.3,75.9 c3.4,3.8-150.5,139.6-146.4,144.2c4,4.4,147.8-140.3,151.4-136.3c3.3,3.6-142.5,134.6-139.3,138.1 c3.4,3.8,131.4-125.8,135.2-121.7c3,3.3-126.7,120.5-124,123.5c2.3,2.6,126-119.1,128.8-116c3.1,3.5-116.6,111.7-113.8,114.7 c2.2,2.5,110.2-104.3,112.7-101.5c2.2,2.5-99.7,96.5-97,99.5c1.9,2.1,90.5-86.2,92.8-83.6c1.8,2-86.7,85.1-84.3,87.7 c1.8,2,79.7-76,81.8-73.7c1.5,1.7-59,62.9-57.8,64.3c1.1,1.3,55.2-51.9,56.3-50.7"
            css={styles.circleScribble}
          />
        </g>
      </svg>
    </div>
  ),
)

interface FunctionProps {
  hide: boolean
}

const Function: FC<FunctionProps> = flowMax(addDisplayName('Function'), () => (
  <div css={styles.shapesContainer}>
    <svg>
      <path
        d="M39,113.3l0.7,1.6l1.5,1.3l2,4.2c0.4,0.9,0,1.6,0.5,2.5c0.4,0.4,0.7,1.1,0.7,1.6v1.3c0.2,0.9,0.5,1.8,0.5,2.7 c0.2,0.9,0.2,2,0.2,3.1l0.5,3.4v2.5c0,0.4-0.2,0.7-0.2,1.3l-0.2,3.6c-0.9,13-5.3,25-8.2,30.6c0,0-0.2,0.4-0.4,0.5 c0,0.5-0.5,1.1-0.5,1.8l-0.7,0.5c-0.7,0.7-1.5,2.9-2.2,4l-3.4,4.3c-0.4,0.5-0.7,0.9-1.6,0.9L25,187c-0.9,0.5-1.5,0.7-2.4,0.7h-0.9 c-1.6,0-3.1-0.4-4.7-0.5c-1.1-0.2-5.3-2.2-6.5-2.7c-1.5-0.9-4.4-2.5-5.6-4.5l-2.2-4.7c-0.4-0.7,0-1.6-0.7-2v-0.7 c0-0.4-0.2-0.7-0.2-1.1c-0.4-0.9-0.5-2.4-1.3-3.3c-0.2,0-0.2-0.4-0.2-0.5v-1.4c0-0.2,0-0.4,0.2-0.7l-0.2-1.8c0-0.5-0.4-1.1-0.4-1.6 c0-0.4,0.2-0.5,0.2-0.7V159c0-2.4,0-4.5,0.4-6.5v-5.8c0-0.9,0.4-2.2,0.4-3.3c0.4-2.4,0.7-4.9,0.9-7.4c0.4-3.3,0.7-6.3,1.5-9.4 c1.5-8.5,3.1-15.6,4.5-21.6c-0.2-0.4-0.2-0.7-0.2-1.1c0-1.3,0.5-2,1.3-2.7l2.2-8.2c3.3-12.5,4.7-17.9,6.3-23L22.8,54 c3.4-10.5,8.2-21,13-30.8c1.4-3.6,9.8-18.1,14-18.1c0.7,0,8,4.5,8.5,5.1c1.1,0.7,2.4,1.3,3.4,2.4c1.3,1.1,2,2.9,2,4.7v0.7 c0,3.1-0.7,6-1.5,8.7c-0.5,2.9-1.4,5.6-2.2,8.5c-0.5,2.2-1.4,4.5-2.2,6.7l-7.4,19c-1.8,3.1-3.3,6.3-5.3,9.8 c-3.1,7.1-7.6,14-11.8,20.5l-4,6.3c12-3.6,26.3-12.3,37.3-23.4c0.2-0.2-0.7,1.6-0.7,2.5c0,0.2,0.2,0.5,0.2,0.5v1.3 c0.2,0-0.7,1.3-0.7,1.3V81c0,0.7,0,1.4-0.2,1.6l-0.9,1.5c-8,9.1-20.7,17.2-33,21.4c2.7,1.8,4.4,3.4,6,4.9c-0.2,0.2-0.4,0.5-0.4,0.7 c0,0.4,0.5,0.7,0.9,0.7c1.3,0.5,2.2,2,2.9,3.6l-1.4-1.8C39.3,113.5,39.1,113.3,39,113.3z M15.6,171.5c0.2,0.4,0.2,0.9,0.2,1.3 c0.4,2.2,0.5,4.3,1.8,6.3c0.4,0.9,1.3,1.6,2.2,1.8c1.1,0,2.2-0.4,2.9-1.3c1.3-1.1,2.2-2.5,3.4-4c1.1-1.4,1.4-2.7,2.4-4.2 c0.7-1.1,0.7-2,1.5-2.9c0.4-1.1,0.9-1.8,1.3-2.5l1.3-3.4c0.9-2.2,2.4-8.3,2.9-10.7c0.5-1.1,0.5-2.4,0.7-3.4c0-0.5,0.4-1.3,0.5-2 c0-0.4,0.2-0.7,0.2-1.1v-0.7c0-0.5,0-1.5,0.5-3.3v-0.7c0-0.9,0.2-2,0.2-3.1l-0.4-5.6c-0.2-2-0.4-3.8-0.9-5.4 c-0.4-2.2-0.7-4.2-1.8-5.8c-0.5-0.9-1.3-1.8-1.6-2.7c-0.7-2.2-2.5-3.1-4-4.9c-0.4-0.4-5.8-2.9-5.8-2.9c-0.4,0.2-0.5,0.2-0.5,0.7 c-1.6,8-4,15-6.5,37.7c-0.4,4-0.7,8-0.7,11.8v6.2C15.2,168.2,15.4,169.8,15.6,171.5z M15.4,81c0.2,0.2,0.9-1.1,0.9-1.1 s0.4,0,0.4-1.1c0.2,0-0.4-0.5-0.4-0.4C16.3,78.8,15.6,80.7,15.4,81z M24.5,80.1l-0.4,2.2c0,0.2,0.7-0.7,0.7-0.7 c0.2,0,0.4-1.1,0.4-1.3C24.8,80.3,24.5,80.1,24.5,80.1z M28.5,79l0.5-1.1c0-0.4,0.4-0.7,0.4-0.9c0,0-1.1,0.2-1.1,0.4 C28.3,78.1,28.5,78.5,28.5,79z M30.1,65.4v-1.1c-0.5,0-0.9,0-0.9,0.7C29.2,65.1,29.5,65.2,30.1,65.4z M31.4,70.9 c-0.2-0.4-1.1,2-1.1,2.2c-0.2,0.2-0.2,0.5-0.2,0.7l0.5-0.9C31,72.3,31,71.8,31.4,70.9z M50.4,26.8l-2.7,4.7c0,0.2-0.2,0.4-0.2,0.7 c-0.2,0.2-0.2,0.5-0.2,0.7l-4.5,9.6c-1.3,2.4-2.2,5.1-3.3,7.8c-0.2,0.7-0.5,1.5-1.1,2c0,0.7-0.5,1.3-0.5,2.4 c0.2,0.2,0.2,0.4,0.2,0.5l-0.5,0.9c0,1.5-1.5,2.5-1.8,4.2c0,0.9-0.5,1.3-0.5,1.6c0,0.2-0.2,0.2-1.6,4.9l-0.9,2.5 c-0.4,0.5-0.5,1.6-0.5,2.4l-0.9,2C31,75,30.3,77,30.3,77c2.7-3.8,5.8-10.3,7.8-14.3l5.1-10.5c1.6-3.6,3.3-7.2,4.7-11.2 c2-4.9,3.4-9.6,5.3-14.5l0.9-4.4c-1.5,0-2.2,2.2-2.7,3.1C50.7,25.7,50.7,26.5,50.4,26.8z M30.4,89.4c1.1-0.5,2-2.7,2-3.1 c0.2,0,0.2-0.2,0.5-0.7C31.7,86.1,30.8,87.2,30.4,89.4z M34.6,80.3c0.7-0.7,2.2-2.9,2-2.9c-0.2,0.2-0.4-0.4-0.4-0.4 C35.3,77.9,34.6,79,34.6,80.3z M36.4,170.6c0.4-0.7,0.9-1.5,0.9-1.8c0,0-0.9,0.7-1.1,1.3C36.2,170.4,36.4,170.4,36.4,170.6z M43.1,126.1c0-0.4-0.4-1.8-0.5-2c0-0.5-0.2-0.9-0.4-1.1c0,0.4,0.2,0.9,0.4,1.3c0,0.2,0.2,0.4,0.2,0.5c-0.2,0.2-0.4,0.5-0.4,0.7 c0,0.5,0.4,1.3,0.9,1.3L43.1,126.1z M43,137.2v-3.1c-0.2-0.2-0.2-0.9-0.2-0.9c-0.2,0-0.4,0.7-0.4,0.9l0.2,3.1 c-0.2,0.4-0.2,0.5-0.2,0.7s0,0.5,0.4,0.7c0,0-0.2-0.4-0.2-0.5C42.6,137.7,42.8,137.6,43,137.2z M43.1,130.9c0,0.2,0.4,0.2,0.5,0.2 l-0.2-1.3c0-0.4,0.2-0.7,0.4-1.1c0-0.2-0.2-0.4-0.2-0.5c-0.4,0.2-0.5,1.3-0.5,1.6V130.9z M44,144.5l0.4-1.4 c-0.2-0.2-0.5,0.7-0.5,0.9C43.9,144.1,44,144.3,44,144.5c-0.2,0.2-0.5,0.4-0.5,0.4s0.2,0.7,0.2,1.3C44,145.7,43.9,145,44,144.5z M62.5,84.1c0.7-0.4,1.3-0.9,1.3-1.5c0-0.2-0.2-0.9-0.2-0.9C63.4,81.7,63.1,83.7,62.5,84.1z"
        css={styles.functionPath}
      />
      <path
        d="M73,71.4c0-2,1.1-4.7,1.6-6.7c6.3-22.1,15.6-44.9,31-62.5c1.6-1.6,3.6-2.2,5.8-2.2h1.8c0.9,0,4.3,0.2,5.1,1.3 c0.4,0.4,0.4,0.5,0.4,0.9c0,0.7-0.5,1.5-0.5,2.9c-0.2,1.4-1.1,2.2-1.8,3.3c-17.2,25-30.8,63.8-30.8,94.6c0,14,3.4,27.5,13.6,36.6 c0.2,0.4,0.7,0.5,0.9,0.9c0,0-0.7,0.4-0.9,0.5c-0.5,0.2-1.1,0.4-1.6,0.4c-0.4,0.2-0.7,0.2-1.1,0.2c-0.7,0-3.8,0-4.2,0.2l-3.1,0.2 c-0.4,0.2,1.1,0.5,0.7,0.5h-1.5c-1.5,0-4.9-1.6-6.3-3.1c-1.3-1.1-2.2-2-3.3-3.4c-0.4-0.4-0.4-1.6-0.9-1.6c0,0,0.2,0.4,0.2,0.5 c0-0.2-1.1-1.5-1.3-1.6l-0.5-1.3c-0.7-1.1-0.9-2-1.5-2.9l-0.7-1.1c-0.5-2.4-0.9-2.5-0.9-2.4c0-0.5-0.4-3.4-1.1-3.6 c0,0-0.4-1.5-0.7-2l-1.3-11.6v-4.2c0-2.2,0.4-4.9,0.5-7.4c0-0.9,0.2-1.6,0.2-2.5c0,0.5-0.9,1.5-1.1,1.3c0-3.3,1.8-15.2,2.4-16.1 v-1.3c0-0.5,0.2-1.8,1.3-5.3l1.8-6.3c0.2-1.3,0.7-2.7,0.9-4L73,71.4z M71.4,108.2c0-0.2,0.2-0.4,0.2-0.5v-3.8 c-0.2,0-0.4,3.3-0.4,3.8C71.2,107.8,71.4,108,71.4,108.2z M73.9,122.7c0-0.4,0.2-0.7,0.2-0.9l-1.6-9.4c0,1.8,0.4,3.6,0.5,5.6 c-0.4-0.4-0.4-1.6-0.5-2l-0.7-5.4c0,0.9,0.2,6.2,0.5,7.1c0,0.2,0.4,2.7,0.5,2.7c0.2,1.6,1.1,3.8,1.4,5.3c0,0.2,0.4,1.3,0.4,1.3 s0-0.9,0-2.4L73.9,122.7z M73.9,118.4c0,0.4,0.2,1.8,0.5,1.6c-0.2-0.4-0.5-4.7-1.1-4.5L73.9,118.4z M75.9,128 c0-0.7-0.2-1.8-0.5-2.4C75.4,126.9,75.8,127.8,75.9,128z M80.7,136.7c0-1.3-2-3.3-2-3.1c0,0.4,0.4,1.1,1.5,2.7L80.7,136.7z M83.2,137.9l-0.2-0.5c-0.2-0.7-1.3-1.3-1.6-1.5c0,0.4,0.7,1.1,1.1,1.3C82.5,137.6,83.2,138.1,83.2,137.9z M84.5,139.4 c-0.2,0.4-0.4,0.4-0.4,0.5c0.4,0.4,0.9,0.9,1.3,1.1L84.5,139.4z"
        css={styles.functionPath}
      />
      <path
        d="M148.4,58c2.4,0,3.8,1.1,5.1,3.1c0.7,1.3,5.4,17.6,5.4,17.6l4.9-6.3c4-4.9,12.5-15,18.1-17.8 c0.9-0.5,1.6-1.6,2.7-1.6c0.9,0,1.8-0.5,2.7-0.5c0.4,0,0.7,0,1.3,0.2c0.2,0.5,0.7,1.8,0.7,2.4s-1.6,1.1-2,1.1 c-0.4,0.2-0.5,0.2-0.7,0.2c0.2,0.7,0.4,0.7,0.5,0.7h0.7c-0.4,0.4-0.4,0.5-0.5,0.5l-1.5,1.1c-4.9,4.5-24.3,27.7-24.3,30.6 c2,8.7,4.5,19.2,10.5,26.8c0.2,0.2,0.9,0.5,0.9,0.9c0,0.2-0.2,0.4-0.5,0.7c-0.2,0.4-0.4,0.5-0.7,0.5c-0.4,0-0.7,0-1.1,0 c0.2,0.2,0.5,0.2,0.5,0.2v0.9c0,0-0.7-0.2-1.1-0.5c0-0.2-0.4-0.2-0.5-0.2c0,0.5-0.4,0.7-0.9,0.7c-0.7,0-1.3,0.2-2.2,0.5 c-0.4,0.2-0.7,0.2-1.1,0.2c-0.7,0-3.1,1.6-4.2,1.6c-1.8,0-2.5-0.9-3.3-2c-2-2.2-5.4-9.8-7.4-16.3c-2.9,4.3-9.8,14.1-11.6,15.2 l-1.6,1.1c-0.4,0-0.5,0-0.7-0.2c0,0-0.2-0.7-0.2-0.9c-0.2,0-0.7,0.2-1.1,0.2s-1.1-1.8-1.3-1.8c0,0-0.5,1.1-1.6,1.1 c-0.2,0-0.4,0-0.5-0.2c-1.5,0-2-0.7-2.7-1.5c0-0.2,0.2-0.9,0.4-1.1c2.7-0.2,4.3-2.7,5.6-4.7c3.6-5.4,6-8.3,9.8-13.8l2.4-3.6v-0.7 c0-0.2,0-0.4-0.2-0.5l-5.1-19.2c-0.5-2.4-3.4-8-3.4-10.1c0-0.7,1.5-1.6,1.6-1.6c0.4,0,0.7,0.4,0.9,0.4 C142.8,59.8,146.1,58,148.4,58z M160.2,120l-0.5-0.4l-2.5-4l0.9,2c0,0.9,1.1,2.7,1.5,2.9c0.5,0.5,0.7,0.5,0.7,0.5 c0.2,0,0.4,0,0.5-0.2C160.8,120.5,160.2,120.2,160.2,120z M163.3,82.3c-0.2,0.2-0.4,0.4-0.4,0.7c-0.2,0.2-0.4,0.2-0.4,0.7 c-0.2,0.2-0.2,0.4-0.2,0.5V85c0,0.4,0,0.5-0.2,0.5l-1.1,1.1l0.4,1.1l1.3-2c0.4-0.4,0.4-1.3,0.5-1.3l0.9-0.2 c0.2-0.2,0.2-0.4,0.2-0.5c-0.2,0-0.5-0.2-0.7-0.4l1.1-0.4l0.9-1.3l-1.1,0.7c0.4-0.7,0.7-0.9,0.9-1.1l1.8-1.8 c0.4-0.4,0.4-0.7,0.5-1.1c-0.5,0.5-0.5,0.7-0.5,0.7l-0.7,0.4l-1.1,1.1c-0.2,0.5-0.5,0.9-1.5,1.1C164,81.9,163.7,81.9,163.3,82.3z M164.6,82.5l-1.8,1.3l0.2-0.7C163.5,82.6,164.4,82.5,164.6,82.5z M168,112.4l-1.6-1.1l-0.5,0.4l0.5,0.4c0.2,0.2,0.4,0.2,1.1,0.2 C167.6,112.2,168,112.4,168,112.4z M168,112.9h-0.9c-0.2,0.2-0.2,0.4-0.2,0.7l0.4,1.1c0,0.5,0.4,0.9,0.5,1.3c0-0.2-0.2-0.4-0.2-0.5 c0-0.2,0.2-0.4,0.4-0.4c0.2,0.2,0.2,0.4,0.2,0.7c0-0.4,0-0.5,0.5-1.1l-0.9,0.2c0.2-0.2,0.2-0.5,0.2-0.7 C168,113.6,168,113.5,168,112.9z M168.9,76.7l-0.2,1.1c0.4-0.7,1.8-2.7,2.9-3.6l3.4-4.2C172.7,72,169.6,76.1,168.9,76.7z M179.1,65.1c0-0.2,0.4-0.7,0.5-0.9c-0.4,0.2-1.1,0.5-1.1,0.7C178.5,64.9,178.9,65.1,179.1,65.1z"
        css={styles.functionPath}
      />
      <path
        d="M237.1,37.5c0.2,0.5,0.2,1.1,0.2,1.6c1.1,6.9,1.3,13.8,1.3,20.3c0,40.4-16.1,71.8-26.5,83.4l-0.5,0.4 c0-0.2,0-0.4,0.2-0.7c0-0.2,0.2-0.5,0.4-0.7h-0.7c-0.2,0-0.7,1.1-0.9,1.3l-0.4-0.7c-0.2,0.2-0.2,0.5-0.5,0.5c0-0.2,0.2-0.4,0.2-0.7 c0-0.2-0.2-0.4-0.4-0.4c-0.5,0-4.4,0.9-4.9,0.9c-0.9,0.4-1.1,0.9-1.3,1.3h-0.9c0-0.5,0.4-1.5,0.4-1.6c-0.4,0-0.9,0.2-1.1,0.2 s-0.5,0.2-0.7,0.2c0,0.4,0,0.5-0.2,0.7c-0.5,0-1.6,0.7-1.8,0.7c-0.4,0-0.5-0.4-0.7-0.4c-0.7,0-1.3,0.2-1.6,0.2 c-0.5,0-0.9-0.4-0.9-1.6c0-1.1,3.1-3.4,3.6-4.2c14.7-18.7,23.7-56.2,23.7-81c0-16.3-2.9-32.6-10-47.8c-0.4-0.4-0.5-0.7-0.7-1.3 c-0.4-0.2-0.5-0.2-0.7-0.2c0-0.2-0.4-0.5-0.4-0.7c0-0.9-2-1.5-2-2.2c0-0.7,0.2-1.4,1.5-2c1.6-1.1,6.3-1.1,8-1.1 C230.9,1.8,235.6,27.5,237.1,37.5z"
        css={styles.functionPath}
      />
    </svg>
  </div>
))

type PageName = 'function' | 'form'

const Content: FC = flowMax(
  addDisplayName('Content'),
  addStateHandlers(
    {
      currentDisplayedPage: null as PageName | null,
      currentRoutedPage: null as PageName | null,
    },
    {
      onPageChange: ({currentDisplayedPage}) => (pageName: PageName) => ({
        currentRoutedPage: pageName,
        currentDisplayedPage: currentDisplayedPage ?? pageName,
      }),
      onExited: ({currentRoutedPage}) => () => ({
        currentDisplayedPage: currentRoutedPage,
      }),
    },
  ),
  addLocation,
  // eslint-disable-next-line ad-hok/dependencies
  addEffect(
    ({location: {pathname}, onPageChange}) => () => {
      const pageName = typedAs<PageName>(
        pathname === '/function' ? 'function' : 'form',
      )
      onPageChange(pageName)
    },
    ['location.pathname'],
  ),
  suppressUnlessProp(['currentRoutedPage', 'currentDisplayedPage']),
  ({currentRoutedPage, currentDisplayedPage, onExited}) => (
    <div css={styles.contentContainer}>
      <div css={styles.buttonsContainer}>
        <Link to="/form" css={styles.button}>
          FORM
        </Link>
        <Link to="/function" css={styles.button}>
          FUNCTION
        </Link>
      </div>
      <div css={styles.mainContainer}>
        <Transition
          in={currentRoutedPage === 'form' && currentDisplayedPage === 'form'}
          addEndListener={() => {}}
          timeout={SHAPES_HIDE_DURATION}
          onExited={() => onExited()}
        >
          {(state) => (
            <>
              {['entering', 'entered', 'exiting'].includes(state) && (
                <Shapes
                  hide={['exiting'].includes(state)}
                  transitionState={state}
                />
              )}
            </>
          )}
        </Transition>
        <Transition
          in={
            currentRoutedPage === 'function' &&
            currentDisplayedPage === 'function'
          }
          addEndListener={() => {}}
          timeout={2000}
          onExited={() => onExited()}
        >
          {(state) => (
            <>
              {['entering', 'entered', 'exiting'].includes(state) && (
                <Function hide={['exiting'].includes(state)} />
              )}
            </>
          )}
        </Transition>
      </div>
    </div>
  ),
)

const App: FC = flowMax(
  addDisplayName('App'),
  addRefs,
  addRefsContextProvider,
  () => (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/wkh0yki.css" />
      <div css={styles.container}>
        <Content />
      </div>
    </>
  ),
)

export default App

const styles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.peach,
    color: colors.white,
    minHeight: '100vh',
    fontFamily: 'futura-pt-bold, sans-serif',
    fontWeight: 700,
  },
  contentContainer: {
    width: 800,
    height: 786,
    display: 'flex',
    flexDirection: 'column',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 65,
  },
  button: {
    height: 78,
    fontSize: 32,
    letterSpacing: 17,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 5.5,
    borderStyle: 'solid',
    paddingLeft: '1.8em',
    paddingRight: '1.3em',
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 5.5,
    borderStyle: 'solid',
    backgroundColor: colors.peachLight,
    position: 'relative',
  },
  circleOutline: {
    fill: 'none',
    stroke: colors.white,
    strokeWidth: 4,
    strokeMiterlimit: 10,
  },
  circleScribble: {
    fill: 'none',
    stroke: colors.white,
    strokeWidth: 4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  shapesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionPath: {
    fill: colors.white,
  },
})
