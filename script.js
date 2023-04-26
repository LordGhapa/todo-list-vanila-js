let list = JSON.parse(localStorage.getItem('list'))
const toDo = document.querySelector('#to-do')
const done = document.querySelector('#done')
const form = document.querySelector('#form')

const defaultList = {
  to_do_list: [
    {
      title: '🛒 Comprar mantimentos',
      description: 'Leite, pão, ovos, queijo, frutas e legumes.',
      completed: false
    },
    {
      title: '📝 Terminar projeto',
      description: 'Concluir o relatório final e enviá-lo até sexta-feira.',
      completed: true
    },
    {
      title: '🧼 Limpar a casa',
      description: 'Aspirar, tirar o pó e limpar os banheiros.',
      completed: false
    },
    {
      title: '💰 Pagar contas',
      description: 'Contas de eletricidade, água e internet.',
      completed: false
    },
    {
      title: '📞 Ligar para a mãe',
      description: 'Verificar como ela está.',
      completed: true
    },
    {
      title: '📅 Agendar consulta',
      description: 'Marcar uma consulta com o dentista.',
      completed: true
    },
    {
      title: '🏃‍♂️ Fazer uma corrida',
      description: 'Correr por 30 minutos.',
      completed: true
    },
    {
      title: '📖 Ler um livro',
      description: "Terminar de ler 'O Grande Gatsby'.",
      completed: true
    },
    {
      title: '✍️ Escrever um post de blog',
      description:
        'Criar um tópico e escrever um post de blog com 500 palavras.',
      completed: true
    },
    {
      title: '🧹 Organizar o armário',
      description:
        'Organizar as roupas por categoria e doar itens não mais necessários.',
      completed: true
    }
  ]
}

if (!list) {
  localStorage.setItem('list', JSON.stringify(defaultList))
  list = JSON.parse(localStorage.getItem('list'))
}

function getListData() {
  toDo.innerHTML = ''
  done.innerHTML = ''

  let lastItem

  list.to_do_list.forEach((itm, index) => {
    renderToDoItem(itm, index)

    lastItem = index
  })

  if (toDo.childElementCount === 0) {
    renderCompletedImg()
  }

  lastItem++
  createNewItemFields(lastItem)
}

function renderToDoItem(itm, index) {
  const title = document.createElement('textarea')
  title.name = `n${index}-title`
  title.value = itm.title
  title.maxLength = 30
  title.addEventListener('change', handleItemsSubmit)

  const desc = document.createElement('textarea')
  desc.name = `n${index}-desc`
  desc.value = itm.description
  desc.style.height = '1.5rem'
  desc.style.height = this.scrollHeight + 'px'
  desc.addEventListener('input', autoResize, false)
  desc.addEventListener('click', autoResize, false)
  desc.addEventListener('change', handleItemsSubmit)

  const completed = document.createElement('input')
  completed.type = 'hidden'
  completed.name = `n${index}-completed`
  completed.value = itm.completed

  const wrapper = document.createElement('div')
  const itmData = document.createElement('div')

  itmData.classList.add('itm-data')
  itmData.appendChild(title)
  itmData.appendChild(desc)
  itmData.appendChild(completed)

  const checkBtn = document.createElement('span')
  checkBtn.classList.add('material-symbols-outlined')
  checkBtn.title = 'Segure para apaga este item'
  checkBtn.addEventListener('long-press', removeItem)
  checkBtn.addEventListener('click', checkItem)
  checkBtn.setAttribute('data-long-press-delay', '100')
  checkBtn.id = index

  wrapper.appendChild(itmData)
  wrapper.appendChild(checkBtn)

  if (itm.completed) {
    checkBtn.innerText = 'check_box'
    done.appendChild(wrapper)
  } else {
    checkBtn.innerText = 'check_box_outline_blank'
    toDo.appendChild(wrapper)
  }
}

function autoResize() {
  this.style.height = '1.5rem'
  this.style.height = this.scrollHeight + 'px'
}

function createNewItemFields(index) {
  const newItmWrapper = document.createElement('div')
  const newItmData = document.createElement('div')
  const newTitle = document.createElement('textarea')

  newTitle.name = `n${index}-title`
  newTitle.maxLength = 30
  newTitle.placeholder = '✨ Crie um nova Tarefa...'
  newTitle.addEventListener('change', handleItemsSubmit)

  const newDesc = document.createElement('textarea')
  newDesc.name = `n${index}-desc`
  newDesc.style.height = '1.5rem'
  newDesc.style.height = this.scrollHeight + 'px'
  newDesc.placeholder = 'Descrição'
  newDesc.addEventListener('input', autoResize, false)
  newDesc.addEventListener('change', autoResize, false)
  newDesc.addEventListener('change', handleItemsSubmit)

  const newCompleted = document.createElement('input')
  newCompleted.type = 'hidden'
  newCompleted.name = `n${index}-completed`

  newItmData.classList.add('itm-data')
  newItmData.appendChild(newTitle)
  newItmData.appendChild(newDesc)
  newItmData.appendChild(newCompleted)

  newItmWrapper.appendChild(newItmData)
  toDo.appendChild(newItmWrapper)
}

function handleItemsSubmit(e) {
  const formData = new FormData(form)

  const todoObject = {
    to_do_list: []
  }

  const formValues = formData.values()

  for (const itx of formValues) {
    let title = itx
    let description = formValues.next().value
    let completed = formValues.next().value

    if (title.trim() !== '' || description.trim() !== '') {
      todoObject.to_do_list.push({
        title,
        description,
        completed: completed === 'true'
      })
    }
  }

  let listSizes = [list.to_do_list.length, todoObject.to_do_list.length]

  list = todoObject
  saveItemsStorage()

  if (listSizes[0] < listSizes[1]) {
    getListData()
  }
}

function saveItemsStorage() {
  localStorage.setItem('list', JSON.stringify(list))
}

function removeItem(e) {
  let idToRemove = e.target.id
  const filteredList = list.to_do_list.filter((itm, index) => {
    return index != idToRemove
  })
  list.to_do_list = filteredList

  anime({
    targets: e.target.parentElement,
    duration: 500,
    translateX: [0, 50],
    opacity: [1, 0],
    easing: 'easeInExpo',
    complete: function (anim) {
      getListData()
      saveItemsStorage()
    }
  })
}

function checkItem(e) {
  let isCompleted = list.to_do_list[e.target.id].completed
  list.to_do_list[e.target.id].completed = !isCompleted

  anime({
    targets: e.target.parentElement,
    duration: 500,
    translateX: [0, 50],
    opacity: [1, 0],
    easing: 'easeInExpo',
    complete: function (anim) {
      getListData()
      saveItemsStorage()
    }
  })
}

function renderCompletedImg() {
  const upToDateImg = document.createElement('img')
  const upToDateText = document.createElement('h3')

  upToDateImg.src = './img/upToDate.svg'
  upToDateImg.classList.add('up-to-date-img')

  upToDateText.innerText = 'Todas as Tarefas Completas'
  upToDateText.classList.add('up-to-date-txt')

  toDo.appendChild(upToDateImg)
  toDo.appendChild(upToDateText)
}
