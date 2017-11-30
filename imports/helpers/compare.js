const areThey = (value1, value2, choice1, choice2) => {
  if (value1 === choice1 && value2 === choice2) {
    return true;
  } else if (value1 === choice2 && value2 === choice1) {
    return true;
  }
  return false;
};

const compare = (choice1, choice2) => {
  if (areThey('paper', 'rock', choice1, choice2)) {
    return 'paper';
  } else if (areThey('paper', 'scissors', choice1, choice2)) {
    return ('scissors');
  } else if (areThey('scissors', 'rock', choice1, choice2)) {
    return ('rock');
  }
  return false;
};

export default compare;
