// material-ui
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
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

import { SHIFT_ADD, SHIFT_UPDATE, SHIFT_DELETE } from 'store/actions';
import { DEPARTMENTS, DAY, TIME } from 'store/constant';


// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.customization.shifts);
  let departments = {}
  DEPARTMENTS.map((item) => {
    departments[item.id] = item.name
  })

  let day = {}
  DAY.map((item) => {
    day[item.id] = item.name
  })

  console.log(shifts)
  const handleShiftAdd = (newData) => {
    //backend need generate ID, for now just fake it
    newData.id = 'shift-' + shifts.length
    dispatch({ type: SHIFT_ADD, payload: newData });
  };

  const handleShiftUpdate = (newData) => {
    dispatch({ type: SHIFT_UPDATE, payload: newData });
  };

  const handleShiftDelete = (newData) => {
    dispatch({ type: SHIFT_DELETE, payload: newData });
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
    // { title: 'DEPARTMENT', field: 'department', render: rowData => <SimpleListMenu options = { DEPARTMENTS } selected = {rowData.department} />},
    { title: 'ID', field: 'id', hidden: true },
    { title: 'DEPARTMENT', field: 'department', lookup: departments, initialEditValue: DEPARTMENTS[0].id },
    { title: 'DAY', field: 'day', lookup: day, initialEditValue: "mon" },
    { title: 'START TIME', field: 'start_time', lookup: TIME, initialEditValue: 0 },
    { title: 'END TIME', field: 'end_time', lookup: TIME, initialEditValue: 0 },
    { title: 'MIN REQMENT', field: 'min_req', type: 'numeric' },
    { title: 'MAX REQMENT', field: 'max_req', type: 'numeric' },
  ]

  return (
    <TableContainer component={Paper}>
      <MaterialTable
        title="Shifts Plan"
        columns={columns}
        data={shifts}
        icons={tableIcons}
        options={{
          headerStyle: { borderBottomColor: 'blue', borderBottomWidth: '3px', fontFamily: 'verdana' },
          actionsColumnIndex: -1
        }}
        editable={{
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                handleShiftUpdate(newData)
                resolve();
              }, 1000);
            });
          },
          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                handleShiftAdd(newData)
                resolve();
              }, 1000);
            });
          },
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                handleShiftDelete(oldData)
                resolve();
              }, 1000);
            });
          },
        }}
      />
    </TableContainer>
  )
};

// const mapStateToProps = state => ({
//     shifts: state.customization.shifts
//   });

// const mapDispatchToProps = { getLeadsNotValid, updateSpecificNotValidLead };

// export default connect(mapStateToProps)(SamplePage);

export default SamplePage;
