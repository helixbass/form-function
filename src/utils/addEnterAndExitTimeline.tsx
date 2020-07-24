import {addState, flowMax} from 'ad-hok'
import gsap from 'gsap'
import {cleanupProps, addPropTrackingRef} from 'ad-hok-utils'

import {TransitionStatus} from 'utils/types'

type AddEnterAndExitTimelineType = <
  TProps extends {
    transitionState: TransitionStatus
  }
>(
  props: TProps,
) => TProps & {
  enterTimeline: gsap.core.Timeline
  exitTimeline: gsap.core.Timeline
}

const addEnterAndExitTimeline: AddEnterAndExitTimelineType = flowMax(
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
  cleanupProps(['setEnterTimeline', 'setExitTimeline', 'transitionStateRef']),
)

export default addEnterAndExitTimeline
