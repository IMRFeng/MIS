import '../stylesheets/app.css'
import { default as Web3 } from 'web3'

//这里需要添加ABI以及合约的地址
var HospitalRegContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_name","type":"string"},{"name":"_tel","type":"string"},{"name":"_licenceNo","type":"string"},{"name":"_province","type":"string"}],"name":"addNewHospital","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"address"}],"name":"getHospital","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getHospitalCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]);
var HospitalReg = HospitalRegContract.at('0x471c92f915ae766c4964eedc300e5b8ff41e443c')

var accounts
var account

window.App = {
  start: function () {
    var self = this

    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }

      accounts = accs
      account = accounts[0]
      web3.eth.defaultAccount = account
    })
  },
  addNewHospital: function () {
    var self = this

    var name = document.getElementById('name').value
    var tel = document.getElementById('tel').value
    var licenseNo = document.getElementById('licenseNo').value
    var province = document.getElementById('province').value

    HospitalReg.addNewHospital(account, name, tel, licenseNo, province, (err, res) => {
      if (err) {
        console.log(err)
        $('.alert-danger').css('display', 'block')
      } else {
        $('.alert-success').css('display', 'block')
      }
    })
  },

  getHospital: function () {
    // var hospitalAddress = document.getElementById('hospitalAddress')
  }
}

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn('Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask')
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn('No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask');
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
  }

  App.start()
})
