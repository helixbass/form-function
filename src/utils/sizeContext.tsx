import getContextHelpers from 'utils/getContextHelpers'
import {toObjectKeys} from 'utils/fp'

const [addSizeContextProvider, addSizeContext] = getContextHelpers<{
  width: number
  height: number
}>(toObjectKeys(['width', 'height']))

export {addSizeContextProvider, addSizeContext}
