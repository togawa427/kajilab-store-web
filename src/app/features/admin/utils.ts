// import fs from 'fs';
// import path from 'path';

// export const uploadImage = async (barcode: number, image: File): Promise<number> => {
//   let new_iconname = "test.jpg";
//   let target_path_i = 'public/products/test.jpg';
//   fs.writeFile(target_path_i, image,(err: any) => {
//     if(err){
//         throw err
//     }else{
//       console.log("成功")
//     }
//   });
//   console.log(barcode)
//   return 200
// }