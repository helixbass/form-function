import React from 'react'
import {
  flowMax,
  addWrapper,
  AddWrapperRenderCallback,
  SimplePropsAdder,
  branch,
  renderNothing,
  addProps,
} from 'ad-hok'
import {Transition} from 'react-transition-group'

import {addCurrentPageContext, PageName} from 'utils/routing'
import {TransitionStatus} from 'utils/types'
import {HIDE_DURATION} from 'components/HideClipPath'

type AddTransitionStateType = (opts: {
  pageName: PageName
}) => SimplePropsAdder<{
  hide: boolean
  transitionState: TransitionStatus
}>

const addTransitionState: AddTransitionStateType = ({pageName}) =>
  flowMax(
    addCurrentPageContext,
    addWrapper(
      (
        render: AddWrapperRenderCallback<{
          transitionState: TransitionStatus
        }>,
        {currentRoutedPage, currentDisplayedPage, onExited},
      ) => (
        <Transition
          in={
            currentRoutedPage === pageName && currentDisplayedPage === pageName
          }
          addEndListener={() => {}}
          timeout={HIDE_DURATION * 1000}
          onExited={onExited}
        >
          {(state) =>
            render({
              transitionState: state,
            })
          }
        </Transition>
      ),
    ),
    branch(
      ({transitionState}) =>
        !['entering', 'entered', 'exiting'].includes(transitionState),
      renderNothing(),
    ),
    addProps(
      ({transitionState}) => ({
        hide: transitionState === 'exiting',
      }),
      ['transitionState'],
    ),
  )

export default addTransitionState
