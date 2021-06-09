import { QUESTION_TYPE } from '../constants';

export const formatChat = (respnose) => {
  const resVarType = typeof (respnose);
  if (resVarType === 'object') {
    return {
      type: QUESTION_TYPE.PHRASE,
      content: respnose.text,
    }
  } else if (resVarType === 'string') {
    debugger;
    return {}
  }
}