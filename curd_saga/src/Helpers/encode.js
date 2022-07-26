import { encode } from 'string-encode-decode';
/**
 * Contains key names which should be encoded from the passed object
 */
const keysToWatch = [
  'password',
  'new_password',
  'confirm_password',
  'current_password'
];
/**
 * Function which will encode the string from provided object
 * @param {*} object
 */
const encodeString = (object = {}) => {
  return Object.keys(object).reduce((prev, current) => {
    let currentValue = object[current];
    // Encode only keys which are provided in keysToWatch
    if (keysToWatch.includes(current)) {
      currentValue = encode(currentValue) || currentValue;
    }
    return {
      ...prev,
      [current]: currentValue
    };
  }, {});
};

export default encodeString;
