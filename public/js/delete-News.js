document.querySelector('.deletes').addEventListener('click', (e) => {
    const acsept = prompt('Удаление новости! Вы точно хотите удалить? (Yes/No)')
    try{
        if(acsept === 'Yes'){
            console.log(e.target.id)
            fetch(`http://localhost:3000/news/${e.target.id}/delete`,{
                method: 'delete'
            })
            alert('Новость удалена, обнови страницу!');
            }
    }catch(err) {
        console.log(err)
    }
    
});

