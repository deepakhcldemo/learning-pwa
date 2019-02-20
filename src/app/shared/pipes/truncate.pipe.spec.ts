// import { TruncatePipe } from './truncate.pipe';

// describe('TruncatePipe', () => {

//     let truncatePipe: TruncatePipe;

//     beforeEach(() => {
//         truncatePipe = new TruncatePipe();
//     });

//     // Checking Class instance creation
//     it('Class "TruncatePipe" should be instanciated', () => {

//         expect(truncatePipe).toBeDefined();
//     });

//     // Checking the existence of method "transform" in class Class "TruncatePipe"
//     it('Method "transform" should be defined', () => {

//         expect(truncatePipe.transform).toBeDefined();
//     });

//     // Checking the existence of method "transform" in class Class "TruncatePipe"
//     it('Should return the same value if "value" is empty or null', () => {

//         const value = '';
//         const limit = 25;

//         expect(truncatePipe.transform(value, limit)).toEqual('');
//     });

//      // Checking the existence of method "transform" in class Class "TruncatePipe"
//      it('Should return the "limit" value if "completeWords" is true', () => {

//         const value = 'This is unit test statement';
//         const limit = 25;
//         const completeWords = true;

//         expect(truncatePipe.transform(value, limit, completeWords)).not.toBeNull();
//         expect(truncatePipe.transform(value, limit, completeWords)).toBeCloseTo.toString();
//     });
// });
