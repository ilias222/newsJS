const cookie = document.cookie;
console.log(cookie.search('authorize=true'))

if(cookie.search('authorize=true') < 0){
    document.querySelector('.my-profil').textContent = 'Войти';
    document.querySelector('.my-profil').href = 'http://localhost:3000/auth';
    console.log(cookie)
} else {
    document.querySelector('.my-profil').textContent = 'Моя страница';
    document.querySelector('.my-profil').href = 'http://localhost:3000/users/home';
}