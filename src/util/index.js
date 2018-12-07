// @flow
const formatDate = timestamp => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-GB', { month: 'short', day: '2-digit', year: 'numeric' });
};

export {
  formatDate,
};
