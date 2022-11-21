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

import { NURSE_ADD, NURSE_UPDATE, NURSE_DELETE } from 'store/actions';
import { DAY, SKILLS } from 'store/constant';
import MultipleSelectChip from 'ui-component/mutiple-selector'



// ==============================|| SAMPLE PAGE ||============================== //

const Nurse = () => {
    const dispatch = useDispatch();
    const nurses = useSelector((state) => state.customization.nurses);

    const handleNurseAdd = (newData) => {
        newData.id = 'nurse-' + nurses.length
        dispatch({ type: NURSE_ADD, payload: newData });
    };

    const handleNurseUpdate = (newData) => {
        dispatch({ type: NURSE_UPDATE, payload: newData });
    };

    const handleNurseDelete = (newData) => {
        dispatch({ type: NURSE_DELETE, payload: newData });
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
        { title: 'NURSE NAME', field: 'name' },
        { title: 'PAY RATE', field: 'pay_rate', type: 'numeric', align: 'left' },
        {
            title: 'SKILLS', field: 'skills',
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
        },
        {
            title: 'VACATION', field: 'vacation',
            editComponent: props => (
                <MultipleSelectChip
                    props={props}
                    options={DAY}
                />
            ),
            render: rowData => {
                return (
                    <Stack direction="row" spacing={1}>
                        {rowData.vacation.map((vac) => (
                            <Chip key={vac} label={DAY[DAY.findIndex((obj => obj.id == vac))].name} />
                        ))}
                    </Stack>
                )
            }
        }
    ]

    return (
        <TableContainer component={Paper}>
            <MaterialTable
                title="Nurses"
                columns={columns}
                data={nurses}
                icons={tableIcons}
                options={{
                    headerStyle: { borderBottomColor: 'blue', borderBottomWidth: '3px', fontFamily: 'verdana' },
                    actionsColumnIndex: -1
                }}
                editable={{
                    onRowUpdate: (newData, oldData) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                handleNurseUpdate(newData)
                                resolve();
                            }, 1000);
                        });
                    },
                    onRowAdd: (newData) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                handleNurseAdd(newData)
                                resolve();
                            }, 1000);
                        });
                    },
                    onRowDelete: (oldData) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                handleNurseDelete(oldData)
                                resolve();
                            }, 1000);
                        });
                    },
                }}
            />
        </TableContainer>
    )
};

export default Nurse;
