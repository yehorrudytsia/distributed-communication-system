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
  'addPost',
  'userPosts',
  'nameById'
]);

const addMessageDiv = async (obj, event) => {
        let messagesDiv = document.getElementById("messages");
        let messageContent = obj.data;
        let messageSubject = obj.subject;
        messagesDiv.innerHTML += "<div style='background: linear-gradient(to top right, white, #eceded);><p style='font-weight: 800; font:message-box; font-size:11px;'>"  +
           "                                On " + messageSubject +
           "</p><br><p style='font-weight: 800; font:message-box; font-size:18px;'>" + messageContent + "</p></div>"
}


const loadPosts = async () => {
  const data = await api.nameById();
  const userName = data.data[0].login;
  const userNameDiv = document.getElementById("userName")
  userNameDiv.innerHTML += "<p style='margin-left: 10px; color: black'>𝙉𝙖𝙢𝙚 : " + userName +  "  </p>" ;
  const result = await api.userPosts()
  const posts = result.userPosts


        for (let i = posts.length-1; i >= 0; --i) {
            addMessageDiv(posts[i], event)
        }
}
loadPosts()
