
/**
 * Returns true if the file type matches the types passed within the acceptableMimeTypes array, false otherwise.
 * The types passed must be strings and are CASE-SENSITIVE.
 * eg. if file is of type 'text' and acceptableMimeTypes = ['TEXT', 'IMAGE'] the function will return false.
 * @ param file - The file you want to type check.
 * @ param acceptableMimeTypes - An array of strings of types which the file is checked against.
 * @ returns true if the file is an acceptable mime type, false otherwise.
 */
export function isMimeType(
  file,
  acceptableMimeTypes,
){
  console.log('file [isMimeType]: ', file)
  for (const acceptableType of acceptableMimeTypes) {
    if (file.type.startsWith(acceptableType)) {
      console.log('startsWith acceptable type', file.type);
      return true;
    } else {
      console.log('startsWith UNACCEPTABLE type')
    }
  }
  return false;
}

/**
 * Lexical File Reader with:
 *  1. MIME type support
 *  2. batched results (HistoryPlugin compatibility)
 *  3. Order aware (respects the order when multiple Files are passed)
 *
 * const filesResult = await mediaFileReader(files, ['image/']);
 * filesResult.forEach(file => editor.dispatchCommand('INSERT_IMAGE', {
 *   src: file.result,
 * }));
 */
export function mediaFileReader(
  files,
  acceptableMimeTypes,
) {
  const filesIterator = files[Symbol.iterator]();
  return new Promise((resolve, reject) => {
    const processed = [];
    const handleNextFile = () => {
      const {done, value} = filesIterator.next();
      // console.log('value: ', value);
      if (done) {
        return resolve(processed);
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('error', reject);
      fileReader.addEventListener('load', () => {
        const result = fileReader.result;
        if (typeof result === 'string') {
          console.log('value [mediaFileReader]: ', value);
          console.log('result [mediaFileReader]: ', result);
          // processed.push({file, result});
          processed.push({value, result});
        }
        handleNextFile();
      });
      if (isMimeType(value, acceptableMimeTypes)) {
        fileReader.readAsDataURL(value);
      } else {
        handleNextFile();
      }
    };
    handleNextFile();
  });
}