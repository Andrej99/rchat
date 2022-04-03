const {
    createHmac,
  } = require('crypto');



class JwtError extends Error{
    constructor(message){
        super(message);
        this.name = "JwtError";
    }
}

function base64_encode(data){
    let buffer = Buffer.from(data).toString("base64");
    buffer =  buffer.split("=")[0]
    let bufferurl = buffer.replace("+", "-").replace("/", "_");
    return bufferurl;
}

function base64_decode(data){
    let base64 = data.replace("-", "+").replace("_", "/");
    let buffer = Buffer.from(data,"base64");
    return buffer.toString("utf8");
}


function sign_jwt(payload,secret,expiresminutes){
    const hmac = createHmac('sha256',secret);
    const header = {"alg": "HS256","typ": "JWT"};
    const expires =  Date.now() + expiresminutes*60000;
    payload.exp = expires;

    base64_header = base64_encode(JSON.stringify(header));
    let base64_payload  = base64_encode(JSON.stringify(payload)); 
    hmac.update(base64_header + "." + base64_payload);
    let signature = hmac.digest("base64")
    let signature_url = signature.split("=")[0];
    signature_url = signature_url.replace("+", "-").replace("/", "_");

    return base64_header + "." + base64_payload + "." + signature_url; 
}

function check_jwt(jwt,secret){
    const hmac = createHmac("sha256",secret);
    let parts = jwt.split(".");

    if (parts.length !== 3){
        throw new JwtError("Invalid token");
    }

    let base64_header, base64_payload,jwt_signature;
    [base64_header,base64_payload,jwt_signature] = parts;
    hmac.update(base64_header + "." + base64_payload);
    let signature = hmac.digest("base64")
    let signature_url = signature.split("=")[0];
    signature_url = signature_url.replace("+", "-").replace("/", "_");

    if (signature_url!==jwt_signature){
        throw new JwtError("Invalid jwt");
    }else{
       
        let headerBuffer = Buffer.from(base64_header,"base64");
        let header = headerBuffer.toString("utf-8");

       
        let payloadBuffer = Buffer.from(base64_payload,"base64");
        let payload = payloadBuffer.toString("utf-8");

        try{
            var parsedPayload = JSON.parse(payload);
        }catch(err){
           throw new JwtError("Invalid token"+err.name);
        }

        try{
            var parsedHeader = JSON.parse(header);
        }catch(err){
            throw new JwtError("Invalid token"+err.name);
        }

        if(!parsedHeader.hasOwnProperty("typ")){
            throw  new JwtError("Invalid token");
        }
	    if(!parsedPayload.hasOwnProperty("exp")){
		    throw new JwtError("Invalid token");
    	}

        if(!parsedHeader.hasOwnProperty("alg")){
            throw new JwtError("Invalid token");
        }

        if (parsedHeader.typ !== "JWT"){
           throw new JwtError("Invalid token");
        }
        const token_date = new Date(parsedPayload.exp);
        const now = new Date();

        if(now >= token_date){
            throw new JwtError("Token expired");
        }   

        return new Array(parsedHeader,parsedPayload);
    }

}

function get_payload(tt){
   
    let parts = tt.split(".");
   

    if (parts.length !== 3){
        throw new JwtError("Invalid token");
    }
    let payload = Buffer.from(parts[1],"base64").toString("utf8");
   
    try{
        var parsedPayload = JSON.parse(payload);
    }catch(err){
        throw new JwtError("Invalid token"+err.name);
    }
    

    return parsedPayload;

}

module.exports = {
    sign_jwt,
    check_jwt,
    get_payload
};