// import { ShowObserve } from './show-observe.pipe';

// describe('ShowObPipe', () => {
//   let pipe: ShowObserve;
//   it('create an instance', () => {
//     pipe = new ShowObserve();
//     expect(pipe).toBeTruthy();
//   });

//   it('should observed with correct values', () => {
//     const items = [{
//       assessmentitemid: 1033,
//       id: '5YxYWze5NuwOKWzdwrWK',
//       isObserved: true
//     }, {
//       assessmentitemid: 1034,
//       id: 'FOYllSnDKDXdQ9d7PMVH',
//       isObserved: false
//     }];
//     const id = 1033;

//     pipe.transform(items, id);
//     const list = items.filter(itm => {
//       return (itm.assessmentitemid === id) && itm.isObserved;
//     });
//   });

//   it('should observed with null value', () => {
//     const items = null;
//     const id = 1033;
//     pipe.transform(items, id);
//   });

//   it('should observed with values', () => {
//     const items = [{
//       assessmentitemid: 1033,
//       id: '5YxYWze5NuwOKWzdwrWK',
//       isObserved: true
//     }, {
//       assessmentitemid: 1034,
//       id: 'FOYllSnDKDXdQ9d7PMVH',
//       isObserved: false
//     }];
//     const id = 1033;
//     const list = items.filter(itm => {
//       return (itm.assessmentitemid === id) && itm.isObserved;
//     });
//     pipe.transform(items, id);
//     expect(pipe.transform(items, id)).toBe(list[0]);
//   });
// });
