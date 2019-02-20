// import { UniqueArrayPipe } from './unique-array.pipe';

// describe('UniqueArrayPipe', () => {

//   let uniqueArrayPipe: UniqueArrayPipe;

//   beforeEach(() => {
//     uniqueArrayPipe = new UniqueArrayPipe();
//   });

//   it('should create an instance', () => {
//     const pipe = new UniqueArrayPipe();
//     expect(pipe).toBeTruthy();
//   });

//   // Checking the existence of method 'transform' in class Class 'TruncatePipe"
//   it('Method "transform" should be defined', () => {

//     expect(uniqueArrayPipe.transform).toBeDefined();
//   });

//   it('Should return the unique array', () => {

//     const assessmentArrayData = [
//       {
//         assessment: {
//           id: '288'
//         },
//         path: 'Grade 2 >Unit 1 >Investigation 2 >Session 2.3'
//       },
//       {
//         assessment: {
//           id: '288'
//         },
//         path: 'Grade 2 >Unit 1 >Investigation 2 >Session 2.3',
//       }
//     ];

//     expect(uniqueArrayPipe.transform(assessmentArrayData)).not.toBeNull();
//     expect(uniqueArrayPipe.transform(assessmentArrayData)).toEqual([{
//       assessment: {
//         id: '288'
//       },
//       path: 'Grade 2 >Unit 1 >Investigation 2 >Session 2.3'
//     }]);
//   });
// });
