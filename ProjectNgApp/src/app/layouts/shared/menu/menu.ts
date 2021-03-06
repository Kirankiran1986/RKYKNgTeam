import { MenuItem } from './menu.model';

export const AdminMENU: MenuItem[] = [
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
        icon: 'briefcase',
        link: '/manage-project/project-list',
    },
    {
        label: 'Users',
        icon: 'users',
        link: '/manage-users/users-list',
    },
    {
        label: 'Work Items',
        icon: 'bookmark',
        link: '/work-items/items-list',
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

export const UserMENU: MenuItem[] = [
  {
      label: 'Navigation',
      isTitle: true
  },
  {
      label: 'Dashboard',
      icon: 'home',
      link: '/'
  },
  {
      label: 'Modules',
      isTitle: true
  },
  {
      label: 'Work Items',
      icon: 'grid',
      link: '/work-items/items-list',
  }
];
