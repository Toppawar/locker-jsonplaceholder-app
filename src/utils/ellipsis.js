/**
 * Function to use in case of ellipsis text and there is not a strict width defined via css
 *
 * @param {string} value
 * @param {number} lenght
 * @returns {string} string formated by lenght
 */

const ellipsis = (value = "", lenght = 20) => { return `${value.substring(0, lenght)}...`; };

export default ellipsis;
