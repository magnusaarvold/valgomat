import { combineReducers } from "redux";
import { questionCounterReducer } from './questions'
import { likertAnswerReducer } from "./likert";
import { algorithmReducer } from "./algorithm";
import { ResetStatesActionType } from '../actionTypes';
import { statementOrderReducer, initialState as initStatementOrder } from "./statementOrder";
import { initializeStatementOrderReducer } from "./initializeStatementOrder";
import {departmentsReducer, initialState as initDepartments} from "./departments";
import {valgomatInProgressReducer} from "./valgomatInProgress";
import { showAlertDialogReducer } from "./showAlertDialog";
import {isInfoClickedReducer} from "./isInfoClicked";
import {imageSelectorReducer, initialState as initImageSelector} from "./imageSelector";
import {imageSelectorAnswerReducer} from "./imageSelectorAnswers";
import {questionCounterPartTwoReducer} from "./questionCounterPartTwo";

const reducers = combineReducers({
    valgomatInProgress: valgomatInProgressReducer,
    showAlertDialog: showAlertDialogReducer,
    isInfoClicked: isInfoClickedReducer,
    questionCounter: questionCounterReducer,
    questionCounterPartTwo: questionCounterPartTwoReducer,
    likertAnswer: likertAnswerReducer,
    characteristicPoints: algorithmReducer,
    statementOrder: statementOrderReducer,
    initializeStatementOrder: initializeStatementOrderReducer,
    departmentsAlgorithm: departmentsReducer,
    imageSelector: imageSelectorReducer,
    imageSelectorAnswer: imageSelectorAnswerReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === ResetStatesActionType.RESET_STATES) {
        for (let i = 0; i < initDepartments.departmentArr.length; i++){
            initDepartments.departmentArr[i].points = 0;
        }
        for (let i = 0; i < initImageSelector.answers.length; i++){
            initImageSelector.answers[i].points = 0;
        }
        initStatementOrder.statementOrderArr = [];
        state = undefined;
    }

    return reducers(state, action);
};

export type State = ReturnType<typeof reducers>
export default rootReducer;