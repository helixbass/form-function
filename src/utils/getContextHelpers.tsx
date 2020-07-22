import {createContext} from 'react'
import {flowMax, addProps, SimplePropsAdder, addContext} from 'ad-hok'
import {pick} from 'lodash/fp'
import {cleanupProps} from 'ad-hok-utils'

import addContextProvider from 'utils/addContextProvider'
import tuple from 'utils/tuple'

type AddProviderType<TContextValue> = <TProps extends TContextValue>(
  props: TProps,
) => TProps
type AddConsumerType<TContextValue> = SimplePropsAdder<TContextValue>

type Helpers<TContextValue> = [
  AddProviderType<TContextValue>,
  AddConsumerType<TContextValue>,
] & {
  addProvider: AddProviderType<TContextValue>
  addConsumer: AddConsumerType<TContextValue>
}

const makeHelpers = <TContextValue,>({
  addProvider,
  addConsumer,
}: {
  addProvider: AddProviderType<TContextValue>
  addConsumer: AddConsumerType<TContextValue>
}): Helpers<TContextValue> =>
  Object.assign(tuple(addProvider, addConsumer), {
    addProvider,
    addConsumer,
  })

const getContextHelpers = <TContextValue extends {}>(
  propNamesObject: Record<keyof TContextValue, any>,
): Helpers<TContextValue> => {
  const initialValues = (undefined as unknown) as TContextValue
  const Context = createContext<TContextValue>(initialValues)

  const valuePropName = '_getContextHelpers-value'

  const propNames = Object.keys(propNamesObject)

  const addProvider: AddProviderType<TContextValue> = flowMax(
    addProps(
      (props) => ({
        [valuePropName]: pick(propNames, props) as TContextValue,
      }),
      propNames,
    ),
    addContextProvider(Context, valuePropName),
    cleanupProps([valuePropName]),
  )

  const addConsumer: AddConsumerType<TContextValue> = flowMax(
    addContext(Context, valuePropName),
    addProps(
      ({[valuePropName]: propValue}) => {
        if (!propValue)
          throw new MissingContextValueError(
            `Missing context value that supplies ${propNames
              .map((propName) => `"${propName}"`)
              .join(', ')}, did you forget to render a provider?`,
          )
        return propValue
      },
      [valuePropName],
    ),
    cleanupProps([valuePropName]),
  )

  return makeHelpers({addProvider, addConsumer})
}

export default getContextHelpers

export const getContextHelpersFromInitialValues = <TContextValue,>(
  initialValues: TContextValue,
): Helpers<TContextValue> => {
  const Context = createContext<TContextValue>(initialValues)

  const valuePropName = '_getContextHelpers-value'

  const propNames = Object.keys(initialValues)

  type AddProviderType = <TProps extends TContextValue>(props: TProps) => TProps
  const addProvider: AddProviderType = flowMax(
    addProps(
      (props) => ({
        [valuePropName]: pick(propNames, props) as TContextValue,
      }),
      propNames,
    ),
    addContextProvider(Context, valuePropName),
    cleanupProps([valuePropName]),
  )

  type AddConsumerType = SimplePropsAdder<TContextValue>
  const addConsumer: AddConsumerType = flowMax(
    addContext(Context, valuePropName),
    addProps(({[valuePropName]: propValue}) => propValue, [valuePropName]),
    cleanupProps([valuePropName]),
  )
  return makeHelpers({addProvider, addConsumer})
}

class MissingContextValueError extends Error {}
