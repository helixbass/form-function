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

interface AddedProps {
  hide: boolean
  transitionState: TransitionStatus
}

type AddTransitionStateType = (opts: {
  timeout: number
  pageName: PageName
}) => SimplePropsAdder<AddedProps>

const addTransitionState: AddTransitionStateType = ({timeout, pageName}) =>
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
          timeout={timeout}
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
