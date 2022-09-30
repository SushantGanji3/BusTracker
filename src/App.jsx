import "./App.css";
import Busdata from "../public/data.json";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";
import Cryptr from "cryptr";


/*https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd*/

const Bus = (props) => {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleStop = async (event, dragElement) => {
    for (let Beta of Busdata) {
      if (Beta.num == props.num) {
        Beta.x = dragElement.x;
        Beta.y = dragElement.y;
      }
    }
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
      })
      .then(function(result) {

      });
    for (let Beta of Busdata) {
      if (Beta.num == props.num && (Beta.x)) {
        setX(Beta.x);
        setY(Beta.y);
      }
    }
  });

  if (props.page == 2) {
    return (
      <Draggable
        onStop={handleStop}
        position={{ x: x, y: y }}
      >
        <div className="bus">
          <h2>
            {props.num}
          </h2>
        </div>
      </Draggable>
    );
  }
  else {
    return (
      <div className="bus">
        <h2>
          {props.num}
        </h2>
      </div>
    );
  }

}

const BusNums = (props) => {
  const buses = Busdata.map((data) => {
    return (<Bus num={data.num} page={props.page}/>);
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
      <button className="APLoginBtn" onClick={() => props.setPage(1)}>AP Login</button>
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
      <BusNums page={props.page}/>
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

const APLogin = (props) => {
  return (
    <div className="login">
      <div>
        <h1>AP Login</h1>
      </div>
      <div>
        <h3>Enter your AP Pin below:</h3>
      </div>
      <div>
        <input id="APLoginInput" placeholder="PIN"></input>
      </div>
      <div className="APViewDiv">
        <button className="backToHomeBtn" onClick={() => props.setPage(0)}>Back</button>
        <button className="APView" onClick={() =>
          getValueOfLogin() != "" ? props.setPage(2) : borderChange()
        }>
          Enter
        </button>
      </div>



    </div>

  );
};
function getValueOfLogin() {
  let input = document.getElementById("APLoginInput").value;
  return(input);
}
/*
function getEncryptedPass(){
  let Cryptr = require('cryptr'),
    cryptr = new Cryptr("SamuelIsSoPog"); // this is the key lol

  var encryptedString = cryptr.encrypt(getValueOfLogin());

  return encryptedString;
}

function checkPass(){
  let encryptedPass = getEncryptedPass();
  let Cryptr = require('cryptr'),
    cryptr = new Cryptr("SamuelIsSoPog");
  
  let passDecrypted = cryptr.decrypt(encryptedPass);
  console.log(passDecrypted);
  if(passDecrypted === "1234"){
    return "true";
  }
  return "false";
}
*/
function borderChange() {
  document.getElementById("APLoginInput").style.border = "5px solid red";
}

const APLogIn = (props) => {
  //code to enter the AP login pin/password

};


export default function App() {
  const [page, setPage] = useState(0);
  return (
    <div className="App">
      <main>
        {page == 0 ? (
          <div>
            <TitleSection setPage={setPage} />
            <div className="bkgrdImg"> 
              <WaitingArea />
              <LoadingArea />
            </div>
            <UnarrivedArea page={page}/>
            <GoneArea />
          </div>
        )
        :
        page == 1 ? (
          <APLogin setPage={setPage} />
        )
          : (
            <div>
              <TitleSection setPage={setPage} />
              <div className="bkgrdImg"> 
                <WaitingArea />
                <LoadingArea />
              </div>
              <UnarrivedArea page={page}/>
              <GoneArea />
            </div>
          )

        }
      </main>

    </div>
  );
}
