// import { DateFormatPipe } from './date-format.pipe';

// describe('DateFormatPipe', () => {
//     let pipe: DateFormatPipe;
//     it('create an instance', () => {
//         pipe = new DateFormatPipe();
//         expect(pipe).toBeTruthy();
//     });

//     it('transforms  items', () => {
//         pipe.transform(null, 'DD/MM/YYYY');
//     });

//     it('transforms  items', () => {
//         pipe.transform(new Date().getTime(), 'DD/MM/YYYY');
//     });



//     it('check format DD/MM/YYYY', () => {
//         const dateFormat = 'DD/MM/YYYY';
//         let currentMonth = (new Date().getMonth() + 1).toString();
//         if (currentMonth < '10') {
//             currentMonth = ('0' + currentMonth);
//         } else {
//             currentMonth = currentMonth;
//         }

//         let currentDate = (new Date().getDate).toString();
//         if (currentDate < '10') {
//             currentDate = ('0' + currentDate);
//         } else {
//             currentDate = currentDate;
//         }

//         expect(pipe.transform(new Date().getTime() / 1000, dateFormat))
//             .toEqual(new Date().getDate() + '/' + '0' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear());

//     });

//     it('check format MM/DD/YYYY', () => {
//         const dateFormat = 'MM/DD/YYYY';
//         let currentMonth = (new Date().getMonth() + 1).toString();
//         if (currentMonth < '10') {
//             currentMonth = ('0' + currentMonth);
//         } else {
//             currentMonth = currentMonth;
//         }

//         let currentDate = (new Date().getDate).toString();
//         if (currentDate < '10') {
//             currentDate = ('0' + currentDate);
//         } else {
//             currentDate = currentDate;
//         }

//         expect(pipe.transform(new Date().getTime() / 1000, dateFormat))
//             .toEqual('0' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear());

//     });

// });
