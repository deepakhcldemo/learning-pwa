// import { TestBed } from '@angular/core/testing';
// import { HttpClient } from '@angular/common/http';
// import { GraphqlService } from 'src/app/graphql/graphql.service';
// import { GetProductDetailsFromApiService } from './get-product-details-from-api.service';
// describe('GetProductDetailsFromApiService', () => {
//   let service: GetProductDetailsFromApiService;
//   beforeEach(() => {
//     const httpClientStub = { get: () => ({ pipe: () => ({}) }) };
//     const graphqlServiceStub = {
//       watch: () => ({ valueChanges: { pipe: () => ({}) } })
//     };
//     TestBed.configureTestingModule({
//       providers: [
//         GetProductDetailsFromApiService,
//         { provide: HttpClient, useValue: httpClientStub },
//         { provide: GraphqlService, useValue: graphqlServiceStub }
//       ]
//     });
//     service = TestBed.get(GetProductDetailsFromApiService);
//   });
//   it('can load instance', () => {
//     expect(service).toBeTruthy();
//   });
// });
/* import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { GetProductDetailsFromApiService } from './get-product-details-from-api.service';

describe('GetProductDetailsFromApiService', () => {
  let service: GetProductDetailsFromApiService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    const httpClientStub = { get: () => ({ pipe: () => ({}) }) };
    const graphqlServiceStub = {
      watch: () => ({ valueChanges: { pipe: () => ({}) } })
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GetProductDetailsFromApiService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: GraphqlService, useValue: graphqlServiceStub }
      ]
    });
    service = TestBed.get(GetProductDetailsFromApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('get program details from graphql service with product ids', () => {
    service = TestBed.get(GetProductDetailsFromApiService);
    service.getProgramDetailsFromGraphqlService([1730940]);
    expect(service.getProgramDetailsFromGraphqlService).toBeDefined();
  });

  it('get program details from graphql service with null', () => {
    service = TestBed.get(GetProductDetailsFromApiService);
    service.getProgramDetailsFromGraphqlService(null);
    expect(service.getProgramDetailsFromGraphqlService).toBeDefined();
  });

  it('get program details from http service with product url', () => {
    service = TestBed.get(GetProductDetailsFromApiService);
    service.getProgramDetailsFromHttpService('sample url');
    expect(service.getProgramDetailsFromGraphqlService).toBeDefined();
  });

  it('get program details from http service without product url', () => {
    service = TestBed.get(GetProductDetailsFromApiService);
    service.getProgramDetailsFromGraphqlService(null);
    expect(service.getProgramDetailsFromGraphqlService).toBeDefined();
  });

  it('get program details from http service',
  () => {
    const response = {
      'data': {
        'hierarchies': [
          {
            'identifier': 'P1',
            'displayOrder': '1',
            'titleInSequence': 'Program 1',
            'contentType': 'Sequence',
            'mediaType': 'Tier',
            'attachmentURL': '',
            'version': 1,
            'children': [
              {
                'identifier': 'P1_N1',
                'displayOrder': '1',
                'titleInSequence': 'Prog 1 - Node 1',
                'contentType': 'Sequence',
                'mediaType': 'Tier',
                'attachmentURL': '',
                'version': 1,
                'children': [
                  {
                    'identifier': 'P1_N1.2',
                    'displayOrder': '2',
                    'titleInSequence': 'Prog 1 - Node 1.2',
                    'contentType': 'Sequence',
                    'mediaType': 'Tier',
                    'attachmentURL': '',
                    'version': 1,
                    'children': [
                      {
                        'identifier': 'ONGOING_3',
                        'displayOrder': '2',
                        'titleInSequence': 'Ongoing Assessment 3',
                        'contentType': 'Observational Assessment',
                        'mediaType': 'Ongoing Assessment',
                        'attachmentURL': 'ONGOING_3.json',
                        'version': 1,
                        'children': []
                      },
                      {
                        'identifier': 'ONGOING_2',
                        'displayOrder': '1',
                        'titleInSequence': 'Ongoing Assessment 2',
                        'contentType': 'Observational Assessment',
                        'mediaType': 'Ongoing Assessment',
                        'attachmentURL': 'ONGOING_2.json',
                        'version': 1,
                        'children': []
                      }
                    ]
                  },
                  {
                    'identifier': 'P1_N1.1',
                    'displayOrder': '1',
                    'titleInSequence': 'Prog 1 - Node 1.1',
                    'contentType': 'Sequence',
                    'mediaType': 'Tier',
                    'attachmentURL': '',
                    'version': 1,
                    'children': [
                      {
                        'identifier': 'ONGOING_1',
                        'displayOrder': '1',
                        'titleInSequence': 'Ongoing Assessment 1',
                        'contentType': 'Observational Assessment',
                        'mediaType': 'Ongoing Assessment',
                        'attachmentURL': 'ONGOING_1.json',
                        'version': 1,
                        'children': []
                      },
                      {
                        'identifier': 'CHECKLIST_2',
                        'displayOrder': '3',
                        'titleInSequence': 'Assessment Checklist 2',
                        'contentType': 'Observational Assessment',
                        'mediaType': 'Assessment Checklist',
                        'attachmentURL': 'CHECKLIST_2.json',
                        'version': 1,
                        'children': []
                      },
                      {
                        'identifier': 'CHECKLIST_1',
                        'displayOrder': '2',
                        'titleInSequence': 'Assessment Checklist 1',
                        'contentType': 'Observational Assessment',
                        'mediaType': 'Assessment Checklist',
                        'attachmentURL': 'CHECKLIST_1.json',
                        'version': 1,
                        'children': []
                      }
                    ]
                  }
                ]
              },
              {
                'identifier': 'P1_N2',
                'displayOrder': '2',
                'titleInSequence': 'Prog 1 - Node 2',
                'contentType': 'Sequence',
                'mediaType': 'Tier',
                'attachmentURL': '',
                'version': 1,
                'children': [
                  {
                    'identifier': 'P1_N2.1',
                    'displayOrder': '1',
                    'titleInSequence': 'Prog 1 - Node 2.1',
                    'contentType': 'Sequence',
                    'mediaType': 'Tier',
                    'attachmentURL': '',
                    'version': 1,
                    'children': [
                      {
                        'identifier': 'ONGOING_4',
                        'displayOrder': '1',
                        'titleInSequence': 'Ongoing Assessment 4',
                        'contentType': 'Observational Assessment',
                        'mediaType': 'Ongoing Assessment',
                        'attachmentURL': 'ONGOING_4.json',
                        'version': 1,
                        'children': []
                      },
                      {
                        'identifier': 'P1_N2.1.1',
                        'displayOrder': '2',
                        'titleInSequence': 'Prog 1 - Node 2.1.1',
                        'contentType': 'Sequence',
                        'mediaType': 'Tier',
                        'attachmentURL': '',
                        'version': 1,
                        'children': [
                          {
                            'identifier': 'P1_N2.1.1.1',
                            'displayOrder': '1',
                            'titleInSequence': 'Prog 1 - Node 2.1.1.1',
                            'contentType': 'Sequence',
                            'mediaType': 'Tier',
                            'attachmentURL': '',
                            'version': 1,
                            'children': [
                              {
                                'identifier': 'P1_N2.1.1.1.1',
                                'displayOrder': '1',
                                'titleInSequence': 'Prog 1 - Node 2.1.1.1.1',
                                'contentType': 'Sequence',
                                'mediaType': 'Tier',
                                'attachmentURL': '',
                                'version': 1,
                                'children': [
                                  {
                                    'identifier': 'CHECKLIST_3',
                                    'displayOrder': '1',
                                    'titleInSequence': 'Assessment Checklist 3',
                                    'contentType': 'Observational Assessment',
                                    'mediaType': 'Assessment Checklist',
                                    'attachmentURL': 'CHECKLIST_3.json',
                                    'version': 1,
                                    'children': []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
        ]
      }
    };
    service.getProgramDetailsFromHttpService('/assets/data/phase-2-mock/Product_1730940.json').subscribe(data => {
      expect(data).toBe(response);
    });

    // We set the expectations for the HttpClient mock
    const req = httpTestingController.expectOne('/assets/data/phase-2-mock/Product_1730940.json');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    req.flush({data: response});
  });

});
 */
