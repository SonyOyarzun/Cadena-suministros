const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:9985/api/v1/streams/valid_transactions')

ws.on('open', () => {
        console.log("CONNECTED")
});

ws.on('message', (data) => {
        let json = JSON.parse(data)
        console.log("\nTransactionId: ", json.transaction_id)
        console.log("AssetId: ", json.asset_id)
        console.log("BlockId: ", json.block_id)
});

////////////////////////////////////////////////////////////////////////


ws = new WebSocket('ws://test.ipdb.io/api/v1/assets/?search=2016-01-01')

componentDidMount() {
    this.ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected')
    }

    this.ws.onmessage = evt => {
    // listen to data sent from the websocket server
    const message = JSON.parse(evt.data)
    this.setState({dataFromServer: message})
    console.log(message)
    }

    this.ws.onclose = () => {
    console.log('disconnected')
    // automatically try to reconnect on connection loss

    }
}