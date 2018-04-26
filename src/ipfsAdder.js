const HypercertsCore = require('hypercerts-core')
const RandomClaimGenerator = require('./randomClaimsGenerator')
var fs = require('fs')

var ipfsAPI = require('ipfs-api')

// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values

let NUMBER = 1000
var results = []
var ipfsLinks = []

async function issue () {
  for (let i = 0; i < NUMBER; i++) {
    let claim = RandomClaimGenerator.generateStaticTopic()
    if (i % 500 == 0) {
      // await getRepoSize(i)
    }
    await addToIPFS(claim)
    console.log(i)
  }
  // printRes()
  saveFile()
}

function getRepoSize (value) {
  return new Promise(function (resolve, reject) {
    let currItem = {}
    ipfs.repo.stat((err, stats) => {
      currItem.size = parseInt(stats.repoSize)
      currItem.index = value
      results.push(currItem)
      resolve()
    })
  })
}

function printRes () {
  for (let i = 0; i < results.length; i++) {
    console.log(results[i].index + '  ' + results[i].size)
  }
}

function addToIPFS (item) {
  return new Promise(function (resolve, reject) {
    HypercertsCore.addClaimToIPFS(item).then(val => {
      ipfsLinks.push(val)
      resolve()
    })
  })
}

function saveFile () {
  fs.writeFile('./generatedFiles/file' + Math.random() + '.json', JSON.stringify(ipfsLinks), function (err) {
    if (err) { console.log(err) } else { console.log('saved, bye..') }
  })
}

issue()
