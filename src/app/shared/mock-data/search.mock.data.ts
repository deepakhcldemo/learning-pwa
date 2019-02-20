
export const SearchMockData = {
    searchResultMock: [
        {
            type: 'checklist',
            searchdata: {
                assessmentPath: 'CHECKLIST_2.json',
                assessmentUrl: 'CHECKLIST_2.json',
                criteria: [{}, {}, {}, {}],
                id: 'CHECKLIST_2',
                keywords: ['checklist', 'assessment', '2'],
                parent: 'P1_N1|P1_N1.1|CHECKLIST_2',
                path: 'Prog 1 - Node 1|Prog 1 - Node 1.1|Assessment Checklist 2',
                title: 'Assessment Checklist 2',
                type: 'checklist'
            }
        },
        {
            type: 'checklist',
            searchdata: {
                assessmentPath: 'CHECKLIST_1.json',
                assessmentUrl: 'CHECKLIST_1.json',
                criteria: [{}, {}, {}, {}, {}],
                id: 'CHECKLIST_1',
                keywords: ['checklist', 'assessment', '1'],
                parent: 'P1_N1|P1_N1.1|CHECKLIST_1',
                path: 'Prog 1 - Node 1|Prog 1 - Node 1.1|Assessment Checklist 1',
                title: 'Assessment Checklist 1',
                type: 'checklist',
            }
        }

    ],

    TodayArray: [
        {
            searchString: 'student',
            time: 1543415387404,
        },
        {
            searchString: 'students',
            time: 1543393458017,
        }
    ],

    WeekArray: [
        {
            searchString: 'student',
            time: 1543415387304,
        },
        {
            searchString: 'students',
            time: 1543393457017,
        }

    ],


    searchObjCache: [
        {
            searchString: 'assessment',
            time: 1548406152510
        },
        {
            searchString: 'assessments',
            time: 1548334118026
        },
        {
            searchString: 'test',
            time: 1548407206503
        },
        {
            searchString: 'test3',
            time: 1548407120173,
        },
        {
            searchString: 'untitled',
            time: 1548340774987
        }
    ],

    currentSelectedClass: {
        classDescription: null,
        classId: '78F9ECC58C1D7CBCE0532502140A442C',
        classImageUrl: '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
        className: 'scoutclass',
        createdBy: 'ffffffff51c87040e4b07dddca2a0511',
        createdDate: '2018-10-24T08:51:34.000Z',
        externalId: null,
        externalSource: null,
        firstTeacherId: 'ffffffff51c87040e4b07dddca2a0511',
        lastUpdatedBy: 'ffffffff51c87040e4b07dddca2a0511',
        lastUpdatedDate: '2018-10-26T08:52:25.000Z',
        organizationId: '8a97b1a638c9f02701393168afbf1d20',
        productIds: ['1730940'],
        status: 'ACTIVE',
        studentIds: [
            'ffffffff5bd30d15f63bbf21f9bda600',
            'ffffffff5bd30deef63bbf21f9bda601',
            'ffffffff5bd30d6f1c6dd524050950ba',
            'ffffffff5bd30ca4f85699611757821d',
            'ffffffff5bd30e0445d9913ac68206eb',
            'ffffffff5bd1cd6145d9913ac681ea2e',
            'ffffffff54738483e4b001bd4b61aaf0',
            'ffffffff5bd30cdd1c6dd524050950b8',
            'ffffffff5bd30c8b45d9913ac68206e9',
            'ffffffff5bd30dcef85699611757821f',
            'ffffffff5bd30cc7d407951ac8bce01c'],
        teacherIds: ['ffffffff51c87040e4b07dddca2a0511']
    },
    searchKey: 'assessment',
    NotesList: [
        {
            classid: '78FA06DCFC9D187DE0532502140A8C1A',
            comment: 'hey notes added here...',
            createdat: {
                nanoseconds: 480000000,
                seconds: 1548913299
            },
            flagged: true,
            flaggeddate: {
                nanoseconds: 480000000,
                seconds: 1548913299
            },
            id: '51139131',
            noteid: '51139131',
            students: ['ffffffff54738483e4b001bd4b61aaf0'],
            types: 'notes',
            updatedat: { seconds: 1548913299, nanoseconds: 480000000 }
        }
    ],
    MediaList: [{
        caption: 'new update',
        classid: '78FA06DCFC9D187DE0532502140A8C1A',
        createdat: { nanoseconds: 1.549028053997, seconds: 1549028053.997 },
        id: '84909904',
        mediaDescription: 'update 2',
        mediaId: '84909904',
        mediakind: 'video',
        // tslint:disable-next-line:max-line-length
        path: 'https://firebasestorage.googleapis.com/v0/b/scout-demo2.appspot.com/o/uploads%2Fmovie.mp4Fri%20Feb%2001%202019%2019%3A04%3A03%20GMT%2B0530%20?alt=media&token=2a7f05fe-d48f-41f0-9274-7d18e21c03f6',
        productId: '',
        students: [' ffffffff54738483e4b001bd4b61aaf0'],
        teacherId: 'ffffffff51c87040e4b07dddca2a0511',
        types: 'media',
        updatedat: { seconds: 1549029581, nanoseconds: 988000000 }
    },
    {
        caption: 'untitled',
        classid: '78FA06DCFC9D187DE0532502140A8C1A',
        createdat: { nanoseconds: 1.549030125861, seconds: 1549030125.861 },
        encodedPath: '',
        id: '51581230',
        mediaDescription: '',
        mediaId: '51581230',
        mediakind: 'image',
        // tslint:disable-next-line:max-line-length
        path: ' https://firebasestorage.googleapis.com/v0/b/scout-demo2.appspot.com/o/uploads%2F2-independence-day-greeting-wallpaper.jpgFri%20Feb%2001%202019%2019%3A38%3A26%20GMT%2B0530%20?alt=media&token=bfd663bc-c7d6-4629-8f9c-7c9a1e4f23a3',
        students: [],
        teacherId: 'ffffffff51c87040e4b07dddca2a0511',
        types: 'media',
        updatedat: { nanoseconds: 1.549030125861, seconds: 1549030125.861 }
    }]

};

