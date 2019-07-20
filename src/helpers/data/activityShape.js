import PropTypes from 'prop-types';

const activityCardShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
});

export default { activityCardShape };
