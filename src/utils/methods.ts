export const safeJSONParse = <T, U>(data: any, defaultValue: U): T | U => {
  try {
    const result: T = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
    return defaultValue;
  }
};
