import { Injectable } from '@angular/core';
import {
    HttpRequest, HttpResponse, HttpHandler,
    HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Headers } from '@angular/http';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    users = [
        { id: 1, username: 'teacher.demo', password: 'testing123$' },
        { id: 2, username: 'teacher2.demo', password: '12345' }
    ];
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith('/account/v2/login') && request.method === 'POST') {
                const filteredUsers = this.users.filter(user => {
                    return user.username === request.body.userName && user.password === request.body.password;
                });
                let body: any;
                if (filteredUsers.length) {
                    body = {
                        'code': 200,
                        'status': 'success',
                        'data': {
                            'token': 'ST-57173-gLDMaqjp4SgvDQwX9wBK-b3-rumba-int-01-03',
                            'refreshToken': null,
                            'cookieName': 'BIGipServerrumba-int-sso-80',
                            'loggedInSince': 1549625666538,
                            'identityId': 'ffffffff51c87040e4b07dddca2a0511',
                            'userName': 'realize_teacher',
                            'firstName': 'realize1',
                            'lastName': 'teacher11',
                            'rumbaAuthenticationToken': null,
                            'title': 'Colonel.',
                            'locale': 'en_US',
                            'timeZone': 'America/New_York',
                            'permissions': [
                                {
                                    'OrganizationId': '8a97b1a638c9f02701393168afbf1d20',
                                    'LicensePoolId': '8a97b1a738c9f0d90139316b11f3180e',
                                    'LicensedOrganizationId': '8a97b1a638c9f02701393168afbf1d20',
                                    'LicensedOrganizationDisplayName': 'realize_organization1',
                                    'LicensePoolType': 'Student seat based licensing',
                                    'LicensePoolStatus': 'A',
                                    'DenyNewSubscription': '0',
                                    'StartDate': '2012-08-16T00:00:00.000-04:00',
                                    'EndDate': '2021-08-15T23:59:59.000-04:00',
                                    'Quantity': '250',
                                    'UsedLicenses': '20203',
                                    'ProductId': '336566',
                                    'ProductDisplayName': 'Realize Sample Program',
                                    'ProductShortDescription': 'Realize Sample Program',
                                    'ProductLongDescription': 'Realize Sample Program',
                                    'CGProgram': 'Realize',
                                    'GradeLevel': 'N/A',
                                    'OrderedISBN': '3332224445556',
                                    'UserOrganizationId': '8a97b1a638c9f02701393168afbf1d20',
                                    'HasAccess': false
                                },
                                {
                                    'OrganizationId': '8a97b1a638c9f02701393168afbf1d20',
                                    'LicensePoolId': '8a97b1a63d170818013f63aa958a6bf0',
                                    'LicensedOrganizationId': '8a97b1a638c9f02701393168afbf1d20',
                                    'LicensedOrganizationDisplayName': 'realize_organization1',
                                    'LicensePoolType': 'Student seat based licensing',
                                    'LicensePoolStatus': 'A',
                                    'DenyNewSubscription': '0',
                                    'StartDate': '2013-06-19T00:00:00.000-04:00',
                                    'EndDate': '2019-06-19T23:59:59.000-04:00',
                                    'Quantity': '55',
                                    'UsedLicenses': '1848',
                                    'ProductId': '351681',
                                    'ProductDisplayName': 'Science Texas 2.0 Grade 1',
                                    'ProductShortDescription': 'Science Texas 2.0 Grade 1',
                                    'ProductLongDescription': 'Science Texas 2.0 Grade 1',
                                    'CGProgram': 'Realize',
                                    'OrderedISBN': '1234567890888',
                                    'UserOrganizationId': '8a97b1a638c9f02701393168afbf1d20',
                                    'HasAccess': false
                                },
                                {
                                    'OrganizationId': '8a97b1a638c9f02701393168afbf1d20',
                                    'LicensePoolId': '8a97b1a73f87887a013fbfb1fea35779',
                                    'LicensedOrganizationId': '8a97b1a638c9f02701393168afbf1d20',
                                    'LicensedOrganizationDisplayName': 'realize_organization1',
                                    'LicensePoolType': 'Student seat based licensing',
                                    'LicensePoolStatus': 'A',
                                    'DenyNewSubscription': '0',
                                    'StartDate': '2013-07-08T00:00:00.000-04:00',
                                    'EndDate': '2023-07-07T23:59:59.000-04:00',
                                    'Quantity': '100',
                                    'UsedLicenses': '28',
                                    'ProductId': '338454',
                                    'ProductDisplayName': 'abc realize program rqai ',
                                    'ProductShortDescription': 'abc realize program rqai short description',
                                    'ProductLongDescription': 'abc realize program rqai long description',
                                    'CGProgram': 'Realize',
                                    'GradeLevel': '12',
                                    'OrderedISBN': '9384098372222',
                                    'UserOrganizationId': '8a97b1a638c9f02701393168afbf1d20',
                                    'HasAccess': false
                                }
                            ],
                            'modules': null,
                            'idpName': 'RUMBA',
                            'idpResponse': {
                                'data': {
                                    'assertion': {
                                        'attributes': {
                                            'UserStatus': 'Active',
                                            'UserName': 'realize_teacher',
                                            'UserId': 'ffffffff51c87040e4b07dddca2a0511',
                                            'LastName': 'teacher11',
                                            'DisplayName': 'Teacher',
                                            'Title': 'Colonel.',
                                            'OrganizationId1': '8a97b1a638c9f02701393168afbf1d20',
                                            'OrgRole1': 'Teacher',
                                            'OrgName1': 'realize_organization1',
                                            'Gender': 'U',
                                            'EmailAddress': 'no6@pearson.com',
                                            'FirstName': 'realize1',
                                            'Language': 'en',
                                            'PreferredTimeZone': 'America/New_York'
                                        },
                                        'subject': {
                                            'nameId': 'realize_teacher'
                                        }
                                    },
                                    'authorizedResource': [
                                        {
                                            'moduleId': '1013283',
                                            'hasAccess': true,
                                            'productId': '1730940',
                                            'expiryDate': '2020-08-03T04:00:00.000Z'
                                        }
                                    ]
                                }
                            },
                            'name': 'realize_teacher',
                            'castgc': 'TGT-36394-IIBpkIAOpeepVfOs4kMXG9IZTAg7QC72dCFa5w9uvHQJNTF91F-b3-rumba-int-01-03',
                            'eT1_smsLoginResponse': null
                        },
                        'errorCode': null,
                        'message': null
                    };
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    body = {
                        'code': 401,
                        'status': 'error',
                        'message': 'User is not authorized'
                    };
                    return throwError(new HttpErrorResponse({ status: 401, error: body }));
                }
            }

            if (request.url.endsWith('/sapi/oauth/token') && request.method === 'POST') {
                const body = {
                    // tslint:disable-next-line:max-line-length
                    'access_token': '2n6XQIKBITpm48qtW3tFSBcEEQhO1ImH19nHPxIeGCLFbzZcESSv5A2PDXLqYPUtJX4AV123EZJGzmgffsSfNUSUEyJwSIjDrI4lztCzS7nDGVdVn4Sd3I7onKiwCjHJ5VIhXHTIBUHtQb34PyQqlkY9eLSy0rFStDlbzY6O2N88ZzUJ30gp9utlNYmXUOCAuvyBWB2o09kQl3Qwr7nDX6rIn6ut5MhNpdndGwDl2rQk3JiI5Y6oyBsbMEz',
                    'expires_in': 1800000,
                    'clientId': 'O5n6dEnWdN6RLJBUeBOxXQ2cUxIOCRIo',
                    'userId': 'ffffffff51c87040e4b07dddca2a0511',
                    'scope': [
                        'RBS'
                    ],
                    'createdDate': 1549864988223,
                    'token_type': 'Bearer'
                };
                // tslint:disable-next-line:max-line-length
                return of(new HttpResponse({ status: 200, body: body }));
            }

            if (request.url.match('/roster-service/v1/sections') && request.method === 'GET') {
                // tslint:disable-next-line:max-line-length
                if (request.headers.get('Authorization') === 'Bearer 2n6XQIKBITpm48qtW3tFSBcEEQhO1ImH19nHPxIeGCLFbzZcESSv5A2PDXLqYPUtJX4AV123EZJGzmgffsSfNUSUEyJwSIjDrI4lztCzS7nDGVdVn4Sd3I7onKiwCjHJ5VIhXHTIBUHtQb34PyQqlkY9eLSy0rFStDlbzY6O2N88ZzUJ30gp9utlNYmXUOCAuvyBWB2o09kQl3Qwr7nDX6rIn6ut5MhNpdndGwDl2rQk3JiI5Y6oyBsbMEz') {
                    const body = {
                        'rosters': [
                            {
                                'classId': '77DB2F4FC20514ABE0532502140A62E8',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T02:44:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BECD16F1040BACE0532402140A46BF',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:52:36.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '67F32AF680685EDCE0532402140A88A6',
                                'className': 'BrianLarkinTesting',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff57e94c05e4b055dec03aaeb0',
                                    'ffffffff57e94c05e4b044b7878c127b',
                                    'ffffffff5a98f459f856993c27209730'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-21T16:38:04.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-16T09:54:13.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5FACC65961871574E0532302140ADC80',
                                'className': 'Janet\'s class - realize_teacher',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class4.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff51cc380ae4b07dddca2a171f',
                                    'ffffffff51cc323be4b028eed1d1990e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-06T08:18:35.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-01-31T13:36:01.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A770E74E7753F32E0532302140AAE59',
                                'className': 'EMS-Test Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1214279',
                                    '336566',
                                    '1399215'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-12T06:32:30.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-12T06:32:30.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E704062B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B023EAFAE5F68B3E0532402140A3742',
                                'className': 'Retest Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bec0264f02ebd635e520a16'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T04:36:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T04:36:01.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6A9E895DB4B62A56E0532302140A299E',
                                'className': 'Pradeep New Class 2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a5396e7f8569907637269b8',
                                    'ffffffff5adf8bb31c6dd546d6258394'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T15:55:30.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-03T17:21:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C814834786D2660E0532402140AC31B',
                                'className': 'knew_knew_guard_local_8',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T15:51:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T15:51:46.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '68949A09440D4277E0532502140A68A4',
                                'className': 'Ram_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3@2x.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '835211',
                                    '481738',
                                    '1691092',
                                    '1314335',
                                    '1540847'
                                ],
                                'studentIds': [
                                    'ffffffff5abd5716f02ebd20e73045ae',
                                    'ffffffff5abd5717f856993c2720f89f',
                                    'ffffffff5abd5716f63bbf0e9edd9bd9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-29T17:13:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-31T15:40:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78E9745E7A266E18E0532302140AB75F',
                                'className': 'Albus dumledore',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155',
                                    '1413796'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-23T13:11:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:27.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6CF7DB95FDF05B82E0532502140A9400',
                                'className': 'knew_guard_145_5',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff54402888e4b073b5269f1ae8',
                                    'ffffffff5b071925f63bbf34e77e38f4',
                                    'ffffffff5b07186845d99140f636b3ef',
                                    'ffffffff5b0724d1f85699315b7e4602',
                                    'ffffffff5a29dfcff02ebd36c7774f12',
                                    'ffffffff5afa2074f856992d47942aa2'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-24T13:19:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-24T16:48:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BED30F09A81B76E0532302140A6EE3',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:54:17.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D3E8E45CBE1447E0532502140A66F2',
                                'className': 'Automation Nightly Class 01',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bbd25b81c6dd504679950f4',
                                    'ffffffff5bbd25b8f02ebd20add6d2ad'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T18:03:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800432443592C44E0532302140AEED5',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:59:53.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '72FF9A1A9A704695E0532302140AFDB4',
                                'className': 'Discussion_post',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class9.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '503041',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5b6c216745d991373d80a96b'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-08-09T07:08:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-08-09T07:11:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E2F32DD5E0553FE0532302140AAC4C',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:01:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79066840E5C57376E0532402140A8236',
                                'className': 'harry potter 1',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff5bce2f1a1c6dd54aa54fa123'
                                ],
                                'productIds': [
                                    '1815796'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-24T23:43:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-05T13:05:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5D91F29D347B6995E0532502140AF837',
                                'className': 'hamsa _test_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467624',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5997293d1c6dd55f526de126',
                                    'ffffffff59934488f63bbf3ffa34c13a',
                                    'ffffffff599344881c6dd55f526dabe3',
                                    'ffffffff59934488d4079513e8161010'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-09T13:26:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B028FCBB62A58FDE0532402140A3A8A',
                                'className': 'Cert - Class Test - 2',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1413796'
                                ],
                                'studentIds': [
                                    'ffffffff5be2ffe9f02ebd635e51f269'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T05:00:12.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T05:00:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5E86FA9C81803235E0532502140A2359',
                                'className': 'hamsa_Show_Scores_Class2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class13.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5a130f91f63bbf65703347d5',
                                    'ffffffff5a130fbff02ebd36c7769af2',
                                    'ffffffff5a130fa41c6dd503785158e1',
                                    'ffffffff5a130f4bf63bbf65703347d4'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-21T17:46:51.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:17.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '53A3DD518D8923F8E0532402140A63A4',
                                'className': 'Koushik_Test_Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff595e06c5f63bbf0fe33af3f6',
                                    'ffffffff595b8c3cf63bbf0fe33af230'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-07-06T05:37:26.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:32.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B00A8AFE59E5EFFE0532502140A9812',
                                'className': 'Renault-Test-Class2',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T02:44:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T02:44:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E382ED0043531EE0532402140ABCCF',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:40:26.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B14898776982FF2E0532402140A47FC',
                                'className': 'Test-Student-814',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-20T02:25:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-20T02:25:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A75B344CA227A63E0532302140AB771',
                                'className': 'msk175',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5be30275d407951125822c9f',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-12T04:55:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-12T05:11:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '76A748A3DF6D4927E0532502140A909F',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1886393',
                                    '1710044'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-24T19:23:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-09-24T19:23:59.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78E9D77FFE381B1AE0532402140A25BA',
                                'className': 'Class with 15 products',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '447087',
                                    '510675',
                                    '532114',
                                    '532113',
                                    '467626',
                                    '532112',
                                    '532321',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623',
                                    '336566',
                                    '469743',
                                    '351681',
                                    '503041'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-23T13:39:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T13:39:01.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '70903E25A72B71DFE0532302140A8452',
                                'className': 'realize_discussion',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class13.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467624',
                                    '421023'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-07-09T07:23:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-07-09T07:23:29.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780C672AF49A470BE0532502140AFC71',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T13:28:24.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:29.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BE9B92D61958BDE0532302140A61A1',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:38:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:13.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '797C2324435C51F1E0532302140AD879',
                                'className': 'Test Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1814737'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T20:11:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:29.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B0255DDB5604C2CE0532502140A97B2',
                                'className': 'Nightly- Renault Realize GC',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T04:48:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T04:48:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A07844284310D49E0532402140AC178',
                                'className': 'Test class for discussions',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class13.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5be2157cf02ebd635e51f130'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-06T17:28:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-06T17:28:17.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3B3F3B25D7EFAE0532502140A9D4A',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:55:36.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:42.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3B3F3B2767EFAE0532502140A9D4A',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T13:04:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '635AE63A946058E1E0532402140A6495',
                                'className': 'Test_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '532321',
                                    '445972'
                                ],
                                'studentIds': [
                                    'ffffffff5a65ac2df02ebd1b93471ab8',
                                    'ffffffff5a65ac2df85699056cc2fa55'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-22T04:17:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:08.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B1461C9D8320A0BE0532402140A6741',
                                'className': 'SSOIssue',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5bf3b44af63bbf4f5466fe1c'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-20T02:14:18.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-20T02:14:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780D557B2D4E7F50E0532502140A6177',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T14:34:12.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:27.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D966F7C6FF3437E0532402140A0CEE',
                                'className': 'Ami Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T00:36:47.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:32.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78526B86E7CE0BADE0532402140ABD7C',
                                'className': 'Test Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-16T00:59:35.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B04D7190879523CE0532302140AC077',
                                'className': 'Test-Student-814',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T07:41:47.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T07:41:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '762F900120200AEBE0532402140A2B17',
                                'className': 'Temp_win10_chrome64',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-18T20:34:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-09-18T20:34:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D04FB1F0CB79E4E0532502140A9D78',
                                'className': 'Automation Class01_CERT',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T13:46:02.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6AA0B585990E5D09E0532402140A8099',
                                'className': 'Pradeep New Class 6',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class5.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '469743'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T18:31:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-24T18:31:01.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6F9E386D6DEB5919E0532502140A76C4',
                                'className': 'CAEL_160832677',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-27T06:38:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-27T06:38:51.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800563A594E43D6E0532302140AC922',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T23:04:26.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:41:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AB2AAFC35CC27A3E0532302140A2370',
                                'className': 'AltClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732',
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-15T05:39:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-15T05:39:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6E71E99B14D57AB1E0532402140ABB9B',
                                'className': 'sanal',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a3bad6a1c6dd503785258e5'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-12T08:21:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-12T08:21:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '785D32A0ACAA5FD1E0532302140A0FA7',
                                'className': 'Delete_15July_1',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1881813',
                                    '1881814',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-16T13:51:12.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B02BDDD4FDA1A5FE0532402140AF339',
                                'className': 'Cert-Classe-Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5be2ffe9f02ebd635e51f269'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T05:16:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T05:16:46.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D552499B433566E0532302140A16E8',
                                'className': 'Automation Class01_NIGHTLY',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881813'
                                ],
                                'studentIds': [
                                    'ffffffff5bbd25b8f02ebd20add6d2ad'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:45:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:37:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800563A594343D6E0532302140AC922',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T23:04:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78767E204C40417EE0532302140A7FC0',
                                'className': 'New Class to Import edit',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff56f2dfcde4b0acd6c46f633f'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1881814',
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T20:01:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:44:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '787797359F7C27BAE0532402140A52F4',
                                'className': 'Realize Class 04',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff56f2dfcde4b0acd6c46f633f',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6c915f856993930d37141'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T21:20:31.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:23:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff56f2dfcde4b0acd6c46f633f'
                            },
                            {
                                'classId': '58575B00009B2BF9E0532502140A7916',
                                'className': 'Knewton class7.2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '447087',
                                    '826072',
                                    '532114',
                                    '532113',
                                    '467626',
                                    '532112',
                                    '532310',
                                    '447089',
                                    '833886',
                                    '467624',
                                    '467625',
                                    '1516173',
                                    '1500722',
                                    '467623',
                                    '336566',
                                    '1699681',
                                    '1292775',
                                    '510675',
                                    '817343',
                                    '817563',
                                    '532321',
                                    '421023',
                                    '469743',
                                    '1310895',
                                    '1310875',
                                    '503041'
                                ],
                                'studentIds': [
                                    'ffffffff59ace413f63bbf48a1e37d00'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-09-04T01:26:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:58:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '692809475F532FD3E0532502140A7FAD',
                                'className': 'Tool_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1310875',
                                    '1587185'
                                ],
                                'studentIds': [
                                    'ffffffff5ac700a245d9917d85123218',
                                    'ffffffff5ac700a21c6dd534f3ca37dc'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-06T01:07:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-06T01:09:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800167FD54E5C93E0532502140A378B',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:46:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '688B343E22836A10E0532302140ACBF0',
                                'className': 'maserati_class_sp_148',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a8c093bf02ebd3edf2b323b',
                                    'ffffffff5a8bff18f856990998145b31',
                                    'ffffffff5a8bff38d40795745a3aa109'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-29T06:01:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-29T06:01:18.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '76A74260740A3ADAE0532402140AA2D5',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1886393',
                                    '1710044'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-24T19:22:13.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:41:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '795CB549B299014BE0532302140A233C',
                                'className': 'TestGradeSubmission',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1611747'
                                ],
                                'studentIds': [
                                    'ffffffff5bc7cf95f856992e964af3c3'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-29T06:41:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:23:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C756F6B5948456DE0532502140A7079',
                                'className': 'knew_knew_guard_local_5',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T01:43:44.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T01:43:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BE90A445CA5207E0532302140A2541',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:35:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78E9B7FE85553E49E0532502140A3BAF',
                                'className': 'Delete_15July_1',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '790370',
                                    '790272',
                                    '790382',
                                    '790383',
                                    '790333',
                                    '790378',
                                    '790258',
                                    '790369',
                                    '790175',
                                    '790363',
                                    '790254',
                                    '790353',
                                    '790354',
                                    '790338',
                                    '790349'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-23T13:29:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6F00F4D9F387141EE0532302140A9736',
                                'className': 'CAEL_203936265',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-19T11:09:41.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-07-02T08:29:46.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3B3F3B2577EFAE0532502140A9D4A',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:54:08.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:52.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '790AF05BE4FD1BB6E0532502140A2612',
                                'className': 'ClassDemo',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-25T05:07:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-25T05:07:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A9EF7B670DC7419E0532402140A577D',
                                'className': 'Cert - Class Test - 2',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5bec0264f02ebd635e520a16'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T06:09:27.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T06:09:27.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6A07E3B843663D09E0532402140ACB57',
                                'className': 'dvr_test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class9.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5ad5ac451c6dd546d6257a9b',
                                    'ffffffff5ad98bdc1c6dd546d6257fe5'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-17T04:11:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-20T02:42:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '76529CC769C2658BE0532402140A6DCD',
                                'className': '1st Grade - English',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:22:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:57:29.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '789C818FACF71C53E0532302140AB0F2',
                                'className': 'Automation Class01_CERT',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff56ba3578e4b044ebae410d32',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1881814',
                                    '1710044'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-19T17:22:52.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:23.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff56ba3578e4b044ebae410d32'
                            },
                            {
                                'classId': '738BF0A186EC2AA5E0532402140A7367',
                                'className': 'A_nightly_74599',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff599344881c6dd55f526dabe3',
                                    'ffffffff5bdc901f1c6dd50a73aa3454',
                                    'ffffffff5bdc9582d407951125822292',
                                    'ffffffff59934488f63bbf3ffa34c13a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-08-16T06:31:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-07T12:18:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77EA21C28EA34A50E0532502140A28E6',
                                'className': 'turnin',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5bd0f917f02ebd23fd000b5f'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T20:34:21.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-24T18:58:36.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B0255DDB55A4C2CE0532502140A97B2',
                                'className': 'Retest-NewClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bebfc27f8569926bf47ad67'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T04:42:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T04:42:29.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '631C98A1D7083AE7E0532302140A58C2',
                                'className': 'Neel_Science4Grade',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '467626'
                                ],
                                'studentIds': [
                                    'ffffffff56f03e79e4b0b51685a616d9',
                                    'ffffffff5a5f13a81c6dd52b2c8cd7ea'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-19T01:57:39.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6F0AAFE32AA77BA2E0532502140A7322',
                                'className': 'Bala_TEST_19_06_CUS',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1804015'
                                ],
                                'studentIds': [
                                    'ffffffff5b29be40d407957b652a1f8e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-19T22:37:59.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-19T22:38:59.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79859173AD951F74E0532502140ADA17',
                                'className': 'jayesh_cl_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bd9915145d9913ac6821f25',
                                    'ffffffff5bd9bdd0f856996117579a90'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-31T07:26:06.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-31T10:36:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4C806DC807A73E0532402140AF007',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:06:35.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '798B4E6AD3966A3EE0532402140A798A',
                                'className': 'EditAssignmentClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-31T14:16:51.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T23:25:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78771C5BFF954C92E0532502140A8F7B',
                                'className': 'Realize Class 01',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff56f2dfcde4b0acd6c46f633f'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1881814',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bbce5e9f856993930d3807e',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T20:47:17.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '69BA32DBD56967D5E0532402140AE7C8',
                                'className': 'comments class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '503041',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5ad7772c1c6dd546d6257d3a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-13T07:30:26.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-21T12:05:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652A64626056EE4E0532302140AF965',
                                'className': '7th Grade - Maths',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:26:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6AA16325E44625B9E0532402140A8CFE',
                                'className': 'Pradeep New Class 9',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class5.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5adf8bb31c6dd546d6258394'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T19:19:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-24T19:19:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C478475C83D1099E0532302140AA3A1',
                                'className': 'guard_knew_guard_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5afa211af856992d47942aa3'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-15T18:56:49.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-15T18:59:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6CFC78045A5841AEE0532402140AF540',
                                'className': 'knew_guard_145_20',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-24T18:49:49.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-24T18:49:51.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E4D081138F0D22E0532402140AB4EB',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T14:13:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:57.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78DBD95D429F2946E0532302140A3762',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff56ba3578e4b044ebae410d32'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bc7cf95f856992e964af3c3',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff56ba3578e4b044ebae410d32',
                                'createdDate': '2018-10-22T20:57:08.000Z',
                                'lastUpdatedBy': 'ffffffff56ba3578e4b044ebae410d32',
                                'lastUpdatedDate': '2018-10-23T23:48:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77C9FA68A0386F70E0532502140A1399',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1cd486bb3510148a985196b140d',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467624'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T06:12:41.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79630722DA7A640AE0532302140AC089',
                                'className': 'demo-rest10',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796'
                                ],
                                'studentIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-29T14:13:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-29T14:13:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77FFD07D30470AFFE0532302140A1947',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:26:26.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:59.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A158708BFAB3046E0532402140A8855',
                                'className': 'New Class + New Users',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff5be2ffe9f02ebd635e51f269'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-07T10:11:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-07T10:11:08.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': 'f6ad5fd15c294e47a22df7ff9f90997f',
                                'className': 'my class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    'Realize Sample Program'
                                ],
                                'studentIds': [
                                    'ffffffff516581e3e4b0015f8c354a00'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2015-05-31T18:00:36.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:41.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '67C81DF22D986ED7E0532302140A3A83',
                                'className': 'fiine_sashi1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '532114',
                                    '532113',
                                    '421023',
                                    '445972'
                                ],
                                'studentIds': [
                                    'ffffffff5a98f459f856993c27209730',
                                    'ffffffff599344881c6dd55f526dabe3'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-19T13:16:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-24T14:08:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A384A8487E56FCFE0532502140A0B65',
                                'className': 'classTen',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1240575',
                                    '1295615',
                                    '1310875',
                                    '1295595',
                                    '1690848'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-09T03:39:35.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-09T04:42:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff5bb948b6d40795315bd40ca9'
                            },
                            {
                                'classId': '7A9FB0D62A2718B7E0532402140A4A49',
                                'className': 'classTen',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T07:01:13.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T07:01:13.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff5bb948b6d40795315bd40ca9'
                            },
                            {
                                'classId': '6C59C494CDE54A6AE0532302140A22BE',
                                'className': 'knew_145_guard_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-16T16:43:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-16T16:43:15.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '765800F04FC64186E0532302140A3B2E',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T20:48:53.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:56:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78FA06DCFC9D187DE0532502140A8C1A',
                                'className': 'NewScoutClass',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1730940',
                                    '1710115'
                                ],
                                'studentIds': [
                                    'ffffffff54738483e4b001bd4b61aaf0'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-24T08:57:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-24T08:59:53.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C8332E4695318C6E0532502140A0589',
                                'className': 'knew_knew_guard_local_15',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T18:08:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T18:09:02.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '726EBCEF18103514E0532402140ACB13',
                                'className': 'RubricClass',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '351681'
                                ],
                                'studentIds': [
                                    'ffffffff5b62a59ef8569914fa36eb65'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-08-02T02:32:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-08-02T02:33:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '797189DC80F812C5E0532502140AD2D0',
                                'className': 'CreateAssignmentTest',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T07:33:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-02T06:22:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B0451275921547EE0532402140ABA01',
                                'className': 'Local-Assignment Tests',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1229515'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T07:04:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T07:04:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75CFD73268156C08E0532402140A6A0F',
                                'className': 'classforchamp',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class8.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1295616'
                                ],
                                'studentIds': [
                                    'ffffffff547ed5a9e4b01f611d2f61ee'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-14T02:21:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-09-14T02:22:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4ABBBD3C90806E0532502140AE9A6',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T18:58:06.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:01.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77958CE183AD46D4E0532502140A0376',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6c915f856993930d37141'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T15:39:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652AED1E2615252E0532502140A0653',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:28:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '554BA4D90F387954E0532302140A16E6',
                                'className': 'Chandra_sco_assignment',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1611747',
                                    '480077',
                                    '1314335',
                                    '1699681',
                                    '421023',
                                    '1500722',
                                    '891854'
                                ],
                                'studentIds': [
                                    'ffffffff57639202e4b043748696bd9c',
                                    'ffffffff57639202e4b06f8ebc4cf6d0'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-07-27T07:14:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-08-23T08:03:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C7CF9BC71643C23E0532402140A9ADA',
                                'className': 'knew_knew_guard_local_7',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T10:43:30.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T10:43:30.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C2DF35B699960F0E0532502140A08BC',
                                'className': 'hamsa_k12_new_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class8.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff599344881c6dd55f526dabe3',
                                    'ffffffff59934488f63bbf3ffa34c13a',
                                    'ffffffff5997293d1c6dd55f526de126',
                                    'ffffffff59934488d4079513e8161010'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-14T12:26:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-14T12:26:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5510529F38117D87E0532402140AF1AD',
                                'className': 'Pabitra_TincanSCo_Demo',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5975e76ff63bbf3ffa339fc8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-07-24T08:26:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '63016DDED1A14557E0532502140AB9B9',
                                'className': 'hamsa_test_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class7.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5a130f91f63bbf65703347d5',
                                    'ffffffff5a130f4bf63bbf65703347d4'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-17T17:32:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '762D5B24CBF1652EE0532502140A717A',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-18T17:56:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BE785B3C232F55E0532402140A1797',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:30:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '798E1EB6B8E5422AE0532402140AFEC8',
                                'className': 'New Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732',
                                    '1326155',
                                    '1413796',
                                    '1814737',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5bce2f1a1c6dd54aa54fa123'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-31T17:38:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-05T15:01:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7619FFBCEA7D10D0E0532302140A0E43',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-17T18:50:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:13.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '635D6F2992DA7CBBE0532502140A4901',
                                'className': 'a_22_jan',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a65d6dff63bbf0b505c5919',
                                    'ffffffff5a65d6fb45d991021c72cc49'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-22T07:18:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-16T09:33:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78D46152EECC5163E0532302140AA9EC',
                                'className': 'Realize Class 04',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff56ba3578e4b044ebae410d32',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-22T12:02:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:17.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff56ba3578e4b044ebae410d32'
                            },
                            {
                                'classId': '7800563A593D43D6E0532302140AC922',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T23:03:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E705862B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:01:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:05.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75D963FA44E96E2BE0532502140AADDD',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-14T13:45:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:18.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '60D59B04A52968F0E0532502140A73A5',
                                'className': 'Grade01',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class12.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a6028eff02ebd1b9346f85c'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-21T02:25:33.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:58:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '63732844A3685753E0532502140AECDF',
                                'className': 'Neel_test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a5f13a81c6dd52b2c8cd7ea',
                                    'ffffffff56ffc495e4b06170b87812b0'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-23T09:13:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:56:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75AD0FB740584640E0532502140A9425',
                                'className': 'Class TestMy',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff52a5d41be4b05d6a8d40b88f',
                                    'ffffffff56615974e4b0bd6d622f29b6'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-12T08:53:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-09-12T08:53:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78F9ECC58C1D7CBCE0532502140A442C',
                                'className': 'scoutclass',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1730940'
                                ],
                                'studentIds': [
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
                                    'ffffffff5bd30cc7d407951ac8bce01c'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-24T08:51:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-26T08:52:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '559DB669B4360619E0532502140AB1BC',
                                'className': 'Chandra_realize_reader_assignment',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1611747',
                                    '480077',
                                    '1314335',
                                    '1699681',
                                    '421023',
                                    '1500722',
                                    '891854'
                                ],
                                'studentIds': [
                                    'ffffffff57639202e4b06f8ebc4cf6d0',
                                    'ffffffff544f5b32e4b0c698ba42376e',
                                    'ffffffff57639202e4b043748696bd9c'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-07-31T09:07:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-07-31T10:49:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7794C6B5180E1369E0532302140A5317',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T14:44:21.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75D86C0E4E343467E0532402140A48F6',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-14T12:36:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '72D5FFC2664D1ACEE0532502140ADC10',
                                'className': 'test-74599',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5b6965fb45d991373d809280',
                                    'ffffffff5b6965fb1c6dd5258c2c11cd',
                                    'ffffffff5b69669af63bbf50ee14c776'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-08-07T05:27:13.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-08-07T05:30:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '64C5C65F295B6D40E0532302140AC194',
                                'className': 'mathxl_test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a7d74381c6dd52b2c8dc4c8',
                                    'ffffffff5a7d7439f02ebd1b9347e303'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-09T05:13:08.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:58:08.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D51BE56A645FECE0532402140A4817',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:29:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79630722DA7D640AE0532302140AC089',
                                'className': 'Test UserName',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796'
                                ],
                                'studentIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-29T14:13:48.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:57.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '68D4AB0FCABB2FAFE0532502140ABDBE',
                                'className': 'Ram_test_class2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1@2x.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1691092',
                                    '467625',
                                    '1540847',
                                    '467623'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-01T21:40:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-01T21:42:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800261F30DD07FDE0532302140AF9DD',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:50:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6808BA081D2C0F07E0532502140A821A',
                                'className': 'guard_mastery_LST_163',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '833886'
                                ],
                                'studentIds': [
                                    'ffffffff5ab42c601c6dd567f8252e5a',
                                    'ffffffff5ab42c5ff856993c2720e1d0'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-22T18:21:18.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-22T18:21:22.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3C7D903C45FDDE0532302140A9566',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:59:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79F1158138281BC1E0532302140A19E5',
                                'className': 'New Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732',
                                    '1326155',
                                    '1413796'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-05T14:42:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-05T14:42:24.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77994CB7323178A1E0532302140ADD41',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T20:08:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '675C3837146D171FE0532502140A0CB6',
                                'className': 'test_assignmentPage',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff52134353e4b09f267fc66a94'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-14T04:33:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '777EF43B78381DCAE0532302140A34FC',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1cd486bb3510148a985196b140d',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467624'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-05T12:42:15.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6AA1553555697555E0532502140AD3A9',
                                'className': 'Pradeep New Class 8',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class5.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '469743'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T19:15:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-24T19:15:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DBD6379BB936D0E0532302140A8F0A',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T03:31:04.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A2B444AB26E11DAE0532502140ACD38',
                                'className': 'Retest Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155',
                                    '1413796'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-08T12:07:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-08T12:07:17.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652A2D32B7266C1E0532402140ACC4D',
                                'className': '9th Grade - History',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:24:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E705E62B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:01:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AC7C6E445AA6962E0532502140A72A7',
                                'className': 'New Class + New Students2',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5bebfc27f8569926bf47ad67'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-16T06:50:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-16T06:50:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '605B68781FBC787CE0532302140A92C9',
                                'className': 'Renault_Class_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '835211',
                                    '1165896',
                                    '481738',
                                    '1314335',
                                    '1587077',
                                    '467625',
                                    '1540847'
                                ],
                                'studentIds': [
                                    'ffffffff5a335fce45d9913df4a7c848',
                                    'ffffffff5a4e01c51c6dd501c6c09dc2',
                                    'ffffffff5a4e019bf63bbf1c004df9dc',
                                    'ffffffff5a335fcfd407954230bfadae'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-15T00:38:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-01-04T05:28:22.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BEF68A44FC4FC7E0532502140AF9DE',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T17:04:13.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C7A1DF798C6336EE0532402140A97D0',
                                'className': 'Adaptive2018May',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310895',
                                    '1292775',
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5afeb6df1c6dd546d628aacc'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T07:19:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T17:19:22.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6CFBF06B54D4309CE0532302140A33C5',
                                'className': 'knew_guard_145_7',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5afa211af856992d47942aa3',
                                    'ffffffff5b07028ed4079557b1ca8e53'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-24T18:11:54.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-24T18:12:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BFB43C46B434B6E0532402140A288B',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff58dc04a1e4b02dc80c0d3299',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T17:57:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:23.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '675BC1D6D1595BA7E0532402140AB8DF',
                                'className': 'Class_65326',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5aa8d66ff856993c2720c6c3'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-14T03:59:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-05T07:30:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7021A311FB5D7A93E0532302140A7A4D',
                                'className': 'realize_student_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'a7692db3e9e84068ad81dcee91f51fc3'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-07-03T19:26:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-07-03T19:30:31.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6EF9E3D62CE83FBDE0532302140A4774',
                                'className': 'CAEL_120527454',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-19T02:35:36.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-19T02:35:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77801C1F03A066BCE0532402140A1114',
                                'className': 'Anurag Test Class With No Student',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-05T14:04:59.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-05T14:05:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D04DB3055E493BE0532402140ACD98',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T13:45:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:41:51.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79701058DD885097E0532302140A25AA',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T05:46:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-30T05:46:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DB88E40E9571EEE0532302140A6223',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T03:09:26.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:18.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6326E3B80D226F95E0532502140A46CC',
                                'className': 'hamsa_k-12-rs-report-analysis-class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class11.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467624',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5a130f4bf63bbf65703347d4',
                                    'ffffffff5a130f91f63bbf65703347d5',
                                    'ffffffff5a130fbff02ebd36c7769af2',
                                    'ffffffff5a130fa41c6dd503785158e1'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-19T14:14:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:53.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7731F4289E5B6039E0532502140AA05F',
                                'className': 'test_ashish',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3@2x.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1214279',
                                    '1214275',
                                    '532114',
                                    '532113',
                                    '532112',
                                    '1245855',
                                    '1708984',
                                    '1315895',
                                    '1500722',
                                    '1170655',
                                    '1170895',
                                    '1240575',
                                    '1815796',
                                    '1815797',
                                    '510675',
                                    '1709542',
                                    '1521950',
                                    '441569',
                                    '1815795',
                                    '1690848',
                                    '1787295',
                                    '1310875',
                                    '1847283',
                                    '1691092',
                                    '1399095',
                                    '1413815',
                                    '1295616',
                                    '1295615',
                                    '813679',
                                    '813678',
                                    '1188835',
                                    '826072',
                                    '1500866',
                                    '1164196',
                                    '1540847',
                                    '1745636',
                                    '1521241',
                                    '1770638',
                                    '351681',
                                    '1705419',
                                    '1814737',
                                    '1710043',
                                    '1710044',
                                    '1730940',
                                    '835211',
                                    '1735835',
                                    '480077',
                                    '1786788',
                                    '1852085',
                                    '1131876',
                                    '1185055',
                                    '1310055',
                                    '891854',
                                    '469743',
                                    '1697291',
                                    '1249489',
                                    '1804015',
                                    '1033438',
                                    '1815815',
                                    '1815816',
                                    '1814609',
                                    '1188816',
                                    '1702283',
                                    '1702282',
                                    '1702281',
                                    '447087',
                                    '532310',
                                    '1295595',
                                    '1500760',
                                    '1016522',
                                    '1526591',
                                    '843631',
                                    '1413796',
                                    '1587078',
                                    '1587077',
                                    '1705269',
                                    '1292775',
                                    '1690640',
                                    '1813732',
                                    '817343',
                                    '532321',
                                    '1500759',
                                    '1334875',
                                    '421023',
                                    '445972',
                                    '1034189',
                                    '902145',
                                    '1527176',
                                    '1587186',
                                    '1587185',
                                    '1587188',
                                    '1587187',
                                    '1214256',
                                    '817954',
                                    '1214255',
                                    '908091',
                                    '1126631',
                                    '467626',
                                    '833886',
                                    '467624',
                                    '467625',
                                    '838652',
                                    '467623',
                                    '1147855',
                                    '336566',
                                    '1709383',
                                    '1701813',
                                    '1881813',
                                    '1881814',
                                    '1699681',
                                    '887336',
                                    '893836',
                                    '1861558',
                                    '887297',
                                    '1886393',
                                    '817563',
                                    '1316755',
                                    '1709001',
                                    '1314335',
                                    '481640',
                                    '817564',
                                    '1310895',
                                    '1611747',
                                    '1165896',
                                    '1587082',
                                    '1326155',
                                    '503041',
                                    '1710115'
                                ],
                                'studentIds': [
                                    'ffffffff5bb290def856993930d369a2',
                                    'ffffffff5bb28890f63bbf06200fd259'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-01T16:50:21.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:30.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652A2D32B7466C1E0532402140ACC4D',
                                'className': '9th Grade - History',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:24:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6705256CA7B92349E0532502140ACD1D',
                                'className': 'Realize-787-No-Student',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '421023'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-09T19:39:48.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-09T19:39:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78FCF6AE91742A96E0532502140A1437',
                                'className': 'harry potter 1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3@2x.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff5bce2f1a1c6dd54aa54fa123',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '469743',
                                    '1326155'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-24T12:27:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-05T11:35:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff5bce2f1a1c6dd54aa54fa123'
                            },
                            {
                                'classId': '78CFD84AB3927BF1E0532302140AA62B',
                                'className': 'S_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class13.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff55e7dda4e4b08177b1be63d6',
                                    'ffffffff57f73dd9e4b06f819383ab9f'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-22T06:38:33.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-22T06:41:57.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C479B213BD23155E0532402140AE40F',
                                'className': 'guard_knew_local_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-15T19:03:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T17:19:36.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E2F32DD5DA553FE0532302140AAC4C',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:00:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7794A0A534954D67E0532502140A8F4E',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T14:33:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:52.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DDCFF8DD747B64E0532402140A3652',
                                'className': 'Ami Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T05:52:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B906CE0890832F9E0532402140AE53E',
                                'className': 'jayesh_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5bfbd568d40795112582af74'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-26T06:13:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-26T06:13:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75C7FA73BB0D46FBE0532502140AB88F',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-13T16:59:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79263EF057963D2BE0532502140AB194',
                                'className': 'ClassDemo',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-26T13:42:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-29T16:57:46.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BED30F09AD1B76E0532302140A6EE3',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:55:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E4C737945D4CD0E0532502140A57F1',
                                'className': 'Ami Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T14:15:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:37:59.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77FFF6E6405B3045E0532402140ACE85',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:37:11.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:22.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AC3DD7188892477E0532402140A29B9',
                                'className': 'New Cert Class1',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-16T02:10:41.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-16T02:10:41.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '64C3F093F8564570E0532302140A36C8',
                                'className': 'A_RGHT-62842',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-09T03:01:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T17:19:17.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '798260FB62C046B8E0532402140AAE5C',
                                'className': 'test telemetry',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-31T03:37:48.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:52.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E2FE0131841DB3E0532502140AACBD',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:03:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BE98903FE442F4E0532502140ADA34',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:37:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:42.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '58AB295AADB370C9E0532302140ACACD',
                                'className': 'class_bug42861',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff59b2667ed407957c3f8ae230'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-09-08T05:25:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '575324FB23316ED2E0532502140AF57F',
                                'className': 'Knewton class2208',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '1310895',
                                    '1310875',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff599bd674d4079513e8166515'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-08-22T03:00:02.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:58:17.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C4709EB5B606BB3E0532502140A3C8C',
                                'className': 'class_knew_145_guard',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5b887b00f02ebd67e479c100'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-15T18:22:33.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-08-30T19:17:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7963125B618C0FBAE0532502140A4E66',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-29T14:17:44.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-02T12:12:21.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '661C52D9EDE827FEE0532302140A593B',
                                'className': 'SCO_NB_787',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5a93e73bf02ebd3edf2b3d3a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-26T05:53:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-02-26T05:53:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652A2D32B7066C1E0532402140ACC4D',
                                'className': '2nd Grade - English - This title is purposely made longer',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:24:39.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:57:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5D83C97CF73F4FB9E0532302140AE65A',
                                'className': 'class_no_subs_content',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff52932ffce4b05d6a8d3f68c8',
                                    'ffffffff5a03b05bf02ebd55ddfb9254',
                                    'ffffffff5a03b05a45d9911d265a6cbc'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-08T20:33:11.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-19T17:44:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4C806DC687A73E0532402140AF007',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:06:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800563A595043D6E0532302140AC922',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T23:04:36.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:18.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A3024F09D371ED6E0532502140AADB2',
                                'className': 'ClassWithOrgMapping',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155',
                                    '1413796'
                                ],
                                'studentIds': [
                                    'ffffffff5be2ffe9f02ebd635e51f269',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-08T17:56:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-08T17:56:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '787038C4709447AFE0532502140AB5DD',
                                'className': 'Oct7TurnIn',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '835211',
                                    '1165896',
                                    '467625'
                                ],
                                'studentIds': [
                                    'ffffffff5bc764361c6dd5726d141247'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T12:32:52.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-17T12:33:01.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75DCAAE4002B6835E0532302140ACDCB',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-14T17:40:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A9F538464515B19E0532502140A4BFB',
                                'className': 'Cert-class-4',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bec0264f02ebd635e520a16'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T06:35:08.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T06:35:08.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C7B21D3C8836D90E0532402140A59CC',
                                'className': 'Klass',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1214279',
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5afec7a8f02ebd3d2c1be8bd'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T08:31:32.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T08:31:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '738AB779BED501B4E0532302140A1615',
                                'className': 'A_nightly_RGHT-74599',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5b753def45d991373d80eadd',
                                    'ffffffff5b753def1c6dd5258c2c6ad1'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-08-16T05:03:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T17:19:13.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4C806DC7A7A73E0532402140AF007',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:06:31.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:31.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '784D8BDF04983001E0532402140A874D',
                                'className': 'New Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-15T19:10:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:44:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B222E1458690BCBE0532402140A2349',
                                'className': 'CoTeacher-Students Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff5beb113a1c6dd50a73aa52f3'
                                ],
                                'productIds': [
                                    '1326155',
                                    '1413796'
                                ],
                                'studentIds': [
                                    'ffffffff5bf57bd5f8569926bf47fb4f',
                                    'ffffffff5bf57c2ff8569926bf47fb50',
                                    'ffffffff5bf56947f8569926bf47fb35',
                                    'ffffffff5bf4a6e11c6dd50a73aa999b',
                                    'ffffffff5bf61db5d4079511258294ca',
                                    'ffffffff5bf58916f8569926bf47fb73',
                                    'ffffffff5bf49bc745d9911ab2eb8e43',
                                    'ffffffff5bf4a6e1f02ebd635e524dd7',
                                    'ffffffff5bf49bc7f02ebd635e524ada',
                                    'ffffffff5bf5890b1c6dd50a73aaa1fe'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-20T18:42:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-21T22:08:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '60D72DF7AA423C1CE0532402140A40D9',
                                'className': 'dec_21_class_2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a3b7c59f02ebd36c777a735',
                                    'ffffffff5a3b7c5845d9913df4a7e56a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-21T04:18:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:02.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A90AE50E91E193CE0532502140A6F81',
                                'className': 'Manual Score Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-13T13:06:47.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-13T13:06:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C66B4A977274D0FE0532302140A8830',
                                'className': 'elux_user',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467626',
                                    '467624',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5a3a2d2645d9913df4a7e18d',
                                    'ffffffff5a3bad6a1c6dd503785258e5'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-17T08:09:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-17T08:09:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6DD29282CDAF68E0E0532302140AA0A5',
                                'className': 'maserati_reg_test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5b15499ef856993e18a7459d'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-04T10:15:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-04T10:15:59.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A169FE04629690DE0532302140A30A3',
                                'className': 'Transformer-Class2',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff5be2ffe9f02ebd635e51f269'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-07T11:29:38.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-07T11:42:23.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7619FFBCEA8310D0E0532302140A0E43',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-17T18:51:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B00A51CBA245C1AE0532302140A783A',
                                'className': 'Renault-Test-Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T02:41:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T02:41:29.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6AA013275F56225CE0532502140A526F',
                                'className': 'Pradeep New Class 3',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class5.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5a4d49a4f02ebd1b93469406',
                                    'ffffffff5adfa582f63bbf21f9c57ebc'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T17:45:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-03T18:16:42.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7973226EDB05212AE0532302140A5443',
                                'className': 'Class With Teachers2',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff5bce2f1a1c6dd54aa54fa123'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T09:28:18.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-30T09:28:18.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6966B61D6C1679BEE0532302140A5687',
                                'className': 'sample _class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '835211',
                                    '1240575',
                                    '1165896',
                                    '481738',
                                    '1314335',
                                    '467625',
                                    '1540847'
                                ],
                                'studentIds': [
                                    'ffffffff5acb1c28d40795781d25ca0e',
                                    'ffffffff5acb1c28f02ebd3d2c189c32'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-09T03:54:11.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-09T03:54:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C839257E0505AA1E0532402140A7FB0',
                                'className': 'guard_knew_local_new_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5afb1d621c6dd546d62896a2',
                                    'ffffffff5aff55f81c6dd5082dbe68ea',
                                    'ffffffff5aff5d30d4079557b1ca6ea7'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T18:35:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T19:09:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '789C818FACFB1C53E0532302140AB0F2',
                                'className': 'Hamsa Sample GC',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff56ba3578e4b044ebae410d32'
                                ],
                                'productIds': [
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-19T17:23:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-28T01:16:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7657E88B39382C42E0532302140A9565',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T20:42:04.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:42.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E326E2D5456C05E0532402140A3715',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:14:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B3BC588913F9E0532502140ADB30',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:01:02.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '666A4CBAFAAE68F0E0532402140A410A',
                                'className': 'a_2_March',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a990375f856993c27209737',
                                    'ffffffff5a99037445d9917d8511bc57'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-02T02:55:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:49:13.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '787719E4AABD0607E0532402140A7C1D',
                                'className': 'Temp_win10_chrome64',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff56f2dfcde4b0acd6c46f633f',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1881814',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T20:45:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:50:15.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff56f2dfcde4b0acd6c46f633f'
                            },
                            {
                                'classId': '6CBC4F7662EA5543E0532302140A3819',
                                'className': 'knew_guard_145_3',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5436838ae4b073b5269eb925',
                                    'ffffffff5b0307f3d4079557b1ca7293'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-21T14:17:11.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-21T15:25:23.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7799864790EC3CECE0532402140AEDE5',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T20:24:15.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '550C3A3888F34A5DE0532402140AABB5',
                                'className': 'class_notebook',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '532114',
                                    '817563',
                                    '532113',
                                    '467626',
                                    '532112',
                                    '532321',
                                    '533068',
                                    '1314335',
                                    '467624',
                                    '421023',
                                    '336566',
                                    '469743',
                                    '503041'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-07-24T03:33:13.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-07-24T03:35:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5D7ECCFA403D55C9E0532402140A596E',
                                'className': 'hamsa _test_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class8.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5997293d1c6dd55f526de126',
                                    'ffffffff599344881c6dd55f526dabe3',
                                    'ffffffff59934488f63bbf3ffa34c13a',
                                    'ffffffff59934488d4079513e8161010'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-08T14:36:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '686A7443B0A006DBE0532302140AF0CC',
                                'className': 'guard_class_resources_teacher',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '833886'
                                ],
                                'studentIds': [
                                    'ffffffff5aba93f8f02ebd20e730391e',
                                    'ffffffff5a8ef57df856990998146077'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-27T14:56:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-27T14:56:59.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78769F85441D69A1E0532402140A6701',
                                'className': 'Hamsa Sample GC',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T20:11:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:57.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '67709820D3DB6BCBE0532302140A6292',
                                'className': 'Class_65326',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5aaf4fa4f63bbf0e9edd7d9d',
                                    'ffffffff5ae1f947f856992d4791268f',
                                    'ffffffff5ac7051ff856991926b478ff',
                                    'ffffffff5accca90d40795781d25d15d',
                                    'ffffffff5aaa34051c6dd567f8251955',
                                    'ffffffff5ae207c4f02ebd3d2c18bf72'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-15T04:51:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-26T13:09:29.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '65A41E672B5040CEE0532402140AE954',
                                'className': 'maserati_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5a8bff38d40795745a3aa109',
                                    'ffffffff5a8c093bf02ebd3edf2b323b',
                                    'ffffffff5a8bff18f856990998145b31'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-20T06:29:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-02-20T06:40:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77729BC8C90F628DE0532302140A2317',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-04T21:58:32.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E2FD941B0F048BE0532502140AFF95',
                                'className': 'Ami Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:05:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:01.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6F8429DFECB96E52E0532402140A391F',
                                'className': 'Mr Bunker Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881813',
                                    '1881814',
                                    '1691092',
                                    '1540847'
                                ],
                                'studentIds': [
                                    'ffffffff5b31b9c1f63bbf658b606d38',
                                    'ffffffff53d976bae4b04bab608b97e1'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-25T23:33:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-25T23:57:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78E9D77FFE3A1B1AE0532402140A25BA',
                                'className': 'Class with 15 products',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '447087',
                                    '510675',
                                    '532114',
                                    '532113',
                                    '532112',
                                    '532321',
                                    '467625',
                                    '467623',
                                    '790333',
                                    '336566',
                                    '469743',
                                    '790369',
                                    '351681',
                                    '503041'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-23T13:39:32.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T13:39:32.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C3420C3107554CFE0532302140A2987',
                                'className': 'guard_knew_local',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '833886'
                                ],
                                'studentIds': [
                                    'ffffffff5afb1d621c6dd546d62896a2',
                                    'ffffffff5afa2074f856992d47942aa2',
                                    'ffffffff5afa211af856992d47942aa3',
                                    'ffffffff5afb460ed40795781d28fd98'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-14T19:48:52.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T17:19:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800563A593743D6E0532302140AC922',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T23:03:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5F9E444879E31A71E0532302140A869C',
                                'className': 'RTA classes with SCOs2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class11.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5a130f91f63bbf65703347d5',
                                    'ffffffff5a130f4bf63bbf65703347d4'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-05T14:59:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:57:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78FB9E658DAB1E87E0532502140A7B32',
                                'className': 'Test Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-24T10:51:18.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BF9D848EEC17F7E0532402140A2BC9',
                                'className': 'Ami Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T17:50:53.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E350724C8D794CE0532502140A1720',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:26:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '62421F3C8FC458EAE0532402140A4787',
                                'className': 'aa_jan_8',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a534581d4079507b71d0dc0',
                                    'ffffffff5a5345811c6dd501c6c0be13'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-08T05:18:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T17:19:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C826BA99969181CE0532402140A74F1',
                                'className': 'guard_knew_guard_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T17:13:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T17:19:31.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D60EBEF3442D73E0532302140A8862',
                                'className': 'Test UserName',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bbd5a42f856993930d38529',
                                    'ffffffff5bbd596cd40795315bd41ac7',
                                    'ffffffff58dc0174e4b06d85412c30e9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T20:37:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:24.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7799498E393B1804E0532502140A7A8C',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff516505f8e4b0015f8c354987'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T20:07:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '661D9F258E550733E0532402140A456E',
                                'className': 'nand_testClass01',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class14.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5a93fdc4f856990998146717',
                                    'ffffffff5a93fe871c6dd549d7b73fa1',
                                    'ffffffff5a93fe56f63bbf6311bd2915'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-26T07:26:38.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-30T06:25:22.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5E32D0A3D3151CA5E0532402140A227C',
                                'className': 'class_no_subs_content_fourth',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '351681'
                                ],
                                'studentIds': [
                                    'ffffffff5a0f28d445d9913df4a6de3c'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-17T13:22:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-11-17T13:22:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E704662B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:54.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:41.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A76A4A860C154FCE0532502140A082F',
                                'className': 'EMS-Test Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-12T06:03:51.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-12T06:12:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800167FD5545C93E0532502140A378B',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:46:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780C5DEB849D193AE0532402140A1F5F',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T13:24:59.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77FFF4D8C56D36BDE0532302140A6315',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:36:36.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AAD2B58CF750F32E0532302140A0256',
                                'className': 'Renault-Test-Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T23:06:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-15T00:02:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5EFE7FACA22E4203E0532502140A1665',
                                'className': 'autentico_class1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5a1c8212d407954230bf15b3',
                                    'ffffffff5a1c821245d9913df4a732c5'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-27T16:22:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:53:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6376A39112512DCDE0532402140A29EB',
                                'className': 'smoke_ar',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a677d92f02ebd1b93471ec9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-23T13:23:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:57:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3CC74E4BD6CE4E0532302140A0B13',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T13:01:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A772139702051E1E0532402140AC0E4',
                                'className': 'AltClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-12T06:37:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-12T06:37:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7794CDFA7A410CF6E0532502140A9905',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T14:46:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '8013D50BBF7A56B4E0532502140A0EB7',
                                'className': 'LSTDEV -  6-7 grade testing',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1770638'
                                ],
                                'studentIds': [
                                    'ffffffff5b609304f02ebd67e479253d'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2019-01-22T21:40:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2019-01-22T21:40:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AC7D54A504C7A24E0532502140AE8A7',
                                'className': 'New Class + New Users',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bebfc27f8569926bf47ad67',
                                    'ffffffff5bec0264f02ebd635e520a16'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-16T06:54:44.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-16T06:54:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6E837DD393F25D61E0532302140A6A19',
                                'className': 'CAEL_145033073',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1240575'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-13T05:20:39.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-13T05:20:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E2E0A849825D49E0532502140A7227',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T11:55:04.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:52.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6645EF635A1D25A3E0532302140A7EAD',
                                'className': 'maserity_test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '835211',
                                    '481738',
                                    '1314335',
                                    '467625'
                                ],
                                'studentIds': [
                                    'ffffffff5233394de4b073d445307bc8',
                                    'ffffffff52333798e4b04856feb80a32',
                                    'ffffffff52333799e4b04856feb80a34'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-28T07:32:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B156C1034A31661E0532502140A7328',
                                'className': 'Transformer-Class2',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5bec0264f02ebd635e520a16'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-20T03:28:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-20T03:28:46.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4C806DC747A73E0532402140AF007',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:06:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DB0CC1C2115728E0532302140AFC13',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1710044'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T02:34:44.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:41:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '785B46D7F2314E35E0532502140A8423',
                                'className': 'GClass2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class10.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5bc604cf1c6dd5726d140f9b',
                                    'ffffffff5bc604d0d407953b098faafb'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-16T11:33:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-16T11:35:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75C7FA73BB0F46FBE0532502140AB88F',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-13T16:59:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:23.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7619FFBCEA8110D0E0532302140A0E43',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-17T18:51:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2019-02-01T12:03:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7658058CA6794EB0E0532302140AF1C9',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T20:50:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C2705C2999D11CDE0532502140A4C89',
                                'className': 'EL Cert Testing',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '421023'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-14T04:10:44.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-14T04:10:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '787718632D4B0570E0532302140A7FC2',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff56f2dfcde4b0acd6c46f633f'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T20:44:54.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E38B349A011C3AE0532302140A0CBF',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:45:51.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3B3F3B2637EFAE0532502140A9D4A',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:59:53.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:46:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '61E6778DD6C0364CE0532402140A49C5',
                                'className': 'Pradeep\'s Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a4d4987f02ebd1b93469405',
                                    'ffffffff5a4d49a4f02ebd1b93469406',
                                    'ffffffff5a0c2a5bf8569922e668f282'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-03T15:57:44.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-01-05T15:28:30.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E2E191E5697520E0532502140A207F',
                                'className': 'Ami Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T11:55:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6A9E42B6B1C0651DE0532502140A0431',
                                'className': 'guard_class_knewton',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1@2x.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5adf8712f63bbf21f9c57e9d',
                                    'ffffffff5adf8713f856992d479122a2',
                                    'ffffffff5adf8712f856992d479122a1',
                                    'ffffffff5adf8712f63bbf21f9c57e9e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T15:35:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-24T16:19:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A7DE6F41D2F6D90E0532302140A324F',
                                'className': 'Assignment Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-12T14:45:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-12T14:45:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DBD417731E4F15E0532502140A2731',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T03:30:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:01.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D552499B3C3566E0532302140A16E8',
                                'className': 'Automation Class01_CERT',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bbd25b8f02ebd20add6d2ad'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:44:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '62E07FA970171F76E0532502140ADC32',
                                'className': 'Renault_rez',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5a5da7fcf63bbf0b505c303d',
                                    'ffffffff5a5da71d45d991021c72a2aa'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-16T02:15:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-02T05:54:31.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '764D1D85B799373EE0532302140A0429',
                                'className': 'MyTestClass',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '351681',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff538cf3d6e4b0277cb9f22747',
                                    'ffffffff5566f449e4b06c6b7fb4b010',
                                    'ffffffff57341fb8e4b0da5b08d0ea43',
                                    'ffffffff5ab029fef02ebd20e73028da',
                                    'ffffffff52a5d41be4b05d6a8d40b88f',
                                    'ffffffff548cf0b5e4b0a4e9ddb6a98a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T07:54:15.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-09-20T07:54:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79263EF057993D2BE0532502140AB194',
                                'className': 'ClassGCDemo',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-26T13:43:33.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-26T13:43:53.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3CC6EB5BA0EBBE0532502140A1A76',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T13:07:30.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AFF7C40A0103CDAE0532502140ACFB0',
                                'className': 'AssignmentTestLocal',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1413796'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T01:19:11.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T01:19:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AC813496C2C41FAE0532502140ADFAF',
                                'className': 'New Class With SSODomain',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5be0e1bbf02ebd635e51ef98',
                                    'ffffffff5bce2f1a1c6dd54aa54fa123',
                                    'ffffffff5be0da5e45d9911ab2eb2e1c',
                                    'ffffffff5be0de7e45d9911ab2eb2e1d'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-16T07:12:04.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-16T07:12:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '777621F3F39F3EC1E0532502140A5F01',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-05T02:17:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780C672AF4AB470BE0532502140AFC71',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T13:33:12.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:21.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '66598A35F0A04867E0532302140A506A',
                                'className': 'Knewton_muji_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '835211',
                                    '1240575',
                                    '1165896',
                                    '481738',
                                    '1314335',
                                    '467625',
                                    '1540847'
                                ],
                                'studentIds': [
                                    'ffffffff5a97ea451c6dd567f824df38',
                                    'ffffffff5a97ea44f856993c27209582',
                                    'ffffffff5a97ea44d4079502bd0c7a7b'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-01T06:55:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-01T06:55:51.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C291AE38AB66636E0532302140AE9C2',
                                'className': 'elux_testing',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff52134353e4b09f267fc66a94',
                                    'ffffffff5a3bad6af02ebd36c777a778',
                                    'ffffffff5a3bad6a1c6dd503785258e5'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-14T06:39:49.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-14T06:39:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '65DEAD6FF90E3025E0532302140A8FBD',
                                'className': 'StudentTest',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class13.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a8fdcf945d9914cfb0f322b'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-23T04:20:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:57:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '791FF5AF8F250CC6E0532502140A7695',
                                'className': 'vinay_cl',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-26T06:13:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-26T06:13:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A158708BFAE3046E0532402140A8855',
                                'className': 'New Class + New Users',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff5be2ffe9f02ebd635e51f269'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-07T10:11:21.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-07T10:11:21.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '796BD853BAD810D9E0532502140ACBEC',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T00:44:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T23:25:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C468ADC0E7F07DAE0532402140AE8E7',
                                'className': 'realize_knew_145',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5afb556b45d9913b13a67bde'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-15T17:47:21.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-15T17:47:24.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7794B5FD03D66F91E0532302140AD048',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6c915f856993930d37141'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T14:39:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800261F30EF07FDE0532302140AF9DD',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:57:54.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:05.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '765964679DC51AF7E0532502140A2B91',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T22:28:17.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:57:41.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78771C5BFF8E4C92E0532502140A8F7B',
                                'className': 'Delete_15July_1',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff56f2dfcde4b0acd6c46f633f'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1881814',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T20:46:08.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:11.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DB1201CF5961ECE0532302140A3129',
                                'className': 'Automation Class01_CERT',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T02:36:12.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:29.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '62DFB33AECAD38ACE0532302140AE323',
                                'className': 'Muji_Class1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '467626',
                                    '467624',
                                    '421023'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-16T01:18:32.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7772B392B0FE241BE0532302140A0007',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-04T22:05:11.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:41.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652A2D32B6E66C1E0532402140ACC4D',
                                'className': '2nd Grade - English - This title is purposely made longer',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:24:39.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:57:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DAF775F3514D13E0532502140A8A15',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1710044'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T02:28:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '776F419CE8080F08E0532302140AFC40',
                                'className': 'cvvcvvcvvv',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-04T17:58:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-04T17:58:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B3BC588313F9E0532502140ADB30',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4ACD9404E5115E0532402140A332C',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T18:58:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:11.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '787797359F7827BAE0532402140A52F4',
                                'className': 'Automation Class01_CERT',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T21:20:21.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:32.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7743C59094E37F02E0532502140ADA7B',
                                'className': 'Geoff_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5bb3b37f45d991611cbfecc4'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-02T14:05:49.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-02T14:05:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DAF9A43AE75E81E0532502140A4D6E',
                                'className': 'Ami Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1710044'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T02:29:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6AA0CD977BB56E7DE0532302140AEEC9',
                                'className': 'Pradeep New Class 7',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class4.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '351681'
                                ],
                                'studentIds': [
                                    'ffffffff5adfa582f63bbf21f9c57ebc'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T18:37:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-24T18:37:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BE90EB153A3D54E0532502140ACFAE',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:37:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:11.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7772D5D8801E7462E0532402140A47C3',
                                'className': 'Section_000-000-001',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-04T22:14:46.000Z',
                                'lastUpdatedBy': 'ffffffff5bb6abb7f63bbf06200fd947',
                                'lastUpdatedDate': '2018-10-05T16:35:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75AD0FB740564640E0532502140A9425',
                                'className': 'Class 45',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff56615974e4b0bd6d622f29b6',
                                    'ffffffff566161e0e4b0d5592376ff20',
                                    'ffffffff57341fb8e4b0da5b08d0ea43'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-12T08:52:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-09-12T08:52:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780D56465F7F4899E0532302140ABE7A',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T14:34:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B029EE229307D72E0532302140AE0D4',
                                'className': 'Cert-class-4',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5be2ffe9f02ebd635e51f269'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T05:04:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T05:04:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6AA083F2C9C71CB0E0532502140A5386',
                                'className': 'Pradeep New Class 5',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class6.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '469743'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T18:17:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-24T18:17:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78E9C2991AA277E9E0532402140AFD4C',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1815797',
                                    '1813732',
                                    '1815795',
                                    '850562',
                                    '850563',
                                    '1787295',
                                    '884923',
                                    '1710115',
                                    '1814737',
                                    '884924',
                                    '1815815',
                                    '1710043',
                                    '1815816',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5bce2f1a1c6dd54aa54fa123',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-23T13:32:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:24.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6A171AD856A71B6CE0532402140A726D',
                                'className': 'Pooja_AV',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1691092',
                                    '421023',
                                    '1540847'
                                ],
                                'studentIds': [
                                    'ffffffff5ad6ab8ad40795781d25df1d',
                                    'ffffffff5ad6ab8af856992d47911aa7',
                                    'ffffffff5ad6ab8ad40795781d25df1c',
                                    'ffffffff5ad6ab89f63bbf21f9c57607'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-17T22:20:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-17T22:21:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '55AF8516F6F74A71E0532502140AF6A8',
                                'className': 'Adaptive Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class9.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1240575',
                                    '1292775'
                                ],
                                'studentIds': [
                                    'ffffffff57612fdae4b06f8ebc4cd453',
                                    'ffffffff5980583845d9910a26f34dae',
                                    'ffffffff56e7ef26e4b0cf4d2c48e753'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-08-01T06:22:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:53:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78DB6FCD3228554CE0532402140A177E',
                                'className': 'wizard',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5bce6b0145d991372e49846a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-22T20:27:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-22T20:28:15.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7910FEAE7471380AE0532502140AF94A',
                                'className': 'Test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-25T12:21:27.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-25T12:21:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '787797359F8827BAE0532402140A52F4',
                                'className': 'Automation Class01_NIGHTLY Change name',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881813',
                                    '1710044'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T21:22:32.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:41:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4AC652AA65113E0532402140A3FEA',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T18:58:17.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '58AC8F0FDEA70C2BE0532502140AF4D6',
                                'className': 'adaptive_class_sep8',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class8.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1292775'
                                ],
                                'studentIds': [
                                    'ffffffff59b2798c1c6dd52c21d834de',
                                    'ffffffff56d6fdcbe4b0bd6d62310a2b'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-09-08T07:05:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:53:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3CC6EB5B40EBBE0532502140A1A76',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T13:05:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7658037A7ADD03D2E0532402140A1BE3',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T20:49:36.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:57:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AC3667191BB6B81E0532302140A81E8',
                                'className': 'Assignment Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-16T01:37:24.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-16T01:37:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7928EE89E405756AE0532402140ABCF4',
                                'className': 'Test Import',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-26T16:54:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:36.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6782619C962B029DE0532302140AD37F',
                                'className': 'Hamsa edited this now',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class9.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff599344881c6dd55f526dabe3',
                                    'ffffffff5aab5e6ef63bbf0e9edd7212',
                                    'ffffffff5aab5e6ff856993c2720cf83'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-16T02:04:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-24T14:19:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C59CE2A38A61AE5E0532402140ABB14',
                                'className': 'knew_guard_145_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-16T16:45:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-16T16:45:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B20ECF496EC1DC3E0532502140ADE5E',
                                'className': 'Smoke-Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-20T17:12:13.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-20T17:12:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C45ED4F79CE6603E0532302140A7663',
                                'className': 'knew_145_guard',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '833886'
                                ],
                                'studentIds': [
                                    'ffffffff5afb4b0ef02ebd3d2c1bd524'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-15T17:02:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-15T17:03:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A1599178D3717A5E0532502140A129B',
                                'className': 'New Class + New Students2',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff5be30275d407951125822c9f'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-07T10:19:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-07T10:19:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78E776D257D57FA0E0532302140A02A2',
                                'className': '$new_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-23T10:48:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-26T22:10:53.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '766E15E01F165F4EE0532502140AAEEC',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-21T23:09:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77FFC4B593727BDDE0532502140AC3E0',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:27:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '76A748A3DF6F4927E0532502140A909F',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1886393',
                                    '1710044'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-24T19:24:35.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:41:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '67640F3BFCB56ADEE0532302140AC260',
                                'className': 'hamsa_k12_new_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class7.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff59934488f63bbf3ffa34c13a',
                                    'ffffffff599344881c6dd55f526dabe3'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-14T13:53:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:11.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '62F6412436583719E0532402140ADD35',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '835211'
                                ],
                                'studentIds': [
                                    'ffffffff5a5f13a81c6dd52b2c8cd7ea',
                                    'ffffffff5a5f13a6f85699056cc2d5ef',
                                    'ffffffff5a5f13a545d991021c72a695'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-17T04:13:02.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:41.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7286EFDAD49E0603E0532402140A6271',
                                'className': 'Prad',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1214279',
                                    '336566',
                                    '835211',
                                    '1240575',
                                    '1165896',
                                    '481738',
                                    '467625',
                                    '1540847'
                                ],
                                'studentIds': [
                                    'ffffffff5b64378345d991373d808f23'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-08-03T07:07:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-08-08T04:11:51.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '68D9F94526387C03E0532502140A300C',
                                'className': 'practice_One',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a8bff18f856990998145b31',
                                    'ffffffff5a8bff38d40795745a3aa109'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-02T03:59:47.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-02T03:59:51.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B04779D87610E6FE0532402140AA885',
                                'className': 'New Cert Class1',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '469743'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T07:15:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T07:15:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6AD9124F3BFA0E1AE0532502140A497D',
                                'className': 'Ram_test_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1240575',
                                    '1295616',
                                    '1295615',
                                    '1245855',
                                    '1295595',
                                    '1310055'
                                ],
                                'studentIds': [
                                    'ffffffff5ae361c145d9913b13a36dd8',
                                    'ffffffff5ae361c1f02ebd3d2c18c5fe'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-27T13:45:36.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-27T13:45:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C75AC54066F03CCE0532402140A6D18',
                                'className': 'knew_knew_guard_local_6',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T02:00:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T02:00:46.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E705262B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:01:05.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7744FDC233396EEDE0532302140A5442',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-02T15:33:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:58:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DAFAFC9F4D3F19E0532302140A9952',
                                'className': 'Automation Class02',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1886393',
                                    '1710044'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T02:29:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '76529CC769C4658BE0532402140A6DCD',
                                'className': '1st Grade - English',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff516505f8e4b0015f8c354987'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:22:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:57:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B00905E9B383F3EE0532302140A25FF',
                                'className': 'Renault Test Class - local',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T02:35:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T02:35:41.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BE785B3C2A2F55E0532402140A1797',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:30:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:18.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '784D7781B2902184E0532502140AA4DC',
                                'className': 'Realize Class 02',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-15T19:05:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:44:52.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D050C0AEA30948E0532502140AF601',
                                'className': 'Realize Class 04',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T13:46:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4AC652AAC5113E0532402140A3FEA',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T18:59:38.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:52.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '762D5B24CBF3652EE0532502140A717A',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-18T17:56:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:56:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6CFB437222B81AFEE0532502140A7A8B',
                                'className': 'knew_guard_145_6',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff54402972e4b0e2588cf29b9e',
                                    'ffffffff5b07333bd4079557b1ca94af',
                                    'ffffffff5b072ff4f02ebd497a600456',
                                    'ffffffff5b0735a8f85699315b7e486e',
                                    'ffffffff5b072ed0f63bbf34e77e3ce8',
                                    'ffffffff5af37100f02ebd3d2c1b65d5',
                                    'ffffffff5b0734bff85699315b7e4855'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-24T17:24:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-24T18:00:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AA022381B3D7D76E0532302140AAA15',
                                'className': 'ClassWithOrgMapping',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796'
                                ],
                                'studentIds': [
                                    'ffffffff5bec0264f02ebd635e520a16',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T07:32:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T07:32:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '789F4A80050C5C7BE0532302140ACA62',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff56ba3578e4b044ebae410d32'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-19T20:42:13.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6A9FA902AE8F1034E0532302140A1648',
                                'className': 'guard_class_knew',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5adf9e8ef02ebd3d2c18bacc',
                                    'ffffffff5adf9e8ef02ebd3d2c18bacb'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T17:15:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-24T17:16:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B0031A0FF28079FE0532402140AA188',
                                'className': 'Nightly-TestNav',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bd7f145f856996117578d75'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-19T02:09:11.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-19T02:09:11.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3A13F7D87057FE0532402140A3090',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:48:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E702262B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:15.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6E7050B57D3B5A67E0532302140A5259',
                                'className': '12_June_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5b1fa01df63bbf658b60421e',
                                    'ffffffff5b9988f5f856997be930f476',
                                    'ffffffff5b323904f856993e18a7cc9f',
                                    'ffffffff5b1fa01e45d991040917c46c'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-12T06:27:38.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-09-26T20:44:53.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '570A1BA2D74B3278E0532402140A77E5',
                                'className': 'SACT & DCAT SCOs OFFLINE',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff59970d1a45d9910a26f3eebc'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-08-18T11:51:53.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:57:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '58E88C28998E15B7E0532502140AFCBE',
                                'className': 'adaptive 0911',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1@2x.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1240575',
                                    '1310895',
                                    '1292775',
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5a98f459f856993c27209730',
                                    'ffffffff59b667fd45d99156d4fa1d53',
                                    'ffffffff5a00f6aaf63bbf0e4ca12ab6',
                                    'ffffffff5a00f71bf63bbf0e4ca12ab7'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-09-11T06:39:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:53:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '779624F570E046A0E0532302140AD15D',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T16:22:17.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7772C5D3667364EBE0532402140AD40B',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-04T22:10:17.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3B3F3B2697EFAE0532502140A9D4A',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T13:00:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:42.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '796CA2CC37620BEDE0532502140A3F46',
                                'className': 'Test Import Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T01:49:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6876CD5219157604E0532302140A6AD3',
                                'className': 'dicussion_test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '351681',
                                    '467624',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff563090b7e4b0efab9c1d77b3',
                                    'ffffffff58207146e4b024641d804235',
                                    'ffffffff52134353e4b09f267fc66a94'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-28T05:40:48.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-28T05:40:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '766DFFBAB55548BFE0532502140A9608',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-21T23:03:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:31.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6F7D12D38FB53CA0E0532302140AE394',
                                'className': 'Pradeep Discussion Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5b313d1ff856993e18a7cb39'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-25T15:06:06.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-25T15:06:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '76596722652A4663E0532402140A9616',
                                'className': '2nd Grade - English - This title is purposely made longer',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T22:29:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:57:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6D048D871A2A2F96E0532302140A7EBD',
                                'className': '25may',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5b07c951f63bbf34e77e45ed',
                                    'ffffffff5b07c95145d99140f636c129'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-25T04:29:02.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:57:31.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6EFF5FE28632195EE0532302140A7598',
                                'className': 'Bala_TEST_19_06',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class8.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1804015'
                                ],
                                'studentIds': [
                                    'ffffffff5b2901121c6dd52000536fae'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-19T09:08:12.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-19T09:11:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78F9E860CAA87666E0532502140AEB0B',
                                'className': 'scoutdemo',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1730940',
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff54738483e4b001bd4b61aaf0'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-24T08:48:59.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-24T08:51:02.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800563A594943D6E0532302140AC922',
                                'className': 'Ami Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T23:04:15.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D958E24058522AE0532502140AE73A',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T00:32:51.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78F276FBF22A7F48E0532402140A82C3',
                                'className': 'Section_000-000-001-82c3',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff5bce2f1a1c6dd54aa54fa123'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-23T23:56:02.000Z',
                                'lastUpdatedBy': 'ffffffff58489314e4b0750077fd619f',
                                'lastUpdatedDate': '2018-10-24T01:10:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D3E48D77C9465CE0532402140A347D',
                                'className': 'sdfsdfsdfsdf',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T18:02:24.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:50:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BE7FDD1DA72EECE0532402140AC84F',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:31:13.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:22.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B8D0DC774B613E0E0532302140A7B1C',
                                'className': 'Nightly-Knewton',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-26T02:12:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-26T02:12:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5FCA73402D697679E0532502140ADDD7',
                                'className': 'class_test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5a29dfcff02ebd36c7774f12'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-07T19:41:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:53:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4C806DC6E7A73E0532402140AF007',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:06:06.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D01B3D2FC469F9E0532402140A8510',
                                'className': 'Automation Class02',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T13:32:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:41.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5ACC39592CFF4EE8E0532302140AB164',
                                'className': 'Bala_TEST_RGHT-60344',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1314335'
                                ],
                                'studentIds': [
                                    'ffffffff59d61abbf02ebd49e09f5ce2',
                                    'ffffffff59d61abbd40795168511e7eb'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-10-05T07:42:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:53:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77998DCA98E255FFE0532502140A393A',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T20:26:21.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:24.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '58E5E5309ABA3AA5E0532502140AAC7B',
                                'className': 'adaptive_class_sep11',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class8.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310895'
                                ],
                                'studentIds': [
                                    'ffffffff59b2798c1c6dd52c21d834de',
                                    'ffffffff56e6c0cee4b00a718f97fa03'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-09-11T03:30:04.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T17:19:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75D86C0E4E363467E0532402140A48F6',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-14T12:36:15.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:23.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7E788BDA83325CA8E0532302140A6FB8',
                                'className': 'Test_841',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '503041',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5c2c99b01c6dd5530f9c197a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2019-01-02T10:59:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2019-01-02T11:00:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '555AF4A871612B97E0532502140AE6D1',
                                'className': 'Chandra_tincan_assignment',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1611747',
                                    '480077',
                                    '1314335',
                                    '1699681',
                                    '421023',
                                    '1500722',
                                    '891854'
                                ],
                                'studentIds': [
                                    'ffffffff569ca54ee4b0939fb6a40819'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-07-28T01:28:48.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-07-28T01:31:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C46660AA4232B38E0532502140A00A0',
                                'className': 'guard_145_knew_new',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '833886'
                                ],
                                'studentIds': [
                                    'ffffffff5afb5399f63bbf21f9c8958f'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-15T17:39:36.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-15T17:39:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '640558C58D69345AE0532502140ACE69',
                                'className': 'hamsa_k12_new_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467624',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff59934488d4079513e8161010',
                                    'ffffffff599344881c6dd55f526dabe3',
                                    'ffffffff59934488f63bbf3ffa34c13a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-30T15:38:35.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800261F30E907FDE0532302140AF9DD',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:57:06.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6A233DD8FF3336D1E0532402140A41D4',
                                'className': 'Realize 787 comments',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467626'
                                ],
                                'studentIds': [
                                    'ffffffff5ad7772af02ebd3d2c18b2ea',
                                    'ffffffff5ad7772c1c6dd546d6257d3a',
                                    'ffffffff5adb6ac6f63bbf21f9c57b97',
                                    'ffffffff5adb6af7f856992d47911fbf'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-18T12:49:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-21T12:46:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DB9ACA79C96D68E0532302140AC751',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T03:14:27.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:32.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79EA605F324278D9E0532302140A5A8A',
                                'className': 'vinay_cl1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '467623'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-05T06:42:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-05T06:42:15.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652A64626076EE4E0532302140AF965',
                                'className': '7th Grade - Maths',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:26:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:30.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77CA2D0B8803389FE0532402140A8927',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1cd486bb3510148a985196b140d',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467624'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T06:26:51.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:41:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78769F85441669A1E0532402140A6701',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff56f2dfcde4b0acd6c46f633f'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bc7cf95f856992e964af3c3',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T20:11:06.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C26EB4E24DF5AA3E0532502140A97DF',
                                'className': 'EL Testing Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5af942eb1c6dd546d62883fc'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-14T04:03:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-14T04:04:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6D02FEE57F8729A7E0532302140ACB9F',
                                'className': 'maserati_test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-25T02:38:27.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-25T02:38:27.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A9F4A186E8C4CB1E0532302140A4609',
                                'className': 'AssignmentTestLocal',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T06:32:30.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T06:32:30.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780F60D97ACA6AA0E0532302140A70FC',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T17:00:33.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '64187F3409CC01BFE0532502140AEDE7',
                                'className': 'realize_787_class1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1@2x.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1295616',
                                    '1295615',
                                    '813679',
                                    '447087',
                                    '532114',
                                    '532113',
                                    '467626',
                                    '532112',
                                    '532310',
                                    '1245855',
                                    '1295595',
                                    '467624',
                                    '467625',
                                    '467623',
                                    '336566',
                                    '351681',
                                    '1814737',
                                    '1240575',
                                    '1815796',
                                    '510675',
                                    '1813732',
                                    '817343',
                                    '532321',
                                    '1815795',
                                    '421023',
                                    '1310055',
                                    '817542',
                                    '891854',
                                    '469743',
                                    '1787295',
                                    '1310875',
                                    '503041',
                                    '1710115',
                                    '1815816',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5a66286df85699056cc2fbc4',
                                    'ffffffff5a6628aff02ebd1b93471c49',
                                    'ffffffff5a66283f45d991021c72cd48',
                                    'ffffffff5a84ae8af85699056c00a140',
                                    'ffffffff5a66289ef85699056cc2fbc5',
                                    'ffffffff5a6627fcf85699056cc2fbc1',
                                    'ffffffff5a662815f85699056cc2fbc3',
                                    'ffffffff5a65264bf63bbf0b505c57d0',
                                    'ffffffff5a65268745d991021c72caff',
                                    'ffffffff5ada55731c6dd546d625807c',
                                    'ffffffff5a66285345d991021c72cd4a',
                                    'ffffffff5a66282cd407951263a4b25b',
                                    'ffffffff5a662b321c6dd52b2c8cfd38',
                                    'ffffffff547d4f21e4b01f611d2f5cf9',
                                    'ffffffff5a6628c745d991021c72cd4d',
                                    'ffffffff5a6525fdf02ebd1b934719f7'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-31T14:29:24.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-03T21:45:15.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B1447889EA56A0AE0532302140AE3A3',
                                'className': 'Nightly- Renault Realize GC',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-20T02:06:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-20T02:06:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A40FC9CF2BD785BE0532402140AB92B',
                                'className': 'Altitude',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-09T14:02:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-09T14:02:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '698EC29A2F176D9EE0532302140AEBE9',
                                'className': 'NAGA_EL_TESTING',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5acdbc0d1c6dd546d625703e',
                                    'ffffffff5acdbc0c1c6dd546d625703d',
                                    'ffffffff5ad481e645d9917d851243aa',
                                    'ffffffff5ad481bef63bbf21f9c57156'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-11T03:40:59.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-25T10:45:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D55312275F26BEE0532402140A2F22',
                                'className': 'Automation Class02',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bbd25b8f02ebd20add6d2ad'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:44:54.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AAD8B114AC45CD6E0532402140AAFBA',
                                'className': 'Test-SSO-Prasannaa',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T23:32:49.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T23:32:49.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7619FFBCEA7F10D0E0532302140A0E43',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-17T18:50:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:11.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DDCB518FEA48F1E0532302140A2001',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T05:51:11.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:30.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6CDAB6695F8E7D0AE0532302140A7F0D',
                                'className': 'realize_student',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class7.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '469743',
                                    '467626',
                                    '467624',
                                    '467625'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-23T02:36:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-23T02:36:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E704C62B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '787797359F8427BAE0532402140A52F4',
                                'className': 'Albus dumledore',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881813',
                                    '1710044'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T21:22:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-11T23:12:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E331D9842F5774E0532502140A3CF2',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:17:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A7598242E9723A7E0532502140A17A1',
                                'className': 'Altitude',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-12T04:48:32.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-12T04:48:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '61E828B221AB5A38E0532502140A53F2',
                                'className': 'Pradeep\'s Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a5396fcf63bbf1c004e1a63',
                                    'ffffffff5a4d602cf63bbf1c004df8e9',
                                    'ffffffff5a5396e7f8569907637269b8',
                                    'ffffffff5a4d49a4f02ebd1b93469406'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-03T17:58:51.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:57.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77994BC5E06A75B0E0532402140A09C5',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T20:09:54.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78E9D77FFE361B1AE0532402140A25BA',
                                'className': 'Class with 15 products',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '447087',
                                    '510675',
                                    '532114',
                                    '532113',
                                    '467626',
                                    '532112',
                                    '532321',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623',
                                    '336566',
                                    '469743',
                                    '351681',
                                    '503041'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-23T13:38:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T13:38:47.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '550C6B46E1FE2EE5E0532502140A64FF',
                                'className': 'class_notebook2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1188816',
                                    '1214275',
                                    '447087',
                                    '532114',
                                    '532113',
                                    '532112',
                                    '532310',
                                    '1245855',
                                    '1295595',
                                    '1035322',
                                    '1170655',
                                    '1170895',
                                    '843631',
                                    '884923',
                                    '1240575',
                                    '1292775',
                                    '510675',
                                    '817343',
                                    '441569',
                                    '532321',
                                    '1500759',
                                    '1334875',
                                    '421023',
                                    '445972',
                                    '817542',
                                    '1034189',
                                    '1310875',
                                    '902145',
                                    '1214256',
                                    '1413815',
                                    '1295616',
                                    '1214255',
                                    '1295615',
                                    '813679',
                                    '908091',
                                    '813678',
                                    '481738',
                                    '1188835',
                                    '826072',
                                    '467626',
                                    '533068',
                                    '833886',
                                    '467624',
                                    '467625',
                                    '838652',
                                    '1516173',
                                    '467623',
                                    '336566',
                                    '1164155',
                                    '351681',
                                    '908259',
                                    '1699681',
                                    '887336',
                                    '835211',
                                    '893836',
                                    '480077',
                                    '887297',
                                    '817563',
                                    '1131876',
                                    '1314335',
                                    '481640',
                                    '1185055',
                                    '1310055',
                                    '891854',
                                    '469743',
                                    '1310895',
                                    '1165896',
                                    '1033438',
                                    '503041'
                                ],
                                'studentIds': [
                                    'ffffffff59782ad5f02ebd6f4dd777c1',
                                    'ffffffff5975a5f2f02ebd6f4dd7542b',
                                    'ffffffff5975a5f2f63bbf3ffa339cf6',
                                    'ffffffff59782aabf856997a442a3c06'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-07-24T03:46:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-07-26T01:38:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3CCE02CEA17C6E0532502140AFE28',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T13:03:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:24.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B146E0D4C1B1DDCE0532402140A1478',
                                'className': 'Test-SSO-Prasannaa',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-20T02:19:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-20T02:19:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6A1BC41A62FA1A4CE0532302140A3147',
                                'className': 'Apr-18-Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5ad6fa4645d9917d851248cb',
                                    'ffffffff5ad6fa47f63bbf21f9c57640'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-18T03:56:51.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-18T03:56:57.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BE7EACA62D2EA2E0532302140A1651',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:30:41.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:31.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '605F26998A71792AE0532502140AB6CA',
                                'className': 'Renault_Class_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '835211',
                                    '1165896',
                                    '481738',
                                    '1314335',
                                    '1587077',
                                    '467625',
                                    '1540847'
                                ],
                                'studentIds': [
                                    'ffffffff5a339e99f8569922e669f2e6',
                                    'ffffffff5a339e9945d9913df4a7c97f'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-15T05:06:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-12-15T05:06:21.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E301A458E81E84E0532502140A00EF',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:04:17.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:21.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '795C6560F6521B6CE0532302140A53EF',
                                'className': 'Test Grade Submission',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5bc7cf95f856992e964af3c3'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-29T06:18:53.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-29T14:03:52.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C7557DAA5CD0D65E0532502140ABC33',
                                'className': 'knew_kn_knew_guard',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T01:37:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T01:37:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6F00F4D9F385141EE0532302140A9736',
                                'className': 'CAEL_203121439',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-19T11:01:27.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-19T11:01:30.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DB10218824572BE0532302140A04A9',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1710044'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T02:35:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '791E6FFA411D2590E0532402140A218C',
                                'className': 'jayesh_cl',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1886393',
                                    '833886',
                                    '467624',
                                    '838652',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff55b650b7e4b026b16a3ed9fe',
                                    'ffffffff5b7dbdd6f63bbf50ee153803'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-26T04:23:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-31T06:59:25.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7526537F757A1EA1E0532502140A437F',
                                'className': 'elux_guard_kum',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1214279',
                                    '1188816',
                                    '1214275',
                                    '447087',
                                    '532114',
                                    '532113',
                                    '532112',
                                    '532310',
                                    '1245855',
                                    '1295595',
                                    '1500722',
                                    '1500760',
                                    '1526591',
                                    '843631',
                                    '1240575',
                                    '1292775',
                                    '510675',
                                    '1813732',
                                    '817343',
                                    '1521950',
                                    '441569',
                                    '532321',
                                    '1500759',
                                    '1815795',
                                    '421023',
                                    '1690848',
                                    '445972',
                                    '1787295',
                                    '1310875',
                                    '902145',
                                    '1399095',
                                    '1214256',
                                    '1295616',
                                    '817954',
                                    '1214255',
                                    '1295615',
                                    '813679',
                                    '908091',
                                    '481738',
                                    '826072',
                                    '467626',
                                    '833886',
                                    '467624',
                                    '467625',
                                    '838652',
                                    '1500866',
                                    '1540847',
                                    '467623',
                                    '336566',
                                    '1770638',
                                    '1881813',
                                    '1881814',
                                    '351681',
                                    '908259',
                                    '1814737',
                                    '887336',
                                    '835211',
                                    '1735835',
                                    '893836',
                                    '480077',
                                    '887297',
                                    '1786788',
                                    '817563',
                                    '1131876',
                                    '1314335',
                                    '481640',
                                    '1310055',
                                    '817564',
                                    '891854',
                                    '469743',
                                    '1310895',
                                    '1249489',
                                    '1804015',
                                    '1033438',
                                    '503041',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5b90378cf63bbf50ee157372',
                                    'ffffffff5b96b572f63bbf08c1753502'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-05T16:07:38.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-09-10T14:36:24.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78FA06DCFC9F187DE0532502140A8C1A',
                                'className': 'testscoutnew',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1730940'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-24T08:58:52.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-24T08:58:53.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E702E62B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:35.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '791FF5AF8F1F0CC6E0532502140A7695',
                                'className': 'vinay_cl',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5bd2ea311c6dd52405094e42'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-26T06:12:41.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-26T06:19:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77FFC4B5936C7BDDE0532502140AC3E0',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:26:47.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:17.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79EA7DDDC2D1399BE0532302140AA036',
                                'className': 'vinay_cl1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5be02edfd407951125822705'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-05T06:50:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-05T06:52:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '69773B8B8FA347F6E0532402140A46AD',
                                'className': 'sashi_discussion',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1295595'
                                ],
                                'studentIds': [
                                    'ffffffff5acc315345d9917d851239f6'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-09T23:36:49.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-09T23:36:52.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E4E06EE3821AFFE0532402140A3B7B',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T14:18:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:15.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780C672AF4A0470BE0532502140AFC71',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T13:30:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:12.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E702862B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:31.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:13.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79732F70A5E24D2FE0532302140ADB9A',
                                'className': 'Test Import Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T09:30:12.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6508A600D5BB3474E0532302140AB047',
                                'className': 'Deleteme_realizeRT_stc1234',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5a81d62845d991021c73a234'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-12T13:00:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '60C35AF614443F8DE0532502140A17CE',
                                'className': 'Muji_Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a3a2fc0f02ebd36c777a323'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-20T04:39:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:58:05.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780E367DC36766C4E0532402140ABF4D',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T15:37:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:08.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A9F8CE309A93F42E0532502140A7AAC',
                                'className': 'Cert-Classe-Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5bec0264f02ebd635e520a16',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T06:51:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T06:51:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5E6E5411B6440519E0532502140AB0EC',
                                'className': 'hamsa_Show_Scores_Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class12.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '467626',
                                    '467624',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5a130fa41c6dd503785158e1',
                                    'ffffffff5a130f4bf63bbf65703347d4',
                                    'ffffffff5a130f91f63bbf65703347d5',
                                    'ffffffff5a130fbff02ebd36c7769af2'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-20T12:22:18.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6A1EE7D685B41455E0532502140A31CA',
                                'className': 'maserati_class_sp_149',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5a8bff18f856990998145b31',
                                    'ffffffff5a8c093bf02ebd3edf2b323b'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-18T07:39:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-18T07:39:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780C82981A7278F4E0532502140AEA4A',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T13:35:14.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '65D0D0D60ACD135AE0532502140AE870',
                                'className': 'guard_class_rrs',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class6.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '351681'
                                ],
                                'studentIds': [
                                    'ffffffff5a8ef57df856990998146077'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-22T11:48:39.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79A81E8F0D3B26CAE0532402140AC227',
                                'className': 'ClassNine',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1214279',
                                    '1240575',
                                    '1310875',
                                    '1295595'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-02T00:39:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-28T06:12:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3CCB48E4B4523E0532402140AC5B9',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T13:01:11.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:11.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6BDA4E5594B46F0EE0532402140A19FE',
                                'className': 'grade2_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a8bff18f856990998145b31',
                                    'ffffffff5a8c093bf02ebd3edf2b323b'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-10T08:39:38.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-10T08:39:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77454E95BDF0587EE0532302140AC870',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-02T15:55:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E4C73794574CD0E0532502140A57F1',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T14:11:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C475DD486990778E0532302140A221F',
                                'className': 'guard_knew_guard',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5b203b27f856993e18a79e93',
                                    'ffffffff5b203af31c6dd52000535abb'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-15T18:46:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-12T17:29:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79A6A90A268E1B1CE0532302140ACCAF',
                                'className': 'EditAssignmentClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1813732',
                                    '1413796',
                                    '1814737',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-01T22:55:06.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T23:25:11.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652A64626016EE4E0532302140AF965',
                                'className': '8th Grade - Social',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:25:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:32.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BE7FDD1DA22EECE0532402140AC84F',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T16:31:01.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75D963FA44E76E2BE0532502140AADDD',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-14T13:45:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '61F22E8762D3163CE0532302140A9A49',
                                'className': 'Jan_4_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a4e0857d4079507b71cedca',
                                    'ffffffff5a4e0859f63bbf1c004df9e2'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-04T05:56:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-16T02:38:13.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5461A9A1CE6F5C36E0532302140ACD0C',
                                'className': 'Chandra_auto_manual',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff544f5b32e4b0c698ba42376e',
                                    'ffffffff57639202e4b043748696bd9c'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-07-15T16:03:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79642903EC225C36E0532502140A4F10',
                                'className': 'Class With Teachers',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff5bce2f1a1c6dd54aa54fa123',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-29T15:34:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-29T15:34:41.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff5bce2f1a1c6dd54aa54fa123'
                            },
                            {
                                'classId': '780C7C8CA7566E73E0532502140A0D66',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T13:33:33.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '60A618D4AC3C36EFE0532302140A2523',
                                'className': 'Test Class Vinod',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5a3844dff63bbf6570344711',
                                    'ffffffff5a3844dfd407954230bfc3e7',
                                    'ffffffff5a3844df45d9913df4a7de41'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-18T17:44:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:57:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5D9E1284C9D76FD2E0532502140AE67E',
                                'className': 'bug60045',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1240575',
                                    '1295616',
                                    '1295615',
                                    '1245855',
                                    '1295595',
                                    '1310055'
                                ],
                                'studentIds': [
                                    'ffffffff5a0d7186f8569922e66904d5',
                                    'ffffffff5a05d22f1c6dd503785125be'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-10T03:54:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:55:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E703A62B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79F19013E2B15C2DE0532302140A19BA',
                                'className': 'New Class With SSODomain',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5be0da5e45d9911ab2eb2e1c',
                                    'ffffffff5be0e1bbf02ebd635e51ef98',
                                    'ffffffff5bce2f1a1c6dd54aa54fa123',
                                    'ffffffff5be0de7e45d9911ab2eb2e1d'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-05T15:16:39.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-05T19:35:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D0389ABDDD43A5E0532302140A93D9',
                                'className': 'Delete_15July_1',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T13:46:38.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:43:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '797B22151AF97BA1E0532502140AE626',
                                'className': 'Test Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T18:59:08.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:32.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AAD79AD8C8E54FCE0532302140A8C9E',
                                'className': 'Renault-Test-Class2',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732',
                                    '481640'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T23:27:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T23:27:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '64C7BCFF2FE55EE0E0532402140A01C3',
                                'className': 'reanult_787',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class9.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1540847'
                                ],
                                'studentIds': [
                                    'ffffffff5a9848e545d9917d8511bad4',
                                    'ffffffff5a7d9527d407951263a577ce'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-09T07:33:40.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-01T13:39:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E38B3499FB1C3AE0532302140A0CBF',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:42:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:05.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D01B3D2FC069F9E0532402140A8510',
                                'className': 'Realize Class 01',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bbce5e9f856993930d3807e',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T13:31:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78771C5BFF8B4C92E0532502140A8F7B',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff56f2dfcde4b0acd6c46f633f',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1881813',
                                    '1881814',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T20:46:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff56f2dfcde4b0acd6c46f633f'
                            },
                            {
                                'classId': '77D04EC251A15716E0532302140A3E9E',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T13:45:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75DCA56CD6294612E0532302140A469D',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1710044'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-14T17:38:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:53.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800261F30E307FDE0532302140AF9DD',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:54:47.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:02.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7867AB6879F85731E0532302140A74CE',
                                'className': 'New Class to Import',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-17T02:20:41.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:44:09.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7963125B61880FBAE0532502140A4E66',
                                'className': 'Class with Teacher as a Student',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff5bce2f1a1c6dd54aa54fa123'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-29T14:16:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-12T04:47:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7910D202876D6D05E0532502140AC37E',
                                'className': 'ClassRenaultDemo',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5aa8d66ff856993c2720c6c3'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-25T12:08:58.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-29T22:27:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652A64626036EE4E0532302140AF965',
                                'className': '8th Grade - Social',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:25:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D01CF31D341615E0532402140A553F',
                                'className': 'Automation Class01_NIGHTLY',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T13:31:51.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D552499B3F3566E0532302140A16E8',
                                'className': 'Automation Cert Class 01',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bbd25b81c6dd504679950f4',
                                    'ffffffff5bbd25b8f02ebd20add6d2ad'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:44:48.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:38:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '797B90477C8B7714E0532502140A02C2',
                                'className': 'test telemetry',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T19:29:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DDCE9135830BADE0532402140AD7FE',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T05:52:05.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:49:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C81A9C41E9602C2E0532302140AFE3F',
                                'className': 'knew_knew_guard_local_10',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T16:19:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T16:19:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6EF32792F45679D9E0532502140A970E',
                                'className': 'hamsa_k12_new_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '469743',
                                    '351681',
                                    '503041',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff516e6a38e4b04abb23553aed',
                                    'ffffffff57065c57e4b0df690c7e5dc5',
                                    'ffffffff599344881c6dd55f526dabe3',
                                    'ffffffff55110924e4b05af0b3064b02'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-18T18:33:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-06T12:46:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '762F9001201E0AEBE0532402140A2B17',
                                'className': 'Temp_win10_chrome64',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-18T20:34:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:17.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E382ED0049531EE0532402140ABCCF',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:41:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75DCA56CD62B4612E0532302140A469D',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1710044'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-14T17:38:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E31DB879B842D2E0532502140A9869',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:12:49.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C5983501C3F1882E0532302140AA7A9',
                                'className': 'knew_knew_guard_local',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5aff49f9f63bbf34e77e17db',
                                    'ffffffff5aff4a9dd4079557b1ca6ea5'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-16T16:32:47.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T17:50:22.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780052A463982409E0532402140A3B72',
                                'className': 'Delete_15July_1',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T23:04:52.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:16.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B3030D2A6291E0532402140A5B85',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:08.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6AC6A30C0E626F31E0532402140A281D',
                                'className': 'my_maserati',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5ad98bdc1c6dd546d6257fe5',
                                    'ffffffff5ad5ac451c6dd546d6257a9b'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-26T15:46:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-26T15:46:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C80FEAAF80717DEE0532302140A295F',
                                'className': 'kn_kn_local_1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-18T15:31:12.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-18T15:31:13.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7BBA1DDF079C352CE0532302140A9527',
                                'className': 'CoTeacher-Students Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511',
                                    'ffffffff5beb1375f8569926bf47ab26'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5bfe90d71c6dd50a73aac874',
                                    'ffffffff5bfe90d745d9911ab2ebc1fc',
                                    'ffffffff5bfe90d6f63bbf4f5467421b',
                                    'ffffffff5bfe90d7d40795112582ba92',
                                    'ffffffff5bfe90d7f63bbf4f5467421c',
                                    'ffffffff5bfe90d71c6dd50a73aac873',
                                    'ffffffff5bfe90d7f8569926bf48227e',
                                    'ffffffff5bfe90d6f8569926bf48227d',
                                    'ffffffff5bfe90d7f02ebd635e527c07',
                                    'ffffffff5bfe90d71c6dd50a73aac875'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-28T12:58:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-28T12:58:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '653EB8A35F914B04E0532402140A1BA1',
                                'className': 'header_test_787',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1611747',
                                    '467624',
                                    '1587077'
                                ],
                                'studentIds': [
                                    'ffffffff5a8561e9f85699056c00a26b',
                                    'ffffffff5a85615ef85699056c00a26a',
                                    'ffffffff5a85615bf85699056c00a268',
                                    'ffffffff5a85615bd407951263fe44d2',
                                    'ffffffff5a85615bf85699056c00a269'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-15T05:30:48.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-20T02:07:02.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '776E1F0E93036F1FE0532402140A2BCA',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5a66286df85699056cc2fbc4'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-04T16:37:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '784D75DFC6D03327E0532302140A46EE',
                                'className': 'Perf_class01',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-15T19:04:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:44:18.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6819F517377854ECE0532502140A44C4',
                                'className': 'Class 1',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '351681'
                                ],
                                'studentIds': [
                                    'ffffffff5a0bd34ef63bbf6570332a81'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-23T14:54:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2019-02-01T10:25:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '75DCAAE400296835E0532302140ACDCB',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-14T17:40:08.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:53:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '789F56F6C853484CE0532402140A76F9',
                                'className': 'Automation Class01_NIGHTLY Change name',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff56ba3578e4b044ebae410d32',
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '790333',
                                    '790363',
                                    '790382',
                                    '790349'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-19T20:45:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:41:42.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff56ba3578e4b044ebae410d32'
                            },
                            {
                                'classId': '79A6A90A268A1B1CE0532302140ACCAF',
                                'className': 'CreateAssignmentTest',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-01T22:54:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T22:54:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6CBB6F253C9B21EAE0532402140A4FD2',
                                'className': 'knew_guard_145_2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5af37100f02ebd3d2c1b65d5',
                                    'ffffffff5b0307f3d4079557b1ca7293',
                                    'ffffffff5afa2074f856992d47942aa2'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-21T13:14:27.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-21T14:57:04.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7C19F1738C0E7803E0532502140A41D1',
                                'className': 'TestClassForCreate',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1413796',
                                    '1814737'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-12-03T07:17:35.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-12-03T07:17:39.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '796BC7CE5C470ADAE0532302140A27CA',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1702283'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T00:40:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T23:25:05.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780D594F45DA606CE0532302140AC21F',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T14:35:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:02.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7799A6A63E7C412AE0532302140A68E0',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T20:33:18.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:45.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DB7988FD155E0EE0532302140ADD33',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T03:05:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:52.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79ACFAF06CAB5479E0532402140AE7AA',
                                'className': 'Amazon',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-02T06:27:19.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-02T06:27:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800432443532C44E0532302140AEED5',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:58:30.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '658E66B662CE6600E0532402140A5A5F',
                                'className': '19_Feb_ram',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a8a9a2bf85699099814590b',
                                    'ffffffff5a8a9a2af02ebd3edf2b2fea'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-19T04:34:31.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:49:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '790AFB9571A02F66E0532502140AB996',
                                'className': 'ClassGCDemo',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-25T05:14:33.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-25T05:14:33.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '784D8BDF049A3001E0532402140A874D',
                                'className': 'New Class3',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-15T19:12:02.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:44:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77952ECCDD9B5651E0532302140A2806',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T15:13:27.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '69AF140035AF1AB6E0532302140A8BCF',
                                'className': 'lstdev-81-guard-early',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '351681',
                                    '421023'
                                ],
                                'studentIds': [
                                    'ffffffff5acfda42f63bbf21f9c56d6b'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-12T18:14:24.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-12T18:15:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5E6D93E4EA985C35E0532502140A6EC5',
                                'className': 'class_no_subscription_fifth',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '351681'
                                ],
                                'studentIds': [
                                    'ffffffff5a1302b345d9913df4a6e4a3'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-20T11:28:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-11-20T11:28:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B906057F6DA3305E0532402140ABC7C',
                                'className': 'multiasset-test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-26T06:10:10.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-26T06:10:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D4B36E703462B7E0532402140AC863',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:00:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '61383C8DEF712C99E0532302140A70DA',
                                'className': 'Renault Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class14.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '835211',
                                    '1314335'
                                ],
                                'studentIds': [
                                    'ffffffff5a41d8b1f63bbf6570345e78'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-12-26T00:05:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-12-26T00:05:56.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77DB9ACA79D26D68E0532302140AC751',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T03:16:48.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:46.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E301A458EE1E84E0532502140A00EF',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:08:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5D92D67E411D786FE0532402140AA756',
                                'className': 'class_no_subs_content_second',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '351681'
                                ],
                                'studentIds': [
                                    'ffffffff5a564e34f02ebd1b9346d417',
                                    'ffffffff5a04acddd40795760d410449'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-09T14:30:33.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-01-10T12:32:36.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6BB7CA35DA4901C1E0532402140A04CA',
                                'className': 'Hemanth AV class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1@2x.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1188816',
                                    '481738',
                                    '532114',
                                    '532113',
                                    '532310',
                                    '532321',
                                    '421023',
                                    '336566',
                                    '469743',
                                    '1770638',
                                    '1033438',
                                    '1710044',
                                    '1399095'
                                ],
                                'studentIds': [
                                    'ffffffff5ae76ddff63bbf21f9c802ea',
                                    'ffffffff5ae76ddfd40795781d286d77',
                                    'ffffffff5aec8d38d40795781d287493'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-08T15:28:24.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-08T15:30:36.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '796BCFF8DB8A168EE0532302140A370C',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '908091'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-30T00:42:26.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T23:25:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7BBD7C8CA1310F57E0532502140A932E',
                                'className': 'Nightly-Knewton',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1975265'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-28T16:59:17.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-28T16:59:18.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '62E39B0D30B228BAE0532302140ADBB8',
                                'className': 'smoke_clas',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a5ddac4f63bbf0b505c30a6',
                                    'ffffffff5a5ddac445d991021c72a337',
                                    'ffffffff5a5ddac6f85699056cc2d2d7'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-16T05:58:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:57:32.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '76A76E7FA2DB6C37E0532402140A9E63',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1886393',
                                    '1710044'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-24T19:34:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780C672AF4B1470BE0532502140AFC71',
                                'className': 'To Import - Updated Title 1234',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T13:33:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:00.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '688BC6C4A92927A1E0532302140A1657',
                                'className': 'Muji_Class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class6.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '835211',
                                    '1240575',
                                    '1165896',
                                    '481738',
                                    '1314335',
                                    '467625',
                                    '1540847'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-29T06:46:38.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-29T06:46:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5759CCD81FE54897E0532302140A7FE7',
                                'className': 'Bal_test_RLZP-6693',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class6.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff599c461ef02ebd6f4dd8e020',
                                    'ffffffff5a4337a81c6dd50378526955',
                                    'ffffffff599c461e45d9910a26f42005'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-08-22T10:56:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:53:51.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780052A463922409E0532402140A3B72',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T23:02:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '68A42F4D74F83407E0532302140ACD88',
                                'className': 'Ram_test_class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3@2x.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '447087',
                                    '532114',
                                    '532113',
                                    '467626',
                                    '532112',
                                    '532310',
                                    '467624',
                                    '467625',
                                    '1540847',
                                    '467623',
                                    '336566',
                                    '351681',
                                    '1814737',
                                    '1710043',
                                    '1815796',
                                    '1815797',
                                    '510675',
                                    '1813732',
                                    '817343',
                                    '532321',
                                    '1815795',
                                    '421023',
                                    '469743',
                                    '1787295',
                                    '503041',
                                    '1691092',
                                    '1710115',
                                    '1815815',
                                    '1815816',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5abe5c8a45d9917d851225ea',
                                    'ffffffff5abe5d0bf856993c2720fa6a',
                                    'ffffffff5abe5c8745d9917d851225e9'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-03-30T11:49:26.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-01T21:46:07.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6CF6A7D7156358F9E0532402140A5A4D',
                                'className': 'may24',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff56ffc495e4b06170b87812b0',
                                    'ffffffff5583e75fe4b042d234f6f15e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-24T11:53:42.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-24T11:53:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77FFC4B593667BDDE0532502140AC3E0',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:23:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:38.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77960FF72AF02261E0532502140AE4FA',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T16:16:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7794BE09872204ABE0532302140A0C7E',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T14:41:55.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7800261F30D707FDE0532302140AF9DD',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-11T22:50:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:36.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '631C83A354BD79B7E0532502140AA819',
                                'className': 'Neel_MathGrade4',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '469743'
                                ],
                                'studentIds': [
                                    'ffffffff5a5f13a81c6dd52b2c8cd7ea'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-19T01:51:47.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:54:51.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6910125902703916E0532502140A7CCC',
                                'className': 'Pradeep',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class5.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '469743'
                                ],
                                'studentIds': [
                                    'ffffffff5ac56e921c6dd567f8255185'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-04T20:32:16.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-04T20:32:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '653E32C77B4E09B4E0532502140A8ED5',
                                'className': '15_feb',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5a5db06745d991021c72a2b1'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-15T04:53:22.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:49:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A88E3DA7C6D6A68E0532402140AAAED',
                                'className': 'Local-Assignment Tests',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-13T03:49:05.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-13T03:49:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7648785C598623D5E0532302140AE6A1',
                                'className': 'GC-Renault',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '351681'
                                ],
                                'studentIds': [
                                    'ffffffff5ba33b6645d9914b48843564',
                                    'ffffffff5ba33b6645d9914b48843563',
                                    'ffffffff5ba33b66d407957b5e939314'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T02:16:57.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-09-20T02:17:14.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77959B18051F0312E0532402140A72E4',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6c915f856993930d37141'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T15:44:28.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:31.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '780C672AF494470BE0532502140AFC71',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-12T13:27:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:34.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '74B07657D34C7EA5E0532402140AB8BF',
                                'className': 'guard_512',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1787295',
                                    '447087',
                                    '1813732',
                                    '833886',
                                    '467624',
                                    '1710043',
                                    '838652',
                                    '421023',
                                    '445972'
                                ],
                                'studentIds': [
                                    'ffffffff5b8985a9d407951302ae6f63',
                                    'ffffffff5b887e52f02ebd67e479c106'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-08-30T19:30:37.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-08-31T14:33:29.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '785D32A0ACA25FD1E0532302140A0FA7',
                                'className': 'Realize Class 04',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1710044'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b35d45d991611cbff23e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-16T13:51:05.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:22:05.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6352E4ABB18339FFE0532502140AB85B',
                                'className': 'compClass-787',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class6.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1240575',
                                    '1295616',
                                    '1295615',
                                    '467626',
                                    '1815795',
                                    '1245855',
                                    '1295595',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '1310055',
                                    '467623',
                                    '336566',
                                    '469743',
                                    '1787295',
                                    '351681',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5a662815f85699056cc2fbc3',
                                    'ffffffff5a6628c745d991021c72cd4d',
                                    'ffffffff5a6628aff02ebd1b93471c49',
                                    'ffffffff5a6627fcf85699056cc2fbc1',
                                    'ffffffff5a66282cd407951263a4b25b',
                                    'ffffffff5a66289ef85699056cc2fbc5',
                                    'ffffffff5a65264bf63bbf0b505c57d0',
                                    'ffffffff5a662b321c6dd52b2c8cfd38',
                                    'ffffffff5a6525fdf02ebd1b934719f7',
                                    'ffffffff5a66285345d991021c72cd4a',
                                    'ffffffff5a66286df85699056cc2fbc4',
                                    'ffffffff5a66283f45d991021c72cd48',
                                    'ffffffff5a65268745d991021c72caff'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-21T18:44:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-01-22T13:19:31.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '791FF5AF8F230CC6E0532502140A7695',
                                'className': 'vinay_cl',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-26T06:12:49.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-26T06:13:46.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7F190794EBFB6F0CE0532302140ABB5E',
                                'className': 'Production Test Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1813732'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2019-01-10T10:27:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2019-01-10T10:27:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6F7C2151F2F53A3CE0532502140AF0A1',
                                'className': 'asd asd asd asd asd sadasd asd asdasd asdas da sdasd asd asd ads asdas dasd',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-25T13:58:34.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77994BC5E06875B0E0532402140A09C5',
                                'className': 'Ami_Test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T20:07:53.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T20:01:51.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B90925B871A47F7E0532302140A5CBC',
                                'className': 'multiasset-test',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-26T06:24:09.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-26T06:24:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77953E1E1E2A245FE0532302140A9B56',
                                'className': 'ToImport',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb6b35d45d991611cbff23e',
                                    'ffffffff5bb6c915f856993930d37141',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-06T15:17:44.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:47:28.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79B06D40D12307C4E0532502140A8A88',
                                'className': 'ClassNine',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1735835'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-02T10:34:02.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-02T10:34:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6AA07B6785251BD6E0532502140A9943',
                                'className': 'Pradeep New Class 4',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class5.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5adf8bb31c6dd546d6258394'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-24T18:14:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-24T18:14:46.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '767C16D473734299E0532502140A2A5C',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-22T15:51:59.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:42.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A2B792883466475E0532502140A61D4',
                                'className': 'Retest-NewClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1326155'
                                ],
                                'studentIds': [
                                    'ffffffff5be30275d407951125822c9f',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-08T12:22:03.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-08T12:26:54.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7B91C55599EF6DA5E0532302140A058D',
                                'className': 'jayesh_test',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '503041',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5bfbec21f63bbf4f5467375e'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-26T07:49:59.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-26T07:50:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D552499B463566E0532302140A16E8',
                                'className': 'French 1 - 1(A-B) - 16-17',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558'
                                ],
                                'studentIds': [
                                    'ffffffff5bbd25b81c6dd504679950f4',
                                    'ffffffff5bbd25b8f02ebd20add6d2ad'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T19:45:06.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6A42BFD9EA374962E0532302140A1786',
                                'className': 'Manjunath_2438',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class10.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5ad987caf63bbf21f9c57ac1',
                                    'ffffffff5ad987c745d9913b13a35ec1',
                                    'ffffffff5ad987c81c6dd546d6257fe4'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-20T02:25:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-20T02:25:20.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5F067C22A104659BE0532402140A4376',
                                'className': 'Temp_Haneesh_28nov17',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1710043',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5a1d080ef8569922e6695e17',
                                    'ffffffff5a1d080e45d9913df4a734e4'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-28T01:54:05.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:57:37.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '76E92861D6614BA5E0532402140AADC4',
                                'className': 'DeepakClass_EL',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1240575',
                                    '1295616',
                                    '1295615',
                                    '1245855',
                                    '1295595',
                                    '1310055',
                                    '1690848'
                                ],
                                'studentIds': [
                                    'ffffffff5badefd71c6dd50467993269'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-28T01:59:25.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2019-01-09T12:15:05.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78EFBA144D5D4B15E0532302140AAA82',
                                'className': 'Temp_win10_chrome64',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1814737',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bce2f1a1c6dd54aa54fa123',
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-23T20:40:02.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:15.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '70D1EB14714F7F77E0532402140A3D88',
                                'className': 'Hamsa_e2e_New',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5b479446f856993e18a7f019',
                                    'ffffffff5b4795791c6dd5200053a944'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-07-12T13:44:43.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-07-12T13:52:58.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6C261691D9BA4F51E0532302140A2116',
                                'className': 'bugHuntAdaptiveItems',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class10.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1310895',
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5af9369af63bbf21f9c88036',
                                    'ffffffff5af9369af856992d47942265',
                                    'ffffffff5af9369af02ebd3d2c1bc030'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-14T03:11:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-28T06:13:19.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7652AED1E25F5252E0532502140A0653',
                                'className': '4th Grade - Science',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-09-20T14:28:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-09T19:52:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '620289AD144C4872E0532502140A0967',
                                'className': 'Renault_2438',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5a7d9527d407951263a577ce',
                                    'ffffffff5a4f1c571c6dd501c6c09fa4',
                                    'ffffffff55ea9f90e4b08177b1be822d',
                                    'ffffffff55ea9f91e4b06e165a2ac04a',
                                    'ffffffff5a4f1c8af63bbf1c004dfb99'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-01-05T01:27:07.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-31T03:02:01.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D050C0AEAB0948E0532502140AF601',
                                'className': 'PTest01',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-09T13:46:53.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:23:26.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6BBA165F4C716FF4E0532502140A694E',
                                'className': 'knewton_guard_145_knew',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1310875'
                                ],
                                'studentIds': [
                                    'ffffffff5af37100f02ebd3d2c1b65d5',
                                    'ffffffff5af220e6f856992d4793c862',
                                    'ffffffff5af220e6f63bbf21f9c82588',
                                    'ffffffff5af37007f856992d4793c99f'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-08T18:12:52.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-09T18:06:57.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '78C56C553D943F16E0532402140AA437',
                                'className': 'Test Class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1861558',
                                    '1852085'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-21T18:11:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:45:22.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6F11B5F11F744BEFE0532502140AFEEA',
                                'className': 'Maths',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '351681',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5b2a34dcf63bbf658b60611b'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-06-20T07:00:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-06-20T07:05:02.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77D966F7C7043437E0532402140A0CEE',
                                'className': 'BlahBlahClass',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881813',
                                    '1710044'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T00:37:00.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:06.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '6D7CA478256C7A29E0532502140A33B3',
                                'className': 'msk175_hmclass',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class9.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467626',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [
                                    'ffffffff5233379ae4b073d445307bc6'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-05-31T03:45:39.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-05-31T03:47:55.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A9FC1301CBF33EAE0532402140AA96D',
                                'className': 'TestClassForCreate',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6b410f63bbf06200fd94a'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T07:05:48.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T07:05:48.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AB57B293E5F3FCAE0532402140A5414',
                                'className': 'Nightly-TestNav',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '1240575'
                                ],
                                'studentIds': [
                                    'ffffffff5bd7f145f856996117578d75'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-15T09:01:02.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-15T09:01:03.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '5E31DB02255553DCE0532302140A601F',
                                'className': 'class_no_subs_content_third',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '351681'
                                ],
                                'studentIds': [
                                    'ffffffff5a0f18bd1c6dd5037851527e',
                                    'ffffffff5a0f18bdf8569922e6690869'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2017-11-17T12:13:29.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2017-11-17T12:13:35.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '69995E3759457F2FE0532302140AAD3F',
                                'className': 'Ram_class2',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796',
                                    '1815797',
                                    '1813732',
                                    '1815795',
                                    '1540847',
                                    '336566',
                                    '1770638',
                                    '1804015',
                                    '1691092',
                                    '1710115',
                                    '1814737',
                                    '1815815',
                                    '1815816',
                                    '1399095',
                                    '1814609'
                                ],
                                'studentIds': [
                                    'ffffffff5ace6e061c6dd546d625717a',
                                    'ffffffff5ace6e05f02ebd3d2c18a647',
                                    'ffffffff5ace6e0645d9917d85123e1f',
                                    'ffffffff5ace6e0545d9917d85123e1e',
                                    'ffffffff5ace6e06f63bbf21f9c56c0f'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-04-11T16:20:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-04-11T16:20:24.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77BFB6B2905C39F2E0532302140A9681',
                                'className': 'Demo_class',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1881814',
                                    '1886393'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-08T17:57:56.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:42:44.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7A9E987C59E111ABE0532302140AFDDE',
                                'className': 'msk175',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566'
                                ],
                                'studentIds': [
                                    'ffffffff5bb6abb7f63bbf06200fd947',
                                    'ffffffff5bebfc27f8569926bf47ad67'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-14T05:42:50.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-14T05:42:50.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '79066840E5C87376E0532402140A8236',
                                'className': 'Realize Class 01',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1815796'
                                ],
                                'studentIds': [
                                    'ffffffff5bbce5e9f856993930d3807e',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-24T23:43:45.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-01T17:23:22.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '65A211A1127408BEE0532502140A8ACD',
                                'className': 'test class',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class7.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '908259'
                                ],
                                'studentIds': [
                                    'ffffffff5a8be420f02ebd3edf2b31f7',
                                    'ffffffff5a8be4b41c6dd549d7b734a7',
                                    'ffffffff5a8be420d40795745a3aa0d1',
                                    'ffffffff5a8be4e41c6dd549d7b734a8'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-02-20T04:02:23.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-03-15T02:57:40.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '77E3292340773066E0532502140AD4C7',
                                'className': 'To Import - Updated Title',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1852085'
                                ],
                                'studentIds': [
                                    'ffffffff5bb94d89f856993930d376b8',
                                    'ffffffff5bb6b410f63bbf06200fd94a',
                                    'ffffffff5bb948b6d40795315bd40ca9',
                                    'ffffffff5bb6abb7f63bbf06200fd947'
                                ],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-10T12:15:20.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-23T23:48:32.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '791FF5AF8F210CC6E0532502140A7695',
                                'className': 'vinay_cl',
                                'classDescription': null,
                                'classImageUrl': '/community/realizeit/skins/default/images/class_roster_icons/class2.png',
                                'status': 'INACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '336566',
                                    '469743',
                                    '351681',
                                    '467624',
                                    '467625',
                                    '421023',
                                    '467623'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-10-26T06:12:46.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-10-26T06:13:43.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            },
                            {
                                'classId': '7AC6B4F0333F0511E0532302140AC5E9',
                                'className': 'Renault Test Class - local',
                                'classDescription': null,
                                'classImageUrl': null,
                                'status': 'ACTIVE',
                                'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                'teacherIds': [
                                    'ffffffff51c87040e4b07dddca2a0511'
                                ],
                                'productIds': [
                                    '1814609'
                                ],
                                'studentIds': [],
                                'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'createdDate': '2018-11-16T05:34:06.000Z',
                                'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                'lastUpdatedDate': '2018-11-16T05:34:10.000Z',
                                'externalId': null,
                                'externalSource': null,
                                'firstTeacherId': 'ffffffff51c87040e4b07dddca2a0511'
                            }
                        ]
                    };
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    const body = {
                        'code': 401,
                        'status': 'error',
                        'message': 'User is not authorized'
                    };
                    return throwError(new HttpErrorResponse({ status: 401, error: body }));
                }
            }

            if (request.url.endsWith('/ups/api/v1/users/') && request.method === 'GET') {
                // tslint:disable-next-line:max-line-length
                if (request.headers.get('Authorization') === 'Bearer 2n6XQIKBITpm48qtW3tFSBcEEQhO1ImH19nHPxIeGCLFbzZcESSv5A2PDXLqYPUtJX4AV123EZJGzmgffsSfNUSUEyJwSIjDrI4lztCzS7nDGVdVn4Sd3I7onKiwCjHJ5VIhXHTIBUHtQb34PyQqlkY9eLSy0rFStDlbzY6O2N88ZzUJ30gp9utlNYmXUOCAuvyBWB2o09kQl3Qwr7nDX6rIn6ut5MhNpdndGwDl2rQk3JiI5Y6oyBsbMEz') {
                    const body = {
                        'users': [
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff51c87040e4b07dddca2a0511',
                                    'userName': 'realize_teacher',
                                    'title': 'Colonel.',
                                    'firstName': 'realize1',
                                    'middleName': null,
                                    'lastName': 'teacher11',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'no6@pearson.com',
                                    'primaryOrgRole': 'Teacher',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'realize1 teacher11',
                                    'firstAndLastName': 'realize1 teacher11',
                                    'affiliations': [
                                        {
                                            'affiliationId': '6999f3caca7a4ccba139ee864bf5586d',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'T',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'T'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'DomainUser',
                                    'createdBy': 'Self-reg',
                                    'lastUpdatedBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'createdDateForSearch': '06/24/2013',
                                    'userDomainType': [
                                        {
                                            'domainId': '5ec94230c1364b2c95b5b9b3da310a46',
                                            'userDomainId': 'ffffffff51c87040e4b07dddca2a0511'
                                        },
                                        {
                                            'domainId': '06e9d7efc73b43d9b647baadeee29063',
                                            'userDomainId': 'ffffffff51c87040e4b07dddca2a0511'
                                        },
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': 1549525943771,
                                    'lastUpdatedDate': 1546622482305,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '6999f3caca7a4ccba139ee864bf5586d',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'T',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {}
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff54738483e4b001bd4b61aaf0',
                                    'userName': 'hermionegranger',
                                    'title': null,
                                    'firstName': 'Hermione',
                                    'middleName': null,
                                    'lastName': 'Granger',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Hermione Granger',
                                    'firstAndLastName': 'Hermione Granger',
                                    'affiliations': [
                                        {
                                            'affiliationId': '7348d77696b34daabe9d7cd9fb9d3bcf',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '11/24/2014',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1416856707580,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '7348d77696b34daabe9d7cd9fb9d3bcf',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2017-11-01 15:11:44',
                                    'updated_datetime': '2018-10-24 12:59:53',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd30d15f63bbf21f9bda600',
                                    'userName': 'nevillelongbottom',
                                    'title': null,
                                    'firstName': 'Neville',
                                    'middleName': null,
                                    'lastName': 'Longbottom',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Neville Longbottom',
                                    'firstAndLastName': 'Neville Longbottom',
                                    'affiliations': [
                                        {
                                            'affiliationId': '777a7dbd1bca4b99bf1092fa91671452',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/26/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540558101130,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '777a7dbd1bca4b99bf1092fa91671452',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-26 12:48:25',
                                    'updated_datetime': '2018-10-26 12:48:25',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd30deef63bbf21f9bda601',
                                    'userName': 'gregorygoyle',
                                    'title': null,
                                    'firstName': 'Gregory',
                                    'middleName': null,
                                    'lastName': 'Goyle',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Gregory Goyle',
                                    'firstAndLastName': 'Gregory Goyle',
                                    'affiliations': [
                                        {
                                            'affiliationId': '9356a15268bc47db80ab119ea82c2511',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/26/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540558318203,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '9356a15268bc47db80ab119ea82c2511',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-26 12:52:02',
                                    'updated_datetime': '2018-10-26 12:52:02',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd30d6f1c6dd524050950ba',
                                    'userName': 'chochang2',
                                    'title': null,
                                    'firstName': 'Cho',
                                    'middleName': null,
                                    'lastName': 'Chang',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Cho Chang',
                                    'firstAndLastName': 'Cho Chang',
                                    'affiliations': [
                                        {
                                            'affiliationId': '65c57394fe984c01bb9ed7cef0f1c72b',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/26/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540558191371,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '65c57394fe984c01bb9ed7cef0f1c72b',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-26 12:50:11',
                                    'updated_datetime': '2018-10-26 12:50:11',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd30ca4f85699611757821d',
                                    'userName': 'colincreevey',
                                    'title': null,
                                    'firstName': 'Colin',
                                    'middleName': null,
                                    'lastName': 'Creevey',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Colin Creevey',
                                    'firstAndLastName': 'Colin Creevey',
                                    'affiliations': [
                                        {
                                            'affiliationId': '9ed92d240ede43e1b7c75ac217ce8790',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/26/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540557988223,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '9ed92d240ede43e1b7c75ac217ce8790',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-26 12:46:32',
                                    'updated_datetime': '2018-10-26 12:46:32',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd30e0445d9913ac68206eb',
                                    'userName': 'vincentcrabbe',
                                    'title': null,
                                    'firstName': 'Vincent',
                                    'middleName': null,
                                    'lastName': 'Crabbe',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Vincent Crabbe',
                                    'firstAndLastName': 'Vincent Crabbe',
                                    'affiliations': [
                                        {
                                            'affiliationId': '2893aeb8867848be9d50135ffa6a0b68',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/26/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540558340893,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '2893aeb8867848be9d50135ffa6a0b68',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-26 12:52:25',
                                    'updated_datetime': '2018-10-26 12:52:25',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd1cd6145d9913ac681ea2e',
                                    'userName': 'lavenderbrown',
                                    'title': null,
                                    'firstName': 'Lavender',
                                    'middleName': null,
                                    'lastName': 'Brown',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Lavender Brown',
                                    'firstAndLastName': 'Lavender Brown',
                                    'affiliations': [
                                        {
                                            'affiliationId': '9dc7d87c2d824df092281c419aacc28f',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/25/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540476257478,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '9dc7d87c2d824df092281c419aacc28f',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-25 14:04:27',
                                    'updated_datetime': '2018-10-25 14:04:27',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd30cdd1c6dd524050950b8',
                                    'userName': 'lunalovegood',
                                    'title': null,
                                    'firstName': 'Luna',
                                    'middleName': null,
                                    'lastName': 'Lovegood',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Luna Lovegood',
                                    'firstAndLastName': 'Luna Lovegood',
                                    'affiliations': [
                                        {
                                            'affiliationId': '5cb883fcd6dc4b799ac55be6ee033e6e',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/26/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540558045431,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '5cb883fcd6dc4b799ac55be6ee033e6e',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-26 12:47:29',
                                    'updated_datetime': '2018-10-26 12:47:29',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd30c8b45d9913ac68206e9',
                                    'userName': 'ronweasley',
                                    'title': null,
                                    'firstName': 'Ron',
                                    'middleName': null,
                                    'lastName': 'Weasley',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Ron Weasley',
                                    'firstAndLastName': 'Ron Weasley',
                                    'affiliations': [
                                        {
                                            'affiliationId': '7a47bba5e8dc4f9fa2d146afb16b07d8',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/26/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540557963927,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '7a47bba5e8dc4f9fa2d146afb16b07d8',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-26 12:46:08',
                                    'updated_datetime': '2018-10-26 12:46:08',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd30dcef85699611757821f',
                                    'userName': 'dracomalfoy',
                                    'title': null,
                                    'firstName': 'Draco',
                                    'middleName': null,
                                    'lastName': 'Malfoy',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Draco Malfoy',
                                    'firstAndLastName': 'Draco Malfoy',
                                    'affiliations': [
                                        {
                                            'affiliationId': '562c5d2e3def4fa6862b2935c6747a72',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/26/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540558286560,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '562c5d2e3def4fa6862b2935c6747a72',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-26 12:51:30',
                                    'updated_datetime': '2018-10-26 12:51:30',
                                    'platform': 'realize'
                                }
                            },
                            {
                                'rumbaUser': {
                                    'userId': 'ffffffff5bd30cc7d407951ac8bce01c',
                                    'userName': 'harrypotts',
                                    'title': null,
                                    'firstName': 'Harry',
                                    'middleName': null,
                                    'lastName': 'Potter',
                                    'gender': 'Unspecified',
                                    'emailAddress': 'emailaddress@pearson.com',
                                    'primaryOrgRole': 'Student',
                                    'primaryOrgId': '8a97b1a638c9f02701393168afbf1d20',
                                    'fullName': 'Harry Potter',
                                    'firstAndLastName': 'Harry Potter',
                                    'affiliations': [
                                        {
                                            'affiliationId': '7d59d471ace24f1a9c8f1aefa1002b5e',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ],
                                    'orgRoles': [
                                        'S'
                                    ],
                                    'resetFlag': null,
                                    'sendEmailNotification': true,
                                    'businessRuleSet': 'CG',
                                    'createdBy': 'ffffffff51c87040e4b07dddca2a0511',
                                    'lastUpdatedBy': 'System',
                                    'createdDateForSearch': '10/26/2018',
                                    'userDomainType': [
                                        {
                                            'domainId': '-1',
                                            'userDomainId': null
                                        }
                                    ],
                                    'userStatus': 'ACTIVE',
                                    'lastLoginDate': null,
                                    'lastUpdatedDate': 1540558023256,
                                    'primaryOrgIds': [
                                        '8a97b1a638c9f02701393168afbf1d20'
                                    ],
                                    'activeAffiliations': [
                                        {
                                            'affiliationId': '7d59d471ace24f1a9c8f1aefa1002b5e',
                                            'affiliationStatus': 'Confirmed',
                                            'orgRole': 'S',
                                            'organizationId': '8a97b1a638c9f02701393168afbf1d20',
                                            'afiliationStatus': 'Confirmed'
                                        }
                                    ]
                                },
                                'attributes': {
                                    'profile.learningExperience': 'Standard',
                                    'created_datetime': '2018-10-26 12:47:07',
                                    'updated_datetime': '2018-10-26 12:47:07',
                                    'platform': 'realize'
                                }
                            }
                        ],
                        'total': 12
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    const body = {
                        'code': 401,
                        'status': 'error',
                        'message': 'User is not authorized'
                    };
                    return throwError(new HttpErrorResponse({ status: 401, error: body }));
                }
            }
            return next.handle(request);
        }))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
