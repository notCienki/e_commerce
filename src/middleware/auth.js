export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
};

export const isAdmin = (req, res, next) => {
  if (req.session.userId && req.session.isAdmin) {
    return next();
  }
  res.status(403).send('Brak uprawnień administratora');
};

export const attachUserToViews = (req, res, next) => {
  res.locals.user = req.session.userId ? {
    id: req.session.userId,
    username: req.session.username,
    isAdmin: req.session.isAdmin
  } : null;
  next();
};
