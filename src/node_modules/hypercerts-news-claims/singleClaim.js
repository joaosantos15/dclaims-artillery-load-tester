const uuidv4 = require('uuid/v4')
const HYPERCERTS_NAMESPACE = 'hypercerts-news'
const CLAIM_TYPE = 'single-claim'
const VERSION = '0.0.1'
const W3C_WA_EXAMPLE = require('./w3c-web-annotation-template.js')

exports = module.exports

exports.SingleClaimType = HYPERCERTS_NAMESPACE + '-' + CLAIM_TYPE + '-' + VERSION

/**
* Get an instance of a SingleClaim object
* @param {string} issuerId Ethereum address of the Issuer
* @param {string} articleId ID of the news article
* @param {string} category Category of the classification
* @param {string} freeText Arbitrary text
* @returns {SingleClaim}
*/
exports.SingleClaim = function (issuerId, articleId, category, freeText) {
  this.id = HYPERCERTS_NAMESPACE + '-' + uuidv4()
  this.type = [HYPERCERTS_NAMESPACE + '-' + CLAIM_TYPE + '-' + VERSION]
  this.issuer = issuerId
  this.issued = 'default-yyyy-mm-dd'
  this.claim = new SingleClaimContent(articleId, category, freeText)
  this.signature = new SignatureContent()
  this.revocation = new RevocationContent()
}

function SingleClaimContent (articleId, category, freeText) {
  this.id = articleId
  this.category = category
  // this.freeText = freeText
  this.freeText = W3C_WA_EXAMPLE.getExample()
}

function SignatureContent () {
  this.type = 'default-something'
  this.created = 'default-timestamp'
  this.creator = 'default-someone'
  this.domain = 'default-something'
  this.nonce = 'default-1234'
  this.signatureValue = 'default-signature'
}

function RevocationContent () {
  this.id = 'default-articleId'
  this.type = 'default-SimpleRevocationList2017'
}
