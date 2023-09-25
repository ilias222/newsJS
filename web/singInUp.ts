const cookie = document.cookie;
console.log(cookie.search('authorize=true'))
if(cookie.search('authorize=true')){
    document.querySelector('.my-profil').textContent = 'Войти';
    (<HTMLLinkElement>document.querySelector('.my-profil')).href = 'http://localhost:3000/auth';
} else {
    document.querySelector('.my-profil').textContent = 'Моя страница';
    (<HTMLLinkElement>document.querySelector('.my-profil')).href = 'http://localhost:3000/news';
}