export default (options) =>
  ({ schema }) =>
  (data) => {
    // with option strict = false, yup `validateSync` function returns the coerced value if validation was successful, or throws if validation failed
    try {
      const result = schema.validateSync(data, options);
      return { value: result };
    } catch (error) {
      return { error };
    }
  };
