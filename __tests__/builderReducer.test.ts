import {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} from '../src/services/slices';

import reducer, {
  initialState as builderInitialState
} from '../src/services/slices/builder';
import {
  mockBun,
  mockIngredientFirst,
  mockIngredientSecond
} from './__mockData__/mockData';
import { TConstructorState } from '../src/utils/types';
import { stripId } from './utils/utils';

describe('Тестирование конструктора бургера - builderReducer', () => {
  describe('Взаимодействие с булками', () => {
    test('Установка булки - setBun', () => {
      const state = reducer(builderInitialState, setBun(mockBun));
      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toHaveLength(0);
    });

    test('Добавляет булку как ингредиент (addIngredient)', () => {
      const state = reducer(builderInitialState, addIngredient(mockBun));
      expect(stripId(state.bun)).toEqual(mockBun);
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('Управление ингредиентами', () => {
    test('Добавляет ингредиент', () => {
      const state = reducer(
        builderInitialState,
        addIngredient(mockIngredientFirst)
      );
      expect(state.ingredients).toHaveLength(1);
      expect(stripId(state.ingredients[0])).toEqual(
        stripId(mockIngredientFirst)
      );
      expect(state.bun).toBeNull();
    });

    test('Удаляет ингредиент', () => {
      const initialState: TConstructorState = {
        bun: null,
        ingredients: [mockIngredientFirst, mockIngredientSecond]
      };

      const state = reducer(
        initialState,
        removeIngredient(mockIngredientFirst._id)
      );
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockIngredientSecond);
      expect(state.bun).toBeNull();
    });

    describe('Перемещает ингредиенты внутри конструктора', () => {
      let initialState: any;

      beforeEach(() => {
        initialState = {
          mockBun: null,
          ingredients: [mockIngredientFirst, mockIngredientSecond]
        };
      });

      test('Перемещение вниз', () => {
        const state = reducer(
          initialState,
          moveIngredient({ index: 0, upwards: false })
        );
        expect(state.ingredients).toEqual([
          mockIngredientSecond,
          mockIngredientFirst
        ]);
      });

      test('Перемещение вверх', () => {
        const state = reducer(
          initialState,
          moveIngredient({ index: 1, upwards: true })
        );
        expect(state.ingredients).toEqual([
          mockIngredientSecond,
          mockIngredientFirst
        ]);
      });
    });
  });

  test('Сброс конструктора', () => {
    const initialState: TConstructorState = {
      bun: mockBun,
      ingredients: [mockIngredientFirst, mockIngredientSecond]
    };

    const state = reducer(initialState, resetConstructor());
    expect(state.ingredients).toHaveLength(0);
    expect(state.bun).toBeNull();
  });
});
