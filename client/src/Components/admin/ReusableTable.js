import React, { Component } from "react";

export class ReusableTable extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <br />
          <br />
          <div className="card mb-3">
            <div className="card-header">
              <i className="fa fa-table" /> {this.props.tableName}
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th style={{"width": "30%"}}>{this.props.firstTh}</th>
                      <th style={{"width": "50%"}}>{this.props.secondTh}</th>
                      <th style={{"width":" 5%"}}>{this.props.thirdTh}</th>
                      <th style={{"width":  "8.33%"}}>{this.props.fourthTh}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>61</td>
                      <td>
                        <button className="btn btn-warning">Details</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Garrett Winters</td>
                      <td>Accountant</td>
                      <td>63</td>
                      <td>
                        <button className="btn btn-warning">Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReusableTable;
