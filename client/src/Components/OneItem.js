import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
export class OneItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null
    };
  }
  componentWillMount() {
    axios
      .get(
        process.env.REACT_APP_BACKEND +
          "/api/itembySeqId/" +
          this.props.match.params.id
      )
      .then(item => {
        this.setState({ item: item.data });
      });
  }
  render() {
    const { item } = this.state;
    return this.state.item ? (
      <div class="container min-height mt-5 p-4">
        <h1 class="my-4">
          {item.name}
          <small style={{ fontSize: 20, fontWeight: "500" }}>
            {" "}
            by <span className="network">Restart.</span>
            <span>Network</span>
          </small>
        </h1>

        <div class="row">
          <div class="col-md-8">
            <img
              class="img-fluid"
              src={`${process.env.REACT_APP_BACKEND}/uploads/${item.imgUrl}`}
              alt=""
            />
          </div>

          <div class="col-md-4">
            <h3 style={{ fontWeight: "bold" }} class="my-4">
              {item.price} <span className="network">One</span>Coin
            </h3>
            <p id='descriptionInDetails' className="text-justify">
              {item.longDesc.split("\n").map((item, key) => {
                return (
                  <span key={key}>
                   {item}
                   <br/>
                  </span>
                );
              })}
            </p>
            <ul>
              <li>{item.sold} times sold.</li>
            </ul>
            <br/><br/>
            <Link className="btn btn-warning" to={"/item/order/"+item.seqId}>
              Order
            </Link>{" "}
            <br />
            <br />
            <button
              onClick={() => {
                this.props.history.goBack();
              }}
              className="btn btn-info"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default OneItem;
