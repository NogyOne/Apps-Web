import { helpHttp } from '../helpers/helpHttps.js'

const SHOPS = 'shops.json'
const d = document

const addList = async () => {
  const $template = d.getElementById('carrito-card-template').content,
    $container = d.querySelector('.container-list'),
    $fragment = d.createDocumentFragment()

  const json = await helpHttp().get(SHOPS)
  const cyberpuerta = json[2]

  cyberpuerta.products.slice(600, 610).forEach(el => {
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

const updateQuantity = () => {
  const $btnMinus = d.querySelectorAll('#btn-minus'),
    $btnPlus = d.querySelectorAll('#btn-plus')
  $btnMinus.forEach(el => {
    el.addEventListener('click', () => {
      const $cantidad = el.nextElementSibling
      if ($cantidad.textContent > 1) {
        $cantidad.textContent--
        updatePrice()
      }
    })
  })
  $btnPlus.forEach(el => {
    el.addEventListener('click', () => {
      const $cantidad = el.previousElementSibling
      $cantidad.textContent++
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
    const $cantidad = el.querySelector('.cantidad-item')

    const price = Number($price.replace(/[^0-9\.-]+/g, ''))
    total += price * +$cantidad.textContent
    totalItems += +$cantidad.textContent
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
  const $delete = d.querySelectorAll('#delete-item')
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
updateQuantity()
deleteItem()
noItems()
