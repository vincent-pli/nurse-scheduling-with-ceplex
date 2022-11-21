// assets
// import { IconKey } from '@tabler/icons';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

// constant
const icons = {
    SettingsIcon,
    GroupWorkIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const settings = {
    id: 'settting',
    title: 'Setting',
    caption: 'Setting Caption',
    type: 'group',
    children: [
        {
            id: 'setting',
            title: 'Settings',
            type: 'collapse',
            icon: icons.SettingsIcon,

            children: [
                {
                    id: 'department-setting',
                    title: 'Department',
                    type: 'item',
                    url: '/department',
                    target: false,
                    icon: icons.GroupWorkIcon,
                }
            ]
        }
    ]
};

export default settings;
