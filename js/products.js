import { helpHttp } from '../helpers/helpHttps.js'
import { toast } from 'https://cdn.skypack.dev/wc-toast'

//const ALL_PRODUCTS = 'https://web-scraper.up.railway.app/all'
const SHOPS = 'shops.json'

const d = document

const addList = async () => {
  const $template = d.getElementById('product-template').content,
    $container = d.querySelector('.grid'),
    $fragment = d.createDocumentFragment()

  const json = await helpHttp().get(SHOPS)
  const ddtech = json[1]

  ddtech.products.slice(0, 620).forEach(el => {
    $template.querySelector('.card img').setAttribute('src', el.image)
    $template.querySelector('.card img').setAttribute('alt', el.name)
    $template.querySelector('.page-name').textContent = ddtech.name
    $template.querySelector('.product-title').textContent = el.name
    $template.querySelector('.product-price').textContent = el.price
    if (el.stock) {
      $template.getElementById('stock').src = 'images/con-stock.svg'
      $template.querySelector('.product-stock').classList.add('success')
      $template.getElementById('stock-text').textContent = 'CON EXISTENCIA'
    } else {
      $template.getElementById('stock').src = 'images/sin-stock.svg'
      $template.querySelector('.product-stock').classList.remove('success')
      $template.getElementById('stock-text').textContent = 'SIN EXISTENCIA'
    }

    let $clone = d.importNode($template, true)
    $fragment.appendChild($clone)
  })
  $container.appendChild($fragment)
}

const addToList = () => {
  const $btnAdd = d.querySelectorAll('#btn-add')
  $btnAdd.forEach(el => {
    el.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast('¡Producto agregado con éxito!', {
          icon: {
            type: 'success',
          },
        })
      })
    })
  })
}

await addList()
addToList()
