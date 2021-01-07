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
  'getUser',
  'signIn',
  'addPost',
  'userPosts',
  'posts'
]);

const main = async () => {
  const signIn = await api.signIn({ login: 'berniesanders', password: 'GreenNewDeal' });
  console.log(signIn);

  //const text = 'With Democrats in control of the Senate, we must keep faith with the working families of this country. Promises made must be kept. That means not only the $2,000 direct payment, but an aggressive agenda that recognizes the economic desperation facing so many Americans.';
  //const subject = 'Politics'
//  const result = await api.addPost({ data: text, subject: subject});

  const result = await api.posts()
  console.log(result);

};

main();
