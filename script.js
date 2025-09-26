const task_field = document.getElementById('task_field');
const task_list = document.getElementById('task_list');
const filterButtons = document.querySelectorAll('.filter_btn');

function addtask() {
  if (!task_field.value.trim()) {
    alert("Enter a valid task!");
    return;
  }

  const li = document.createElement('li');
  li.textContent = task_field.value;
  li.dataset.status = 'pending'; // default status
  task_list.appendChild(li);

  const span = document.createElement('span');
  span.innerHTML = '\u00d7';
  li.appendChild(span);

  task_field.value = "";
  savedata();
}

task_list.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');

    if (e.target.classList.contains('checked')) {
      e.target.dataset.status = 'completed';
    } else {
      e.target.dataset.status = 'pending';
    }

    savedata();
  }

  if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    savedata();
  }
});

const savedata = () => localStorage.setItem('data', task_list.innerHTML);
const showtask = () => task_list.innerHTML = localStorage.getItem('data') || '';
showtask();

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove('active'); // remove active
    });
    button.classList.add('active'); // add active

    const filter = button.dataset.filter;
    task_list.querySelectorAll('li').forEach(function (task) {
      const status = task.dataset.status;

      if (filter === 'all') {
        task.style.display = 'flex';
      } else if (filter === 'pending' && status === 'pending') {
        task.style.display = 'flex';
      } else if (filter === 'completed' && status === 'completed') {
        task.style.display = 'flex';
      } else {
        task.style.display = 'none';
      }
    });
  });
});

task_field.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') { // check if Enter key is pressed
    addtask();            
  }
});
