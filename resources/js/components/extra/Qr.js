import React, { useEffect, useState } from 'react';
import QRcodeReact, { qrcode } from 'qr-code-react';

// Inside a react component:

export default function QR(){

  return (
    <div className="App">
      <QRcodeReact
        className="LOL"
        value="Hello World!"
        margin={40}
        size={10}
        codeType={4}
        errorLevel="M"
        color="#000000"
        bgColor="#FFFFFF"
      />
    </div>
  );

}

// Or just use the original code:

/*
let qr = qrcode(4, 'M');
qr.addData("Hello World!");
qr.make();

qr.createImgTag(4);    // creates an <img> tag as text
qr.createTableTag(4);  // creates a <table> tag as text

*/