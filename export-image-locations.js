#! /usr/bin/env node

const fs = require('fs')
const fetch = require('node-fetch')
const _ = require('lodash')

const baseUrl = 'http://www.digitalhorizonsonline.org'
const infoUrl = '/digital/api/collections/ndsl-books/items/27499/false'
const getImageUrl = id => `http://www.digitalhorizonsonline.org/digital/api/singleitem/image/ndsl-books/${id}/default.jpg`

const main = () =>
  fetch(`${baseUrl}/${infoUrl}`)
    .then(res => res.json())
    .then(res => _.get(res, 'parent.children'))
    .then(imgData => _.map(imgData, image => `${getImageUrl(image.id)}`))
    .then(locations => new Promise((resolve, reject) => {
      _.forEach(locations, location => fs.appendFileSync('./location-list.dat', `${location}\n`))
      resolve()
    }))

main()
