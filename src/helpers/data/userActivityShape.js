import PropTypes from 'prop-types';

const userActivityCardShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
});

export default { userActivityCardShape };
