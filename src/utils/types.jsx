import PropTypes from 'prop-types';


export const typesOfIngredients = {
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
}.isRequired;

export const typesOfOpenModalIngredient = PropTypes.func.isRequired;
export const typesOfOpenModalOrder = PropTypes.func.isRequired;

export const typesOfClosedModal = PropTypes.func
