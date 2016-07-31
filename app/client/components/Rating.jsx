import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

import {ButtonHover} from './ButtonHover.jsx';
import {RatingsStore} from '../stores/RatingsStore.js';
import {ReviewOrderStore} from '../stores/ReviewOrderStore.js';
import {ReviewActions} from '../actions/ReviewActions.js';
const Slider = require('react-slick');

export const Rating = React.createClass({
  getInitialState: function () {
    return {
      ratings: RatingsStore.getRatings(),
      reviewOrder: ReviewOrderStore.getOrder(),
      rating: 5,
      reviewText: ''
    };
  },
  componentDidMount: function () {
    RatingsStore.addChangeListener(() => this.setState({ratings: RatingsStore.getRatings()}));
    ReviewOrderStore.addChangeListener(() => this.setState({reviewOrder: ReviewOrderStore.getOrder()}));
  },
  componentWillUnmount: function () {
    RatingsStore.addChangeListener(() => this.setState({ratings: RatingsStore.getRatings()}));
    ReviewOrderStore.addChangeListener(() => this.setState({reviewOrder: ReviewOrderStore.getOrder()}));
  },
  handleChangeRating: function (e, index, value) {
    this.setState({rating: value});
  },
  handleReviewTextChange: function (e, value) {
    this.setState({reviewText: value});
  },
  handleSaveClientReview: function () {
    if (!this.state.reviewText) {
      this.refs.reviewTextInput.focus();
    } else {
      ReviewActions.AddReview({rating: this.state.rating, text: this.state.reviewText});
      this.setState({
        rating: 5,
        reviewText: ''
      });
    }
  },
  handleShowMore: function () {
    document.getElementsByClassName('slick-next')[0].click();
  },
  render: function () {
    const loading = <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><CircularProgress
      color={'#f0256d'} size={1.5}/></div>;

    let reviews = [];
    let k = 500;

    if (this.state.ratings.ratings === null) {
      reviews = <div>{loading}</div>;
    } else {
      this.state.ratings.ratings.map((r) => {
        reviews.push(<div key={k++} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
          <img src={`./images/stars-${r.rating}.png`} style={{height: '24px'}}/>
          <h2 style={{fontSize: '25px', fontWeight: 700, color: '#000'}}>"{r.comment}"</h2>
        </div>);
      });
    }

    return <div id="enjoy" className="rating"
                style={{flex: 1,
                  backgroundColor: '#f3f6f7',
                  borderTop: '3px solid #dfe0df',
                  borderBottom: '3px solid #dfe0df',
                  display: 'flex',
                  justifyContent: 'center'}}>
      <div style={{maxWidth: '1120px', flex: 1}}>
        {(this.state.ratings.ratings !== null) ?
          <div style={{display: 'flex', justifyContent: 'center', margin: '85px 0'}}>
            {(this.state.reviewOrder !== null) ? <div>
              <div style={{display: 'flex'}}>
                <div style={{color: '#000000', fontSize: '23px', fontWeight: 500, width: '200px'}}>
                  Your rating:
                </div>
                <div>
                  <SelectField value={this.state.rating} onChange={this.handleChangeRating}
                               underlineStyle={{borderWidth: '2px', borderColor: '#010101'}}
                               iconStyle={{fill: '#010101'}}
                               style={{fontWeight: 600, fontSize: '18px'}}>
                    <MenuItem value={1} primaryText="1 star"/>
                    <MenuItem value={2} primaryText="2 stars"/>
                    <MenuItem value={3} primaryText="3 stars"/>
                    <MenuItem value={4} primaryText="4 stars"/>
                    <MenuItem value={5} primaryText="5 stars"/>
                  </SelectField>
                </div>
              </div>
              <div style={{display: 'flex', marginTop: '30px'}}>
                <div style={{color: '#000000', fontSize: '23px', fontWeight: 500, width: '200px'}}>
                  Comment:
                </div>
                <div>
                  <TextField
                    ref='reviewTextInput'
                    name='reviewTextInput'
                    underlineFocusStyle={{borderColor: '#FF4081'}}
                    inputStyle={{fontWeight: 600, fontSize: '18px'}}
                    underlineStyle={{borderWidth: '2px', borderColor: '#c1c1c0'}}
                    onChange={this.handleReviewTextChange}
                    value={this.state.reviewText}
                  />
                </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <ButtonHover onTouchTap={this.handleSaveClientReview}
                             style={{padding: '10px 20px',
                             backgroundColor: '#f3f6f7',
                             border: '2px solid #000000',
                             color: '#000000'}}
                             hoverStyle={{backgroundColor: '#000', color: '#fff'}}>
                  SUBMIT
                </ButtonHover>
              </div>
            </div> : <div>
                    <span style={{color: '#000000', fontSize: '28px', fontWeight: 600}}>
                        Average rating:
                    </span>
              <div>
                <img src={`./images/stars-${this.state.ratings.average_rating}.png`}
                     style={{height: '24px', marginTop: '10px', marginLeft: '20px'}}/>
                        <span
                          style={{color: '#6d6d6d',
                          fontSize: '16px',
                          fontWeight: 600,
                          margin: '9px 0 0 15px',
                          lineHeight: '36px'}}>
                            {this.state.ratings.total_ratings} Reviews
                        </span>
              </div>
            </div>}
          </div> : null}

        <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
          {(this.state.ratings.ratings === null) ? <div>{reviews}</div> : <div style={{width: 900}}>
            <Slider slidesToScroll={3} slidesToShow={3} dots={false}>
              {reviews}
            </Slider>
          </div>}
        </div>

        <div style={{margin: '20px 0 70px', textAlign: 'center'}}>
          <ButtonHover onTouchTap={this.handleShowMore}
                       style={{padding: '20px 30px',
                        backgroundColor: '#f3f6f7',
                        border: '2px solid #000000',
                        color: '#000000'}}
                       hoverStyle={{backgroundColor: '#000', color: '#fff'}}>
            MORE REVIEWS
          </ButtonHover>
        </div>

      </div>
    </div>;
  }

});
