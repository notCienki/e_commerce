import User from '../models/User.js';

export const showRegister = (req, res) => {
  res.render('pages/register', { error: null });
};

export const register = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
      return res.render('pages/register', { error: 'Wszystkie pola są wymagane' });
    }

    if (password !== confirmPassword) {
      return res.render('pages/register', { error: 'Hasła nie są zgodne' });
    }

    if (password.length < 6) {
      return res.render('pages/register', { error: 'Hasło musi mieć minimum 6 znaków' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('pages/register', { error: 'Użytkownik już istnieje' });
    }

    const user = new User({ username, password });
    await user.save();

    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.isAdmin = user.isAdmin;

    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.render('pages/register', { error: 'Błąd podczas rejestracji' });
  }
};

export const showLogin = (req, res) => {
  res.render('pages/login', { error: null });
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render('pages/login', { error: 'Wszystkie pola są wymagane' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.render('pages/login', { error: 'Nieprawidłowy login lub hasło' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('pages/login', { error: 'Nieprawidłowy login lub hasło' });
    }

    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.isAdmin = user.isAdmin;

    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.render('pages/login', { error: 'Błąd podczas logowania' });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
};
