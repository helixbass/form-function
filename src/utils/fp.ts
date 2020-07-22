import {UnchangedProps} from 'ad-hok'
import {zipObject} from 'lodash'

type TapType = <TProps>(
  callback: (props: TProps) => void,
) => UnchangedProps<TProps>

export const tap: TapType = (callback) => (props) => {
  callback(props)

  return props
}

type LogType = <TProps>(key: string) => UnchangedProps<TProps>

export const log: LogType = (key) => tap((props) => console.log({[key]: props}))

export const toObjectKeys = <TKeys extends string>(
  keys: TKeys[],
): Record<TKeys, undefined> => zipObject(keys) as Record<TKeys, undefined>
