import { UnknownAction } from '@reduxjs/toolkit';
import { rootReducer } from '../src/services/store/index';

describe('Тестирование rootReducer', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    } as UnknownAction);
    expect(state).toBeDefined();
    expect(state.builder).toEqual({
      bun: null,
      ingredients: []
    });
    expect(state.ingredients).toEqual({
      isIngredientsLoading: true,
      error: null,
      ingredients: []
    });
    expect(state.orders).toEqual({
      isOrderLoading: true,
      isOrdersLoading: true,
      orderRequest: false,
      orderModalData: null,
      error: null,
      ordersData: []
    });
    expect(state.user).toEqual({
      isAuthChecked: false,
      isAuthenticated: false,
      data: {
        name: '',
        email: ''
      }
    });
    expect(state.feeds).toEqual({
      isLoading: true,
      error: null,
      data: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    });
  });
});
