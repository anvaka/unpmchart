export default requestStarted;

/**
 * Fired when client started downloading a file
 */
function requestStarted(url) {
  return {
    type: 'requestStarted',
    url
  };
}
