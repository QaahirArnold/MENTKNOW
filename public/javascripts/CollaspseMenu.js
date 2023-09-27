
//This going is going to make collapseble drop down menu


var coll = document.querySelectorAll("#lessons");
JoinLink = document.querySelector(".JoinLink");
JoinLink2 = document.querySelector(".JoinLink2");
JoinLink3 = document.querySelector(".JoinLink3");



var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {

    
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}


JoinLink.addEventListener("click", function(event) {

    event.preventDefault();
    JoinLink.innerHTML = "Member";
    JoinLink.style.textDecoration = "none";
    

});

JoinLink2.addEventListener("click", function(event) {

  event.preventDefault();
  JoinLink2.innerHTML = "Member";
  JoinLink2.style.textDecoration = "none";
  

});

JoinLink3.addEventListener("click", function(event) {

  event.preventDefault();
  JoinLink3.innerHTML = "Member";
  JoinLink3.style.textDecoration = "none";
  

});

