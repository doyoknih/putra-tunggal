import { MidtransClient } from 'midtrans-node-client';

const midtrans = new MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    
});

export default midtrans;