// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,

    // skills    define skill, one page need = dropdown list
    // shifts {"department", "day", "startTime", "endTime", "minReq", "maxReq"} list with curd  *
    // skill requirement: department - skill:  1 - n  list with curd  fixed
    // Nurse   list with curd  *
    // Nurse - skill: 1 - n
    // vacation *
    skillRequirement: [
        {
            id: "department-0",
            department: 'consultation',
            description: 'nothing to say',
            skills: ['cardiac_care']
        }
    ],
    shifts: [
        {
            id: 'shift-0',
            department: 'emergency',
            day: 'mon',
            start_time: 2,
            end_time: 8,
            min_req: 3,
            max_req: 5
        }
    ],
    nurses: [
        {
            id: "nurse-0",
            name: 'Anne',
            skills: ['anaesthesiology', 'cardiac_care'],
            pay_rate: 25,
            vacation: ['mon']
        }
    ]
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        case actionTypes.SHIFT_ADD:
            return {
                ...state,
                shifts: [...state.shifts, action.payload]
            };
        case actionTypes.SHIFT_UPDATE:
            console.log(action.payload)
            let shiftsLoc = state.shifts
            let objIndex = shiftsLoc.findIndex((obj => obj.id == action.payload.id));
            shiftsLoc[objIndex].start_time = action.payload.start_time
            shiftsLoc[objIndex].end_time = action.payload.end_time
            shiftsLoc[objIndex].min_req = action.payload.min_req
            shiftsLoc[objIndex].max_req = action.payload.max_req
            return {
                ...state,
                shifts: [...shiftsLoc]
            };
        case actionTypes.SHIFT_DELETE:
            return {
                ...state,
                shifts: state.shifts.filter(item => item.id != action.payload.id)
            };
        case actionTypes.DEPARTMENT_UPDATE:
            let skillsReq = state.skillRequirement
            let index = state.skillRequirement.findIndex((obj => obj.id == action.payload.id));
            skillsReq[index].department = action.payload.department
            skillsReq[index].description = action.payload.description
            skillsReq[index].skills = action.payload.skills

            return {
                ...state,
                skillRequirement: [...skillsReq]
            };
        case actionTypes.DEPARTMENT_ADD:
            return {
                ...state,
                skillRequirement: [...state.skillRequirement, action.payload]
            };
        case actionTypes.DEPARTMENT_DELETE:
            return {
                ...state,
                skillRequirement: state.skillRequirement.filter(item => item.id != action.payload.id)
            };
        case actionTypes.NURSE_ADD:
            return {
                ...state,
                nurses: [...state.nurses, action.payload]
            };
        case actionTypes.NURSE_UPDATE:
            let nurse = state.nurses
            let indexNurse = state.nurses.findIndex((obj => obj.id == action.payload.id));
            nurse[indexNurse].pay_rate = action.payload.pay_rate
            nurse[indexNurse].vacation = action.payload.vacation
            nurse[indexNurse].skills = action.payload.skills

            return {
                ...state,
                nurses: [...nurse]
            };
        case actionTypes.NURSE_DELETE:
            return {
                ...state,
                nurses: state.nurses.filter(item => item.id != action.payload.id)
            };
        default:
            return state;
    }
};

export default customizationReducer;
