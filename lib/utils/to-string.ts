const toString = (value: unknown) => {
  if (typeof value === 'function') {
    return value.toString();
  } else {
    return JSON.stringify(value);
  }
};

export default toString;
