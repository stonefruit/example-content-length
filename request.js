const http = require('http');

const port = 3000;

/**
 * @param {string} data
 * @param {'text/html' | 'application/json'} contentType
 * @param {number} contentLength
 * @returns {Promise<string>}
 */
const post = async (data, contentType, contentLength) => {
  const pathType = contentType === 'text/html' ? 'text' : 'json';
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port,
      path: `/endpoint-${pathType}`,
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        'Content-Length': contentLength,
      },
    };

    const req = http.request(options, (res) => {
      const buffer = [];
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        buffer.push(chunk);
      });
      res.on('end', () => {
        const responseData = buffer.join('');
        resolve(responseData);
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
      reject(e);
    });

    // Write data to request body
    req.write(data);
  });
};

module.exports = { post };
