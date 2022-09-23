import "./App.css";
import Busdata from "./data.json";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";
import { writeJsonFile } from "write-json-file";
/*
https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

for Bus, 
num is standard/usual number,
status is waiting/loading/not here/left
altNum is the kids got switched to a dif bus ahead of time
replacedNum is when bus broke down on way and need quick switch
*/

const Bus = (props) => {
  
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleStop = async (event, dragElement) => {
    for(let Beta of Busdata) {
      if(Beta.num == props.num) {
        Beta.x = dragElement.x;
        Beta.y = dragElement.y;
      }
    }
    //await writeJsonFile('./data.json', Busdata);
    console.log(Busdata);
    setX(dragElement.x);
    setY(dragElement.y);
  }

  useEffect(() => {
    fetch("data.json", {
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    })
      .then((res) => {
        return res.json();
      });
    for (let Beta of Busdata) {
      if (Beta.num == props.num && (Beta.x)) {
        setX(Beta.x);
        setY(Beta.y);
      }
    }
  });

  
  return (
      <Draggable 
        onStop={handleStop} 
        position={{x: x, y: y}}
        >
        <div className="bus">
          <h2>
            {props.num}
          </h2>
        </div>
      </Draggable>);
}

  
  


const BusNums = (props) => {
  const buses = Busdata.map((data) => {
      return (<Bus num={data.num}/>);
  });

  return (
    <div className="busbank">
      {buses}
    </div>);
};

const TitleSection = (props) => {
  return (
    <div className="title">
      <h1> Reagan HS Bus Tracker</h1>
    </div>
  );
};


const LoadingArea = (props) => {
  return (
    <div className="load">
      <h1>Bus Loading Area</h1>
      <div className="secondLane">
        <h4>Second Lane</h4>
        <div className="emptySpace">Empty Bus Space</div>
      </div>
      
      <div className="divider">
        <h6></h6>
      </div>
      <div className="firstLane">
        <h4>First Lane</h4>
      </div>
    </div>
  );
};

const WaitingArea = (props) => {
  return (
    <div className="wait">
      <h1>Bus Waiting Area</h1>
    </div>
  );
};

const UnarrivedArea = (props) => {
  return (
    <div className="unarrive">
      <h1>Bus Bank</h1>
      <BusNums />
    </div>
    
  );
};

const GoneArea = (props) => {
  return (
    <div className="gone">
      <h1>Left Bus Area</h1>
    </div>
  );
};

const HomePage = (props) => {
  return(
    <div>
      <div>
        <h1>Hyderabad Public Bus Tracking via Department of Busses of Telangana</h1>
      </div>
      <div>
        <button  onClick={() => setPage(1)} >
          Student Login
        </button>
      </div>
      <div>
        <button  onClick={() => setPage(2)} >
          AP Login
        </button>
      </div>
        
    </div>
      
  );
};


const APLogIn = (props) => {
  //code to enter the AP login pin/password
  
};

const APView = (props) => {
  //this is the app view with the dropabble functionality
  return (
    <div>
      <TitleSection />
      <WaitingArea />
      <LoadingArea />
      <UnarrivedArea />
      <GoneArea />
    </div>
  );
};



//apparently you can only have one main div in a return
//but you can have subdivs inside that main div
//ye put everything into one
//also the page that we are working on right now is for the APs?

//yashas use this const for the ternary statement
//setPage -> 1 when button is pressed to go to main page 
//setPage -> 2 when button is pressed to go to AP Login page got it



//Yashas creata nested ternary statment
//const [ page, setPage ] = useState(0);

export default function App() {
  return (
    <div className="App">
      <main>
        {
          //page == 0 ? <StudentView /> : page == 1 ? <APLogIn /> : <APView />
        }
        <APView />  
      </main>

    </div>
  );
}
