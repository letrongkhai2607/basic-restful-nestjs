const cleanObject = (object) => {
  if (!object) {
    return {};
  }
  Object.keys(object).forEach((key) => {
    if ([undefined, null, ''].includes(object[key])) {
      delete object[key];
    }
  });
  return object;
};
export { cleanObject };
