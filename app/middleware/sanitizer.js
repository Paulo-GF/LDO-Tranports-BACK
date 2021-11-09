const sanitizeHtml = require('sanitize-html');

const sanitizer = (req, _, next) => {

  // For body
  if (req.body) {
      for (let propName in req.body) {
          // Allow only a super restricted set of tags and attributes
          req.body[propName] = sanitizeHtml(req.body[propName], {
              allowedTags: ['a', 'p','ol','ul', 'li', 'h1', 'h2', 'h3', 'strong', 'em', 'u', 'br', 'span'],
              allowedAttributes: {
                  'a': ['href', 'rel', 'target']
              }
          });
      }
  }
  next();
};

module.exports = sanitizer;