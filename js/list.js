import { helpHttp } from '../helpers/helpHttps.js'

const SHOPS = 'shops.json'
const d = document

const addList = async () => {
  const $template = d.getElementById('carrito-card-template').content,
    $container = d.querySelector('.container-list'),
    $fragment = d.createDocumentFragment()

  const json = await helpHttp().get(SHOPS)
  const cyberpuerta = json[2]

  cyberpuerta.products.slice(400, 410).forEach(el => {
    $template.querySelector('.list-card img').setAttribute('src', el.image)
    $template.querySelector('.list-card img').setAttribute('alt', el.name)
    $template.querySelector('.page-name').textContent = cyberpuerta.name
    $template.querySelector('.product-title').textContent = el.name
    $template.querySelector('.product-price').textContent = el.price

    let $clone = d.importNode($template, true)
    $fragment.appendChild($clone)
  })
  $container.appendChild($fragment)
}

const updateSelects = () => {
  const $select = d.querySelectorAll('#cantidad-select')
  $select.forEach(el => {
    el.addEventListener('change', e => {
      updatePrice()
    })
  })
}

const updatePrice = () => {
  const $total = d.getElementById('total-list'),
    $totalItems = d.getElementById('total-products-list')
  let total = 0,
    totalItems = 0
  d.querySelectorAll('.list-card').forEach(el => {
    const $price = el.querySelector('.product-price').textContent.slice(1)
    const $input = el.querySelector('#cantidad-select')
    const price = Number($price.replace(/[^0-9\.-]+/g, ''))
    total += price * +$input.value
    totalItems += +$input.value
  })

  $totalItems.textContent = 'Productos: ' + totalItems
  $total.textContent =
    'Total: ' +
    total.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
    })
}

const deleteItem = () => {
  const $delete = d.querySelectorAll('.delete-item')
  $delete.forEach(el => {
    el.addEventListener('click', e => {
      e.target.parentElement.parentElement.parentElement.parentElement.remove()
      updatePrice()
      noItems()
    })
  })
}

const noItems = () => {
  const $cards = d.querySelectorAll('.list-card'),
    $noItems = d.querySelector('.no-items')
  if ($cards.length === 0) {
    $noItems.classList.remove('none')
  } else {
    $noItems.classList.add('none')
  }
}

await addList()
updatePrice()
updateSelects()
deleteItem()
noItems()
