import { type } from "@testing-library/user-event/dist/type";
import PropTypes from "prop-types";
import { ReactNode } from 'react'

// export const typesOfIngredients = {
//     calories: PropTypes.number.isRequired,
//     carbohydrates: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired,
//     proteins: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     image_large: PropTypes.string.isRequired,
//     image_mobile: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     _id: PropTypes.string.isRequired,
// }.isRequired;

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  price: number;
  proteins: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  type: string;
  _id: string;
};

export type TIngredientDetails = TIngredient & {
  id: string;
  key: string;
  withoutModal?: string;
  dragId?: string;
};

export type TCardIngredient = Omit<TIngredientDetails, "withoutModal">;

export type TRegister = {
  name: string;
  email: string;
  password: string;
};

export type TLogin = Omit<TRegister, "name">;

export type TLocation = {
  state?: { from?: string };
};

export type TModal = {
  onCloseModal: () => void;
  title: string;
  children: ReactNode;
}

export const typesOfOpenModalIngredient = PropTypes.func.isRequired;
export const typesOfOpenModalOrder = PropTypes.func.isRequired;

export const typesOfClosedModal = PropTypes.func;
