exports.validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        msg: "Validation Error",
        reasons: error.details.map((d) => {
          return {
            message: d.message.replaceAll('"', ""),
            field: d.path.join("."),
          };
        }),
      });
    }
    req.body = value;
    next();
  };
};
