const cook = document.cookie;
const indexItem = cook.indexOf('nameuser');

const userName = decodeURIComponent(cook.slice(indexItem + 9));
console.log(userName)

const htmlItem = document.querySelector('.author-news');

if(htmlItem.id == userName){
    document.querySelector('.deletes').style.display = 'block';
    document.querySelector('.commen').style.display = 'block';
    document.querySelectorAll('.btn-group').forEach((item) => {
        item.style.display = 'block';
    });
} else{
    document.querySelector('.deletes').style.display = 'none';
    document.querySelector('.commen').style.display = 'none';
    document.querySelectorAll('.btn-group').forEach((item) => {
        item.style.display = 'none';
    });
}