'use strict';

const buildAPI = methods => {
  const api = {};
  for (const method of methods) {
    api[method] = (args = {}) => new Promise((resolve, reject) => {
      const url = `/api/${method}`;
      console.log(url, args);
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args),
      }).then(res => {
        const { status } = res;
        if (status === 200) resolve(res.json());
        else reject(new Error(`Status Code: ${status}`));
      });
    });
  }
  return api;
};

const api = buildAPI([
  'signIn',
  'getFullname',
]);

const login = async () => {

  let user = {
                login : document.getElementById("logLoginInput").value,
                password : document.getElementById("logPasswordInput").value
            };

  console.dir(user);
  const id = await api.signIn(user)
      .catch(err => (err))
      .then(setTimeout(() => {
        document.getElementById('output')
                .innerHTML = 'Invalid login or password!'
      }, 500));

  document
      .getElementById('output')
      .innerHTML = 'Success!'
  if (id) {
    document
      .location
      .href = 'http://localhost:8000/index.html';
  }
}

login();
