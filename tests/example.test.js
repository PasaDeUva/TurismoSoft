function greeting(name) {
  return 'Hello world, ' + name;
}

test('should return a greeting message for the given name', () => {
  expect(greeting('John')).toBe('Hello world, John');
});
