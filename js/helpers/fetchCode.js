const baseURL = window.location.origin + "/data/get";

async function fetchJSX(filePath){
    let x_aff;
    try{
        x_aff = await sendMessageToParentWithResponse("shell()")
        if (!/^\d+-\d+-\d+$/.test(x_aff)) {
            console.error("Invalid X-Affilate format:", x_aff);
            x_aff = "none";
        }
    }catch(err){x_aff="none"}
    const response = await fetch(baseURL,
        {
            headers:
                {
                    "X-Filename": `${filePath}`,
                    "X-Affilate": `${x_aff}`
                }
        });
    if (!response.ok) throw new Error(`Ошибка загрузки: ${filePath}`);

    const base64Jsx = await response.text();  // Получаем Base64

// Decode Base64 string into a binary string
    const binaryString = atob(base64Jsx);

// Convert binary string into byte array
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

// Decode the byte array into a proper string using UTF-8 encoding
    const decodedJsx = new TextDecoder("utf-8").decode(byteArray);

// Send the decoded JSX to the parent window
    window.parent.postMessage({ jsx: decodedJsx }, "*");

    return decodedJsx;
}
