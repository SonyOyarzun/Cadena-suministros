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