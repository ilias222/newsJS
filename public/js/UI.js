
const formLogin = document.querySelector('.auth-sectionIn');
const formAuth = document.querySelector('.auth-sectionUp');

document.querySelector('.nexts').addEventListener('click', (e) => {
  formLogin.style.display = 'none';
  formAuth.style.display ='block';
});

document.querySelector('.prevs').addEventListener('click', (e) => {
  formAuth.style.display ='none';
  formLogin.style.display = 'block';
})