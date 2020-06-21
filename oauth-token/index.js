const axios = require('axios');

exports.oauthToken = (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    axios.post('https://github.com/login/oauth/access_token', {
      redirect_uri: req.body.redirect_uri,
      client_id: req.body.client_id,
      client_secret: req.body.client_secret,
      code: req.body.code,
      state: req.body.state
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        res.send(response.body);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500);
      });

    res.status(500);
  }
};