const crypto = require('crypto');
const Jwt = require('./jwt');

//TODO Add database
class Data{
    constructor(){
        this.users = [{username:"test",password:"test"},{username:"someone",password:"pass"}];
        this.loggedOn = [];

        this.channels = [];
    }

    getChannels(){
        return this.channels.map((channel) => {return {id: channel.id, name: channel.name}});
      }

      getMessages(chname){
        
        let m = this.channels.find((elem) => elem.name === chname);
       
        if(m===undefined){
          return [];
        }
      
        return m.messages;
      }

      addMessage(msg){
        let i = this.channels.findIndex((elem) => elem.name === msg.channel);
        this.channels[i].messages.push(msg);

      }
      
    addUserChannel(name){
        var lid = 0;
        if (this.channels.length > 0){
          lid = this.channels.slice(-1)[0].id + 1;
        }
        this.channels.push({id:lid, name: name, messages: []});
    }
    
    setChannel(channel,name){
        let user = this.loggedOn.findIndex(d => d.user === name);
        this.loggedOn[user].channel = channel;

    }

    getUserChannel(name){
        let user = this.loggedOn.findIndex(d => d.user === name);
        
        return this.loggedOn[user].channel;
    }

    removeChannel(name){
        this.channels.splice(this.channels.findIndex((ch) => ch.name === name));
    }

    checkPassword(username,password){
        const user = this.users.find(d =>d.username===username);
        console.log(user);
        if (user === undefined){
            return false;
        }

        if(user.password !==password){
            return false;
        }
        return true;

    }

    clearUser(username){
        this.loggedOn.splice(this.loggedOn.findIndex(h => h.user === username));
    }

    setSecret(username){
        const user = this.loggedOn.findIndex(d =>d.username===username);
        const secret = crypto.randomBytes(64).toString("hex");

        if (user === -1){
            this.loggedOn.push({user:username,secret:secret,channel:""});
        }else{
            
            this.loggedOn[user].secret = secret;
        }

        return {token: Jwt.sign_jwt({"user":username},secret,30)};
    }

    checkToken(jwt){
        let token;
        try{
            token = Jwt.get_payload(jwt);
        }catch(err){
            return undefined;
        }
        
     

        if(!token.user){
            return undefined;
        }
        console.log(this.loggedOn);
        const user = this.loggedOn.find(d =>d.user === token.user);
        
        if (user=== undefined){
            return undefined; 
        }
        let checked;
        try{
             checked = Jwt.check_jwt(jwt,user.secret);
        }catch(err){
            
            return undefined;
        }
        
     

        return checked;
    }

}

class DataInstance{

    constructor(){
        if(!DataInstance.instance){
            DataInstance.instance = new Data();
        }

    }

    getInstance(){
        return DataInstance.instance;
    }

}

module.exports = DataInstance;