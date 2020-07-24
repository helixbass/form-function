import getContextHelpers from 'utils/getContextHelpers'
import {RefsProps} from 'utils/refs'
import {toObjectKeys} from 'utils/fp'

const [addRefsContextProvider, addRefsContext] = getContextHelpers<RefsProps>(
  toObjectKeys(['refs', 'setRef']),
)

export {addRefsContextProvider, addRefsContext}
