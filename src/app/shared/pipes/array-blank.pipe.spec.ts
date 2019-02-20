// import { ArrayBlankPipe } from './array-blank.pipe';

// describe('ArrayBlankPipe', () => {

//     let arrayBlankPipe: ArrayBlankPipe;

//     // synchronous beforeEach
//     beforeEach(() => {
//         arrayBlankPipe = new ArrayBlankPipe();

//     });

//     // Checking Class instance creation
//     it('ArrayBlankPipe class should be instanciated', () => {
//         expect(arrayBlankPipe).toBeDefined();
//     });

//     // Checking the existence of method "transform" in class Class "ArrayBlankPipe"
//     it('should be existence of method "transform" in class  "ArrayBlankPipe', () => {
//         expect(arrayBlankPipe.transform).toBeDefined();
//     });

//     // Checking Class "ArrayBlankPipe" method "transform" functionality
//     it('transform method of ArrayBlankPipe should return blank if items will be blank', () => {
//         const items: Array<Object> = [];

//         expect(arrayBlankPipe.transform(items, 'name')).toEqual([]);
//     });

//     // Checking Class "ArrayBlankPipe" method "transform" functionality
//     it('transform method of "ArrayBlankPipe" class should return items array if property will be blank', () => {

//         const items: Array<Object> = [];
//         items.push({ id: 1, name: 'Holly' });
//         items.push({ id: 2, name: 'Mark Lewis' });
//         items.push({ id: 3, name: 'Tom Cruize' });

//         const property = '';

//         expect(arrayBlankPipe.transform(items, property)).toEqual(items);
//     });

//     // Check Filter functionality
//     it('Should return the filtered item array object ', () => {

//         const items: Array<Object> = [];
//         items.push({ id: 1, name: 'Mark Lewis', address: [] });
//         items.push({ id: 2, name: 'Tom Cruize', fname: 'Harry Cruize', address: [] });
//         items.push({ id: 3, name: 'james Bond', fname: 'Flame Bond', age: 41, address: ['Noida', 'Varanasi'] });

//         let expectedReturnItems: Array<Object> = [];
//         expectedReturnItems = [
//             { id: 3, name: 'james Bond', fname: 'Flame Bond', age: 41, address: ['Noida', 'Varanasi'] }
//         ];

//         expect(arrayBlankPipe.transform(items, 'address')).not.toBeNull();
//     });
// });
