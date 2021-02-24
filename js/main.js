// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAYeGqufiCwJVXM3uP06ReXKDs-z99ni7w',
    authDomain: 'pikapikadu-cb7ce.firebaseapp.com',
    projectId: 'pikapikadu-cb7ce',
    storageBucket: 'pikapikadu-cb7ce.appspot.com',
    messagingSenderId: '241003429634',
    appId: '1:241003429634:web:6df039b2c46366c8a70c1b'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');

const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');

const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

const DEFAULT_PHOTO = userAvatarElem.src;

// console.log(document.getElementsByClassName('login')[0]);
// вариант еще

const listUsers = [
    {
        id: '01',
        email: 'maks@mail.com',
        password: '123456',
        displayName: 'MaksJS',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Russia_stamp_1992_No_15.jpg'
    },
    {
        id: '02',
        email: 'kate@mail.com',
        password: '123456',
        displayName: 'KateKillMaks',
        photo:
            'https://st.depositphotos.com/1325441/1838/i/600/depositphotos_18387023-stock-photo-closeup-of-a-jester-in.jpg'
    }
];

const setUsers = {
    user: null,
    initUser(handler) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
            if (handler) handler();
        });
    },

    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('email не валиден');
            return;
        }
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)

            .catch((err) => {
                const errCode = err.errCode;
                const errMessage = err.message;
                if (errCode === 'auth/wrong-password') {
                    console.log(errMessage);
                    alert('Неверный пароль');
                } else if (errCode === 'auth/user-not-found') {
                    console.log(errMessage);
                    alert('Пользователь не найден');
                } else {
                    alert(errMessage);
                }
                console.log(err);
            });
        // const user = this.getUser(email);
        // if (user && user.password == password) {
        //     this.authorizedUser(user);
        //     if (handler) {
        //         handler();
        //     }
        // } else {
        //     alert('Пользователь с такими данными не найден');
        // }
    },
    logOut() {
        firebase.auth().signOut();
    },
    signUp(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('email не валиден');
            return;
        }

        if (!email.trim() || !password.trim()) {
            alert('Введите данные');
            return;
        }
        // if (!this.getUser(email)) {
        //     const user = {
        //         email,
        //         password,
        //         displayName: email.substring(0, email.indexOf('@'))
        //     };
        //     listUsers.push(user);
        //     this.authorizedUser(user);
        //     if (handler) {
        //         handler();
        //     }
        // } else {
        //     alert('пользователь с таким email уже зарегистрирован');
        // }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
                this.editUser(email.substring(0, email.indexOf('@')), null, handler);
            })
            .catch((err) => {
                const errCode = err.errCode;
                const errMessage = err.message;
                if (errCode === 'auth/week-password') {
                    console.log(errMessage);
                    alert('Слабый пароль');
                } else if (errCode === 'auth/email-already-in-use') {
                    console.log(errMessage);
                    alert('Этот email уже используется');
                } else {
                    alert(errMessage);
                }
                console.log(err);
            });
    },
    // getUser(email) {
    //   let user = null;
    //   for (let i = 0; i < listUsers.length; i++) {
    //     if (listUsers[i].email === email) {
    //       user = listUsers[i];
    //       break;
    //     }
    //   }
    //   return user;
    // },

    editUser(displayName, photoURL, handler) {
        const user = firebase.auth().currentUser;

        if (displayName) {
            if (photoURL) {
                user.updateProfile({
                    displayName,
                    photoURL
                }).then(handler);
            } else {
                user.updateProfile({
                    displayName
                }).then(handler);
            }
        }
    },

    // getUser(email) {
    //     return listUsers.find((item) => item.email === email);
    // },
    // authorizedUser(user) {
    //     this.user = user;
    // }

    sendForget(email) {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                alert('Письмо отправлено');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const loginForget = document.querySelector('.login-forget');
loginForget.addEventListener('click', (event) => {
    event.preventDefault();
    setUsers.sendForget(emailInput.value);
    emailInput.value = '';
});


const setPosts = {
    // allPosts: [
    //     {
    //         title: 'Заголовок поста',
    //         text:
    //             'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
    //         tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
    //         author: { displayName: 'maks', photo: 'https://elize.ru/ckimageimages/taira.jpg' },
    //         date: '11.11.2020, 20:54:00',
    //         like: 15,
    //         comments: 20
    //     },
    //     {
    //         title: 'Заголовок поста 2',
    //         text:
    //             ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis repellendus magni tempora ducimus voluptatibus facere doloremque, dignissimos quibusdam ipsa ullam, voluptates, excepturi quos nihil? Nostrum, omnis. Reiciendis deserunt culpa odit impedit minima cupiditate exercitationem recusandae, corporis sequi? Illo unde omnis ipsa accusantium sequi explicabo, expedita deleniti architecto sunt voluptas accusamus itaque velit quia placeat ab quae eius veritatis facere  ',
    //         tags: ['свежее', 'новое', 'горячее', 'случайность'],
    //         author: {
    //             displayName: 'kate',
    //             photo:
    //                 'https://www.segodnya.ua/img/forall/users/3255/325549/new/36518142_235744917238115_3325996934283395072_n_01.jpg'
    //         },
    //         date: '10.11.2020, 20:54:00',
    //         like: 25,
    //         comments: 122
    //     },
    //     {
    //         title: 'Заголовок поста 3',
    //         text:
    //             'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
    //         tags: ['свежее', 'новое', 'горячее', 'случайность'],
    //         author: 'kate@mail.com',
    //         date: '10.11.2020, 20:54:00',
    //         like: 45,
    //         comments: 12
    //     }
    // ],

    addPost(title, text, tags, handler) {
        const user = firebase.auth().currentUser;

        this.allPosts.unshift({
            id: `postID${(+new Date()).toString(16)}-${user.uid}`,
            title,
            text,
            tags: tags.split(',').map((item) => item.trim()),
            author: {
                displayName: setUsers.user.displayName,
                photo: setUsers.user.photoURL
            },
            date: new Date().toLocaleString(),
            like: 0,
            comments: 0
        });
        firebase
            .database()
            .ref('post')
            .set(this.allPosts)
            .then(() => this.getPosts(handler));
    },
    getPosts(handler) {
        firebase
            .database()
            .ref('post')
            .on('value', (snapshot) => {
                this.allPosts = snapshot.val() || [];

                handler();
            });
    }
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user: ', user);
    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;
        buttonNewPost.classList.add('visible');

        // userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src
        // вариант записи тернарными операторами
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
        buttonNewPost.classList.remove('visible');
        addPostElem.classList.remove('visible');
        postsWrapper.classList.add('visible');
    }
};

