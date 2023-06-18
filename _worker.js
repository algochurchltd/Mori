const cleanIPPerOperator = {
  All: ["All1.friusmo.cloud", "All2.friusmo.cloud", "All3.friusmo.cloud", "All4.friusmo.cloud", "All5.friusmo.cloud", "All6.friusmo.cloud", "All7.friusmo.cloud", "All8.friusmo.cloud", "All9.friusmo.cloud"],
  MCI: ['hamrah.friusmo.cloud', 'hamrah2.friusmo.cloud', 'hamrah3.friusmo.cloud', 'Hamrah-variable.friusmo.cloud', 'Hamrah-variable2.friusmo.cloud'],
  IRC: ['cell.friusmo.cloud', 'cell2.friusmo.cloud', 'cell3.friusmo.cloud', 'mtn-ir.friusmo.cloud'],
  IRC: ['ask.ircf.space', 'rsp.ircf.space', 'afn.ircf.space', 'arx.ircf.space', 'smt.ircf.space', 'shm.ircf.space', 'fnv.ircf.space', 'dbn.ircf.space', 'apt.ircf.space', 'fnp.ircf.space', 'ryn.ircf.space'],
  RE3: ['isegaro.ddns.net'],
  AST: ['asia.friusmo.cloud', 'asia2.friusmo.cloud'],
  HWB: ['hw.friusmo.cloud', 'hw2.friusmo.cloud'],
  MBT: ['mobi2.friusmo.cloud'],
  MKB: ['mokh.friusmo.cloud', 'mokh2.friusmo.cloud', 'mokhx.friusmo.cloud'],
  PRS: ['parso2.friusmo.cloud'],
  RTL: ['rig.friusmo.cloud', 'rig2.friusmo.cloud'],
  SHT: ['sht2.friusmo.cloud'],
  ZTL: ['zite2.friusmo.cloud'],
  PSH: ['pishgam2.friusmo.cloud'],
  REZ: ['custom1.friusmo.cloud', 'custom2.friusmo.cloud', 'custom3.friusmo.cloud']  
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const sni = url.pathname.split('/')[1]
    const port = url.pathname.split('/')[2]
    const path = url.pathname.split('/')[3]
    const uuid = url.pathname.split('/')[4]
    const vlessLinkBase = 'vless://UUID@'
    const config = '?encryption=none&security=tls&type=ws&fp=randomized&alpn=h2' //http%2F1.1

    let responseText = ''
    for (const operator in cleanIPPerOperator) {
      for (const host of cleanIPPerOperator[operator]) {
        const newVlessLink = vlessLinkBase.replace('UUID', uuid) +
          host + ':' + port + config + `&sni=${sni}` + `&host=${sni}` + `&path=%2F${path}` + "#" + sni.split('.')[0] + "-" + host.split('.')[0]
        responseText += newVlessLink + '\n'
      }
    }
    const newVlessLink = vlessLinkBase.replace('UUID', uuid) +
          sni + ':' + port + config + `&sni=${sni}` + `&host=${sni}` + `&path=%2F${path}` + "#" + sni.split('.')[0] + "-" + "Orig"
    responseText += newVlessLink + '\n'

    return new Response(responseText, { status: 200 })
  }
}
