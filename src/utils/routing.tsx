import getContextHelpers from 'utils/getContextHelpers'
import {toObjectKeys} from 'utils/fp'

export type PageName = 'function' | 'form'

const [
  addCurrentPageContextProvider,
  addCurrentPageContext,
] = getContextHelpers<{
  currentRoutedPage: PageName
  currentDisplayedPage: PageName
}>(toObjectKeys(['currentRoutedPage', 'currentDisplayedPage']))

export {addCurrentPageContextProvider, addCurrentPageContext}
