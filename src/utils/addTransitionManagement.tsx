import {flowMax, addEffect, SimplePropsAdder} from 'ad-hok'
import {cleanupProps} from 'ad-hok-utils'

import addTransitionState from 'utils/addTransitionState'
import {SHAPES_HIDE_DURATION} from 'components/Shapes'
import addEnterAndExitTimeline from 'utils/addEnterAndExitTimeline'

type AddTransitionManagementType = SimplePropsAdder<{
  enterTimeline: gsap.core.Timeline
  exitTimeline: gsap.core.Timeline
}>

const addTransitionManagement: AddTransitionManagementType = flowMax(
  addTransitionState({
    timeout: SHAPES_HIDE_DURATION,
    pageName: 'form',
  }),
  addEnterAndExitTimeline,
  // eslint-disable-next-line ad-hok/dependencies
  addEffect(
    ({hide, enterTimeline, exitTimeline}) => () => {
      if (!hide) {
        if (exitTimeline.isActive()) return
        enterTimeline.play()
        return
      }

      exitTimeline.play()
      enterTimeline.pause()
    },
    ['hide'],
  ),
  cleanupProps(['hide', 'transitionState']),
)

export default addTransitionManagement
