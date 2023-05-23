export const eventData = {
  data: [
    {
      id: 1,
      eventName: 'Bar Camp 2023',
      description: 'It is IT developer knowledge sharing',
      status: 'new',
      approvedBy: null,
      image: '/events/img1.jpg',
      fromDate: new Date(),
      toDate: new Date(),
      fromTime: '9:00 AM',
      toTime: '5:00 PM',
      address: 'MICT Park Yangon',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      eventName: 'Zay Pwal Daw',
      description: 'It is the shopping festival',
      status: 'approved',
      approvedBy: 'John',
      image: '/events/img2.jpg',
      fromDate: new Date(),
      toDate: new Date(),
      fromTime: '9:00 AM',
      toTime: '5:00 PM',
      address: 'Junction Square',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      eventName: 'Esport Event',
      description: 'MLBB, Pubg, Dota match',
      status: 'new',
      approvedBy: null,
      image: '/events/img3.jpg',
      fromDate: new Date(),
      toDate: new Date(),
      fromTime: '9:00 AM',
      toTime: '5:00 PM',
      address: 'Yangon',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      eventName: 'Music Festival',
      description: 'Music Festival',
      status: 'new',
      approvedBy: null,
      image: '/events/img4.jpg',
      fromDate: new Date(),
      toDate: new Date(),
      fromTime: '9:00 AM',
      toTime: '5:00 PM',
      address: 'PyiThuYinPyin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      eventName: 'Street Food',
      description: 'Show various food in one place',
      status: 'new',
      approvedBy: null,
      image: '/events/img5.jpg',
      fromDate: new Date(),
      toDate: new Date().setDate(new Date().getDate()+2),
      fromTime: '9:00 AM',
      toTime: '5:00 PM',
      address: 'MaharBandula Park',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  metadata: {
    limit: 5,
    pageNumber: 1,
    total: 20,
    totalPages: 4
  }
};

export const eventTableProperty = {
  headers: ['No', 'Image', 'Event Name', 'Date', 'Time', 'Status', 'Approved by', 'Created At', 'Updated At', 'Actions'],
  property: [
    {
      key: 'image',
      type: 'image'
    },
    {
      key: 'event_name',
      type: 'title'
    },
    {
      key: 'from_date',
      type: 'date'
    },
    {
      key: 'from_time',
      type: 'time'
    },
    {
      key: 'status',
      type: 'label'
    },
    {
      key: 'username',
      type: 'label'
    },
    {
      key: 'created_at',
      type: 'date'
    },
    {
      key: 'updated_at',
      type: 'date'
    },
    {
      type: 'buttons',
      value: 'changedStatus'
    }
  ]
};

export const eventDialogProperty = {
  title: 'Event Detail',
  property: [
    {
      label: 'Event Name',
      key: 'event_name',
      type: 'label'
    },
    {
      label: 'Description',
      key: 'description',
      type: 'label'
    },
    {
      label: 'Date',
      key: 'from_date',
      type: 'date'
    },
    {
      label: 'Time',
      key: 'from_time',
      type: 'time'
    },
    {
      label: 'Address',
      key: 'address',
      type: 'address'
    },
    {
      label: 'Status',
      key: 'status',
      type: 'label'
    },
    {
      label: 'Approved by',
      key: 'username',
      type: 'label'
    },
    {
      label: 'Created At',
      key: 'created_at',
      type: 'date'
    },
    {
      label: 'Updated At',
      key: 'updated_at',
      type: 'date'
    }
  ]
}

export const userTableProperty = {
  headers: ['No', 'Profile', 'Name', 'Role', 'Email', 'Date Of Birth', 'Address', 'Phone', 'Created At', 'Updated At', 'Actions'],
  property: [
    {
      key: 'profile',
      type: 'image'
    },
    {
      key: 'name',
      type: 'title'
    },
    {
      key: 'role',
      type: 'label'
    },
    {
      key: 'email',
      type: 'label'
    },
    {
      key: 'dob',
      type: 'date'
    },
    {
      key: 'address',
      type: 'label'
    },
    {
      key: 'phone',
      type: 'label'
    },
    {
      key: 'created_at',
      type: 'date'
    },
    {
      key: 'updated_at',
      type: 'date'
    },
    {
      type: 'buttons',
      value: 'changedData'
    }
  ]
};

export const userData = {
  data: [
    {
      id: 1,
      name: 'WLP',
      role: 'Admin',
      email: 'scm.winlhanphyo@gmail.com',
      dob: new Date('1996-08-14'),
      address: 'Ygn',
      phone: '09123456789',
      profile: '/profile/img1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'John',
      role: 'User',
      email: 'john@gmail.com',
      dob: new Date('2000-08-19'),
      address: 'Ygn',
      phone: '09123456789',
      profile: '/profile/img2.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Joe',
      role: 'Admin',
      email: 'joe@gmail.com',
      dob: new Date('2001-08-20'),
      address: 'Ygn',
      phone: '09123456789',
      profile: '/profile/img3.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: 'Jasmine',
      role: 'User',
      email: 'jasmine@gmail.com',
      dob: new Date('2001-10-22'),
      address: 'Ygn',
      phone: '09123456789',
      profile: '/profile/img4.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: 'Katt',
      role: 'Admin',
      email: 'katt@gmail.com',
      dob: new Date('2001-10-23'),
      address: 'Ygn',
      phone: '09123456789',
      profile: '/profile/img5.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  metadata: {
    limit: 5,
    pageNumber: 1,
    total: 20,
    totalPages: 4
  }
};

export const userDialogProperty = {
  title: 'User Detail',
  property: [
    {
      label: 'Name',
      key: 'name',
      type: 'label'
    },
    {
      label: 'Role',
      key: 'role',
      type: 'label'
    },
    {
      label: 'Email',
      key: 'email',
      type: 'label'
    },
    {
      label: 'Date Of Birth',
      key: 'dob',
      type: 'date'
    },
    {
      label: 'Address',
      key: 'address',
      type: 'label'
    },
    {
      label: 'Phone',
      key: 'phone',
      type: 'label'
    },
    {
      label: 'Created At',
      key: 'created_at',
      type: 'date'
    },
    {
      label: 'Updated At',
      key: 'updated_at',
      type: 'date'
    }
  ]
}

export const imageURL = "http://127.0.0.1:8000/";
export const paginationLimit = 5;
