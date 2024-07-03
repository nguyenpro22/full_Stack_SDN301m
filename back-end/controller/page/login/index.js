const getLoginPage = (req, res) => {
  res.render("login", {
    username: req.flash("username"),
    password: req.flash("password"),
  });
};

const postLoginHanlder = (req, res) => {
  res.render("login");
};
module.exports = {
  getLoginPage,
  postLoginHanlder,
};
