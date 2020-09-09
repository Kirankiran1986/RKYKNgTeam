import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        label: 'Navigation',
        isTitle: true
    },
    {
        label: 'Dashboard',
        icon: 'home',
        link: '/'
        //,
        // badge: {
        //     variant: 'success',
        //     text: '1',
        // }
    },
    {
        label: 'Modules',
        isTitle: true
    },
    {
        label: 'Project',
        icon: 'grid',
        link: '/listproject',
    },
    {
        label: 'Users',
        icon: 'grid',
        link: '/manage-users/users-list',
    },
    // {
    //     label: 'Email',
    //     icon: 'inbox',
    //     subItems: [
    //         {
    //             label: 'Inbox',
    //             link: '/apps/email-inbox',
    //         },
    //         {
    //             label: 'Read',
    //             link: '/apps/email-read'
    //         },
    //         {
    //             label: 'Compose',
    //             link: '/apps/email-compose'
    //         },
    //     ]
    // }
];
