// material-ui
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { DEPARTMENT_ADD, DEPARTMENT_UPDATE, DEPARTMENT_DELETE } from 'store/actions';
import { DEPARTMENTS, SKILLS } from 'store/constant';
import MultipleSelectChip from 'ui-component/mutiple-selector'



// ==============================|| SAMPLE PAGE ||============================== //

const Deparement = () => {
    const dispatch = useDispatch();
    const departments = useSelector((state) => state.customization.skillRequirement);

    let departmentsOptions = {}
    DEPARTMENTS.map((item) => {
        departmentsOptions[item.id] = item.name
    })

    const handleDepartmentAdd = (newData) => {
        newData.id = 'department-' + departments.length
        dispatch({ type: DEPARTMENT_ADD, payload: newData });
    };

    const handleDepartmentUpdate = (newData) => {
        dispatch({ type: DEPARTMENT_UPDATE, payload: newData });
    };

    const handleDepartmentDelete = (newData) => {
        dispatch({ type: DEPARTMENT_DELETE, payload: newData });
    };

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };


    let columns = [
        { title: 'DEPARTMENT NAME', field: 'department', lookup: departmentsOptions, initialEditValue: DEPARTMENTS[0].id },
        { title: 'DESCRIPTION', field: 'description' },
        {
            title: 'SKILLS REQUIRED', field: 'skills',
            editComponent: props => (
                <MultipleSelectChip
                    props={props}
                    options={SKILLS}
                />
            ),
            render: rowData => {
                return (
                    <Stack direction="row" spacing={1}>
                        {rowData.skills.map((skill) => (
                            <Chip key={skill} label={SKILLS[SKILLS.findIndex((obj => obj.id == skill))].name} />
                        ))}
                    </Stack>
                )
            }
        }
    ]

    return (
        <TableContainer component={Paper}>
            <MaterialTable
                title="Department"
                columns={columns}
                data={departments}
                icons={tableIcons}
                options={{
                    headerStyle: { borderBottomColor: 'blue', borderBottomWidth: '3px', fontFamily: 'verdana' },
                    actionsColumnIndex: -1
                }}
                editable={{
                    onRowUpdate: (newData, oldData) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                handleDepartmentUpdate(newData)
                                resolve();
                            }, 1000);
                        });
                    },
                    onRowAdd: (newData) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                handleDepartmentAdd(newData)
                                resolve();
                            }, 1000);
                        });
                    },
                    onRowDelete: (oldData) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                handleDepartmentDelete(oldData)
                                resolve();
                            }, 1000);
                        });
                    },
                }}
            />
        </TableContainer>
    )
};

export default Deparement;
