import { helpHttp } from '../helpers/helpHttps.js'

const SHOPS = 'shops.json'

const d = document,
  $template = d.getElementById('carrito-card-template').content,
  $container = d.querySelector('.container-list'),
  $fragment = d.createDocumentFragment()

const json = await helpHttp().get(SHOPS)
console.log(json)
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
