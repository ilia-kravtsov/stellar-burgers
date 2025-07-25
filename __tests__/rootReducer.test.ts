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
  });
});
