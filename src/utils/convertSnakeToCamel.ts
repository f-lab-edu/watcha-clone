export const convertSnakeToCamel = (obj: Record<string, any>) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const result: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const parts = key.split("_");
    let newKey = parts[0];

    for (let i = 1; i < parts.length; i++) {
      if (parts[i].length > 0) {
        newKey += parts[i][0].toUpperCase() + parts[i].substring(1);
      }
    }

    result[newKey] = obj[key];
  });

  return result;
};
