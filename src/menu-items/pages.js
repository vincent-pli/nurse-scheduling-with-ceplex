// assets
import MedicationIcon from '@mui/icons-material/Medication';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

// constant
const icons = {
    MedicationIcon,
    ScheduleIcon,
    CalendarMonthIcon,
    PermIdentityIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'nurse-shifts',
            title: 'Nurse Shits',
            type: 'collapse',
            icon: icons.MedicationIcon,

            children: [
                {
                    id: 'shifts',
                    title: 'Shifts',
                    type: 'item',
                    url: '/shifts',
                    target: false,
                    icon: icons.CalendarMonthIcon,
                },
                {
                    id: 'nurses',
                    title: 'Nurses',
                    type: 'item',
                    url: '/nurses',
                    target: false,
                    icon: icons.PermIdentityIcon,
                }
            ]
        }
    ]
};

export default pages;
