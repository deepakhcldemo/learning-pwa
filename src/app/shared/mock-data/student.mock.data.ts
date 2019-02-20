export const StudentMockData = {
  students: [
    {
      'avatar': '0a',
      'emailAddress': 'emailaddress@pearson.com',
      'firstName': '0911',
      'fullName': '0911 adaptive',
      'lastName': 'adaptive',
      'userId': 'ffffffff59b667fd45d99156d4fa1d53'
    },
    {
      'avatar': '1f',
      'emailAddress': 'emailaddress@pearson.com',
      'firstName': '10',
      'fullName': '10 feb',
      'lastName': 'feb',
      'userId': 'ffffffff5a7d7439f02ebd1b9347e303'
    },
    {
      'avatar': '1m',
      'emailAddress': 'emailaddress@pearson.com',
      'firstName': '16',
      'fullName': '16 mar',
      'lastName': 'mar',
      'userId': 'ffffffff5aab5e6ff856993c2720cf83'
    },
    {
      'avatar': '1a',
      'emailAddress': 'emailaddress@pearson.com',
      'firstName': '18',
      'fullName': '18 apr',
      'lastName': 'apr',
      'userId': 'ffffffff5ad6fa4645d9917d851248cb'
    },
    {
      'avatar': 'ad',
      'emailAddress': 'emailaddress@pearson.com',
      'firstName': 'ash',
      'fullName': 'ash dev',
      'lastName': 'dev',
      'userId': 'ffffffff5bb290def856993930d369a2'
    }
  ],

  comment: [
    {
      assessmentid: 288,
      assessmentitemdetails: {
        benchmarks: Array(1), id: 1034,
        mathpractices: Array(1),
        sequence: 2,
        title: 'Can explain why order doesnt matter in addition'
      },
      assessmentitemid: 1034,
      comments: 'commnet not ',
      createdat: '',
      ctype: 'comment',
      deleted: false,
      isobserved: false,
      mediaid: '',
      parent: '3|17|64|253',
      students: ['ffffffff5bb290def856993930d369a2'],
      type: 'checklist',
      updatedat: '',
    },
    {
      assessmentid: 288,
      assessmentitemdetails: {
        benchmarks: Array(1),
        id: 1033,
        mathpractices: Array(1),
        title: 'Adds numbers in an order that is different from what is given'
      },
      assessmentitemid: 1033,
      comments: 'comment',
      createdat: '',
      ctype: 'media',
      deleted: false,
      isobserved: false,
      mediaid: '',
      parent: '3|17|64|253',
      students: ['ffffffff5bb290def856993930d369a2'],
      type: 'checklist',
      updatedat: ''
    }
  ],

  assessmentType: [{
    templatekind: '0',
    title: 'MP8, Look for and express regularity in repeated reasoning',
    id: 288,
    type: 'checklist',
    criteria: [
      {
        id: 1033,
        title: 'Adds numbers in an order that is different from what is given',
        sequence: 1,
        benchmarks: [1],
        mathpractices: [282],
      },
      {
        id: 1034,
        title: 'Can explain why order doesnt matter in addition',
        sequence: 2,
        benchmarks: [1],
        mathpractices: [282]
      }
    ],

    assessmentItemId: 1033,
    createdat: '',
    parent: '3|17|64|253',
    path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
    students: 'ffffffff5bb290def856993930d369a2'
  },
  {
    assessment: {
      templatekind: '0',
      title: 'MP8, Look for and express regularity in repeated reasoning',
      id: 288,
      type: 'checklist',
      criteria: [
        {
          id: 1033,
          title: 'Adds numbers in an order that is different from what is given',
          sequence: 1,
          benchmarks: [1],
          mathpractices: [282],
        },
        {
          id: 1034,
          title: 'Can explain why order doesnt matter in addition',
          sequence: 2,
          benchmarks: [1],
          mathpractices: [282]
        }
      ],
    },
    assessmentItemId: 1033,
    createdat: '',
    parent: '3|17|64|253',
    path: 'Grade 2 > Unit 1 > Investigation 2 > Session 2.3',
    students: 'ffffffff5bb290def856993930d369a2',
    type: 'assessment'
  }],
};


