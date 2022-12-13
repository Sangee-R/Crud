import { useState } from "react";

function App() {
  let [data, updata] = useState([]);
  let [show, setShow] = useState(false);
  let [inp, setinp] = useState({ val: "", ind: "" });
  function add_data(e) {
    e.preventDefault();
    var x = e.target.term.value.trim();
    x && updata((old) => [...old, x]);
    e.target.reset();
  }
  function update_data(e) {
    e.preventDefault();
    let y = inp.val.trim();
    y &&
      updata((old) => {
        old[inp.ind] = y;
        return old;
      });
    setinp({ val: "", ind: "" });
    setShow(false);
  }
  function edit(ind) {
    setShow(true);
    setinp({ val: data[ind], ind: ind });
  }
  function chinp(e) {
    setinp((old) => {
      return { val: e.target.value, ind: old.ind };
    });
  }
  function del(ind) {
    updata((old) => {
      return old.filter((val, index) => {
        return ind !== index;
      });
    });
  }
  function get_data(val, ind) {
    return (
      <tr key={ind}>
        <td>{ind}</td>
        <td>{val}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => {
              edit(ind);
            }}
          >
            <i class="bi bi-pencil-square"></i>
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              del(ind);
            }}
          >
            <i class="bi bi-x"></i>
          </button>
        </td>
      </tr>
    );
  }
  return (
    <div className="container box">
      <h1>CRUD</h1>
      <nav className="navbar ">
        <div className="container">
          <form autoComplete="off" className="d-flex mb-2" onSubmit={add_data}>
            <input
              className="form-control me-2"
              name="term"
              type="search"
              placeholder="Add item"
            />
            <button className="btn btn-success" type="submit">
              <i class="bi bi-plus-circle"></i>
            </button>
          </form>
          {show && (
            <form autoComplete="off" className="d-flex" onSubmit={update_data}>
              <input
                className="form-control me-2"
                name="term"
                type="search"
                value={inp.val}
                onChange={chinp}
                placeholder="Update data"
              />
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </form>
          )}
        </div>
      </nav>
      <table className="table text-center table-hover text-capitalize">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ? (
            data.map(get_data)
          ) : (
            <tr>
              <td colSpan="4">no records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default App;
