import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, deleteLead } from "../../actions/leads";

export class Leads extends Component {
  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleMatch = this.handleMatch.bind(this);
    this.state = {bestMatch: []};
  }

  handleMatch() {
    let lead_scores = this.props.leads.map((lead) => {
        lead.smoke == true ? lead.smoke = 1 : lead.smoke = 0;
        lead.alcohol == true ? lead.alcohol = 1 : lead.alcohol = 0;
        return lead;
    });

    let scores = [];
    for(let i = 0; i < lead_scores.length; i++){
      for(let j = 0; j < lead_scores.length; j++){
        if(i==j)
          scores.push(99);
        else {
          scores.push(Math.abs(lead_scores[i].alcohol - lead_scores[j].alcohol) 
                + Math.abs(lead_scores[i].smoke - lead_scores[j].smoke));
        }
      }
    }

    let bestMatches = [];
    for(let i = 0; i < lead_scores.length; i++){
      let indexOfMinValue = scores.slice(i*lead_scores.length,i*lead_scores.length+lead_scores.length).indexOf(Math.min(...scores.slice(i*lead_scores.length,i*lead_scores.length+lead_scores.length)));
      // console.log(...scores.slice(i*4,i*4+4));
      // console.log(Math.min(...scores.slice(i*4,i*4+4)));
      bestMatches.push(lead_scores[indexOfMinValue]);
    }

    console.log(bestMatches);

    this.setState({
      bestMatch: bestMatches
    });
  }

  componentDidMount() {
    this.props.getLeads();
  }

  render() {
    let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);
    return (
      <Fragment>
        <h2>My response</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Smoker</th>
              <th>Drinker</th>
              <th>Message</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.smoke.toString()}</td>
                <td>{lead.alcohol.toString()}</td>
                <td>{lead.message}</td>
                <td>
                  <button
                    onClick={this.props.deleteLead.bind(this, lead.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="matchButton">
            <button className="btn btn-danger btn-sm" onClick={this.handleMatch}>
              Run Roommate Matcher
            </button>
        </div>
        <div className="matchResults">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Best Match</th>
                </tr>
              </thead>
              <tbody>
                {this.state.bestMatch.length > 0 && zip(this.state.bestMatch,this.props.leads).map(lead => (
                  <tr key={lead[1].id}>
                    <td>{lead[1].name}</td>
                    <td>{lead[0].name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads.leads
});

export default connect(
  mapStateToProps,
  { getLeads, deleteLead }
)(Leads);
