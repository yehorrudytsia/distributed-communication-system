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
  'posts',
  'userById',
  'nameById'
]);




const words = new Map([
    ["football", [0.01, 0.01, 0.02, 0.95, 0.01]],
    ["basketball", [0.01, 0.01, 0.02, 0.95, 0.01]],
    ["volleyball", [0.01, 0.01, 0.02, 0.95, 0.01]],
    ["soccer", [0.01, 0.01, 0.02, 0.95, 0.01]],
    ["sport", [0.05, 0.01, 0.03, 0.9, 0.01]],
    ["baseball", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["hockey", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["badminton", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["tennis", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["rugby", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["golf", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["billiards", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["swimming", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["biathlon", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["wrestling", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["gymnastics", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["fencing", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["[race", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["polo", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["bowling", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["athlete", [0.005, 0.005, 0.01, 0.975, 0.005]],
    ["a", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["the", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["[are", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["an", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["is", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["they", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["he", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["she", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["it", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["i", [0.2, 0.2, 0.2, 0.2, 0.2]],
    ["ecology", [0.1, 0.785, 0.01, 0.005, 0.1]],
    ["earth", [0.1, 0.785, 0.01, 0.005, 0.1]],
    ["planet", [0.1, 0.785, 0.01, 0.005, 0.1]],
    ["global", [0.2, 0.785, 0.01, 0.01, 0.1]],
    ["nature", [0.1, 0.63, 0.01, 0.01, 0.25]],
    ["people", [0.3, 0.3, 0.1, 0.1, 0.2]],
    ["degree", [0.005, 0.49, 0.005, 0.01, 0.49]],
    ["damage", [0.2, 0.65, 0.01, 0.01, 0.13]],
    ["culture", [0.3, 0.1, 0.5, 0.05, 0.05]],
    ["country", [0.4, 0.3, 0.1, 0.1, 0.1]],
    ["ahmosphere", [0.01, 0.75, 0.005, 0.005, 0.23]],
    ["problem", [0.3, 0.4, 0.05, 0.05, 0.2]],
    ["science", [0.05, 0.1, 0.03, 0.02, 0.8]],
    ["food", [0.43, 0.5, 0.01, 0.01, 0.05]],
    ["astronomy", [0.01, 0.05, 0.01, 0.01, 0.92]],
    ["atom", [0.01, 0.05, 0.01, 0.01, 0.92]],
    ["climate", [1, 90, 1, 1, 30]],
    ["data", [1, 40, 1, 1, 100]],
    ["electricity", [70, 20, 1, 1, 20]],
    ["evolution", [1, 20, 1, 1, 50]],
    ["genetics", [1, 20, 1, 1, 50]],
    ["geology", [1, 20, 1, 1, 50]],
    ["laboratory", [0.02, 0.3, 0.01, 0.01, 0.66]],
    ["mineral", [0.01, 0.05, 0.01, 0.01, 0.92]],
    ["physics", [0.01, 0.05, 0.01, 0.01, 0.92]],
    ["radiology", [0.01, 0.05, 0.01, 0.01, 0.92]],
    ["theory", [0.01, 0.05, 0.01, 0.01, 0.92]],
    ["virologist", [0.4, 0.4, 0.005, 0.005, 0.19]],
    ["volume", [4, 15, 1, 1, 90]],
    ["weather", [0.1, 0.785, 0.01, 0.005, 0.1]],
    ["human", [0.3, 0.3, 0.1, 0.1, 0.2]],
    ["animal", [5, 50, 1, 1, 50]],
    ["usa", [90, 10, 1, 1, 10]],
    ["europe", [90, 10, 1, 1, 10]],
    ["covid", [0.4, 0.4, 0.005, 0.15, 0.19]],
    ["film", [0.005, 0.005, 0.98, 0.005, 0.005]],
    ["coronavirus", [0.4, 0.4, 0.005, 0.005, 0.19]],
    ["virus", [0.4, 0.4, 0.005, 0.005, 0.19]],
    ["actor", [0.005, 0.005, 0.98, 0.005, 0.005]],
    ["actress", [0.005, 0.005, 0.98, 0.005, 0.005]],
    ["home", [10, 10, 10, 10, 10]],
    ["life", [20, 30, 5, 3, 20]]
]);
var categories = ["Politic", "Ecology", "Art", "Sport", "Science"];
var probabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
function isDigit(aChar) {
    var myCharCode = aChar.charCodeAt(0);
    if ((myCharCode > 47) && (myCharCode < 58)) {
        return true;
    }
    return false;
}
function tokens(str) {
    var res = "";
    for (var i = 0; i < str.length; i++) {
        if (isDigit(str[i]) || str[i].match(/[a-z]/i) || str[i] == ' ') {
            res = res + str[i];
        }
    }
    var result = res.split(" ");
    return result;
}
function probability(str) {
    var tkns = tokens(str);
    console.log(tkns);
    var res = probabilities;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < tkns.length; j++) {
            if (tkns[j] != '' && words.get(tkns[j]) !== undefined) {
                res[i] = res[i] * (words.get(tkns[j]))[i];
            }
        }
    }
    console.log(res);
    return categories[res.map(function (x, i) { return [x, i]; }).reduce(function (r, a) { return (a[0] > r[0] ? a : r); })[1]];
}



const addMessage = async () => {
      event.preventDefault()
      console.log('userName: ' + userName)
      let data = document.getElementById("newMessage").value
      console.log(data)
      const subject = probability(data)
      const result = await api.addPost({ data: data, subject: subject});
};

const addMessageDiv = async (obj, event) => {
        let login = await api.userById(obj.userid);
        console.log(login)
        let userName = login.data[0].login;
        let messagesDiv = document.getElementById("messages");
        let messageContent = obj.data;
        let messageSubject = obj.subject;


        messagesDiv.innerHTML += "<div style='background: linear-gradient(to top right, white, #eceded);><p style='font-size:22px;'>@" + userName +

    "<img src='https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg' width=15px height=15px></img>" +

    "</p><p style='font-weight: 800; font:message-box; font-size:22px;'>" + messageContent + "</p><br><p >#"+  messageSubject+  "</p></div>"
  }


const loadPosts = async () => {
  const result = await api.posts()
  let posts = result.posts
  console.log(posts)


        for (let i = posts.length-1; i >= 0; --i) {
            addMessageDiv(posts[i], event)
        }
}
loadPosts()
