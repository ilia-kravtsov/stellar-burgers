import {
  fetchIngredients,
} from '../src/services/slices';

import reducer, {
  initialState as ingredientsInitialState
} from '../src/services/slices/ingredients';
import { mockIngredientFirst } from './__mockData__/mockData';

describe('Тестирование ingredientsReducer', () => {
  describe('Тестирование fetchIngredients', () => {
    test('pending: выставляет флаг загрузки и сбрасывает ошибку', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = reducer(ingredientsInitialState, action);

      expect(state.isIngredientsLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('fulfilled: сохраняет полученные ингредиенты и сбрасывает флаг загрузки', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredientFirst
      };
      const state = reducer(ingredientsInitialState, action);

      expect(state.isIngredientsLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredientFirst);
    });

    test('rejected: сохраняет ошибку и сбрасывает флаг загрузки', () => {
      const error = 'Ошибка запроса';
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: error }
      };

      const state = reducer(ingredientsInitialState, action);

      expect(state.isIngredientsLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });
});
