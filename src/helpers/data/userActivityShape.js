import PropTypes from 'prop-types';

const userActivityCardShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
});

const scoreboardActivityCardShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
});

export default { userActivityCardShape, scoreboardActivityCardShape };
