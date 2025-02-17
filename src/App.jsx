import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [arr, setArr] = useState(["050", "", "", "", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const inputRefs = useRef([]);

  function setValueToArray(value, index) {
    if (index === 0) {
      setArr((prevArr) => {
        const newArr = [...prevArr];
        newArr[index] = value;
        return newArr;
      });
    } else {
      if (/^[0-9*]{0,1}$/.test(value)) {
        setArr((prevArr) => {
          const newArr = [...prevArr];
          newArr[index] = value;
          return newArr;
        });

        // If the value is not empty and the input is valid, move to the next input
        if (value && inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        } else if (value.length === 0 && inputRefs.current[index - 1]) {
          // If the length is 0 (i.e., the user deleted the input), move to the previous input
          inputRefs.current[index - 1].focus();
        }
      }
    }
  }

  function setValueToResult(value, index) {
    setResult((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = value;
      return newArr;
    });
  }

  function search() {
    const starCount = arr.filter((element) => element === "*").length;
    if (starCount>=1 && starCount < 3) {
      toast.error("Minimum 3 * olmalıdır!");
      return;
    }

    setResult([]);
    check();
  }

  function reset() {
    setResult([]);
    setArr(["050", "", "", "", "", "", "", ""]);
  }

  function check() {
    let temArr = [];
    arr.map(function (element) {
      if (element === "*") {
        temArr.push("same");
      } else if (element === "") {
        temArr.push("-");
      } else {
        temArr.push(element);
      }
    });
    generate(temArr);
  }

  function generate(arr) {
    let tempArr = arr;
    let i = 0;
    let k = 0;
    let checkingArray = [];
    while (k <= 5) {
      tempArr = [];
      let sameValue = i % 10;
      arr.map(function (element, index) {
        if (element === "same") {
          if (arr.every(function (value) { return Number(value) !== i })) {
            ///
          } else {
            for (let j = i; j <= 9; j++) {
              if (arr.every(function (value) { return Number(value) !== j })) {
                sameValue = j;
                break;
              }
            }
          }
          tempArr[index] = sameValue;
        } else if (element === "-") {
          let rand = Math.floor(Math.random() * 9);
          if (rand === i) {
            tempArr[index] = rand + 1;
          } else {
            tempArr[index] = rand;
          }
        } else {
          tempArr[index] = element;
        }
      });
      if (i === 0) {
        checkingArray.push(tempArr.toString().replaceAll(",", ""));
        setValueToResult(tempArr.toString().replaceAll(",", ""), k);
        k++;
      } else {
        if (k <= 5) {
          if (!checkingArray.includes(tempArr.toString().replaceAll(",", ""))) {
            checkingArray.push(tempArr.toString().replaceAll(",", ""));
            setValueToResult(tempArr.toString().replaceAll(",", ""), k);
            k++;
          }
        }
      }
      i++;
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="inner-container">
          {arr.map((element, index) => {
            if (index === 0) {
              return (
                <select
                  key={index}
                  value={element}
                  onChange={(event) =>
                    setValueToArray(event.target.value, index)
                  }
                >
                  <option value="010">010</option>
                  <option value="050">050</option>
                  <option value="055">055</option>
                  <option value="070">070</option>
                  <option value="077">077</option>
                </select>
              );
            }
          })}
          <div className="group-container">
            {arr.map((element, index) => {
              if (index >= 1 && index <= 3) {
                return (
                  <input
                    key={index}
                    value={element}
                    type="text"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(event) =>
                      setValueToArray(event.target.value, index)
                    }
                  />
                );
              }
            })}
          </div>
          <div className="group-container">
            {arr.map((element, index) => {
              if (index >= 4 && index <= 5) {
                return (
                  <input
                    key={index}
                    value={element}
                    type="text"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(event) =>
                      setValueToArray(event.target.value, index)
                    }
                  />
                );
              }
            })}
          </div>
          <div className="group-container">
            {arr.map((element, index) => {
              if (index >= 6 && index <= 7) {
                return (
                  <input
                    key={index}
                    value={element}
                    type="text"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(event) =>
                      setValueToArray(event.target.value, index)
                    }
                  />
                );
              }
            })}
          </div>
          <button onClick={search}>Axtar</button>
          <button onClick={reset}>Sıfırla</button>
        </div>
      </div>
      <div className="result">
        <h2>UYĞUN NÖMRƏLƏR</h2>
        <ol type="none">
          {result.map((element, index) => {
            return (
              <li key={index}>
                {index + 1}. {element}
              </li>
            );
          })}
        </ol>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
