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

export const getFromLocalStorage = (key: string): string => {
  if (typeof window !== undefined) {
    // Now it's safe to access window and localStorage
    let itemFromLocalStorage = localStorage.getItem(key)
    if(itemFromLocalStorage == null){
      return ""
    }
    return itemFromLocalStorage
  }
  return ""
}