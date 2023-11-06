import React, { useState, useEffect } from "react";
import "./style.css";

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    setIsLoading(true);

    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].title)
      }

      setItems((prev) => {
        let newItems = arr.slice(0, 20).map((item, i) => {
          return {
            id: (new Date().getTime() + i).toString(),
            name: item
          }
        });

        return [...prev, ...newItems];
      });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation: ', error);
    })
    .finally(result => setIsLoading(false))
  }, [])
  
  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.png" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;