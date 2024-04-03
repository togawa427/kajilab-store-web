import type { NextApiRequest, NextApiResponse } from 'next';
import fs, { createWriteStream } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import formidable from 'formidable';

//const formidable = require("formidable");

const saveFile = (str: any) => {
  //const filePath = path.join(uploadDir, file.originalname);
  // fs.writeFileSync(filePath, file.buffer);
  fs.writeFileSync("public/products/outputimg10.jpg", Buffer.from(str, 'base64'))
};

export const config = {
  api: {
    bodyParser: false,
  }
}

type Data = {
  msg?: string;
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  //const { imgFile } = await req.json();
  const { data } = await req.query;
  console.log("POSTAPI叩かれたよver2")
  console.log(data)
  fs.writeFileSync("public/products/outputimg10.txt", "あああああ")
  const form = new formidable.IncomingForm();

  // const form = formidable({ multiples: true, uploadDir:  "public/products/"});
  // console.log("POSTAPI叩かれたよver21")
  // form.onPart = (part) => {
  //   console.log("onPartぽい")
    
  //   // let formidable handle only non-file parts
  //   if (part.originalFilename === "" || !part.mimetype) {
  //     // used internally, please do not override!
  //     console.log("なんかだめっぽい")
  //     form._handlePart(part);
  //   } else if (part.originalFilename) {
  //     console.log("ファイル書き出すぞ")
  //     // 以下でファイルを書き出ししている      

  //     console.log(part.name);
  //     // /public/imagesディレクトリがないと正常に動かないので作成すること
  //     const path =
  //       "./public/products/testtest.jpg";
  //     const stream = createWriteStream(path);
  //     part.pipe(stream);

  //     part.on("end", () => {
  //       console.log(part.originalFilename + " is uploaded");
  //       stream.close();
  //     });
  //   }
  // }
  // console.log("POSTAPI叩かれたよver22")
  // return res.status(200).json({ message: "Deleted successfully" });

  form.parse(req, async function (err:any, fields:any, files:any) {
    if (err) {
      res.statusCode = 500
      res.json({
        method: req.method,
        error: err
      });
      res.end();
      return
    }
    console.log("パーサー成功")
    const file = files.file;
    fs.writeFileSync("public/products/outputimg10.jpg", Buffer.from(file))
  })
  // console.log(imgFile)
  // saveFile(imgFile);
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET'){
    console.log("API叩かれたよ")
    const {text} = await req.query
    saveFile(text);
    res.status(200).json({ message: "file success!!"})
  }
}


// import type { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import { createWriteStream } from "fs";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
// type Data = {
//   msg?: string;
// };
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   if (req.method !== "POST") return;

//   const form = formidable({ multiples: true, uploadDir: __dirname });

//   form.onPart = (part) => {
    
//     // let formidable handle only non-file parts
//     if (part.originalFilename === "" || !part.mimetype) {
//       // used internally, please do not override!
//       form._handlePart(part);
//     } else if (part.originalFilename) {

//       // 以下でファイルを書き出ししている      

//       console.log(part.name);
//       // /public/imagesディレクトリがないと正常に動かないので作成すること
//       const path =
//         "./public/images/" + new Date().getTime() + part.originalFilename;
//       const stream = createWriteStream(path);
//       part.pipe(stream);

//       part.on("end", () => {
//         console.log(part.originalFilename + " is uploaded");
//         stream.close();
//       });

//     }
//   };

//   // input[type="file"]以外の値はここから見れた
//   form.on('field', (name, value) => {
//     console.log(name);
//     console.log(value);
//   })

//   // これを実行しないと変換できない
//   form.parse(req)

//   // これでもinput[type="file"]以外の値はここから見れるが、fileは見れない
//   // form.parse(req, async (err, fields, files) => {
//   //   console.log("fields:", fields); // { name: '*'}
//   //   console.log("files:", files); // {}

//   //   res.status(200).json({ name: "!!!" });
//   // });

//   // レスポンス
//   res.status(200).json({ msg: "success!!" });
// }