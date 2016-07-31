import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

export const PricingTable = React.createClass({
  propTypes: {
    prices: React.PropTypes.array
  },
  render: function () {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{textAlign: 'center'}}>Quantity</TableHeaderColumn>
            <TableHeaderColumn style={{textAlign: 'center'}}>14 days</TableHeaderColumn>
            <TableHeaderColumn style={{textAlign: 'center'}}>7 days</TableHeaderColumn>
            <TableHeaderColumn style={{textAlign: 'center'}}>4 days</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.prices.map((p) => {
            return (
              <TableRow key={p.quantity}>
                <TableRowColumn style={{textAlign: 'center'}}>{p.quantity}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                  ${(p.delivery_14 / 100).toFixed(2)}
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                  ${(p.delivery_7 / 100).toFixed(2)}
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                  ${(p.delivery_4 / 100).toFixed(2)}
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
});


export const PricingTabs = React.createClass({
  render: function () {

    const prices = {
      debossed: [
        {quantity: 20, delivery_14: 3200, delivery_7: 3680, delivery_4: 3840},
        {quantity: 60, delivery_14: 4000, delivery_7: 4600, delivery_4: 4800},
        {quantity: 100, delivery_14: 5800, delivery_7: 6670, delivery_4: 6960},
        {quantity: 200, delivery_14: 8600, delivery_7: 9890, delivery_4: 10320},
        {quantity: 500, delivery_14: 14000, delivery_7: 16100, delivery_4: 16800},
        {quantity: 1000, delivery_14: 21500, delivery_7: 24725, delivery_4: 25800}
      ],
      debossed_with_colour: [
        {quantity: 20, delivery_14: 4800, delivery_7: 5520, delivery_4: 5760},
        {quantity: 60, delivery_14: 6000, delivery_7: 6900, delivery_4: 7200},
        {quantity: 100, delivery_14: 8700, delivery_7: 10005, delivery_4: 10440},
        {quantity: 200, delivery_14: 11610, delivery_7: 13352, delivery_4: 13932},
        {quantity: 500, delivery_14: 18200, delivery_7: 20930, delivery_4: 21840},
        {quantity: 1000, delivery_14: 23650, delivery_7: 27198, delivery_4: 28380}
      ],
      embossed: [
        {quantity: 20, delivery_14: 6000, delivery_7: 6900, delivery_4: 7200},
        {quantity: 60, delivery_14: 6000, delivery_7: 6900, delivery_4: 7200},
        {quantity: 100, delivery_14: 6500, delivery_7: 7475, delivery_4: 7800},
        {quantity: 200, delivery_14: 7000, delivery_7: 10350, delivery_4: 10800},
        {quantity: 500, delivery_14: 15400, delivery_7: 17710, delivery_4: 18480},
        {quantity: 1000, delivery_14: 23650, delivery_7: 27198, delivery_4: 28380}
      ],
      embossed_with_colour: [
        {quantity: 20, delivery_14: 9000, delivery_7: 10350, delivery_4: 10800},
        {quantity: 60, delivery_14: 9000, delivery_7: 10350, delivery_4: 10800},
        {quantity: 100, delivery_14: 9750, delivery_7: 11213, delivery_4: 11700},
        {quantity: 200, delivery_14: 10500, delivery_7: 15525, delivery_4: 16200},
        {quantity: 500, delivery_14: 22330, delivery_7: 25680, delivery_4: 26796},
        {quantity: 1000, delivery_14: 34500, delivery_7: 39675, delivery_4: 41400}
      ],
      print: [
        {quantity: 20, delivery_14: 5000, delivery_7: 5750, delivery_4: 6000},
        {quantity: 60, delivery_14: 5000, delivery_7: 5750, delivery_4: 6000},
        {quantity: 100, delivery_14: 6000, delivery_7: 6900, delivery_4: 7200},
        {quantity: 200, delivery_14: 9030, delivery_7: 10385, delivery_4: 10836},
        {quantity: 500, delivery_14: 14700, delivery_7: 16905, delivery_4: 17640},
        {quantity: 1000, delivery_14: 22575, delivery_7: 25962, delivery_4: 27090}
      ]
    };

    return (
      <div>
        <Tabs inkBarStyle={{background: '#FF4081'}} tabItemContainerStyle={{background: '#303131'}}>
          <Tab label="debossed">
            <PricingTable prices={prices.debossed}/>
          </Tab>
          <Tab label="Debossed with colour">
            <PricingTable prices={prices.debossed_with_colour}/>
          </Tab>
          <Tab label="embossed">
            <PricingTable prices={prices.embossed}/>
          </Tab>
          <Tab label="Embossed with colour">
            <PricingTable prices={prices.embossed_with_colour}/>
          </Tab>
          <Tab label="print">
            <PricingTable prices={prices.print}/>
          </Tab>
        </Tabs>
      </div>
    );
  }
});
