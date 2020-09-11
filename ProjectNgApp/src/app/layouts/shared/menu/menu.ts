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
        link: '/manage-project/project-list',
    },
    {
        label: 'Users',
        icon: 'grid',
        link: '/manage-users/users-list',
    },
    {
        label: 'Work Items',
        icon: 'grid',
        link: '/work-items/Items-list',
    }
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
