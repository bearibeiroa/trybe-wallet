import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  totalSumExpenses() {
    const { expenses } = this.props;
    const totalSum = expenses.reduce((acc, curr) => {
      acc += Number(curr.value) * curr.exchangeRates[curr.currency].ask;
      return acc;
    }, 0);
    return totalSum;
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <span data-testid="email-field">{`Email:${email}`}</span>
        <span data-testid="total-field">
          {`Despesas: ${this.totalSumExpenses(expenses)}`}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = ({ user, wallet }) => (
  {
    email: user.email,
    currencies: wallet.currencies,
    expenses: wallet.expenses,
  }
);

export default connect(mapStateToProps)(Header);