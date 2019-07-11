// import {hashRaw} from 'imghash';
//import {blockhash} from 'blockhash'

export const fileToHash = (file,width,height) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ev => {
      console.log(ev.target.result);
      console.log(width);
      resolve("");
    };
   // reader.readAsBinaryString(file);
  });
};