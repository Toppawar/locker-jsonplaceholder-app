/**
 * Executes a given function only once in the given time period.
 *
 * @param  {Function}  func: The function to be executed.
 * @param  {Int} delay: The time period in milliseconds.
 * @return {Function} The debounced function.
 */

const debounce = (func, delay) => {
  let timer;
  return function debouncer() {
    const self = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, delay);
  };
};

export default debounce;
