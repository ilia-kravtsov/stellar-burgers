import {
  fetchUser,
  updateUser,
  register,
  login,
  logout
} from '../src/services/slices';

import reducer, {
  initialState as userInitialState
} from '../src/services/slices/user';
import { mockLogin, mockRegister, mockUser } from './__mockData__/mockData';

describe('Тестирование userReducer', () => {
  describe('Тестирование регистрации пользователя', () => {
    test('pending: сбрасывает сообщение об ошибке при начале запроса', () => {
      const action = register.pending('pending', mockRegister);
      const state = reducer(userInitialState, action);

      expect(state.registerError).toBeUndefined();
    });

    test('fulfilled: должен сохранить пользователя и установить флаг аутентификации', () => {
      const action = register.fulfilled(mockUser, 'fulfilled', mockRegister);
      const state = reducer(userInitialState, action);

      expect(state.isAuthenticated).toBeTruthy();
      expect(state.registerError).toBeUndefined();
      expect(state.data).toEqual(mockUser);
    });

    test('rejected: должен сохранить сообщение об ошибке', () => {
      const errorMessage = 'Ошибка регистрации';
      const action = register.rejected(
        new Error(errorMessage),
        'rejected',
        mockRegister
      );
      const state = reducer(userInitialState, action);

      expect(state.registerError?.message).toEqual(errorMessage);
    });
  });

  describe('login: тестирование входа в систему', () => {
    test('pending: сбрасывает сообщение об ошибке входа', () => {
      const action = login.pending('pending', mockLogin);
      const nextState = reducer(userInitialState, action);

      expect(nextState.loginError).toBeUndefined();
    });

    test('fulfilled: сохраняет данные пользователя и устанавливает флаг isAuthenticated', () => {
      const action = login.fulfilled(mockUser, 'fulfilled', mockLogin);
      const nextState = reducer(userInitialState, action);

      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.loginError).toBeUndefined();
      expect(nextState.data).toEqual(mockUser);
    });

    test('rejected: сохраняет сообщение об ошибке входа', () => {
      const errorMessage = 'Ошибка входа';
      const action = login.rejected(
        new Error(errorMessage),
        'rejected',
        mockLogin
      );
      const nextState = reducer(userInitialState, action);

      expect(nextState.loginError?.message).toBe(errorMessage);
    });
  });

  describe('logout: тестирование выхода из системы', () => {
    test('fulfilled: сбрасывает данные пользователя и флаг isAuthenticated', () => {
      const action = logout.fulfilled(undefined, 'fulfilled');
      const nextState = reducer(userInitialState, action);

      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.data).toEqual({ email: '', name: '' });
    });
  });

  describe('fetchUser: получение данных пользователя', () => {
    test('fulfilled: устанавливает флаги isAuthenticated и isAuthChecked, сохраняет данные пользователя', () => {
      const action = fetchUser.fulfilled(mockUser, 'fulfilled');
      const nextState = reducer(userInitialState, action);

      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
      expect(nextState.data).toEqual(mockUser);
    });

    test('rejected: сбрасывает isAuthenticated, устанавливает isAuthChecked', () => {
      const errorMessage = 'Ошибка проверки авторизации';
      const action = fetchUser.rejected(new Error(errorMessage), 'rejected');
      const nextState = reducer(userInitialState, action);

      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser: обновление данных пользователя', () => {
    it('fulfilled: должен обновить данные пользователя', () => {
      const action = updateUser.fulfilled(mockUser, 'fulfilled', mockUser);
      const nextState = reducer(userInitialState, action);

      expect(nextState.data).toEqual(mockUser);
    });
  });
});
