//This Class is going to measure the metrics,which are number of clicks ,time spent,
//interaction in the lessonpage

//Using timer to measure the time student opens page and closes it
//for Every Student interaction with the system we send the information to the 
//database

let countPdfClicks = 0;
let WhiteBoardClicks = 0;
let videoClicks = 0;
let isActive = true;
let startTime;
let totalTime = 0;
let pageVisited = 0;

pdFile = document.querySelector('#pdFile');

SectionEleemnt = document.querySelector('.LessonPageSectionFlex');
pageNumber = SectionEleemnt.getAttribute("id");


pdFile.addEventListener("click", function(req, res) {
    countPdfClicks=1;
    SendToDataBase("pdFileClick");

;});




window.addEventListener('blur', function () {
    window.setTimeout(function () {
        
            if (document.activeElement == document.querySelector('#whiteboard_team') ) {
                WhiteBoardClicks=1;
                SendToDataBase("BoardClick");
                isActive =true;
                event.preventDefault();
            }else if(document.activeElement == document.querySelector('#myIFrame')){
                videoClicks=1;
                SendToDataBase("VideoClick");
            }
            window.focus();
        
    }, 0);
});


// function to start tracking time
function startTrackingTime() {
  isActive = true;
  startTime = Date.now();
  trackTime();
}

// function to stop tracking time
function stopTrackingTime() {
  isActive = false;
  totalTime += Date.now() - startTime;
}

// function to track time
function trackTime() {
  if (isActive) {
    totalTime += Date.now() - startTime;
    startTime = Date.now();
  }
}

// start tracking time on page load
startTrackingTime();

// track time when user switches tabs
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'hidden') {
    stopTrackingTime();
  } else {
    startTrackingTime();
  }
});

// track time when user minimizes window
window.addEventListener("blur", function() {
  stopTrackingTime();
});

window.addEventListener("focus", function() {
  startTrackingTime();
});

// get total time spent on page
window.setInterval(function() {
  trackTime();
  // console.log("Total time spent on page: " + totalTime / 1000 + " seconds");
  // document.querySelector('#time').innerHTML = totalTime / 1000 ;
}, 1000);

// track time when user closes the window
window.addEventListener("beforeunload", function() {
  stopTrackingTime();
  console.log("Total time spent on page: " + totalTime / 1000 + " seconds");
  SendToDataBase("beforeunload");
            
  


});

const SendToDataBase = async function (element){
    try {
        let payload = {
                    countPdfClicks: countPdfClicks,
                    videoClicks: videoClicks,
                    WhiteBoardClicks: WhiteBoardClicks,
                    pageNumber:pageNumber,
                    timeSpent:totalTime/1000,
                    ElementName: element
                    };
        
                    let config = { headers: {'Content-Type': 'application/x-www-form-urlencoded',} }

        const res = await axios.post(`http://localhost:3000/UpdateDateBase`,payload,config);
        
    } catch (e) {
        console.log("ERROR", e);
    }
};








