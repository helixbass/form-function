import {
  flowMax,
  addStateHandlers,
  addEffect,
  SimpleUnchangedProps,
} from 'ad-hok'
import {suppressUnlessProp, cleanupProps} from 'ad-hok-utils'

import getContextHelpers from 'utils/getContextHelpers'
import {toObjectKeys} from 'utils/fp'
import addLocation from 'utils/addLocation'
import typedAs from 'utils/typedAs'

export type PageName = 'function' | 'form'

const [
  addCurrentPageContextProvider,
  addCurrentPageContext,
] = getContextHelpers<{
  currentRoutedPage: PageName
  currentDisplayedPage: PageName
  onExited: () => void
}>(toObjectKeys(['currentRoutedPage', 'currentDisplayedPage', 'onExited']))

export {addCurrentPageContext}

type AddRoutingType = SimpleUnchangedProps

export const addRouting: AddRoutingType = flowMax(
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
  addCurrentPageContextProvider,
  cleanupProps([
    'currentDisplayedPage',
    'currentRoutedPage',
    'onPageChange',
    'onExited',
    'location',
  ]),
)
