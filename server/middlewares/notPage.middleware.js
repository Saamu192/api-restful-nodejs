const pageNotFount = (req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  next(err);
};

export { pageNotFount };
