let defaulIncrement = ''
try {
  if (localStorage.addIncrement) {
    defaulIncrement = localStorage.addIncrement
  }

} catch (e) {}

export default {
  state: defaulIncrement,
}