import * as fs from 'fs';

// function fileLoader() {

//   const filenamelist = ['basics', 'columns', 'inline-styling', 'lists', 'margins', 'named-styles', 'style-overrides', 'tables'];
  
//   var filelist = [];

//   filenamelist.map((filename) => {
//     filelist.push(
//       { name: filename,
//         body: 'dd = {' + fs.readFileSync(`./sample/${filename}`, 'utf8') + '}'
//       });
//   });

//   return filelist;
// }

const fileLoader = (filename) => {
  return 'dd = {' + fs.readFileSync(`./sample/${filename}`, 'utf8') + '}';
}

export default fileLoader;