const showAddPost = () => {
    addPostElem.classList.add('visible');
    postsWrapper.classList.remove('visible');
};

const showAllPosts = () => {
    let postsHTML = '';

    setPosts.allPosts.forEach(({ title, text, date, tags, like, comments, author }) => {
        postsHTML += `
        <section class="post">
      <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <p class="post-text">
        Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
        Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад
        решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек
        залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова
        решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они
        текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на
        берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!
      </p>
      <p class="post-text">
        Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
        Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад
        решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек
        залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова
        решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они
        текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на
        берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!
      </p>
      <div class="tags">
        ${tags.map((tag) => `<a href="#" class="tag" >#${tag}</a>`)}

      </div>

    </div>

    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>

      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src=${
            author.photo || 'img/avatar.jpeg'
        } alt="avatar" class="author-avatar" /></a>
      </div>

    </div>

  </section>`;
    });

    postsWrapper.innerHTML = postsHTML;

    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
};

const init = () => {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;

        setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
    });

    loginSignup.addEventListener('click', (event) => {
        event.preventDefault();

        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;

        setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
    });

    exitElem.addEventListener('click', (event) => {
        event.preventDefault();
        setUsers.logOut(toggleAuthDom);
    });

    editElem.addEventListener('click', (event) => {
        event.preventDefault();
        editContainer.classList.toggle('visible');
        editUsername.value = setUsers.user.displayName;
    });

    editContainer.addEventListener('submit', (event) => {
        event.preventDefault();
        setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
        editContainer.classList.remove('.visible');
    });

    // отслеживаем клик по кнопке меню и запускаем функцию
    menuToggle.addEventListener('click', function (event) {
        // отменяем стандартное поведение ссылки
        event.preventDefault();
        // вешаем класс на меню, когда кликнули по кнопке меню
        menu.classList.toggle('visible');
    });

    buttonNewPost.addEventListener('click', (event) => {
        event.preventDefault();
        showAddPost();
    });

    addPostElem.addEventListener('submit', (event) => {
        event.preventDefault();
        // const formElements = [...addPostElem.elements].filter(elem => elem.tagName !== 'BUTTON');
        const { title, text, tags } = addPostElem.elements;

        if (title.value.length < 6) {
            alert('слишком короткий заголовок');
            return;
        }
        if (text.value.length < 50) {
            alert('слишком короткий пост');
            return;
        }
        setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
        addPostElem.classList.remove('visible');
        addPostElem.reset();
    });

    setUsers.initUser(toggleAuthDom);

    setPosts.getPosts(showAllPosts);

    // toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', () => {
    init();
});

// document.addEventListener('DOMContentLoaded', init )
// еще  вариант записи
