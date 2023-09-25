
document.querySelector('.row').addEventListener('click', (e)=> {
    
    // Открытие на редактировани, добавление формы, 
    // повторное нажатие или открытие следующего - отменят 
    // форму предыдущего и откроют у нового
    // При нажатии на отмену, выведет событие

    if(e.target.textContent == 'Отменить'){
        e.target.textContent = 'Редактировать';
        document.querySelectorAll('.create-comment').forEach((item) => item.style.display = 'none')
        return;
    }

    if(e.target.className === `class-comment-create-${e.target.name}`){
        document.querySelectorAll('.create-comment').forEach((item) => item.style.display = 'none')
        document.querySelector(`.form-${e.target.name}`).style.display = 'block'
        e.target.textContent = 'Отменить';

        document.querySelector(`.form-${e.target.name}`).addEventListener('submit', (ev) => {
            ev.preventDefault();
            let dotas = new FormData(document.querySelector(`.form-${e.target.name}`))
             
            fetch('http://localhost:3000/news-comments/redact', {
                method: "post",
                body: dotas,
              })
        })
    }
    console.log(e.target.className, `class-comment-${e.target.name}`)

    if(e.target.className === `class-comment-${e.target.name}`){
        const acsept = prompt('Удаление Комментария! Вы точно хотите удалить? (Yes/No)')
        try{
            if(acsept === 'Yes'){
                let idComm = e.target.name
                fetch(`http://localhost:3000/news-comments/${idComm.replace('delete', '')}`,{
                    method: 'delete'
                })
                alert('Комментарий удален, обнови страницу!');
                }
        }catch(err) {
            console.log(err)
        }
        
    };

})