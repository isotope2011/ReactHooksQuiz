import { counterActions } from './counterActions';
import { globalActions } from './globalActions';
import { viewActions } from './viewActions'

export const useActions = (state, dispatch) => {
  return {
    counterActions: counterActions({ state, dispatch }),
    globalActions: globalActions({ state, dispatch }),
    viewActions: viewActions({ state, dispatch })
  }
};
