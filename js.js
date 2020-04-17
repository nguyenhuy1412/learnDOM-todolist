setInterval(() => {
  const container = document.getElementById('time');
  container.innerHTML = moment().local().format('DD / MM / YYYY - HH : mm : ss')
}, 1000);

var arrayList = {
  change: true,
  list: [{
    createDate: 'aaaaa',
    priority: 'high',
    name: 'demo 1',
    status: 'done'
  }]
};

function showHideById(id, status) {
  var comp = document.getElementById(id);
  comp.style.display = status;
}

function checkVisibility(id, status) {
  var comp = document.getElementById(id);
  comp.style.visibility = status;
}

function setDisable(id, status) {
  document.getElementById(id).disabled = status;
}

function getname() {
  showHideById('name', 'block');
  const btn = document.getElementById('inp-name');
  btn.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      document.getElementById('set-name').click();
    }
  });
}

function checkerrormessage() {
  if (document.getElementById('inp-name').value === '') {
    showHideById('err-name', 'block');
    checkVisibility('err-name', 'visible')
    return true;
  } else {
    showHideById('err-name', 'none');
    checkVisibility('err-name', 'hidden')
    return false;
  }
}

function setname() {
  if (!checkerrormessage()) {
    showHideById('name', 'none');
    const comp3 = document.getElementById('name-panel');
    comp3.innerHTML = document.getElementById('inp-name').value;
  }
}

function addNew() {
  document.getElementById('mission-input').value = '';
  document.getElementById('priority').value = 'high';
  showHideById('add', 'block');
  setDisable('set-new', true);
}

function getNewMission() {
  const content = document.getElementById('mission-input').value;
  const priority = document.getElementById('priority').value;
  if (content === '' || priority === '') {
    setDisable('set-new', true);
  } else {
    setDisable('set-new', false);
  }
}

function setNew() {
  const content = document.getElementById('mission-input').value;
  const priority = document.getElementById('priority').value;
  generateList(content, priority);
  showHideById('add', 'none')
}

function selected(params) {
  const id = params.htmlFor;
  if (document.getElementById(id)) {
    if (document.getElementById(id).checked) {
      setDisable('done-' + id, false);
      setDisable('del-' + id, false);
    } else {
      setDisable('done-' + id, true);
      setDisable('del-' + id, true);
    }
  }
}

function changeSTT(id) {
  const comp = document.getElementById(id);
  if (comp.classList[0] === 'done-start') {
    comp.classList.remove('done-start');
    comp.classList.add('done-done');
    comp.innerHTML = 'Done';
  } else {
    const newId = id.replace('done-', 'main');
    const newComp = document.getElementById(newId);
    newComp.parentElement.removeChild(newComp);
  }
}

function deleteMission(id) {
  const newId = id.replace('del-', 'main');
  const comp = document.getElementById(newId);
  comp.parentElement.removeChild(comp);
};

function generateList(value, priority) {
  const id = moment().utc().format();
  const mainContent = createElementAndAttribute('div', [
    ['id', 'main' + id]
  ]);
  const label = createElementAndAttribute('label', [
    ['for', id],
    ['class', 'custom-checkbox-container'],
    ['onclick', 'selected(this)']
  ])
  const rowItem = createElementAndAttribute('div', [
    ['class', 'row-item']
  ]);
  const col0 = createElementAndAttribute('div', [
    ['class', 'col-0']
  ]);
  const inputCol0 = createElementAndAttribute('input', [
    ['type', 'checkbox'],
    ['id', id]
  ]);

  const spanCol0 = createElementAndAttribute('span', [
    ['class', 'custom-checkbox']
  ]);
  const imgCol1 = createElementAndAttribute('img', [
    ['src', './check.svg'],
    ['class', 'icon-check']
  ]);
  const col1 = createElementAndAttribute('div', [
    ['class', 'col-1']
  ]);
  const contentCol1 = document.createElement('div');
  contentCol1.setAttribute('class', 'main-mission');
  contentCol1.innerHTML = value;
  const priorityCol1 = document.createElement('div');
  if (priority) {
    priorityCol1.setAttribute('class', 'priority-' + priority);
  }
  const col2 = document.createElement('div');
  col2.setAttribute('class', 'col-2');
  const startCol2 = document.createElement('button');
  startCol2.setAttribute('class', 'done-start');
  startCol2.setAttribute('id', 'done-' + id);
  startCol2.setAttribute('type', 'button');
  startCol2.setAttribute('onclick', 'changeSTT(this.id)');
  startCol2.disabled = true;
  startCol2.innerHTML = 'Start';
  const delCol2 = document.createElement('button');
  delCol2.setAttribute('class', 'done');
  delCol2.setAttribute('id', 'del-' + id);
  delCol2.setAttribute('type', 'button');
  delCol2.setAttribute('onclick', 'deleteMission(this.id)');
  delCol2.disabled = true;
  delCol2.innerHTML = 'Delete';
  col2.appendChild(startCol2);
  col2.appendChild(delCol2);
  col1.appendChild(contentCol1);
  col1.appendChild(priorityCol1);
  spanCol0.appendChild(imgCol1);
  col0.appendChild(inputCol0);
  col0.appendChild(spanCol0);
  rowItem.appendChild(col0);
  rowItem.appendChild(col1);
  rowItem.appendChild(col2);
  label.appendChild(rowItem);
  mainContent.appendChild(label);
  document.getElementById('main').appendChild(mainContent);
}

function generateCol0() {


}

function generateCol1() {

}

function generateCol2() {

}

function createElementAndAttribute(type, attribute) {
  const newElement = document.createElement(type);
  attribute.forEach(item => {
    newElement.setAttribute(item[0], item[1]);
  })
  return newElement;
}