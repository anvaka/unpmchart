/**
 * Called when file is downloaded
 */
export default function receiveFile(name, content) {
  return {
    type: 'receiveFile',
    name,
    content
  };
}
