'use strict';

const BASE = '/api/';

const loadMethods = methods => {
  const api = {};
  for (const method of methods)
  {
  api[method] = (args = {}) =>  new Promise((resolve, reject) => {
    const url = BASE + method;
    console.log(url, args);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args),
    }).then(res => {
      const { status } = res;
      if (status !== 200) {
        reject(new Error(`Status Code: ${status}`));
        return;
      }
      resolve(res.json());
      });
    });
  }
  return api;
};

const api = loadMethods([
  'getUser',
]);

const login = async () => {

  let user = {
                login : document.getElementById("logLoginInput").value,
                password : document.getElementById("logPasswordInput").value
            };

  //console.dir(user);
  const id = await api.getUser(user.login)
      .catch(err => (err))
      .then(setTimeout(() => {
        document.getElementById('output')
                .innerHTML = 'Invalid login or password!'
      }, 500));

  document
      .getElementById('output')
      .innerHTML = 'Success!'

  console.dir(id)
  console.log(id)
}
login();
