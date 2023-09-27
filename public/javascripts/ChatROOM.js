
// This code is intergrating charroom with lesson page for streamline site,to make
//lesson more focused
//We are going listen to events and send messages between students  send through
//using socket programming

(function(){
    // console.log("Hello..");
    // const DisplayChatRoom = document.querySelector(".DisplayFlex");
    // const socket = io();
    const socket = io();
    // socket = io.connect();
    // let uname;
    
    
    JoinButton = document.querySelector(".JoinButton");
    ExitButton = document.querySelector(".ExitButton")
    SendButton = document.querySelector(".SendButton")
    
    JoinButton.addEventListener("click", function() {
        socket.emit("newuser","Kwena");
        document.querySelector(".chatApplication").classList.add("setChatAppNone");
        
        
        document.querySelector(".chatSection").classList.add("setSection");
		   
    ;})

    ExitButton.addEventListener("click", function() {
        socket.emit("exituser","kwena");
        document.querySelector(".chatSection").classList.remove("setSection");
        console.log("hello")
        document.querySelector(".chatApplication").classList.remove("setChatAppNone");
        // window.location.href = window.location.href;
           
    ;})
    
    SendButton.addEventListener("click", function() {
        
        console.log("Eta");
        let Usermessage = document.querySelector("#message-input").value;
        console.log(Usermessage);
		

        if(Usermessage.length  == 0){
			return;
		}
		renderMessage("my",{
			username:"kwena",
			text:Usermessage
		});
		socket.emit("chat",{
			username:"kwena",
			text:Usermessage
		});
		document.querySelector("#message-input").value = ""; 
           
    ;})

    socket.on("update",function(update){
		renderMessage("update",update);
	});

    socket.on("chat",function(message){
		renderMessage("other",message);
	});

    function renderMessage(type,message){
		
        let messageContainer = document.querySelector(".messages");
		if(type == "my"){
			let el = document.createElement("div");
			el.setAttribute("class","message my-message");
			el.innerHTML = `
				<div>
					<div class="name">You</div>
					<div class="text">${message.text}</div>
				</div>
			`;
			messageContainer.appendChild(el);
		} else if(type == "other"){
			let el = document.createElement("div");
			el.setAttribute("class","message other-message");
			el.innerHTML = `
				<div>
					<div class="name">${message.username}</div>
					<div class="text">${message.text}</div>
				</div>
			`;
			messageContainer.appendChild(el);
		} else if(type == "update"){
			let el = document.createElement("div");
			el.setAttribute("class","update");
			el.innerText = message;
			messageContainer.appendChild(el);
		}
		// scroll chat to end
		messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
	}




})();