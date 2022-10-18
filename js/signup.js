const d = document,
  $modal = d.getElementById('signup-modal'),
  $close = d.querySelector('.modal-close'),
  $container = d.querySelector('.modal-container'),
  $open = d.getElementById('signup-open')

d.addEventListener('click', e => {
  if (e.target === $open) {
    $modal.classList.add('is-open')
  }

  if (e.target === $close || e.target === $modal) {
    $modal.classList.remove('is-open')
  }
})
