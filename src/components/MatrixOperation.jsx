import React, { useState, useEffect } from "react";

function MatrixOperation() {
  const [rows1, setRows1] = useState(2);
  const [columns1, setColumns1] = useState(2);
  const [rows2, setRows2] = useState(2);
  const [columns2, setColumns2] = useState(2);
  const [matrix1, setMatrix1] = useState(
    Array.from({ length: rows1 }, () =>
      Array.from({ length: columns1 }, () => 0)
    )
  );
  const [matrix2, setMatrix2] = useState(
    Array.from({ length: rows2 }, () =>
      Array.from({ length: columns2 }, () => 0)
    )
  );
  const [result, setResult] = useState(
    Array.from({ length: rows1 }, () =>
      Array.from({ length: columns2 }, () => 0)
    )
  );

  useEffect(() => {
    setMatrix1(
      Array.from({ length: rows1 }, () =>
        Array.from({ length: columns1 }, () => 0)
      )
    );
  }, [rows1, columns1]);

  useEffect(() => {
    setMatrix2(
      Array.from({ length: rows2 }, () =>
        Array.from({ length: columns2 }, () => 0)
      )
    );
  }, [rows2, columns2]);

  const handleInputChange = (e, i, j, isMatrix1) => {
    const newValue = parseInt(e.target.value) || 0;
    if (isMatrix1) {
      setMatrix1((prevMatrix) => {
        const newMatrix = [...prevMatrix];
        newMatrix[i][j] = newValue;
        return newMatrix;
      });
    } else {
      setMatrix2((prevMatrix) => {
        const newMatrix = [...prevMatrix];
        newMatrix[i][j] = newValue;
        return newMatrix;
      });
    }
  };

  const addMatrices = () => {
    const newResult = matrix1.map((row, i) =>
      row.map((val, j) => val + matrix2[i][j])
    );
    setResult(newResult);
  };

  const subtractMatrices = () => {
    const newResult = matrix1.map((row, i) =>
      row.map((val, j) => val - matrix2[i][j])
    );
    setResult(newResult);
  };

  const multiplyMatrices = () => {
    const newResult = Array.from({ length: rows1 }, () =>
      Array.from({ length: columns2 }, () => 0)
    );
    for (let i = 0; i < rows1; i++) {
      for (let j = 0; j < columns2; j++) {
        for (let k = 0; k < columns1; k++) {
          newResult[i][j] += matrix1[i][k] * matrix2[k][j];
        }
      }
    }
    setResult(newResult);
  };

  return (
    <center>
      <div className="container">
        <center>
          <div>
            <h3>Select Matrix size: </h3>
            <label htmlFor="">A: </label>
            <input
              type="number"
              value={rows1}
              onChange={(e) => setRows1(parseInt(e.target.value) || 0)}
              className="input-RC"
            />
            <input
              type="number"
              value={columns1}
              onChange={(e) => setColumns1(parseInt(e.target.value) || 0)}
              className="input-RC"
            />
          </div>
          <div>
            <label htmlFor="">B: </label>
            <input
              type="number"
              value={rows2}
              onChange={(e) => setRows2(parseInt(e.target.value) || 0)}
              className="input-RC"
            />
            <input
              type="number"
              value={columns2}
              onChange={(e) => setColumns2(parseInt(e.target.value) || 0)}
              className="input-RC"
            />
          </div>
          <div>
            <h2 className="font-family">Matrix A</h2>
            {matrix1.map((row, i) => (
              <div key={i}>
                {row.map((val, j) => (
                  <input
                    key={j}
                    type="number"
                    value={val}
                    onChange={(e) => handleInputChange(e, i, j, true)}
                    className="matrix"
                  />
                ))}
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-family">Matrix B</h2>
            {matrix2.map((row, i) => (
              <div key={i}>
                {row.map((val, j) => (
                  <input
                    key={j}
                    type="number"
                    value={val}
                    onChange={(e) => handleInputChange(e, i, j, false)}
                    className="matrix"
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="btn-container">
            <button onClick={addMatrices} className="btn">
              Add
            </button>
            <button onClick={subtractMatrices} className="btn">
              Subtract
            </button>
            <button onClick={multiplyMatrices} className="btn">
              Multiply
            </button>
          </div>
          <div>
            <h2 className="font-family">Result</h2>
            <div className="result-container">
              {result.map((row, i) => (
                <div key={i} className="result">
                  {row.map((val, j) => (
                    <span key={j} className="result-data">
                      {val}{" "}
                    </span>
                  ))}
                  <br />
                </div>
              ))}
            </div>
          </div>
        </center>
      </div>
    </center>
  );
}

export default MatrixOperation;
