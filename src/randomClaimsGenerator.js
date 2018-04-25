const HypercertsNewsClaims = require('hypercerts-news-claims')
var randomstring = require('randomstring')
const STATIC_TOPIC = randomstring.generate({length: 64, charset: 'hex'})
exports = module.exports

exports.generateMultiple = function (number) {
  let claims = []
  for (let i = 0; i < number; i++) {
    let issuerId = generateUserId()
    let articleId = generateArticleId()
    let category = generateCategory()
    // let freeText = generateFreeText()
    let freeText = ''
    let currClaim = new HypercertsNewsClaims.SingleClaim(issuerId, articleId, category, freeText)
    currClaim.signature.SignatureValue = generateMockSignature()

    claims.push(currClaim)
  }

  return claims
}

exports.generateStaticTopic = function () {
  let issuerId = generateUserId()
  // let articleId = generateArticleId()
  let articleId = STATIC_TOPIC
  let category = generateCategory()
  let freeText = generateFreeText()
  let currClaim = new HypercertsNewsClaims.SingleClaim(issuerId, articleId, category, freeText)
  currClaim.signature.SignatureValue = generateMockSignature()
  return currClaim
}

exports.generateOne = function () {
  let issuerId = generateUserId()
  let articleId = generateArticleId()
  let category = generateCategory()
  let freeText = generateFreeText()
  let currClaim = new HypercertsNewsClaims.SingleClaim(issuerId, articleId, category, freeText)
  currClaim.signature.SignatureValue = generateMockSignature()
  return currClaim
}

function generateUserId () {
  return '0x' + randomstring.generate({length: 40, charset: 'hex'})
}

function generateArticleId () {
  return randomstring.generate({length: 64, charset: 'hex'})
}

function generateCategory () {
  let categories = ['Fake News', 'Satire', 'Extreme Bias', 'Conspiracy Theory', 'State News', 'Junk Science', 'Clickbait']

  return categories[ Math.floor(Math.random() * 7) - 1]
}

function generateFreeText () {
  let size = Math.floor(Math.random() * 280) - 10

  return randomstring.generate({length: size, charset: 'alphabetic'})
}

function generateMockSignature () {
  return '0x' + randomstring.generate({length: 132, charset: 'hex'})
}
