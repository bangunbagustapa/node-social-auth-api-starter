/*
This log file will print the log to the
console better with color and symbol
*/
const log = {
  success: (message) => console.log(`${'\x1b[32m'}✔ ${message}`),
  error: (message) => console.log(`${'\x1b[31m'}✘ ${message}`),
};

export default log;
