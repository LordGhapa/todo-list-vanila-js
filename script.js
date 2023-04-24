const defaultList = {
  to_do_list: [
    {
      title: '🛒 Buy groceries',
      description: 'Milk, bread, eggs, cheese, fruits and vegetables.',
      completed: false
    },
    {
      title: '📝 Finish project',
      description: 'Complete the final report and submit it by Friday.',
      completed: true
    },
    {
      title: '🧼 Clean the house',
      description: 'Vacuum, dust, and clean the bathrooms.',
      completed: false
    },
    {
      title: '💰 Pay bills',
      description: 'Electricity, water, and internet bills.',
      completed: false
    },
    {
      title: '📞 Call mom',
      description: "Check in and see how she's doing.",
      completed: true
    },
    {
      title: '📅 Schedule appointment',
      description: 'Make an appointment with the dentist.',
      completed: true
    },
    {
      title: '🏃‍♂️ Go for a run',
      description: 'Jog for 30 minutes.',
      completed: true
    },
    {
      title: '📖 Read a book',
      description: "Finish reading 'The Great Gatsby'.",
      completed: true
    },
    {
      title: '✍️ Write a blog post',
      description: 'Come up with a topic and write a 500-word blog post.',
      completed: true
    },
    {
      title: '🧹 Organize closet',
      description:
        'Sort clothes by category and donate items no longer needed.',
      completed: true
    }
  ]
}
let list = JSON.parse(localStorage.getItem('list'))
const toDo = document.querySelector('#to-do')
const done = document.querySelector('#done')
if (!list) {
  localStorage.setItem('list', JSON.stringify(defaultList))
  list = JSON.parse(localStorage.getItem('list'))
}

function getListData() {
  /*   toDo.innerHTML=""
  done.innerHTML="" */
  let lastItem

  list.to_do_list.forEach((itm, index) => {
    renderToDoItem(itm, index)
    lastItem = index
  })
}

function renderToDoItem(itm, index) {
  const title = document.createElement('textarea')
  title.name = `n${index}-title`
  title.value = itm.title
  title.maxLength = 30
  const desc = document.createElement('textarea')
  desc.name = `n${index}-desc`
  desc.value = itm.description

  desc.style.height = '1.5rem'
  desc.style.height = this.scrollHeight + 'xp'
  desc.addEventListener('input', autoResize, false)
  desc.addEventListener('click', autoResize, false)

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
  checkBtn.title = 'segure para apaga este item'
  checkBtn.id = index

  wrapper.appendChild(itmData)
  wrapper.appendChild(checkBtn)

  if (itm.completed) {
    checkBtn.innerHTML = 'check_box'
    done.appendChild(wrapper)
  } else {
    checkBtn.innerHTML = 'check_box_outline_blank'
    toDo.appendChild(wrapper)
  }
}
function autoResize() {
  this.style.height = '1.5rem'
  this.style.height = this.scrollHeight + 'px'
}
