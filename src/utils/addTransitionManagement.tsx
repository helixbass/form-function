import {flowMax, addEffect, SimplePropsAdder} from 'ad-hok'
import {cleanupProps, addLayoutEffectOnMount} from 'ad-hok-utils'

import addTransitionState from 'utils/addTransitionState'
import addEnterAndExitTimeline from 'utils/addEnterAndExitTimeline'
import {PageName} from 'utils/routing'
import {addRefsContext} from 'utils/refsContext'
import {initializeExitTimelineHideStripsAnimation} from 'components/HideClipPath'

type AddTransitionManagementType = (opts: {
  pageName: PageName
}) => SimplePropsAdder<{
  enterTimeline: gsap.core.Timeline
  exitTimeline: gsap.core.Timeline
}>

const addTransitionManagement: AddTransitionManagementType = (opts) =>
  flowMax(
    addTransitionState(opts),
    addEnterAndExitTimeline,
    addRefsContext,
    addLayoutEffectOnMount(({refs, exitTimeline}) => () => {
      initializeExitTimelineHideStripsAnimation({refs, exitTimeline})
    }),
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
