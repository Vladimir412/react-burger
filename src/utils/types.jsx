import PropTypes from 'prop-types';


export const typesOfIngredients = {
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    price: PropTypes.number,
    proteins: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
};

export const typesOfOpenModalIngredient = PropTypes.func;
