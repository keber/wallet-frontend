jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: ({ children }) => children,
  };
});

