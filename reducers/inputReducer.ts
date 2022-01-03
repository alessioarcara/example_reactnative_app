export enum InputActionType {
    INPUT_CHANGE = 'INPUT_CHANGE',
    INPUT_BLUR = 'INPUT_BLUR',
}

type InputState = {
    value: string;
    isValid: boolean;
    touched: boolean;
}

type InputAction = {
    type: InputActionType.INPUT_CHANGE,
    value: string;
    isValid: boolean;
} | {
    type: InputActionType.INPUT_BLUR,
}

export const inputReducer = (state: InputState, action: InputAction): InputState => {
    switch (action.type) {
        case InputActionType.INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case InputActionType.INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
    
        default:
            return state;
    }
}