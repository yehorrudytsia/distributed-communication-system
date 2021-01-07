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

const api = buildAPI('registration');

const registr = async () => {

  let user = {
      login : document.getElementById("regLoginInput").value,
      password : document.getElementById("regPasswordInput").value,
      fullname : document.getElementById("regNameInput").value
  };

  console.dir(user);

  const id = await api.registration(user);
  console.dir(id);
  document
    .location
    .href = 'http://localhost:8000/index.html';
}

registr();
