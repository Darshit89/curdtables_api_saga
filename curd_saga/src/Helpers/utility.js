import { Map } from 'immutable';

export function clearToken() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
}
/**
 * Gets the token.
 *
 * @return     {Map}  The token.
 */
export function getToken() {
  try {
    const authToken = localStorage.getItem('auth_token');
    const user = localStorage.user ? JSON.parse(localStorage.user) : null;
    return new Map({ authToken, user });
  } catch (err) {
    clearToken();
    return new Map();
  }
}
/**
 * convert Array/object to formdata
 *
 * @param      {(Object|Array)}  obj
 * @param      {Object}  		 form
 * @param      {string}  		 namespace
 * @return     {FormData}
 */
export function toFormData(obj, form, namespace) {
  let fd = form || new FormData();
  let formKey;

  // eslint-disable-next-line no-unused-vars
  for (let property in obj) {
    if (obj.hasOwnProperty(property) && obj[property]) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File, use recursivity.
      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString());
      } else if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File)
      ) {
        toFormData(obj[property], fd, formKey);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
}
