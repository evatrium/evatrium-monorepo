//---------- resolve state -------------
import { isFunc } from '~/isType';

export type InitialState<State> = State | (() => State);
export type NextState<State, PrevState = State> = State | ((prevState: PrevState) => State);

export function resolveState<State>(nextState: InitialState<State>): State;

export function resolveState<State, PrevState = State>(
  nextState: NextState<State, PrevState>,
  prevState: PrevState
): State;
export function resolveState<State, PrevState = State>(
  nextState: InitialState<State> | NextState<State, PrevState>,
  prevState?: PrevState
): State {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (isFunc(nextState)) return (nextState as CallableFunction)(prevState);

  return nextState;
}
