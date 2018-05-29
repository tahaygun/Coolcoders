import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

class Allitems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    };
  }
  getAllItems = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allitems`)
      .then(items => {
        this.setState({ items: items.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getAllItems();
  }

  render() {
    return this.state.items ? (
      <div className="container p-5 mt-5 min-height">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="display-4 shadow p-3 mb-5 bg-primary rounded">
              Our Products
            </h2>
          </div>
          {this.state.items.map((item, key) => {
            return (
              <div key={key} className="col-lg-4 col-sm-6 text-center mb-4">
                <div style={{minHeight:150}} >
                  <img
                    className="rounded-circle shadow img-fluid d-block mx-auto"
                    min-width="150px"
                    min-height="150px"
                    width="150px"
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${
                      item.imgUrl
                    }`}
                    alt="itempic"
                  />
                </div>
                <h3>
                  {item.name} <br />
                  <small style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {item.price} OneCoin
                  </small>
                </h3>
                <p>{item.shortDesc}</p>
                <Link
                  className="btn btn-sm btn-info"
                  to={"/item/details/" + item.seqId}
                >
                  Details
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default Allitems;
