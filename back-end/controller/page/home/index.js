const handleGetHomeController = (req, res) => {
  if(req.query.submit == 'signIn') {
    res.redirect('login')
  }
}

module.exports = {
  handleGetHomeController
}